
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCourseId, saveCourse } from '../../services/CourseService';

const CourseAddition = () => {
  const [course, setCourse] = useState({
    courseId: 0,
    courseName: "",
    hours: 0,
    price: 0.0,
    technology: ""
  });

  const [newId, setNewId] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const showCourseId = () => {
    generateCourseId().then(response => {
      setNewId(response.data);
    });
  };

  useEffect(() => {
    showCourseId();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCourse(values => ({ ...values, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!course.courseName.trim()) formErrors.courseName = "Course name is required";
    if (!course.technology.trim()) formErrors.technology = "Technology is required";
    if (!course.hours || course.hours <= 0) formErrors.hours = "Hours must be greater than 0";
    if (!course.price || course.price <= 0) formErrors.price = "Price must be greater than 0";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const courseSave = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    course.courseId = newId;
    saveCourse(course).then(() => {
      alert("New Course is saved");
      navigate('/AdminMenu');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6 underline">New Course Addition</h2>
        <form onSubmit={courseSave} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Course Name:</label>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={course.courseName}
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded ${errors.courseName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
            />
            {errors.courseName && <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Hours:</label>
            <input
              type="number"
              name="hours"
              placeholder="Hours"
              value={course.hours}
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded ${errors.hours ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
            />
            {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              placeholder="Price"
              value={course.price}
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Technology:</label>
            <input
              type="text"
              name="technology"
              placeholder="Technology"
              value={course.technology}
              onChange={onChangeHandler}
              className={`w-full border px-3 py-2 rounded ${errors.technology ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring`}
            />
            {errors.technology && <p className="text-red-500 text-sm mt-1">{errors.technology}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseAddition;
