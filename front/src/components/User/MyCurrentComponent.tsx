import { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import { IResponseUser } from "../../interfaces/index";

interface IProps {
    user: IResponseUser
}

const MyAccountComponent: FC<IProps> = ({ user }) => {
    const { id, username, email, age, avatar } = user;
    const navigate = useNavigate();



    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography gutterBottom sx={{}}>
                    {avatar ? <img src={avatar} alt="avatar" /> : 'No avatar'}
                </Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    id: {id}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>name: {username}</Typography>
                <Typography>
                    age: {age}
                </Typography>
                <Typography variant="body2">
                    email: {email}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button color="inherit" sx={{ border: '1px solid black', marginLeft: '5px' }} onClick={() => navigate('/auth/my-gallery')}>Show all photos</Button>
                    <Button color="inherit" sx={{ border: '1px solid black', marginLeft: '5px' }} onClick={() => navigate('/auth/update-avatar')}>Update avatar</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export { MyAccountComponent };