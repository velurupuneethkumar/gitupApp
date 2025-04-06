
package com.infosys.educationConsultancyApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@ToString
public class Student {
	
	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Id
	private String registrationNumber;
	private String username;
	private String studentName;
	private String email;
	private String address;
	private String studentLevel;
	private String mobile;
	private String status;
	
	public Student(String registrationNumber, String username, String studentName, String email, String address,
			String studentLevel, String mobile, String status) {
		super();
		this.registrationNumber = registrationNumber;
		this.username = username;
		this.studentName = studentName;
		this.email = email;
		this.address = address;
		this.studentLevel = studentLevel;
		this.mobile = mobile;
		this.status = status;
	}
	
	public String getRegistrationNumber() {
		return registrationNumber;
	}
	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}
	
	
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Student [registrationNumber=" + registrationNumber + ", username=" + username + ", studentName="
				+ studentName + ", email=" + email + ", address=" + address + ", studentLevel=" + studentLevel
				+ ", mobile=" + mobile + ", status=" + status + "]";
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getStudentLevel() {
		return studentLevel;
	}
	public void setStudentLevel(String studentLevel) {
		this.studentLevel = studentLevel;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
}
