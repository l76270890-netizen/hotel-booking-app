import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  signInWithEmailAndPassword, 
  OAuthProvider, 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth"; 
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css"; // Ensure your login styles file matches

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. Traditional Email and Password Login Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Force context state tracking to look at freshest Firebase payload variables
      updateUser(userCredential.user);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email address or account password configuration.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Sign In With Google Handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      updateUser(result.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Sign In With Apple Handler
  const handleAppleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new OAuthProvider('apple.com');

    try {
      const result = await signInWithPopup(auth, provider);
      updateUser(result.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Sign In With GitHub Handler
  const handleGithubLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      updateUser(result.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to manage your bookings</p>

        {/* Traditional Input form wrapper */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Visual Partition Divider Line */}
        <div className="auth-divider" style={{ display: "flex", alignItems: "center", margin: "20px 0", color: "#888" }}>
          <hr style={{ flex: 1, border: "0.5px solid #eee" }} />
          <span style={{ padding: "0 10px", fontSize: "14px" }}>or</span>
          <hr style={{ flex: 1, border: "0.5px solid #eee" }} />
        </div>

        {/* Third-Party Federated Authentication Button Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          {/* Google Single Sign-On */}
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading}
            style={{ 
              width: "100%", 
              backgroundColor: "#ffffff", 
              color: "#333333", 
              border: "1px solid #ddd", 
              padding: "12px", 
              borderRadius: "6px", 
              fontWeight: "600", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-.14 3.03-3.3 4.12v3.42h5.33c3.12-2.88 4.92-7.11 4.92-12.39z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-5.33-3.42c-1.48.99-3.37 1.58-5.3 1.58-4.08 0-7.53-2.77-8.77-6.5H1.47v3.53C3.46 20.24 7.49 24 12 24z"/>
              <path fill="#FBBC05" d="M3.23 12.75c-.32-.96-.5-1.98-.5-3.03s.18-2.07.5-3.03V3.16H1.47A11.967 11.967 0 000 9.72c0 2.37.49 4.63 1.47 6.56l1.76-3.53z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.93 1.19 15.21 0 12 0 7.49 0 3.46 3.76 1.47 7.19l1.76 3.53c1.24-3.73 4.69-6.5 8.77-6.5z"/>
            </svg>
            Sign in with Google
          </button>

          {/* Apple Single Sign-On */}
          <button 
            type="button" 
            onClick={handleAppleLogin} 
            disabled={loading}
            style={{ 
              width: "100%", 
              backgroundColor: "#000000", 
              color: "#ffffff", 
              border: "none", 
              padding: "12px", 
              borderRadius: "6px", 
              fontWeight: "600", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <span style={{ fontSize: "18px" }}></span> Sign in with Apple 
          </button>

          {/* GitHub Single Sign-On */}
          <button 
            type="button" 
            onClick={handleGithubLogin} 
            disabled={loading}
            style={{ 
              width: "100%", 
              backgroundColor: "#24292e", 
              color: "#ffffff", 
              border: "none", 
              padding: "12px", 
              borderRadius: "6px", 
              fontWeight: "600", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Sign in with GitHub
          </button>

        </div>

        <p className="switch" style={{ marginTop: "20px" }}>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
