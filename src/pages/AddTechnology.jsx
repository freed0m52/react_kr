import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import '../App.css';

function AddTechnology() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', []);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Введите название технологии!');
      return;
    }

    const newTechnology = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toLocaleDateString('ru-RU')
    };

    setTechnologies(prev => [...prev, newTechnology]);
    
    // Очищаем форму
    setFormData({
      title: '',
      description: '',
      status: 'not-started'
    });
    
    // Показываем сообщение и переходим на страницу технологий
    alert(`🎉 Технология "${newTechnology.title}" успешно добавлена!`);
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку технологий
        </Link>
        <h1>➕ Добавить новую технологию</h1>
        <p className="page-subtitle">Заполните информацию о технологии, которую хотите изучить</p>
      </div>

      <div className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="add-technology-form">
            
            <div className="form-section">
              <h3>📝 Основная информация</h3>
              
              <div className="form-group">
                <label>Название технологии *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Например: React Hooks, Node.js, MongoDB..."
                  required
                  className="form-input"
                />
                <small>Укажите четкое и понятное название</small>
              </div>

              <div className="form-group">
                <label>Описание технологии</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Опишите что включает изучение этой технологии, какие темы нужно охватить..."
                  rows="5"
                  className="form-textarea"
                />
                <small>Необязательное поле, но поможет лучше понять scope</small>
              </div>
            </div>

            <div className="form-section">
              <h3>🎯 Статус изучения</h3>
              
              <div className="form-group">
                <label>Текущий прогресс</label>
                <div className="status-options">
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="not-started"
                      checked={formData.status === 'not-started'}
                      onChange={handleChange}
                    />
                    <span className="status-indicator not-started">
                      ⏳ Не начато
                    </span>
                  </label>
                  
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="in-progress"
                      checked={formData.status === 'in-progress'}
                      onChange={handleChange}
                    />
                    <span className="status-indicator in-progress">
                      🔄 В процессе
                    </span>
                  </label>
                  
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      checked={formData.status === 'completed'}
                      onChange={handleChange}
                    />
                    <span className="status-indicator completed">
                      ✅ Изучено
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>💡 Советы</h3>
              <div className="tips">
                <div className="tip">
                  <strong>🎯 Будьте конкретны</strong>
                  <p>Вместо "Изучить JavaScript" лучше "Освоить асинхронное программирование в JS"</p>
                </div>
                <div className="tip">
                  <strong>📚 Разбивайте на части</strong>
                  <p>Сложные технологии лучше разбивать на подтемы</p>
                </div>
                <div className="tip">
                  <strong>⏱️ Устанавливайте реалистичные сроки</strong>
                  <p>Начните с небольших, достижимых целей</p>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-large">
                💾 Сохранить технологию
              </button>
              <Link to="/technologies" className="btn btn-secondary">
                ❌ Отмена
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTechnology;