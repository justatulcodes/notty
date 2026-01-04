import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"


function Auth() {

    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState('login');

    const [isLoading, setIsLoading] = useState(true);
    const [apiResponse, setApiResponse] = useState(null)
    const [error, setError] = useState("")

    const navigate = useNavigate();


    // useEffect( () => {
    //     const urlMode = searchParams.get('mode')
    //     setMode(urlMode)
    // }, [searchParams])

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    const navigateToNotesPage = () => {
        navigate("/notes")
    }

    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5002/user/login", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify( {email : "atul@Gmail.com", password : "3535wefewfse" })
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            
        } catch (error) {
            console.log(error);
            setError(`Error during api : ${error}`)
        }
    }

    const signup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5002/user/signup", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify( {email : "atul@Gmail.com", password : "3535wefewfse", name : "Autl" })
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            
        } catch (error) {
            console.log(error);
            setError(`Error during api : ${error}`)
        }
    }

    return (
        <>
            <div className="auth-page">

                <h1> {mode === 'login' ? "Login" : "Create Account" } </h1>

                {mode === 'login' ? (
                    <form className="login-form" onSubmit={login}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
                ) : (
                    <form className="signup-form" onSubmit={signup}>
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Create Account</button>
                </form>
                ) }

                <p>
                    {mode === 'login' 
                    ? "Don't have an account? " 
                    : "Already have an account? "
                }
                <a onClick={toggleMode} className="link-button">
                    {mode === 'login' ? "Create Account" : "Login"}
                </a>
                </p>

                <h2> { isLoading === true ? "Loading..." : "" } </h2>

            </div>
        </>
    )
}

export default Auth