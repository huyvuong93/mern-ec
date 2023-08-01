import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    address: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newCustomer = {...form};

    await axios.post("http://localhost:3080/customer/create", JSON.stringify(newCustomer), {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
        console.log(res);
        navigate("/", {
          state: res.data
        });
      })
      .catch(error => {
        window.alert(error);
     navigate("/customer/form");
      });

    setForm({email: "", password: "", name: "", address: "", gender: ""});
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({password: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({address: e.target.value})}
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
              onChange={(e) => updateForm({gender: e.target.value})}
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
              onChange={(e) => updateForm({gender: e.target.value})}
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