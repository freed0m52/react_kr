import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import EnhancedTechnologyForm from '../components/EnhancedTechnologyForm';
import '../App.css';

function AddTechnology() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', []);
  const navigate = useNavigate();

  const handleSave = (formData) => {
    const newTechnology = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setTechnologies(prev => [...prev, newTechnology]);
    
    alert('✅ Технология успешно добавлена!');
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>➕ Добавить технологию</h1>
      </div>

      <EnhancedTechnologyForm
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddTechnology;