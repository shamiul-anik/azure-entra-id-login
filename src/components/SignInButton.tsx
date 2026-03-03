import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.ts";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async (loginType: "popup" | "redirect") => {
    try {
      if (loginType === "popup") {
        await instance.loginPopup(loginRequest);
      } else if (loginType === "redirect") {
        await instance.loginRedirect(loginRequest);
      }
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  return (
    <button
      onClick={() => handleLogin("popup")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
    >
      Sign In using Popup
    </button>
  );
};