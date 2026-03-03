import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.ts";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: "popup" | "redirect") => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.error(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.error(e);
      });
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