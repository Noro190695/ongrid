import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Alert} from "@mui/material";
import {NavLink} from "react-router-dom";


const theme = createTheme();
export interface IAuth {
    method?: any,
    message?: string
}
export default function SignIn({ method, message}: IAuth) {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 5
                }}>
                    {
                        message? <Alert sx={{
                            position: 'absolute'
                        }} severity="error">{message}</Alert>:null
                    }
                </Box>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={method} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flex:1,
                        }}>
                            <NavLink to="/register">
                                <Typography sx={{
                                    color: '#039be5',
                                }}>
                                    {"Don't have an account? Sign Up"}
                                </Typography>
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </ThemeProvider>
    );
}