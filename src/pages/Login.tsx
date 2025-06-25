import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call - replace with your actual authentication logic
      if (email === "admin@shivdairy.com" && password === "password123") {
        // Generate a mock token - replace with actual token from your API
        const mockToken = "mock-jwt-token-" + Date.now();
        login(mockToken);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToForgotPassword = () => {
    navigate("/forgot");
  };

  return (
    <>
      <section className="wrapper">
        <div className="login_card">
          <h1>Admin Login 👋</h1>
          <p>
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </p>
          
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '12px', padding: '8px', marginBottom: '15px', backgroundColor: '#ffe6e6', color: '#d63384', border: '1px solid #f5c6cb', borderRadius: '5px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="lbl">Email</label>
            <input 
              type="email" 
              className="input_text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <label className="lbl mt-2">Password</label>
            <input 
              type="password" 
              className="input_text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </form>
          
          <p className="text-right font-12 mt-2">
            <span 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={goToForgotPassword}
            >
              Forgot Username/Password?
            </span>
          </p>
          
          <div 
            className="big_btn" 
            onClick={handleSubmit}
            style={{ 
              opacity: loading ? 0.7 : 1, 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? "Signing in..." : "Submit"}
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '11px', color: '#737791' }}>
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@shivdairy.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;