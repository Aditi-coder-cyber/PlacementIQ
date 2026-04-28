import { useEffect } from "react";
import { Loader2 } from "lucide-react";

// This page handles the redirect from Google OAuth.
// Backend redirects to: /google-success?token=JWT&user=ENCODED_JSON
function GoogleSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userParam = params.get("user");

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      } catch (err) {
        window.location.href = "/login?error=google_failed";
      }
    } else {
      window.location.href = "/login?error=google_failed";
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-gray-600 font-semibold text-lg">Signing you in with Google...</p>
    </div>
  );
}

export default GoogleSuccess;
