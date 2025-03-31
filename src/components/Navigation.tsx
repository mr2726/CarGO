import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Link as RouterLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cargo Management System
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/new-cargo">
            New Cargo
          </Button>
          <Button color="inherit" component={RouterLink} to="/drivers">
            Drivers
          </Button>
          <Button color="inherit" component={RouterLink} to="/history">
            History
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 