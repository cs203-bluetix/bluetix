import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { useRouter } from "next/router";
import { useState } from "react";

function Auth() {
  const [mode, setMode] = useState<"Login" | "Register">("Login");
  const router = useRouter();
  return (
    <LandingLayout title={`BlueTix - ${mode}`} withNavbar>
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
          // <div className="w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/assets/login.png")' }}>
          <div className="mt-16">
            {/* <Section> */}
            <div className="flex h-[92vh] w-full justify-center">
              <div className="w-1/2 mt-14">
                <div className="">
                  <div  className="mt-4 ml-auto w-[80%] bg-white rounded-xl backdrop-blur-sm bg-opacity-80 px-6 py-4 ">
                  {mode === "Login" ? <Login /> : <Register />}
                  <div className="mt-4">
                    {mode === "Login" ? (
                      <span className="flex justify-center">
                        <span className="">Don't have an account? {" "}</span>
                        <span
                          className="cursor-pointer text-blue-600 hover:text-blue-500"
                          onClick={() => setMode("Register")}
                        >
                          &nbsp;Create one today!
                        </span>
                      </span>
                    ) : (
                      <span className="flex justify-center">
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
              </div>
              <div className="w-1/2 h-[92vh] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/assets/login.png")' }}>
              </div>
              {/* <div className="mx-auto mb-8 mt-16 flex w-full max-w-5xl flex-col items-center  px-3 pt-4 sm:px-6 xl:max-w-6xl xl:px-8">
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
            </div> */}
            </div>
            {/* </Section> */}
          </div>
        );
      }}
    </LandingLayout>
  );
}

export default Auth;
