import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";

export const Login = () => {
  const username = useRef();
  const password = useRef();
  const invalidDialog = useRef();
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("valid" in res && res.valid) {
          localStorage.setItem("app_user", res.token);
          history.push("/");
        } else {
          invalidDialog.current.showModal();
        }
      });
  };
  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Email or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Welcome To Lithub!</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Username </label>
            <input
              ref={username}
              type="username"
              id="username"
              className="form-control"
              defaultValue="bookreader"
              placeholder="reader"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              defaultValue="test"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset
            style={{
              textAlign: "center",
            }}
          >
            <button className="btn btn-1 btn-sep icon-send" type="submit">
              Sign In
            </button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};