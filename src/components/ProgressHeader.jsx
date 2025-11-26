import './ProgressHeader.css';
import ProgressBar from './ProgressBar'; // Импортируем наш новый ProgressBar

function ProgressHeader({ technologies }) {
  // Считаем статистику на основе переданных технологий
  const totalCount = technologies.length;
  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressCount = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>📈 Общий прогресс изучения</h2>
      
      {/* Основной прогресс-бар */}
      <ProgressBar
        progress={progressPercentage}
        label="Общий прогресс"
        color="#4CAF50"
        height={25}
        animated={true}
        showPercentage={true}
      />
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number total">{totalCount}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-number">{completedCount}</div>
          <div className="stat-label">Изучено</div>
          <ProgressBar
            progress={totalCount > 0 ? (completedCount / totalCount) * 100 : 0}
            height={8}
            color="#4CAF50"
            showPercentage={false}
          />
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-number">{inProgressCount}</div>
          <div className="stat-label">В процессе</div>
          <ProgressBar
            progress={totalCount > 0 ? (inProgressCount / totalCount) * 100 : 0}
            height={8}
            color="#FF9800"
            showPercentage={false}
          />
        </div>
        
        <div className="stat-card not-started">
          <div className="stat-number">{notStartedCount}</div>
          <div className="stat-label">Не начато</div>
          <ProgressBar
            progress={totalCount > 0 ? (notStartedCount / totalCount) * 100 : 0}
            height={8}
            color="#F44336"
            showPercentage={false}
          />
        </div>
      </div>
      
      <div className="progress-text">
        {progressPercentage === 100 ? '🎉 Все технологии изучены!' : 
         progressPercentage >= 75 ? '🔥 Отличный прогресс! Так держать!' :
         progressPercentage >= 50 ? '💪 Хорошие темпы! Продолжайте в том же духе!' :
         progressPercentage >= 25 ? '📚 Вы на правильном пути!' :
         '🚀 Начинаем наше путешествие в мир технологий!'}
      </div>
    </div>
  );
}

export default ProgressHeader;