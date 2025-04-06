import React, { useState } from 'react'
import { saveStudent, generateRegistration,getStudentStatusByUsername } from "../../services/StudentService"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const StudentAddition = () => {
  const [student, setStudent] = useState({
    registrationNumber: 0,
    studentName: "",
    address: "",
    mobile: "",
    studentLevel: "",
  });
  const [newId, setNewId] = useState(0);
  let navigate = useNavigate();
  const showStudentId = () => {
    generateRegistration().then(response => {
      setNewId(response.data);
      // course.courseId=response.data;
    });
  }
  useEffect(() => {
    checkStatus();
  }, []);
  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setStudent(values => ({ ...values, [name]: value }));
  };

  const studentSave = (event) => {
    event.preventDefault();
    student.registrationNumber = newId;
    // alert(""+course.courseId);
    saveStudent(student).then(response => {
      alert("New student is saved");
      navigate('/StudentMenu');
    });
  }

  const checkStatus = () => {
    getStudentStatusByUsername().then(response => {
      if (response.data === true || response.data === false) {
        alert("Student is already registered...");
        navigate("/StudentMenu");
      }
      else {
        showStudentId();
      }
    })
  }

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-12 offset-md-3 offset-md-3">
            <div className="card-body">
              <h2 className="text-center"><u>New Student Addition</u></h2>
              <br />
              <div className="form-group">
                <label> studentName: </label>
                <input placeholder="studentName" name="studentName" className="form-control"
                  value={student.studentName} onChange={onChangeHandler} />
              </div>
              <div className="form-group">
                <label>address: </label>
                <input placeholder="address" name="address" className="form-control"
                  value={student.address} onChange={onChangeHandler} />
              </div>
              <div className="form-group">
                <label>studentLevel: </label>
                <input placeholder="studentLevel" name="studentLevel" className="form-control"
                  value={student.studentLevel} onChange={onChangeHandler} />
              </div>
              <div className="form-group">
                <label> mobile: </label>
                <input placeholder="mobile" name="mobile" className="form-control"
                  value={student.mobile} onChange={onChangeHandler} />
              </div>

              <button className="btn btn-success" onClick={studentSave}>Save</button>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAddition