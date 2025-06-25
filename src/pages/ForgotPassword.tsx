import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage("Password reset link has been sent to your email address.");
      
      // Redirect to reset password page after 2 seconds
      setTimeout(() => {
        navigate("/reset");
      }, 2000);
      
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <>
      <section className="wrapper">
        <div className="login_card">
          <h1>Forgot Password</h1>
          <p>
            Enter the registered email id and we will send you a link to reset your password
          </p>
          
          {error && (
            <div className="alert alert-danger" style={{ fontSize: '12px', padding: '8px', marginBottom: '15px', backgroundColor: '#ffe6e6', color: '#d63384', border: '1px solid #f5c6cb', borderRadius: '5px' }}>
              {error}
            </div>
          )}
          
          {message && (
            <div className="alert alert-success" style={{ fontSize: '12px', padding: '8px', marginBottom: '15px', backgroundColor: '#e6ffe6', color: '#198754', border: '1px solid #c3e6cb', borderRadius: '5px' }}>
              {message}
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
          </form>
          
          <div 
            className="big_btn mt-3"
            onClick={handleSubmit}
            style={{ 
              opacity: loading ? 0.7 : 1, 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? "Sending..." : "Submit"}
          </div>
          
          <p className="text-center font-12 mt-3">
            Remember your password?{" "}
            <span 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={goToLogin}
            >
              Back to Login
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;