import React from 'react';
import Hero from '../Components/Hero/Hero';
//import Item from '../Components/Item/Item';
//import all_courses from '../Components/Assets/course';
import Popular from '../Components/Popular/Popular';
import Contact from '../Components/Contact/Contact'

const Home = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Contact />
    </div>
  );
};

export default Home;

/*<div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Discover Our Courses</h1>
          <button className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
            View More
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {all_courses.map((course) => (
            <Item
              key={course.id}
              image={course.image}
              name={course.name}
              price={course.price}
            />
          ))}
        </div>
      </div>*/