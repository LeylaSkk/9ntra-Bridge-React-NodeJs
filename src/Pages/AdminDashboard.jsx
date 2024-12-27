import React, { useState } from 'react';
import all_courses from '../Components/Assets/course';
import { Pencil, Trash2, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [courses, setCourses] = useState(all_courses);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      // Update existing course
      setCourses(prev => prev.map(course => 
        course.id === editingCourse.id ? { ...formData, id: course.id } : course
      ));
    } else {
      // Add new course
      setCourses(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData({ id: '', name: '', price: '', image: null });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Plus size={20} />
          Add New Course
        </button>
      </div>

      {/* Course List */}
      <div className="grid gap-4">
        {courses.map(course => (
          <div key={course.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img
                src={course.image}
                alt={course.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{course.name}</h3>
                <p className="text-gray-600">{course.price} DT/Month</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(course)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price (DT/Month)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Course Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingCourse ? 'Update' : 'Add'} Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;