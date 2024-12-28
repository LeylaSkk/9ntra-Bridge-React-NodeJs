import React, { createContext, useContext, useState, useEffect } from 'react';
import all_courses from '../Components/Assets/course';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // Load courses from localStorage or default courses if none exist
  const fetchCourses = () => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // If no courses in localStorage, use default courses from course.js
      setCourses(all_courses);
      localStorage.setItem('courses', JSON.stringify(all_courses));
    }
  };

  // Add new course
  const addCourse = (courseData) => {
    const newCourses = [...courses, courseData];
    setCourses(newCourses);
    localStorage.setItem('courses', JSON.stringify(newCourses));
  };

  // Edit course
  const editCourse = (id, updatedData) => {
    const updatedCourses = courses.map(course => 
      course.id === id ? { ...course, ...updatedData } : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  // Delete course
  const deleteCourse = (id) => {
    const filteredCourses = courses.filter(course => course.id !== id);
    setCourses(filteredCourses);
    localStorage.setItem('courses', JSON.stringify(filteredCourses));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ 
      courses, 
      addCourse, 
      editCourse, 
      deleteCourse 
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);