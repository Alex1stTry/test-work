import { useState } from 'react';
import { Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services';

const UpdateAvatarPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            authService.uploadPhoto(formData);
            console.log('Avatar uploaded successfully');
            navigate('/auth/me');
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" component="h1">
                    Update Avatar
                </Typography>

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-file-input"
                    type="file"
                    onChange={handleFileSelect}
                />

                <label htmlFor="avatar-file-input">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                </label>

                {selectedFile && (
                    <Typography>
                        Selected file: {selectedFile.name}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile}
                >
                    Upload
                </Button>
            </Box>
        </Container>
    );
};

export { UpdateAvatarPage };
