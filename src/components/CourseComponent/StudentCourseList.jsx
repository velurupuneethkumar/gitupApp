import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../LoginView.css';
import { deleteCourseById, displayAllCourses } from '../../services/CourseService';

const StudentCourseList = () => {

    const [courses, setCourses] = useState([]);
    let navigate = useNavigate();

    const showCourses = () => {

        displayAllCourses().then(response => {
            setCourses(response.data);
            // course.courseId=response.data;
        });
    }


    const returnBack = () => {
        navigate('/StudentMenu')
    }
    
    const registerCourse = () => {
        alert('hello')
    }
    useEffect(() => {
        showCourses();
    }, []);

    return (
        <div className="text-center">
            <div>
                <h2 className="text-center">Student Course List</h2>
                <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Course Id</th>
                                <th> Course Name</th>
                                <th> Course Hours </th>
                                <th> Course Price </th>
                                <th> Technology </th>
                                <th> Register Course </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map((course, index) => (
                                    <tr key={course.courseId}>
                                        <td>{course.courseId}</td>
                                        <td>{course.courseName}</td>
                                        <td>{course.hours}</td>
                                        <td>{course.price}</td>
                                        <td>{course.technology}</td>
                                        <td><button style={{ marginLeft: "10px" }} onClick={registerCourse} className="btn btn-danger">Register</button></td>
                                    </tr>
                                )
                                )

                            }
                        </tbody>
                    </table>
                    <br />
                    <button style={{ marginLeft: "10px" }} onClick={() => returnBack()} className="btn btn-success">Return</button>
                </div>
            </div>
        </div>

    )

}
export default StudentCourseList;