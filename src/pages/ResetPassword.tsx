const ResetPassword = () => {
  return (
    <>
      <section className="wrapper">
        <div className="login_card">
          <h1>Reset Password</h1>
          <p>Reset your password</p>
          <form>
            <label className="lbl">Enter New Password</label>
            <input type="text" className="input_text"></input>
            <label className="lbl mt-2">Confirm New Password</label>
            <input type="text" className="input_text"></input>
          </form>
          <div className="big_btn mt-3">Submit</div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
