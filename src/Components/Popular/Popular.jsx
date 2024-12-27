import React from 'react';
import './Popular.css';
import all_courses from '../Assets/course';
import Item from '../Item/Item';

const Popular = () => {
  return (
    <div className='popular'>
      <div className='popular-header'>
        <h1>Discover Our Courses</h1>
        <button className='view-more'>View More</button>
      </div>
      <div className='popular-item'>
        {all_courses.map((course) => (
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