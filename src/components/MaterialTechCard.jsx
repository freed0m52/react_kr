import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  PlayCircle as PlayCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

function MaterialTechCard({ technology, onStatusChange, onDetailsClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon />;
      case 'in-progress': return <PlayCircleIcon />;
      default: return <ScheduleIcon />;
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {technology.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            label={technology.category || 'other'}
            variant="outlined"
            size="small"
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
            icon={getStatusIcon(technology.status)}
          />
        </Box>

        {technology.difficulty && (
          <Chip
            label={`Сложность: ${technology.difficulty}`}
            variant="outlined"
            size="small"
            color="primary"
          />
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            const statuses = ['not-started', 'in-progress', 'completed'];
            const currentIndex = statuses.indexOf(technology.status);
            const nextIndex = (currentIndex + 1) % statuses.length;
            onStatusChange(technology.id, statuses[nextIndex]);
          }}
        >
          Сменить статус
        </Button>
        
        <Button
          size="small"
          variant="outlined"
          onClick={onDetailsClick}
        >
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
}

export default MaterialTechCard;