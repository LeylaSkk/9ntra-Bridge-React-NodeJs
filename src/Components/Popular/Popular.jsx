// Modified Popular.jsx
import React, { useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { useCourses } from '../../Context/CourseContext';

const Popular = () => {
  const { courses } = useCourses();
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? courses : courses.slice(0, 6);

  return (
    <div className='popular'> {/* Make sure this class is here */}
      <div className='popular-header'>
        <h1>Discover Our Courses</h1>
        <button 
          className='view-more'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'View More'}
        </button>
      </div>
      <div className='popular-item'>
        {displayedCourses.map((course) => (
          <Item
            key={course.id}
            id={course.id}
            image={course.image}
            name={course.name}
            price={course.price}
          />
        ))}
      </div>
    </div>
);
};

export default Popular;