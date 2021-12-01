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
        '&:hover': {
            backgroundColor: '#103a7d',
        }
    },
    toolbar: {
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header_left: {
        display: 'flex',
    },
    header_right: {
        display: 'flex',
        width: '250px',
    },
    postJobButton: {
        width: "100%",
        borderRadius: '8px',
        height: "40px",
        color: "#ffffff",
        backgroundColor: "rgb(37, 87, 167)",
        cursor: "pointer",
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '100%',
        '&:hover': {
            backgroundColor: '#103a7d',
            color: '#ffffff'
        }
    },
    formhelperText: {
        fontWeight: "700",
        fontSize: "15px",
        fontFamily: "Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif",
        color: "#4b4b4b"
    },
    grid: {
        display: "flex",
        flexDirection: "column-reverse"
    },
    root: {
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
      },
}))