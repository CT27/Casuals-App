function LoginBox() {
  function handleClick(event) {
    event.preventDefault();
    console.log("submitted");
  }
  return (
    <div className="Log-in">
      <header className="Log-in-header">
        <h1>Existing User</h1>

        <form className="Log-in-form" onClick={handleClick}>
          <div>
            <label>Email:</label>
            <input type="email"></input>
          </div>
          <label>Password:</label>
          <input type="password"></input>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </header>
    </div>
  );
}
export default LoginBox;
