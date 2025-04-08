
import React, { useState, useEffect } from 'react';
import { saveStudent, generateRegistration, getStudentStatusByUsername } from "../../services/StudentService";
import { useNavigate } from 'react-router-dom';

const StudentAddition = () => {
  const [student, setStudent] = useState({
    registrationNumber: 0,
    studentName: "",
    address: "",
    mobile: "",
    studentLevel: "",
  });

  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    checkStatus();
  }, []);

  const showStudentId = () => {
    generateRegistration().then((response) => {
      setNewId(response.data);
    });
  };

  const checkStatus = () => {
    getStudentStatusByUsername().then((response) => {
      if (response.data === true || response.data === false) {
        alert("Student is already registered...");
        navigate("/StudentMenu");
      } else {
        showStudentId();
      }
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!student.studentName.trim()) newErrors.studentName = "Student name is required";
    if (!student.address.trim()) newErrors.address = "Address is required";
    if (!student.studentLevel.trim()) newErrors.studentLevel = "Student level is required";
    if (!student.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(student.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
    return newErrors;
  };

  const studentSave = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedStudent = { ...student, registrationNumber: newId };
    saveStudent(updatedStudent).then(() => {
      alert("New student is saved");
      navigate('/StudentMenu');
    }).catch(() => {
      alert("Error saving student. Try again.");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-blue-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 underline">New Student Addition</h2>
        <form onSubmit={studentSave} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              placeholder="Enter student name"
              value={student.studentName}
              onChange={onChangeHandler}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.studentName ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={student.address}
              onChange={onChangeHandler}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.address ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Student Level</label>
            <input
              type="text"
              name="studentLevel"
              placeholder="Enter student level"
              value={student.studentLevel}
              onChange={onChangeHandler}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.studentLevel ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.studentLevel && <p className="text-red-500 text-sm">{errors.studentLevel}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={student.mobile}
              onChange={onChangeHandler}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.mobile ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAddition;
