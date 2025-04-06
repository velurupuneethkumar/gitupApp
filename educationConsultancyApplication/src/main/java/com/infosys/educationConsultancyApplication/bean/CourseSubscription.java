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
public class CourseSubscription {
	@Id
	private String subscriptionId;//auto generated
	private Integer installments;
	private Double installmentAmount;//price of the course
	private String studentId;//student id
	private Long courseId;//auto assigned
	private String endDate;//calculate assignment from system date
	private String subscriptionDate;
	private String status;//active //expire //completed
	public CourseSubscription() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CourseSubscription(Integer installments, Double installmentAmount, String studentId, String subscriptionId,
			Long courseId, String endDate, String subscriptionDate, String status) {
		super();
		this.installments = installments;
		this.installmentAmount = installmentAmount;
		this.studentId = studentId;
		this.subscriptionId = subscriptionId;
		this.courseId = courseId;
		this.endDate = endDate;
		this.subscriptionDate = subscriptionDate;
		this.status = status;
	}
	
	public Integer getInstallments() {
		return installments;
	}
	public void setInstallments(Integer installments) {
		this.installments = installments;
	}
	public Double getInstallmentAmount() {
		return installmentAmount;
	}
	public void setInstallmentAmount(Double installmentAmount) {
		this.installmentAmount = installmentAmount;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getSubscriptionId() {
		return subscriptionId;
	}
	public void setSubscriptionId(String subscriptionId) {
		this.subscriptionId = subscriptionId;
	}
	public Long getCourseId() {
		return courseId;
	}
	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getSubscriptionDate() {
		return subscriptionDate;
	}
	public void setSubscriptionDate(String subscriptionDate) {
		this.subscriptionDate = subscriptionDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Subscription [installments=" + installments + ", installmentAmount=" + installmentAmount
				+ ", studentId=" + studentId + ", subscriptionId=" + subscriptionId + ", courseId=" + courseId
				+ ", endDate=" + endDate + ", subscriptionDate=" + subscriptionDate + ", status=" + status + "]";
	}
}