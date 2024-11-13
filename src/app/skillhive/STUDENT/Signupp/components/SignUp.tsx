import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled, PaletteMode } from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth methods
import { app } from '@/app/firebase'; // Adjust this import according to your Firebase configuration

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  maxWidth: '450px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  
  // State variables for form inputs and validation
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [regName, setRegName] = React.useState('');
  const [regNo, setRegNo] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPass, setRegPass] = React.useState('');

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const validateInputs = (): boolean => {
    let isValid = true;

    // Validate email
    if (!regEmail || !/\S+@\S+\.\S+/.test(regEmail)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Validate password
    if (!regPass || regPass.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Validate name
    if (!regName) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    // Validate contact number
    if (!regNo || regNo.length !== 10) {
      alert('Please enter a valid 10-digit contact number.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      const auth = getAuth(app);
      try {
        await createUserWithEmailAndPassword(auth, regEmail, regPass);
        alert('User Registered Successfully');

        // Clear fields after successful registration
        setRegName('');
        setRegEmail('');
        setRegPass('');
        setRegNo('');
      } catch (error) {
        alert(nameErrorMessage);
      }
    }
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
      <CssBaseline enableColorScheme />
      <IconButton
        onClick={() => window.history.back()}
        sx={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          color: mode === 'dark' ? 'white' : 'black',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <SignUpContainer container>
        <Grid item xs={1} sm={6}>
          <Box
            component="img"
            src="https://www.clufox.com/assets/img/homeImg.svg"
            alt="Sign up illustration"
            sx={{ width: '80%', height: '80%', objectFit: 'contain', margin: 'auto', paddingLeft: '10vh' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'center',
              height: '100%',
              padding: 4,
            }}
          >
            <Card variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign up
              </Typography>
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="number">Contact Number</FormLabel>
                <TextField
                  autoComplete="number"
                  name="number"
                  required
                  fullWidth
                  id="number"
                  placeholder="1234567890"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                />
              </FormControl>
              <Button type="submit" variant="contained" fullWidth>
                Sign Up
              </Button>
            </Card>
          </Box>
        </Grid>
      </SignUpContainer>
    </ThemeProvider>
  );
}
