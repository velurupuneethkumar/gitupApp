import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { generateSubscriptionId,saveSubscription } from '../../services/CourseSubscriptionService';
import { useNavigate } from 'react-router-dom';
import { getStudentStatusByUsername } from '../../services/StudentService';
import { displayCourseById } from '../../services/CourseService';

const CourseSubscription = () => {
    const [subscription, setSubscription] = useState({
        subscriptionId: "",
        installments: 0,
        installmentAmount: 0,
        studentId: "",
        courseId: 0,
        endDate:"",
        subscriptionDate:"",
        status:"",
        totalAmount:0
      });
      const [totalAmount,setTotalAmount] = useState(0)
      const {courseId} = useParams();
      const [newId, setNewId] = useState(0);
      let navigate = useNavigate();

      const showSubcriptionId = () => {
        generateSubscriptionId().then(response => {
          setNewId(response.data);
          // course.courseId=response.data;
        });
      }
      const [coursePrice,setCoursePrice] = useState(0)
      const showCourseAmount = () => {
        displayCourseById(courseId).then(response => {
          setCoursePrice(response.data?.price);
          // course.courseId=response.data;
        });
      }
      useEffect(() => {
        checkStatus();
        showCourseAmount();
      }, []);
      const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        let updatedValue = value;
        
        if (name === "installments") {
            updatedValue = Math.max(0, Math.min(6, Number(value))); // Ensure range 0-6
            calculateInstallmentAmount(updatedValue);
        }
        
        setSubscription(prev => ({ ...prev, [name]: updatedValue }));
      };

      const calculateInstallmentAmount = (installments) => {
        if (installments > 0) {
            setTotalAmount(coursePrice * Math.pow(1.05, installments)); // 5% interest per month
            const installmentAmount = totalAmount / installments;
            setSubscription(prev => ({ ...prev, installmentAmount: installmentAmount.toFixed(2) }));
        } else {
            setSubscription(prev => ({ ...prev, installmentAmount: coursePrice }));
        }
    }
    
      const subscriptionSave = (event) => {
        event.preventDefault();
        subscription.subscriptionId = newId;
        subscription.subscriptionDate = new Date().toISOString().split('T')[0];
        subscription.courseId = courseId;
        subscription.totalAmount = totalAmount;
        // alert(""+course.courseId);
        saveSubscription(subscription).then(response => {
          alert("Student is subscribed to course");
          navigate('/StudentMenu');
        });
      }
    
      const checkStatus = () => {
        getStudentStatusByUsername().then(response => {
          if (response.data === false || 0) {
            alert("Student is not active");
            navigate("/StudentMenu");
          }
          else if(response.data === true){
            showSubcriptionId();
          }
          else{
            alert("Student is not registerd");
            navigate("/StudentMenu");
          }
        })
      }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Subscribe to Course</h2>
                <form onSubmit={subscriptionSave} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Subscription ID:</label>
                        <input type="text" name="subscriptionId" value={newId} readOnly className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Course ID:</label>
                        <input type="text" name="courseId" value={courseId} readOnly className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Installments (0-6):</label>
                        <input type="number" name="installments" value={subscription.installments} onChange={onChangeHandler} min="0" max="6" required className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Installment Amount:</label>
                        <input type="text" name="installmentAmount" value={subscription.installmentAmount} readOnly className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Total Amount after the installments:</label>
                        <input type="number" name="totalAmount" value={totalAmount} readOnly className="w-full p-2 border rounded" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Subscribe</button>
                </form>
            </div>
        </div>
  )
}

export default CourseSubscription