import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import {
  Code as CodeIcon,
  Home as HomeIcon,
  Add as AddIcon
} from '@mui/icons-material';

function MaterialNavigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: <HomeIcon /> },
    { path: '/technologies', label: 'Технологии', icon: <CodeIcon /> },
    { path: '/add-technology', label: 'Добавить', icon: <AddIcon /> }
  ];

  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CodeIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Трекер технологий
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MaterialNavigation;