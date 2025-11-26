import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import useLocalStorage from '../hooks/useLocalStorage';
import MaterialTechCard from '../components/MaterialTechCard';
import MaterialProgressHeader from '../components/MaterialProgressHeader';
import TechnologySearch from '../components/TechnologySearch';
import TechnologyDetails from '../components/TechnologyDetails';
import ApiTechnologyLoader from '../components/ApiTechnologyLoader';
import DataImportExport from '../components/DataImportExport';

function TechnologyList() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateTechnologyStatus = (techId, newStatus) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const openTechnologyDetails = (tech) => {
    setSelectedTechnology(tech);
    setIsModalOpen(true);
  };

  const closeTechnologyDetails = () => {
    setIsModalOpen(false);
    setSelectedTechnology(null);
  };

  const handleTechnologiesLoaded = (apiTechnologies) => {
    const existingIds = new Set(technologies.map(tech => tech.id));
    const newTechnologies = apiTechnologies.filter(tech => !existingIds.has(tech.id));
    
    if (newTechnologies.length > 0) {
      setTechnologies(prev => [...prev, ...newTechnologies]);
      alert(`🎉 Загружено ${newTechnologies.length} новых технологий!`);
    } else {
      alert('ℹ️ Все технологии из API уже есть в вашем списке!');
    }
  };

  const handleImport = (importedTechnologies) => {
    const existingIds = new Set(technologies.map(tech => tech.id));
    const newTechnologies = importedTechnologies.filter(tech => !existingIds.has(tech.id));
    
    if (newTechnologies.length > 0) {
      setTechnologies(prev => [...prev, ...newTechnologies]);
    } else {
      alert('ℹ️ Все технологии из файла уже есть в вашем списке!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок страницы */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          📚 Все технологии
        </Typography>
        <Button
          component={Link}
          to="/add-technology"
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Добавить технологию
        </Button>
      </Box>

      <MaterialProgressHeader technologies={technologies} />
      
      <DataImportExport 
        technologies={technologies}
        onImport={handleImport}
      />
      
      <ApiTechnologyLoader onTechnologiesLoaded={handleTechnologiesLoaded} />
      
      <TechnologySearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultsCount={filteredTechnologies.length}
      />

      {/* Список технологий */}
      {filteredTechnologies.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTechnologies.map(tech => (
            <Grid item xs={12} sm={6} md={4} key={tech.id}>
              <MaterialTechCard
                technology={tech}
                onStatusChange={updateTechnologyStatus}
                onDetailsClick={() => openTechnologyDetails(tech)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {searchQuery ? '😕 Технологии не найдены' : '📝 Технологий пока нет'}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery 
              ? `По запросу "${searchQuery}" ничего не найдено`
              : 'Добавьте технологии вручную или загрузите из API'
            }
          </Typography>
          {!searchQuery && (
            <Button
              component={Link}
              to="/add-technology"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Добавить первую технологию
            </Button>
          )}
        </Paper>
      )}

      <TechnologyDetails
        technology={selectedTechnology}
        isOpen={isModalOpen}
        onClose={closeTechnologyDetails}
        onStatusChange={updateTechnologyStatus}
      />
    </Container>
  );
}

export default TechnologyList;