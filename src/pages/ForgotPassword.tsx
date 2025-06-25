const ForgotPassword = () => {
  return (
    <>
      <section className="wrapper">
        <div className="login_card">
          <h1>Forgot Password</h1>
          <p>
            Enter the register email id will send you a link for reset password
          </p>
          <form>
            <label className="lbl">Email</label>
            <input type="text" className="input_text"></input>
          </form>
          <div className="big_btn mt-3">Submit</div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
