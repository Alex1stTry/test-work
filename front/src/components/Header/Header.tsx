import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

import { authService } from "../../services/index";
import { useEffect, useState } from "react";
import { IResponseUser } from "../../interfaces/index";

const Header = () => {
    const nav = useNavigate()
    const [user, setUser] = useState<IResponseUser>()

    const accessToken = authService.getAccessToken()
    useEffect(() => {
        if (accessToken) {
            authService.me().then(({ data }) => setUser(data))
        }
    }, [accessToken])

    const logOut = () => {
        setUser(undefined)
        nav('/auth/sign-in')
        authService.removeAccessToken()
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My application
                    </Typography>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
                            <div>
                                role: {user.role}
                            </div>
                            <div>
                                created: {new Date(user.created_at).toLocaleDateString('en-En', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                            <Button color="inherit" sx={{ border: '1px solid black', marginLeft: '5px' }} onClick={logOut}>Logout</Button>
                        </div>

                    ) : (
                        <>
                            <Button sx={{ border: '1px solid black' }} color="inherit" onClick={() => nav('auth/sign-in')}>Login</Button>
                            <Button sx={{ border: '1px solid black' }} color="inherit" onClick={() => nav('auth/sign-up')}>Register</Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export { Header };