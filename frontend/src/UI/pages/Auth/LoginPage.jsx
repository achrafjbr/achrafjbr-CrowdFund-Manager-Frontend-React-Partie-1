import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
} from "../../../store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { useError } from "../../../hooks/useError";
import ErrorModel from "../../components/ErrorModel";
import Loading from "../../components/Loading";

const authTypes = {
  SIGN_IN: "signin",
  SIGN_UP: "signup",
};

const SignInLayer = ({ onChange, onSubmit }) => {
  const { isLoading, isError } = useSelector((state) => state.authentication);
  // useError(isError);
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

        {/* <p
          className={`transition-all duration-1000 text-red-300 ${isError ? "opacity-100" : "opacity-0"}`}
        >
          {isError}
        </p> */}

        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <button
            className="px-10 py-3 ring-2 
          shadow-2xl
            rounded font-sans
          text-black"
          >
            SIGN IN
          </button>
        )}
      </form>
    </div>
  );
};

const SignUpLayer = ({ onChange, onSubmit, handleRoleChange, role }) => {
  const { isLoading, isError } = useSelector((state) => state.authentication);
  // useError(isError);

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

        {/* <p
          className={`transition-all duration-1000 text-red-300 ${isError ? "opacity-100" : "opacity-0"}`}
        >
          {isError}
        </p> */}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Role</h2>

          <div className="flex gap-6">
            {/* Owner */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="owner"
                checked={role === "owner"}
                onChange={handleRoleChange}
              />
              <span>Owner</span>
            </label>

            {/* Investor */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="investor"
                checked={role === "investor"}
                onChange={handleRoleChange}
              />
              <span>Investor</span>
            </label>

            {/* Admin */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={handleRoleChange}
              />
              <span>Admin</span>
            </label>
          </div>

          <p className="text-gray-700">
            Selected Role: <strong>{role}</strong>
          </p>
        </div>

        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <button
            className="px-10 py-3 ring-2 
          shadow-2xl
            rounded font-sans
          text-black"
          >
            SIGN UP
          </button>
        )}
      </form>
    </div>
  );
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
          role: role,
        },
  );
  const [role, setRole] = useState("owner");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const inputsHandler = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    const authType = event.authType;
    setUserAuth({ ...userAuth, [key]: value, authType });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { authType } = userAuth;
    if (authType == authTypes.SIGN_IN) {
      const { email, password } = userAuth;
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigate("/home", { replace: true });
      }
    } else if (authTypes.SIGN_UP) {
      const { name, email, password } = userAuth;
      const result = dispatch(registerUser({ name, email, password, role }));
      if (!isLoading && !isError) {
        // setSwitchAuth(true);
        setTimeout(() => {
          setSwitchAuth(true);
        }, 1000);
      }
    }
  };

  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     setTimeout(() => {
  //       setSwitchAuth(true);
  //     }, 1000);
  //   }
  // }, [isLoading, isError]);

  useError(isError);

  // true state means : (Right & Signup )
  // False state means : (Left & Signin )

  return (
    <div className="relative">
      {/* ^Bottom layer */}
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

      {/* Top layer */}
      <div
        className={` min-h-screen
                    flex justify-center  items-center
                     w-1/2 transition-all duration-500
                    ${switchAuth || isLoading ? "translate-x-0" : "translate-x-full"}   `}
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
            handleRoleChange={handleRoleChange}
            role={role}
            onChange={(e) =>
              inputsHandler({ ...e, authType: authTypes.SIGN_UP })
            }
            onSubmit={submitHandler}
          />
        )}
      </div>

      <ErrorModel error={isError} />
      {/* <Loading isLoading={isLoading} /> */}
    </div>
  );
}

export default LoginPage;
