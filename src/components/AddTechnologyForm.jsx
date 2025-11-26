import { useState } from 'react';
import './AddTechnologyForm.css';

function AddTechnologyForm({ onAddTechnology }) {
  // СОСТОЯНИЕ ДЛЯ ФОРМЫ - контролируемые поля!
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started'
  });

  // Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    // Проверяем, что заголовок не пустой
    if (!formData.title.trim()) {
      alert('Введите название технологии!');
      return;
    }

    // Создаем новую технологию
    const newTechnology = {
      id: Date.now(), // Простой способ получить уникальный ID
      title: formData.title,
      description: formData.description,
      status: formData.status
    };

    // Вызываем функцию из props для добавления
    onAddTechnology(newTechnology);

    // Очищаем форму после добавления
    setFormData({
      title: '',
      description: '',
      status: 'not-started'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-technology-form">
      <h3>➕ Добавить новую технологию</h3>
      
      <div className="form-group">
        <label>Название технологии *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Например: React Hooks"
          required
        />
      </div>

      <div className="form-group">
        <label>Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Что нужно изучить?"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Начальный статус</label>
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
        >
          <option value="not-started">⏳ Не начато</option>
          <option value="in-progress">🔄 В процессе</option>
          <option value="completed">✅ Изучено</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Добавить технологию
      </button>
    </form>
  );
}

export default AddTechnologyForm;