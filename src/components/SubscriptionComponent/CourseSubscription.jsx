import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  generateSubscriptionId,
  saveSubscription,
  getStatusByCourseIdStudentId
} from '../../services/CourseSubscriptionService';
import { getStudentStatusByUsername } from '../../services/StudentService';
import { displayCourseById } from '../../services/CourseService';

const CourseSubscription = () => {
  const [subscription, setSubscription] = useState({
    subscriptionId: '',
    installments: 0,
    installmentAmount: 0,
    studentId: '',
    courseId: 0,
    endDate: '',
    subscriptionDate: '',
    status: '',
    totalAmount: 0
  });

  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState('');
  const [newId, setNewId] = useState(0);
  const [coursePrice, setCoursePrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    checkStatus();
    showCourseAmount();
    checkSubscription();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === 'installments') {
      const numVal = Number(value);
      setSubscription((prev) => ({ ...prev, [name]: numVal }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
  
      if (numVal >= 1 && numVal <= 6) {
        calculateInstallmentAmount(numVal);
      }
    } else {
      setSubscription((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const calculateInstallmentAmount = (installments) => {
    if (installments > 1) {
      const total = coursePrice * Math.pow(1.05, installments);
      const roundedTotal = Math.round(total);
      const roundedInstallment = Math.round(roundedTotal / installments);
  
      setTotalAmount(roundedTotal);
      setSubscription((prev) => ({
        ...prev,
        installmentAmount: roundedInstallment
      }));
    } else {
      const roundedCoursePrice = Math.round(coursePrice);
      setTotalAmount(roundedCoursePrice);
      setSubscription((prev) => ({
        ...prev,
        installmentAmount: roundedCoursePrice
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!subscription.subscriptionDate) {
      formErrors.subscriptionDate = 'Subscription date is required';
    }

    if (!subscription.installments || subscription.installments < 1 || subscription.installments > 6) {
      formErrors.installments = 'Installments must be between 1 and 6';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const subscriptionSave = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    subscription.subscriptionId = newId;
    subscription.courseId = courseId;
    subscription.totalAmount = parseInt(totalAmount);

    saveSubscription(subscription).then(() => {
      alert('Student is subscribed to course');
      navigate('/StudentMenu');
    });
  };

  const showSubcriptionId = () => {
    generateSubscriptionId().then((res) => setNewId(res.data));
  };

  const showCourseAmount = () => {
    displayCourseById(courseId).then((res) => {
      setCoursePrice(res.data?.price);
      setCourseName(res.data?.courseName);
    });
  };

  const checkStatus = () => {
    getStudentStatusByUsername().then((res) => {
      if (res.data === true) showSubcriptionId();
      else {
        alert(res.data === false ? 'Student is not active' : 'Student is not registered');
        navigate('/StudentMenu');
      }
    });
  };

  const checkSubscription = () => {
    getStatusByCourseIdStudentId(courseId).then((res) => {
      if (['complete', 'active', 'expired'].includes(res.data)) {
        alert('Course already registered...');
        navigate('/StudentMenu');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-blue-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 underline">Subscribe to Course</h2>
        <form onSubmit={subscriptionSave} className="space-y-5">
          <Input label="Subscription ID" value={newId} readOnly />
          <Input label="Course Name" value={courseName} readOnly />
          <Input
            label="Subscription Date"
            name="subscriptionDate"
            type="date"
            value={subscription.subscriptionDate}
            onChange={onChangeHandler}
            error={errors.subscriptionDate}
          />
          <Input
            label="Installments (1-6)"
            name="installments"
            type="number"
            value={subscription.installments}
            onChange={onChangeHandler}
            error={errors.installments}
          />
          <Input label="Installment Amount" value={subscription.installmentAmount} readOnly />
          <Input label="Total Amount" value={totalAmount} readOnly />

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = 'text', readOnly = false, error = '' }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full border px-4 py-2 rounded-lg ${
        readOnly ? 'bg-gray-100' : ''
      } ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default CourseSubscription;