import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage("Password has been reset successfully!");
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      setError("Failed to reset password. Please try again.");
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
          <h1>Reset Password</h1>
          <p>Enter your new password below</p>
          
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
            <label className="lbl">Enter New Password</label>
            <input 
              type="password" 
              className="input_text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
            <label className="lbl mt-2">Confirm New Password</label>
            <input 
              type="password" 
              className="input_text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
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
            {loading ? "Resetting..." : "Submit"}
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

export default ResetPassword;