import React, { useState } from 'react';
import { registerNewUser } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [educonUser, setEduconUser] = useState({
    username: '',
    password: '',
    email: '',
    category: '',
  });
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setEduconUser((values) => ({ ...values, [name]: value }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!educonUser.username.trim()) newErrors.username = 'Username is required';
    if (!educonUser.password) newErrors.password = 'Password is required';
    else if (educonUser.password.length < 5 || educonUser.password.length > 10)
      newErrors.password = 'Password must be 5-10 characters';
    if (!password2) newErrors.password2 = 'Please confirm password';
    else if (educonUser.password !== password2) newErrors.password2 = 'Passwords do not match';
    if (!educonUser.email.trim()) newErrors.email = 'Email is required';
    if (!educonUser.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const saveNewUser = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerNewUser(educonUser);
      alert('User is registered successfully...Go For Login');
      navigate('/');
    } catch (err) {
      alert('Registration failed. Try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">New User Registration</h2>
        <form onSubmit={saveNewUser} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">User Name:</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
              }`}
              value={educonUser.username}
              onChange={onChangeHandler}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
              }`}
              value={educonUser.password}
              onChange={onChangeHandler}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Retype/Confirm Password:</label>
            <input
              type="password"
              name="password2"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password2 ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
              }`}
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                if (errors.password2) setErrors({ ...errors, password2: '' });
              }}
            />
            {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">User Email:</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
              }`}
              value={educonUser.email}
              onChange={onChangeHandler}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Select Category:</label>
            <input
              list="types"
              name="category"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.category ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
              }`}
              value={educonUser.category}
              onChange={onChangeHandler}
            />
            <datalist id="types">
              <option value="Student" />
              <option value="Admin" />
            </datalist>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;