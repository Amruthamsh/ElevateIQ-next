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
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider, createTheme, styled, PaletteMode } from '@mui/material/styles';
import getSignInTheme from './theme/getSignInTheme';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { auth } from '../../../firebase';
// import { useRouter } from 'router'; // Import the useRouter hook



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

const SignInContainer = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',  // Full viewport height
  width: '100vw',      // Full viewport width
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',  // Center the content
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignIn() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPass, setLoginPass] = React.useState('');

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs before submitting
    if (!validateInputs()) return;

    try {
        // Sign in the user
        await signInWithEmailAndPassword(auth, loginEmail, loginPass);
        window.location.href = '/STUDENT/profile';        
        // Optionally, you can redirect the user or perform any other action after signing in
        // For example:
        // window.location.href = '/dashboard'; // Redirect to the dashboard page
    } catch (error) {
        const errorMessage = (error as { message?: string }).message || 'An error occurred during sign in.';
        alert(errorMessage);
    }
};

  const validateInputs = () => {
    let isValid = true;

    if (!loginEmail || !/\S+@\S+\.\S+/.test(loginEmail)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!loginPass || loginPass.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
      <CssBaseline enableColorScheme />

      {/* Back button */}
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

      <SignInContainer container>
        {/* Left side with form */}
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
                Sign in
              </Typography>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs} // You can remove this since it's already validated in handleSubmit
              >
                Sign in
              </Button>
            </Card>
          </Box>
        </Grid>

        {/* Right side with image */}
        <Grid item xs={12} sm={6}>
          <Box
            component="img"
            src="https://www.techlifemsp.com/wp-content/uploads/2020/02/business.png"
            alt="Sign in illustration"
            sx={{ width: '80%', height: '80%', objectFit: 'contain', margin: 'auto' }}
          />
        </Grid>
      </SignInContainer>
    </ThemeProvider>
  );
}
