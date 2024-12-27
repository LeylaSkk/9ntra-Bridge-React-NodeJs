import React, { useState } from 'react';
import all_courses from '../Components/Assets/course';
import { Pencil, Trash2, Plus } from 'lucide-react';
import './CSS/AdminDashboard.css';

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
      setCourses(prev => prev.map(course => 
        course.id === editingCourse.id ? { ...formData, id: course.id } : course
      ));
    } else {
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
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Course Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-button custom-button"
        >
          <Plus size={20} />
          Add New Course
        </button>
      </div>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-content">
              <div className="course-image">
                <img
                  src={course.image}
                  alt={course.name}
                  className="course-img"
                />
              </div>
              <div className="course-details">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-price">{course.price} DT/Month</p>
              </div>
            </div>
            <div className="course-actions">
              <button
                onClick={() => handleEdit(course)}
                className="edit-button custom-button"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="delete-button custom-button"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="modal-title">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price (DT/Month)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Course Image</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-button custom-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button custom-button"
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