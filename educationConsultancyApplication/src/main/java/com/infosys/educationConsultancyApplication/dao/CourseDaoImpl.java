
package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.educationConsultancyApplication.bean.Course;
@Service
@Repository
public class CourseDaoImpl implements CourseDao {

	@Autowired
	private CourseRepository repository;
	@Override
	public void save(Course course) {
		// TODO Auto-generated method stub
		repository.save(course);
	}

	@Override
	public Course getCourseById(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	public List<Course> getAllCourse() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public void deleteCourseById(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);

	}

	@Override
	public List<Course> getCourseByTechnology(String technology) {
		// TODO Auto-generated method stub
		return repository.getCoursesByTechnology(technology);
	}

	@Override
	public Long generateNewCourseId() {
		// TODO Auto-generated method stub
		Long id = repository.getMaxCourseId();
		if(id==null) {
			id=100001L;
		}
		else {
			id++;
		}
		return id;
	}

}
