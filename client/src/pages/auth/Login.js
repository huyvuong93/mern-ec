import React, {useState} from 'react';
import Cookie from 'js-cookie';
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const body = {...form};

    await axios.post("http://localhost:3080/login", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
        Cookie.set('access_token', res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        window.location.href = 'http://localhost:3000';
      })
      .catch(error => {
        window.alert(error);
      });

    setForm({email: "", password: ""});
  }

  return (
    <div className="card mt-5 w-50 m-auto">
      <div className="card-body">
        <h3>Login</h3>
        <form>
          <Input id="email" type="text" title="Email" value={form.email} onChange={(e) => updateForm({email: e.target.value})}/>
          <Input id="password" type="password" title="Password" value={form.password} onChange={(e) => updateForm({password: e.target.value})} />
          <Button type='btn btn-primary' onClick={onSubmit}>Login</Button>
        </form>
      </div>
    </div>
  );
}