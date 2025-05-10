import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../services/loginService';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error on input change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        return newErrors;
    };

    const checkLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await validateUser(formData.username, formData.password);
            const role = String(response.data);
            if (role === "Admin") navigate('/AdminMenu');
            else if (role === "Student") navigate('/StudentMenu');
            else alert("Wrong Userid/Password");
        } catch (err) {
            alert("Server error or invalid credentials");
        }
    };

    const registerNewUser = () => {
        navigate('/Register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-blue-600 underline mb-6">Login Page</h2>
                <form onSubmit={checkLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">User Name:</label>
                        <input
                            type="text"
                            name="username"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.username ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
                            }`}
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
                            }`}
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                        onClick={registerNewUser}
                    >
                        Register New User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;