import React, { useState } from 'react'
import { registerNewUser } from '../../services/loginService'
import '../../LoginView.css'
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {
  const [educonUser, setEduconUser] = useState({
    username: '',
    password: '',
    email: '',
    category: '',
  })
  const [password2, setPassword2] = useState("");
  let navigate = useNavigate();
  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setEduconUser(values => ({ ...values, [name]: value }))
  }
  const saveNewUser = (event) => {
    event.preventDefault();
    if (educonUser.password.length < 5 || educonUser.password.length > 10) {
      alert("Password must be between 5 to 10 character long");
      return;
    }
    if (educonUser.password === password2) {
      registerNewUser(educonUser).then(respose => {
        alert("User is registered successfully...Go For Login");
        navigate('/');
      });
    }
    else
      alert("Passwords are not matched");
  };
  return (
    <div>
      <br />
      <div className=".container">
        <div className="row">
          <div className="card col-md-2 offset-md-3 offset-md-3">
            <div className="login-box">
              <h2 className="text-center">New User Registation</h2>
              <br />
              <form action="post">
              <div className="form-group">
                <label>User Name: </label>
                <input placeholder="username" name="username" className="form-control"
                  value={educonUser.username} onChange={(event) => onChangeHandler(event)} />
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input type="password" name="password" className="form-control"
                  value={educonUser.password} onChange={(event) => onChangeHandler(event)} />
              </div>
              <div className="form-group">
                <label>Retype/Confirm Password: </label>
                <input type="password" name="password2" className="form-control"
                  value={password2} onChange={(event) => setPassword2(event.target.value)} />
              </div>
              <div className="form-group">
                <label>User Email: </label>
                <input placeholder="email" name="email" className="form-control"
                  value={educonUser.email} onChange={(event) => onChangeHandler(event)} />
              </div>

              <div className="form-group">
                <label>Select Category : </label>
                <input list="types" name="category" className="form-control"
                  value={educonUser.category} onChange={(event) => onChangeHandler(event)} />
                <datalist id="types">
                  <option value="Student" />
                  <option value="Admin" />
                </datalist>
              </div>
              <br />
              <button className='btn btn-primary' onClick={(e) => saveNewUser(e)}>Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
   </div >


              )
}

export default RegisterUser