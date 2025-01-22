import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/index";
import { GallareyComponent } from "../components/index";
import { Box, Container, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MyGallareyPage = () => {
    const [photos, setPhotos] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        authService.getGallarey()
            .then(data => {
                if (data && data.gallarey) {
                    setPhotos(data.gallarey);
                }
            })
            .catch(error => console.error('Error fetching gallery:', error));
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Gallery
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
                    {photos && photos.length > 0 ? (
                        photos.map((photo, index) => (
                            <GallareyComponent key={index} gallarey={photo} />
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No images in gallery
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        size="small"
                    >
                        Back
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export { MyGallareyPage };