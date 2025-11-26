import './TechnologyCard.css';

function TechnologyCard({ title, description, status, onStatusChange, onDetailsClick }) {
  return (
    <div 
      className={`technology-card status-${status}`}
      onClick={onStatusChange}
      style={{ cursor: 'pointer' }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-indicator">
        {status === 'completed' ? '✅ Изучено' : 
         status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}
      </div>
      <div className="card-actions">
        <span className="click-hint">👆 Кликни чтобы изменить статус</span>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем всплытие, чтобы не сработал onStatusChange
            onDetailsClick();
          }} 
          className="details-btn"
        >
          📖 Подробнее
        </button>
      </div>
    </div>
  );
}

export default TechnologyCard;