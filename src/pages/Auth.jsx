import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"


function Auth() {

    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState('login');
    const navigate = useNavigate();

    useEffect( () => {
        const urlMode = searchParams.get('mode')
        setMode(urlMode)
    }, [searchParams])

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    const navigateToNotesPage = () => {
        navigate("/notes")
    }

    return (
        <>
            <div className="auth-page">

                <h1> {mode === 'login' ? "Login" : "Create Account" } </h1>

                {mode === 'login' ? (
                    <form className="login-form">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit" onClick={navigateToNotesPage}>Login</button>
                </form>
                ) : (
                    <form className="signup-form">
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit" onClick={navigateToNotesPage}>Create Account</button>
                </form>
                ) }

                <p>
                    {mode === 'login' 
                    ? "Don't have an account? " 
                    : "Already have an account? "
                }
                <a onClick={toggleMode} className="link-button">
                    {mode === 'login' ? "Login" : "Create Account"}
                </a>
                </p>

            </div>
        </>
    )
}

export default Auth