import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

const CustomSnackbar = ({ message }: { message: string }) => {

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={true}
                message={message}
                key={'error_snackbar'}
            />
        </Box>
    )
}

export default CustomSnackbar