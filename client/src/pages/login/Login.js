import {
  Grid,
  // FormControl,
  CssBaseline,
  Container,
  Checkbox,
  Button,
  // Box,
  Avatar,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';

import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { saveAuthToken } from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  styledHelperText: { color: 'red' },
  recoverPasswordLink: {
    // color: currentColor;
    cursor: 'not-allowed',
    opacity: '0.5',
    textDecoration: 'none',
  },
}));

export default function Login() {
  const {
    paper,
    avatar,
    form,
    submit,
    styledHelperText,
    recoverPasswordLink,
  } = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  let history = useHistory();

  const updateFormData = (event) => {
    if (errors) setErrors({});
    if (error === true) setError(false);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', formData);
      console.log(response);
      saveAuthToken(response.data.token);
      history.push('/dashboard');
    } catch (error) {
      if (error) {
        setError(true);
        setErrors({ msg: '( Opps Something went wrong )' });
      }
    }
  };

  return (
    <Container component='div' maxWidth='xs'>
      <CssBaseline />
      <div className={paper}>
        <Avatar className={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={form} onSubmit={loginUser} noValidate>
          <TextField
            label='Email Address'
            id='email'
            name='email'
            value={formData.email}
            onChange={updateFormData}
            error={error}
            type='email'
            variant='outlined'
            margin='normal'
            autoComplete='email'
            fullWidth
            autoFocus
            required
          />

          <TextField
            label='Password'
            id='password'
            name='password'
            value={formData.password}
            error={error}
            type={showPassword ? 'text' : 'password'}
            inputProps={{ htmlFor: 'password' }}
            InputProps={{
              // classes: { underline: styleUnderline },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors && errors.msg}
            FormHelperTextProps={{
              classes: { root: styledHelperText },
            }}
            variant='outlined'
            margin='normal'
            autoComplete='current-password'
            onChange={updateFormData}
            fullWidth
            required
          />

          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            value='Login'
            className={submit}
            fullWidth
          >
            Login Now
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                className={recoverPasswordLink}
                to={'/dashboard'}
                variant='body2'
              >
                {' Forgot password?'}
              </Link>
            </Grid>

            <Grid item>
              <Link to={'/register'} variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
