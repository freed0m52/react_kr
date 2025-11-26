import {
  Paper,
  Typography,
  LinearProgress,
  Box,
  Grid
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  PlayCircle as PlayCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

function MaterialProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: 'Всего', value: total, color: 'primary', icon: <ScheduleIcon /> },
    { label: 'Изучено', value: completed, color: 'success', icon: <CheckCircleIcon /> },
    { label: 'В процессе', value: inProgress, color: 'warning', icon: <PlayCircleIcon /> },
    { label: 'Не начато', value: notStarted, color: 'default', icon: <ScheduleIcon /> }
  ];

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        📊 Общий прогресс
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Прогресс изучения</Typography>
          <Typography variant="body2" fontWeight="bold">
            {completionPercentage}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ color: `${stat.color}.main`, mb: 1 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" fontWeight="bold" color={`${stat.color}.main`}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default MaterialProgressHeader;