import { useState } from "react";
import { FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [studentAnchor, setStudentAnchor] = useState(null);
  const [courseAnchor, setCourseAnchor] = useState(null);
  const [paymentAnchor, setPaymentAnchor] = useState(null);

  const openStudent = Boolean(studentAnchor);
  const openCourse = Boolean(courseAnchor);
  const openPayment = Boolean(paymentAnchor);

  const handleMenuClick = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (setAnchor) => {
    setAnchor(null);
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold font-serif">Education consultancy Student</h1>
      <div className="flex space-x-6 text-lg">
        <div className="relative">
          <button onClick={(e) => handleMenuClick(e, setStudentAnchor)} className="px-4 py-2 text-white no-underline hover:bg-gray-700 hover:rounded-md transition flex items-center gap-2">
            Student <FaChevronDown />
          </button>
          <Menu anchorEl={studentAnchor} open={openStudent} onClose={() => handleClose(setStudentAnchor)}>
            <MenuItem onClick={() => handleClose(setStudentAnchor)}>
              <Link to="/student-add" className="text-black no-underline">Student Addition</Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose(setStudentAnchor)}>
              <Link to="/student-detail" className="text-black no-underline">Student Detail</Link>
            </MenuItem>
          </Menu>
        </div>
        
        <div className="relative">
          <button onClick={(e) => handleMenuClick(e, setCourseAnchor)} className="px-4 py-2 text-white no-underline hover:bg-gray-700 hover:rounded-md transition flex items-center gap-2">
            Course <FaChevronDown />
          </button>
          <Menu anchorEl={courseAnchor} open={openCourse} onClose={() => handleClose(setCourseAnchor)}>
            <MenuItem onClick={() => handleClose(setCourseAnchor)}>
              <Link to="/student-course-list" className="text-black no-underline">Course List</Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose(setCourseAnchor)}>
              <Link to="/course-subscription" className="text-black no-underline">Course Subscription</Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose(setCourseAnchor)}>
              <Link to="/subscription-list" className="text-black no-underline">Subscription List</Link>
            </MenuItem>
          </Menu>
        </div>
        
        <div className="relative">
          <button onClick={(e) => handleMenuClick(e, setPaymentAnchor)} className="px-4 py-2 text-white no-underline hover:bg-gray-700 hover:rounded-md transition flex items-center gap-2">
            Payment <FaChevronDown />
          </button>
          <Menu anchorEl={paymentAnchor} open={openPayment} onClose={() => handleClose(setPaymentAnchor)}>
            <MenuItem onClick={() => handleClose(setPaymentAnchor)}>
              <Link to="/pay-course" className="text-black no-underline">Pay Course</Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose(setPaymentAnchor)}>
              <Link to="/payment-report" className="text-black no-underline">Payment Report</Link>
            </MenuItem>
          </Menu>
        </div>
        
        <Link to="/" className="px-4 py-2 flex items-center text-white no-underline hover:bg-red-700 hover:rounded-md transition">
          <FaSignOutAlt className="mr-2" /> Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
