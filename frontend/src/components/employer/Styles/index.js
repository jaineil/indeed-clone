import {
    makeStyles,
} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    registrationContent: {
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submitButton: {
        borderRadius: '10px',
        width: '50%', 
        backgroundColor: '#2557a7', 
        color: '#ffffff', 
        fontStyle: 'Open Sans', 
        fontWeight: 'bold',
        height: '150%',
        '&:hover':{
            backgroundColor: '#103a7d',
        }
    }
}))