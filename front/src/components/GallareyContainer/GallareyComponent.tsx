import { FC } from "react";
import { Card, CardMedia } from "@mui/material";

interface IProps {
    gallarey: string;
}

const GallareyComponent: FC<IProps> = ({ gallarey }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                image={gallarey}
                alt="Gallery Image"
                sx={{ 
                    width: '100%',
                    height: '300px',
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5'
                }}
            />
        </Card>
    );
};

export { GallareyComponent };