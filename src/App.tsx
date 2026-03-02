import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from "./components/SignInButton";
import { SignOutButton } from "./components/SignOutButton";
import { ProfileContent } from "./components/ProfileContent";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Azure Entra ID + React
        </h1>

        {/* Shown ONLY when user is NOT logged in */}
        <UnauthenticatedTemplate>
          <p className="text-center text-gray-600 mb-4">
            Please sign in to access your profile.
          </p>
          <div className="flex justify-center">
            <SignInButton />
          </div>
        </UnauthenticatedTemplate>

        {/* Shown ONLY when user IS logged in */}
        <AuthenticatedTemplate>
          <div className="flex justify-end">
            <SignOutButton />
          </div>
          <ProfileContent />
        </AuthenticatedTemplate>

      </div>
    </div>
  );
}