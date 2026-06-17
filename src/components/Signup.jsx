import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  OAuthProvider, 
  GithubAuthProvider, 
  GoogleAuthProvider, // 👈 Added Google Provider
  signInWithPopup 
} from "firebase/auth"; 
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. Traditional Email and Password Signup Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.username
      });

      updateUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Sign Up With Apple Handler
  const handleAppleSignup = async () => {
    setLoading(true);
    setError("");
    
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');

    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.user && !result.user.displayName) {
        const fallbackName = result.user.email.split('@')[0];
        await updateProfile(result.user, {
          displayName: fallbackName
        });
      }

      updateUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Sign Up With GitHub Handler
  const handleGithubSignup = async () => {
    setLoading(true);
    setError("");

    const provider = new GithubAuthProvider();
    provider.addScope('user:email');

    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.user && !result.user.displayName) {
        const githubUsername = result._tokenResponse?.screenName || result.user.email?.split('@')[0] || "User";
        await updateProfile(result.user, {
          displayName: githubUsername
        });
      }

      updateUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. 👉 NEW: Sign Up With Google Handler
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    const provider = new GoogleAuthProvider();
    // Optional: Force account picker popup window every time
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      
      // Google automatically returns the user's name. Fall back to email handle if missing.
      if (result.user && !result.user.displayName) {
        const googleUsername = result.user.email?.split('@')[0] || "User";
        await updateProfile(result.user, {
          displayName: googleUsername
        });
      }

      updateUser(auth.currentUser);
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
        <h2>Create Account 🚀</h2>
        <p>Sign up to get started</p>

        {/* Traditional Form Fields */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

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
            {loading ? "Creating account..." : "Sign Up with Email"}
          </button>
        </form>

        {/* Divider Line */}
        <div className="auth-divider" style={{ display: "flex", alignItems: "center", margin: "20px 0", color: "#888" }}>
          <hr style={{ flex: 1, border: "0.5px solid #eee" }} />
          <span style={{ padding: "0 10px", fontSize: "14px" }}>or</span>
          <hr style={{ flex: 1, border: "0.5px solid #eee" }} />
        </div>

        {/* Social Authentication Actions Wrapper */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          {/* 👉 NEW: Google Action Button */}
          <button 
            type="button" 
            onClick={handleGoogleSignup} 
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
            {/* Inline SVG graphic icon for Google */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-.14 3.03-3.3 4.12v3.42h5.33c3.12-2.88 4.92-7.11 4.92-12.39z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-5.33-3.42c-1.48.99-3.37 1.58-5.3 1.58-4.08 0-7.53-2.77-8.77-6.5H1.47v3.53C3.46 20.24 7.49 24 12 24z"/>
              <path fill="#FBBC05" d="M3.23 12.75c-.32-.96-.5-1.98-.5-3.03s.18-2.07.5-3.03V3.16H1.47A11.967 11.967 0 000 9.72c0 2.37.49 4.63 1.47 6.56l1.76-3.53z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.93 1.19 15.21 0 12 0 7.49 0 3.46 3.76 1.47 7.19l1.76 3.53c1.24-3.73 4.69-6.5 8.77-6.5z"/>
            </svg>
            Continue with Google
          </button>

          {/* Apple Action Button */}
          <button 
            type="button" 
            onClick={handleAppleSignup} 
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
            <span style={{ fontSize: "18px" }}></span> Continue with Apple 
          </button>

          {/* GitHub Action Button */}
          <button 
            type="button" 
            onClick={handleGithubSignup} 
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
            Continue with GitHub
          </button>

        </div>

        <p className="switch" style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
