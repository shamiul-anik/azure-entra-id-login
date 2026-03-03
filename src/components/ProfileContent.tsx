import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../authConfig.ts";
import { callMsGraph } from "../graph.ts";

interface UserData {
  displayName?: string;
  mail?: string;
  jobTitle?: string;
}

export const ProfileContent = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<UserData | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (
      inProgress !== InteractionStatus.None ||
      accounts.length === 0 ||
      graphData
    ) {
      return () => {
        isMounted = false;
      };
    }

    const fetchProfile = async () => {
      try {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });
        const data = await callMsGraph(response.accessToken);
        if (isMounted) {
          setGraphData(data);
          setProfileError(null);
        }
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          if (isMounted) {
            setProfileError("Additional consent is required. Please sign out and sign in again.");
          }
          return;
        }
        console.error("Silent token acquisition failed:", error);
        if (isMounted) {
          setProfileError("Unable to load profile data.");
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [instance, accounts, inProgress, graphData]);

  return (
    <div className="p-4 border rounded shadow mt-4 bg-gray-50">
      {graphData ? (
        <>
          <h3 className="text-lg font-bold">Welcome, {graphData.displayName}</h3>
          <p><strong>Email:</strong> {graphData.userPrincipalName || "N/A"}</p>
          <p><strong>Job Title:</strong> {graphData.jobTitle || "N/A"}</p>
        </>
      ) : profileError ? (
        <p>{profileError}</p>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};
