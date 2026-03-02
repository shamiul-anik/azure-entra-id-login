import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig.ts";
import { callMsGraph } from "../graph.ts"; // We will create this helper next

interface UserData {
  displayName?: string;
  mail?: string;
  jobTitle?: string;
}

export const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState<UserData | null>(null);

  useEffect(() => {
    if (accounts.length > 0) {
      // Silently acquire token
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          // Call Graph API with the token
          callMsGraph(response.accessToken).then((data) => setGraphData(data));
        })
        .catch((error) => {
          // Fallback to interactive method if silent fails due to interaction required
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenPopup(loginRequest).then((response) => {
              callMsGraph(response.accessToken).then((data) => setGraphData(data));
            });
          } else {
            console.error("Silent token acquisition failed:", error);
          }
        });
    }
  }, [instance, accounts]);

  return (
    <div className="p-4 border rounded shadow mt-4 bg-gray-50">
      {graphData ? (
        <>
          <h3 className="text-lg font-bold">Welcome, {graphData.displayName}</h3>
          <p><strong>Email:</strong> {graphData.mail || "N/A"}</p>
          <p><strong>Job Title:</strong> {graphData.jobTitle || "N/A"}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};