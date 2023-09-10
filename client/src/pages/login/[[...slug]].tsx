import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import LandingLayout from "layouts/LandingLayout";
import { useRouter } from "next/router";
import { useState } from "react";

function Auth() {
  const [mode, setMode] = useState<"Login" | "Register">("Login");
  const router = useRouter();
  return (
    <LandingLayout title={`BlueTix - ${mode}`}>
      {(user) => {
        if (user) {
          const slug = router.query.slug;
          if (slug && Array.isArray(slug)) {
            const url = slug.join("/");
            router.push(`/${url}`);
          } else {
            router.replace("/");
          }
        }
        return (
          <div className="flex h-[calc(100vh-68px)] w-full justify-center bg-gray-200">
            <div className="mx-auto mb-8 mt-8 flex w-full max-w-5xl flex-col items-center  px-3 pt-4 sm:px-6 xl:max-w-6xl xl:px-8">
              {mode === "Login" ? <Login /> : <Register />}
              <div className="mt-4">
                {mode === "Login" ? (
                  <span>
                    Don't have an account?{" "}
                    <span
                      className="cursor-pointer text-blue-600 hover:text-blue-500"
                      onClick={() => setMode("Register")}
                    >
                      Create one today!
                    </span>
                  </span>
                ) : (
                  <span>
                    Have an account?{" "}
                    <span
                      className="cursor-pointer text-blue-600 hover:text-blue-500"
                      onClick={() => setMode("Login")}
                    >
                      Sign in here!
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </LandingLayout>
  );
}

export default Auth;
