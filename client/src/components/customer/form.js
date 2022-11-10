import React, {useState} from 'react';
import {useNavigate} from 'react-router';

export default function Create() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    address: "",
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
    const newCustomer = { ...form };

    await fetch("http://localhost:3080/customer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
    .then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      navigate("/", {
        state: data
      });
    })
    .catch(error => {
      window.alert(error);
//      navigate("/customer/form");
    });

    setForm({ email: "", password:"", name: "", address: "", gender: "" });
  }

  // This following section will display the form that takes the input from the user.
  return (
      <div>
        <h3>Create New Customer</h3>
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
            <label htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
                type="text"
                className="form-control"
                id="address"
                value={form.address}
                onChange={(e) => updateForm({ address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Male"
                  value="Male"
                  checked={form.gender === "Male" || !form.gender}
                  onChange={(e) => updateForm({ gender: e.target.value })}
              />
              <label htmlFor="Male" className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="Female"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={(e) => updateForm({ gender: e.target.value })}
              />
              <label htmlFor="Female" className="form-check-label">Female</label>
            </div>
          </div>
          <div className="form-group">
            <input
                type="submit"
                value="Create Customer"
                className="btn btn-primary"
            />
          </div>
        </form>
      </div>
  );
}