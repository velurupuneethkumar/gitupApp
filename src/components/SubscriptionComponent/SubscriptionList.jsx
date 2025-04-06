import React, { useEffect, useState } from 'react';
import { getAllSubscriptions } from '../../services/CourseSubscriptionService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SubscriptionList = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getAllSubscriptions()
      .then(response => setSubscriptions(response.data))
      .catch(error => console.error("Error fetching subscriptions:", error));
  }, []);

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Course Subscriptions</h2>

      {subscriptions.length === 0 ? (
        <p className="text-center text-gray-600">No subscriptions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Subscription ID</th>
                <th className="border border-gray-300 px-4 py-2">Course ID</th>
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">Installments</th>
                <th className="border border-gray-300 px-4 py-2">Installment Amount (₹)</th>
                <th className="border border-gray-300 px-4 py-2">Total Amount (₹)</th>
                <th className="border border-gray-300 px-4 py-2">Subscription Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.subscriptionId} className="text-center border-t hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{subscription.subscriptionId}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.courseId}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.studentId}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.installments}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.installmentAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.totalAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(subscription.subscriptionDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/subscription-update/${subscription.subscriptionId}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
