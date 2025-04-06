import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from "./components/LoginComponent/LoginPage"
import StudentMenu from './components/LoginComponent/StudentMenu';
import AdminMenu from './components/LoginComponent/AdminMenu';
import RegisterUser from './components/LoginComponent/RegisterUser';
import CourseAddition from './components/CourseComponent/CourseAddition';
import CourseList from './components/CourseComponent/CourseList';
import CourseUpdate from './components/CourseComponent/CourseUpdate';
import StudentCourseList from './components/CourseComponent/StudentCourseList';
import StudentAddition from './components/StudentComponent/StudentAddition';
import StudentList from './components/StudentComponent/StudentList';
import StudentDetail from './components/StudentComponent/StudentDetail';
import StudentUpdate from './components/StudentComponent/StudentUpdate';
import StudentCurrent from './components/StudentComponent/StudentCurrent';
import CourseSubscription from './components/SubscriptionComponent/CourseSubscription';
import { useState } from 'react';
import CourseSubscriptionList from './components/SubscriptionComponent/CourseSubscriptionList';
import SubscriptionList from './components/SubscriptionComponent/SubscriptionList';
import SubscriptionUpdate from './components/SubscriptionComponent/SubscriptionUpdate';
import CurrentSubscriptionList from './components/SubscriptionComponent/CurrentSubscriptionList';
import Payment from './components/PaymentComponent/Payment';
import PaymentList from './components/PaymentComponent/PaymentList';
import StudentPaymentList from './components/PaymentComponent/StudentPaymentList';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/Register" element={<RegisterUser></RegisterUser>}></Route>
          <Route path="/AdminMenu" element={<AdminMenu></AdminMenu>}></Route>
          <Route path="/StudentMenu" element={<StudentMenu></StudentMenu>}></Route>
          <Route path='/course-add' element={<CourseAddition></CourseAddition>}></Route>
          <Route path='/course-list' element={<CourseList></CourseList>}></Route>
          <Route path="/update-course/:courseId" element={<CourseUpdate></CourseUpdate>}></Route>
          <Route path='/student-course-list' element={<StudentCourseList/>}></Route>
          <Route path='/student-add' element={<StudentAddition></StudentAddition>}></Route>
          <Route path='/student-list' element={<StudentList></StudentList>}></Route>
          <Route path='/student-detail' element={<StudentDetail></StudentDetail>}></Route>
          <Route path='/student-update/:studentId' element={<StudentUpdate></StudentUpdate>}></Route>
          <Route path='/current-student' element={<StudentCurrent></StudentCurrent>}></Route>
          <Route path='/course-subscription/:courseId' element={<CourseSubscription></CourseSubscription>}></Route>
          <Route path='/course-subscription-list' element={<CourseSubscriptionList></CourseSubscriptionList>}></Route>
          <Route path='/course-subscriptions' element={<SubscriptionList></SubscriptionList>}></Route>
          <Route path='/subscription-update/:subscriptionId' element={<SubscriptionUpdate></SubscriptionUpdate>}></Route>
          <Route path='/current-Subscription' element={<CurrentSubscriptionList></CurrentSubscriptionList>}></Route>
          <Route path='/payment' element={<Payment></Payment>}></Route>
          <Route path='/payment-List' element={<PaymentList></PaymentList>}></Route>
          <Route path='/studentpayment-List' element={<StudentPaymentList></StudentPaymentList>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;