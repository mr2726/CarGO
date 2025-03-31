import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
} from '@mui/material';
import { login, createTestAccount } from '../services/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [testAccount, setTestAccount] = useState<{ email: string; password: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleCreateTestAccount = async () => {
    try {
      const account = await createTestAccount();
      setTestAccount(account);
      setEmail(account.email);
      setPassword(account.password);
      setError('');
    } catch (err) {
      setError('Failed to create test account');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {testAccount && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Test account created! You can now log in with these credentials.
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleCreateTestAccount}
            sx={{ mt: 2 }}
          >
            Create Test Account
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 