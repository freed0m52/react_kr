import { useState } from 'react';
import TechnologyService from '../services/technologyService';
import './ApiTechnologyLoader.css';

function ApiTechnologyLoader({ onTechnologiesLoaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadFromApi = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await TechnologyService.fetchTechnologies();
      
      if (result.success) {
        // Преобразуем данные из API в наш формат
        const formattedTechnologies = result.data.map(tech => ({
          id: tech.id,
          title: tech.title,
          description: tech.description,
          status: tech.status || 'not-started',
          category: tech.category,
          difficulty: tech.difficulty
        }));
        
        onTechnologiesLoaded(formattedTechnologies);
      }
    } catch (err) {
      setError('Не удалось загрузить технологии из API');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-loader">
      <div className="api-loader-header">
        <h3>🌐 Загрузить технологии из API</h3>
        <p>Добавьте предопределенный набор популярных технологий</p>
      </div>
      
      <button 
        onClick={handleLoadFromApi}
        disabled={loading}
        className={`load-btn ${loading ? 'loading' : ''}`}
      >
        {loading ? '⏳ Загрузка...' : '🚀 Загрузить технологии'}
      </button>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      
      <div className="api-features">
        <h4>Что будет загружено:</h4>
        <ul>
          <li>✅ React - Frontend библиотека</li>
          <li>✅ Node.js - Backend платформа</li>
          <li>✅ TypeScript - Типизированный JavaScript</li>
          <li>✅ MongoDB - NoSQL база данных</li>
          <li>✅ Docker - Контейнеризация</li>
        </ul>
      </div>
    </div>
  );
}

export default ApiTechnologyLoader;