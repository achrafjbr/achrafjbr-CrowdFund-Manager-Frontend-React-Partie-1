import { useState } from "react";

const SignInLayer = ({ onChange, onSubmit }) => {
  return (
    <div className="text-center space-y-5">
      <h2 className="text-center text-4xl font-bold text-black">Sign In</h2>
      <p className="font-light tracking-[.25em] text-black">
        Sing in with Email and Password
      </p>
      <form className="space-y-5 p-2 " onSubmit={(event) => onSubmit(event)}>
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="email"
          placeholder="Entre E-mail"
          onChange={(e) => onChange(e)}
        />
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="password"
          placeholder="Entre Password"
          onChange={(e) => onChange(e)}
        />
        <button
          className="px-10 py-3 ring-2 
          shadow-2xl
            rounded font-sans
          text-black"
          type="submit"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
};

const SignUpLayer = ({ onChange, onSubmit }) => {
  return (
    <div className="text-center space-y-5">
      <h2 className="text-center text-4xl font-bold text-black">
        Welecome To CrowdFunder
      </h2>
      <p className="font-light tracking-[.25em] text-black">
        Register with E-mail
      </p>
      <form
        className="space-y-5 p-2 flex flex-col items-center "
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="name"
          placeholder="Entre Name"
          onChange={(e) => onChange(e)}
        />
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="email"
          placeholder="Entre E-mail"
          onChange={(e) => onChange(e)}
        />

        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="password"
          placeholder="Entre Password"
          onChange={(e) => onChange(e)}
        />

        <button
          className="px-10 py-3 ring-2 
          w-1/3
          shadow-2xl
          rounded 
          font-sans
          text-black"
          type="submit"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

function LoginPage() {
  const [switchAuth, setSwitchAuth] = useState(true);

  const [userAuth, setUserAuth] = useState(null);

  const inputsHandler = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    console.log("key", key);
    console.log("value", value);
    setUserAuth({ ...useState, [key]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userAuth);
  };

  // true state means : (Right & Signup )
  // False state means : (Left & Signin )

  return (
    <div>
      {/* Top layer */}
      <div
        className={`flex flex-col gap-y-10 justify-center items-center
                    min-h-screen bg-linear-to-r
                   from-cyan-500 to-blue-300 w-1/2
                  shadow-2xl absolute z-10 transition-all duration-500 
                  ${switchAuth ? "translate-x-full" : "translate-x-0"} `}
      >
        <div className={""}>
          {switchAuth ? (
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-mono text-white">Sign Up</h2>
              <p className="font-light tracking-[.25em] text-white">
                Sing up now an enjoy our site
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center space-y-2">
                <h2 className="text-center text-4xl font-mono text-white">
                  Welcome to CrowdFunder
                </h2>
                <p className="font-light tracking-[.25em] text-white">
                  Sing in with Email and Password
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setSwitchAuth(!switchAuth)}
          className="px-10 py-3 ring-2
           ring-white shadow-2xl
            rounded font-semibold
          text-white "
        >
          {switchAuth ? "SignUp" : "SignIn"}
        </button>
      </div>

      {/* Bottom layer */}
      <div
        className={` min-h-screen
                    flex justify-center  items-center
                     w-1/2 transition-all duration-500
                    ${switchAuth ? "translate-x-0" : "translate-x-full"}   `}
      >
        {switchAuth ? (
          <SignInLayer onChange={inputsHandler} onSubmit={submitHandler} />
        ) : (
          <SignUpLayer onChange={inputsHandler} onSubmit={submitHandler} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
