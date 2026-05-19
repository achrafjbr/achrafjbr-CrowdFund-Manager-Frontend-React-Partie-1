import { useState } from "react";

const SignIn = () => {
  return <></>;
};
const SignUp = () => {
  return <></>;
};

function LoginPage() {
  const [switchAuth, setSwitchAuth] = useState(true);

  return (
    <div>
      <div
        className={` flex justify-center items-center
           min-h-screen bg-linear-to-r
            from-cyan-500 to-blue-300 w-1/2
             shadow-2xl absolute z-10 transition-all duration-500 
             ${switchAuth ? "translate-x-full " : "translate-x-0"} `}
      >
        <div className={""}>{}</div>

        <button
          onClick={() => setSwitchAuth(!switchAuth)}
          className="px-10 py-3 ring-2 ring-white shadow-2xl rounded font-semibold text-white "
        >
          {switchAuth ? "SignUp" : "SignIn"}
        </button>
      </div>
      <div
        className={` bg-amber-400 min-h-screen flex justify-center  items-center w-1/2 transition-all duration-500 ${switchAuth ? "translate-x-0" : "translate-x-full"}   `}
      >
        Hello
      </div>
    </div>
  );
}

export default LoginPage;
