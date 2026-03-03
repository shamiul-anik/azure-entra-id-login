import { type Configuration, LogLevel } from "@azure/msal-browser";

// Define configuration object
const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          // case LogLevel.Info:
          //   console.info(message);
          //   return;
          // case LogLevel.Verbose:
          //   console.debug(message);
          //   return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Scopes required for the Microsoft Graph API (basic profile info)
export const loginRequest = {
  scopes: ["User.Read"],
  navigateToLoginRequestUrl: false,
};

export default msalConfig;
