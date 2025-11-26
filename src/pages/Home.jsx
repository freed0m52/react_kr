import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon,
  Storage as StorageIcon,
  Smartphone as SmartphoneIcon,
  Add as AddIcon,
  List as ListIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  PlayCircle as PlayCircleIcon
} from '@mui/icons-material';

// Компонент для содержимого вкладок
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [technologies, setTechnologies] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Загружаем технологии из localStorage
  useEffect(() => {
    const savedTechnologies = localStorage.getItem('techTrackerData');
    if (savedTechnologies) {
      const parsed = JSON.parse(savedTechnologies);
      setTechnologies(parsed);
      
      // Генерируем уведомления на основе данных
      generateNotifications(parsed);
    }
  }, []);

  // Генерация уведомлений
  const generateNotifications = (techs) => {
    const newNotifications = [];
    
    // Уведомление о технологиях в процессе
    const inProgressCount = techs.filter(t => t.status === 'in-progress').length;
    if (inProgressCount > 0) {
      newNotifications.push({
        id: 1,
        message: `У вас ${inProgressCount} технологий в процессе изучения`,
        type: 'info'
      });
    }

    // Уведомление о завершенных
    const completedCount = techs.filter(t => t.status === 'completed').length;
    if (completedCount > 0) {
      newNotifications.push({
        id: 2,
        message: `Поздравляем! Вы изучили ${completedCount} технологий`,
        type: 'success'
      });
    }

    // Уведомление о дедлайнах (если бы они были)
    const today = new Date();
    const upcomingDeadlines = techs.filter(tech => {
      if (!tech.deadline) return false;
      const deadline = new Date(tech.deadline);
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0 && tech.status !== 'completed';
    });

    if (upcomingDeadlines.length > 0) {
      newNotifications.push({
        id: 3,
        message: `У ${upcomingDeadlines.length} технологий приближается дедлайн`,
        type: 'warning'
      });
    }

    setNotifications(newNotifications);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationClick = () => {
    if (notifications.length > 0) {
      setSnackbarMessage(notifications[0].message);
      setSnackbarOpen(true);
      // Убираем показанное уведомление
      setNotifications(prev => prev.slice(1));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Статистика из реальных данных
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
  };

  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Последние добавленные технологии
  const recentTechnologies = [...technologies]
    .sort((a, b) => new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id))
    .slice(0, 5);

  // Распределение по категориям
  const categories = {};
  technologies.forEach(tech => {
    const category = tech.category || 'other';
    categories[category] = (categories[category] || 0) + 1;
  });

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Отслеживание прогресса',
      description: 'Отмечайте статус изучения каждой технологии',
      color: '#1976d2'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Визуальная статистика',
      description: 'Наглядные графики и диаграммы вашего прогресса',
      color: '#2e7d32'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      title: 'Сохранение данных',
      description: 'Ваш прогресс сохраняется автоматически',
      color: '#ed6c02'
    },
    {
      icon: <SmartphoneIcon sx={{ fontSize: 40 }} />,
      title: 'Удобный интерфейс',
      description: 'Адаптивный дизайн для всех устройств',
      color: '#9c27b0'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              🚀 Трекер технологий
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
              Управляйте своим прогрессом в изучении современных технологий
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/technologies"
                variant="contained"
                size="large"
                startIcon={<ListIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Посмотреть все технологии
              </Button>
              <Button
                component={Link}
                to="/add-technology"
                variant="outlined"
                size="large"
                startIcon={<AddIcon />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'grey.300',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Добавить технологию
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Dashboard с вкладками */}
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ mb: 6 }}>
          {/* Заголовок Dashboard */}
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Панель управления
              </Typography>
              <IconButton 
                color="inherit" 
                onClick={handleNotificationClick}
                disabled={notifications.length === 0}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Вкладки */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab label="Обзор" />
              <Tab label="Статистика" />
              <Tab label="Быстрый старт" />
            </Tabs>
          </Box>

          {/* Содержимое вкладки "Обзор" */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {/* Статистические карточки */}
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      <Typography color="text.secondary" variant="body2">
                        Завершено
                      </Typography>
                    </Box>
                    <Typography variant="h4">{stats.completed}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PlayCircleIcon color="warning" sx={{ mr: 1 }} />
                      <Typography color="text.secondary" variant="body2">
                        В процессе
                      </Typography>
                    </Box>
                    <Typography variant="h4">{stats.inProgress}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ScheduleIcon color="disabled" sx={{ mr: 1 }} />
                      <Typography color="text.secondary" variant="body2">
                        Не начато
                      </Typography>
                    </Box>
                    <Typography variant="h4">{stats.notStarted}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      Общий прогресс
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {completionPercentage}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={completionPercentage}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Недавние технологии */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Недавно добавленные
                    </Typography>
                    <List>
                      {recentTechnologies.length > 0 ? (
                        recentTechnologies.map((tech) => (
                          <ListItem 
                            key={tech.id}
                            sx={{ 
                              cursor: 'pointer',
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                            onClick={() => navigate('/technologies')}
                          >
                            <ListItemText
                              primary={tech.title}
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Chip 
                                    label={tech.status === 'completed' ? 'Завершено' : 
                                           tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
                                    size="small"
                                    color={tech.status === 'completed' ? 'success' : 
                                           tech.status === 'in-progress' ? 'warning' : 'default'}
                                  />
                                  {tech.category && (
                                    <Chip 
                                      label={tech.category} 
                                      variant="outlined" 
                                      size="small" 
                                    />
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText 
                            primary="Технологий пока нет"
                            secondary="Добавьте первую технологию"
                          />
                        </ListItem>
                      )}
                    </List>
                    {recentTechnologies.length > 0 && (
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        onClick={() => navigate('/technologies')}
                        sx={{ mt: 1 }}
                      >
                        Все технологии
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Распределение по категориям */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      По категориям
                    </Typography>
                    <List>
                      {Object.keys(categories).length > 0 ? (
                        Object.entries(categories).map(([category, count]) => (
                          <ListItem key={category}>
                            <ListItemText
                              primary={category}
                              secondary={`${count} технологий`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText 
                            primary="Категории не указаны"
                            secondary="Добавьте технологии с категориями"
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Содержимое вкладки "Статистика" */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h4" gutterBottom>
              Детальная статистика
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Общая информация
                    </Typography>
                    <Typography><strong>Всего технологий:</strong> {stats.total}</Typography>
                    <Typography><strong>Завершено:</strong> {stats.completed}</Typography>
                    <Typography><strong>В процессе:</strong> {stats.inProgress}</Typography>
                    <Typography><strong>Не начато:</strong> {stats.notStarted}</Typography>
                    <Typography sx={{ mt: 2 }}>
                      <strong>Процент выполнения:</strong> {completionPercentage}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Рекомендации
                    </Typography>
                    {stats.notStarted > 0 && (
                      <Typography color="warning.main">
                        • Начните изучение {stats.notStarted} технологий
                      </Typography>
                    )}
                    {stats.inProgress > 0 && (
                      <Typography color="info.main">
                        • Продолжайте работу над {stats.inProgress} технологиями
                      </Typography>
                    )}
                    {stats.completed > 0 && (
                      <Typography color="success.main">
                        • Отличная работа! Изучено {stats.completed} технологий
                      </Typography>
                    )}
                    {stats.total === 0 && (
                      <Typography color="text.secondary">
                        • Добавьте технологии чтобы начать отслеживать прогресс
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Содержимое вкладки "Быстрый старт" */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h4" gutterBottom>
              Начните работу с трекером
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🎯 Шаг 1: Добавьте технологии
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Начните с добавления технологий, которые хотите изучить. 
                      Вы можете добавить их вручную или загрузить из API.
                    </Typography>
                    <Button
                      component={Link}
                      to="/add-technology"
                      variant="contained"
                      sx={{ mt: 2 }}
                    >
                      Добавить технологию
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📊 Шаг 2: Отслеживайте прогресс
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Отмечайте статус изучения каждой технологии. 
                      Переключайтесь между "Не начато", "В процессе" и "Завершено".
                    </Typography>
                    <Button
                      component={Link}
                      to="/technologies"
                      variant="outlined"
                      sx={{ mt: 2 }}
                    >
                      Посмотреть технологии
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      💾 Шаг 3: Экспортируйте данные
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Сохраняйте свой прогресс в JSON файл для резервного копирования 
                      или переноса данных на другое устройство.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🔍 Шаг 4: Используйте поиск
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Быстро находите нужные технологии с помощью умного поиска 
                      по названию и описанию.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>

        {/* Features Section */}
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          ✨ Возможности трекера
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ color: feature.color, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Уведомления */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;