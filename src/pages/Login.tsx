const Login = () => {
  return (
    <>
      <section className="wrapper">
        <div className="login_card">
          <h1>Admin Login 👋</h1>
          <p>
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </p>
          <form>
            <label className="lbl">Email</label>
            <input type="text" className="input_text"></input>
            <label className="lbl mt-2">Password</label>
            <input type="text" className="input_text"></input>
          </form>
          <p className="text-right font-12 mt-2">Forgot Username/Password?</p>
          <div className="big_btn">Submit</div>
        </div>
      </section>
    </>
  );
};

export default Login;
