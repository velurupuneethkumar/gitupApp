
package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.educationConsultancyApplication.bean.Student;

@Service
@Repository
public class StudentDaoImpl implements StudentDao {

	@Autowired
	private StudentRepository repository;
	
	@Override
	public void save(Student student) {
		// TODO Auto-generated method stub
		repository.save(student);

	}

	@Override
	public Student getStudentById(String id) {
		// TODO Auto-generated method stub		
		return repository.findById(id).get();
	}

	@Override
	public List<Student> getAllStudents() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}


	@Override
	public String generateRegistration() {
		// TODO Auto-generated method stub
		Long id = 0L;
		String val = repository.getMaxRegistration();
		if(val == null)
			id=100001L;
		else { 
			id=Long.parseLong(val.substring(1));
			id++;
		}
		String newId = "S"+id;
		return newId;
	}

	@Override
	public List<Student> getCurrentStudents() {
		// TODO Auto-generated method stub
		return repository.getCurrentStudents();
	}
	
	@Override
	public String getStudentStatusByUsername(String username) {
		return repository.getStudentStatusByUsername(username);
	}

	@Override
	public Student getStudentByUsername(String username) {
		// TODO Auto-generated method stub
		return repository.getStudentByUsername(username);
	}
	
	

}
