import Modal from './Modal';
import ProgressBar from './ProgressBar';

function TechnologyDetails({ technology, isOpen, onClose, onStatusChange }) {
  if (!technology) return null;

  const handleStatusChange = (newStatus) => {
    onStatusChange(technology.id, newStatus);
  };

  // Прогресс для текущей технологии (условный)
  const getTechnologyProgress = () => {
    switch (technology.status) {
      case 'completed': return 100;
      case 'in-progress': return 50;
      case 'not-started': return 0;
      default: return 0;
    }
  };

  const progress = getTechnologyProgress();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={technology.title}>
      <div className="technology-details">
        <div className="detail-section">
          <h3>📝 Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>📊 Прогресс изучения</h3>
          <ProgressBar
            progress={progress}
            height={20}
            color={
              technology.status === 'completed' ? '#4CAF50' :
              technology.status === 'in-progress' ? '#FF9800' : '#F44336'
            }
            animated={true}
            showPercentage={true}
          />
        </div>

        <div className="detail-section">
          <h3>🎯 Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => handleStatusChange('not-started')}
              className={technology.status === 'not-started' ? 'active' : ''}
            >
              ⏳ Не начато
            </button>
            <button
              onClick={() => handleStatusChange('in-progress')}
              className={technology.status === 'in-progress' ? 'active' : ''}
            >
              🔄 В процессе
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={technology.status === 'completed' ? 'active' : ''}
            >
              ✅ Завершено
            </button>
          </div>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>📓 Мои заметки</h3>
            <p>{technology.notes}</p>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose} className="close-modal-btn">
            Закрыть
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default TechnologyDetails;