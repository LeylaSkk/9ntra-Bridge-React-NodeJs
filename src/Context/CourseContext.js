import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Add new course
  const addCourse = async (courseData) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      const newCourse = await response.json();
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Edit course
  const editCourse = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const updatedCourse = await response.json();
      setCourses(courses.map(course => 
        course.id === id ? updatedCourse : course
      ));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
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