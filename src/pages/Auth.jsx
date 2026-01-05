import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setJWTToken } from "../redux/slices/auth"


function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("login");

  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(true);

  // Form input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // useEffect( () => {
  //     const urlMode = searchParams.get('mode')
  //     setMode(urlMode)
  // }, [searchParams])

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const navigateToNotesPage = () => {
    navigate("/notes");
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      if (response.status === 200) {
        dispatch(setJWTToken(result.token))
        navigateToNotesPage();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(`Error during api : ${error}`);
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, name: name }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      if (response.status === 201) {
        toggleMode();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(`Error during api : ${error}`);
    }
  };

  return (
    <>
      <div className="auth-page">
        <h1> {mode === "login" ? "Login" : "Create Account"} </h1>

        {mode === "login" ? (
          <form className="login-form" onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="signup-form" onSubmit={signup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Create Account</button>
          </form>
        )}

        <p>
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <a onClick={toggleMode} className="link-button">
            {mode === "login" ? "Create Account" : "Login"}
          </a>
        </p>

        <h2> {isLoading === true ? "Loading..." : ""} </h2>
      </div>
    </>
  );
}

export default Auth;
