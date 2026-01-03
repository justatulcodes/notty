import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/auth?mode=login');
    };

    const handleCreateAccount = () => {
        navigate('/auth?mode=signup');
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="landing-header">
                <div className="logo-section">
                    <span className="logo-icon">📝</span>
                    <span className="logo-text">Notty</span>
                </div>
                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your Ideas, Organized
                    </h1>
                    <h2 className="hero-subtitle">
                        Smart Note-Taking for Modern Minds
                    </h2>
                    <p className="hero-description">
                        Capture your thoughts, organize your ideas, and boost your productivity 
                        with Notty. A beautiful, intuitive note-taking app designed to help you 
                        focus on what matters most.
                    </p>
                    
                    <div className="cta-section">
                        <button className="create-account-btn" onClick={handleCreateAccount}>
                            Create Account
                        </button>
                        <p className="helper-text">
                            Already have an account? <a onClick={handleLogin}>Sign in</a>
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Landing;