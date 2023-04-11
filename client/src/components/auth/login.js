import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router';
import authContext from '../../contexts/authContext';

export default function Create() {
  const { setAuthenticated } = useContext(authContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const User = { ...form };

    await fetch("http://localhost:3080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    })
    .then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      setAuthenticated(data)
    })
    .catch(error => {
      window.alert(error);
    });

    setForm({ email: "", password:""});
  }

  // This following section will display the form that takes the input from the user.
  return (
      <div>
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                className="form-control"
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                className="form-control"
                id="password"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
                type="submit"
                value="Login"
                className="btn btn-primary"
            />
          </div>
        </form>
      </div>
  );
}