import { useState } from "react";
import { useDispatch, useSelector, useNavu } from "react-redux";
import { loginUser } from "../../../store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
const SignInLayer = ({ onChange, onSubmit }) => {
  c;

  return (
    <div className="text-center space-y-5">
      <h2 className="text-center text-4xl font-bold text-black">Sign In</h2>
      <p className="font-light tracking-[.25em] text-black">
        Sing in with Email and Password
      </p>
      <form className="space-y-5 p-2 " onSubmit={onSubmit}>
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="email"
          placeholder="Entre E-mail"
          onChange={onChange}
        />
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="password"
          placeholder="Entre Password"
          onChange={onChange}
        />
        <button
          className="px-10 py-3 ring-2 
          shadow-2xl
            rounded font-sans
          text-black"
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
        onSubmit={onSubmit}
      >
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="name"
          placeholder="Entre Name"
          onChange={onChange}
        />
        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="email"
          placeholder="Entre E-mail"
          onChange={onChange}
        />

        <input
          className="outline-0 w-full py-2 border-0 font-serif bg-gray-100 rounded border-black"
          type="text"
          name="password"
          placeholder="Entre Password"
          onChange={onChange}
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

const authTypes = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
};
function LoginPage() {
  const [switchAuth, setSwitchAuth] = useState(true);

  const [userAuth, setUserAuth] = useState(
    authTypes.SIGN_IN
      ? {
          authType: authTypes.SIGN_IN,
          email: "",
          password: "",
        }
      : {
          authType: authTypes.SIGN_UP,
          name: "",
          email: "",
          password: "",
        },
  );

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const inputsHandler = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    const authType = event.authType;
    setUserAuth({ ...userAuth, [key]: value, authType });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //const auth = { ...userAuth };
    console.log(userAuth);
    const { authType } = userAuth;
    if (authType == authTypes.SIGN_IN) {
      const result = await dispatch(loginUser(userAuth));

      if (loginUser.fulfilled.match(result)) {
        navigate("/home", { replace: true });
      }
    }
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
          <SignInLayer
            onChange={(e) =>
              inputsHandler({ ...e, authType: authTypes.SIGN_IN })
            }
            onSubmit={submitHandler}
          />
        ) : (
          <SignUpLayer
            onChange={(e) =>
              inputsHandler({ ...e, authType: authTypes.SIGN_UP })
            }
            onSubmit={submitHandler}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
