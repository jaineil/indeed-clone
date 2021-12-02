import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';

import Pagination from 'react-mui-pagination';


import {
    Container,
    makeStyles,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import CompanyHeader from './CompanyHeader';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import { Modal, Button} from 'react-bootstrap';


import theme from "../../common/MenuTheme";
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';





const useStyle = makeStyles((theme) => ({
    imgCont: {
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    optionTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        fontWeight: "bold"
    },
    scoreTest: {
        margin: 0,
        backgroundColor: "#f3f2f1",
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#2d2d2d",
        borderRadius: "0.5rem",
        lineHeight: "1.5",
        padding: "0.35rem 0.75rem"
    },
    buttonStyle : {
        backgroundColor: "#000080", 
        color: "white",
        padding: "15px 32px",
        align: "center",
        display: "inline-block",
        fontSize: "20px",
        borderRadius: "10px",
        transition: ".5s ease",
        marginBottom: "10px",
        '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
            backgroundColor: 'white',
            border: `1px solid ${theme.palette.primary.main}`

        }
    },

    imageStyle: {
        borderRadius: "10px",
        width:"300px",
        height: "500px",
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'black',
            border: `1px solid ${theme.palette.primary.main}` 
        }
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },


    
}))



export function CompanyPhotos(props) {

    const [page, setMyPage] = useState(1); // this an example using hooks
    const setPage = (e, p) => {
         setMyPage(p);
    }   
    const classes = useStyle();
    const [modalData, setData] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
        //setData(data[index]);
        //setData();
    const handleClose = () => {
    setOpen(false);
    };


    const [photos, setPhotos] = useState([{
        photos: [],
        url: ""
    }])

    const upload = e => {
        const tempArr = [];
      
        [...e.target.files].forEach(file => {
          console.log("file >>> ", file);
      
          tempArr.push({
            data: file,
            url: URL.createObjectURL(file)
          });
      
          console.log("pictures >> ", photos);
        });
      
        setPhotos(tempArr);
      };
    // const upload = (e) => {
    // e.preventDefault()
    // console.log(this.state.file)
    // }

    const query = new URLSearchParams(props.location.search);
    const id = query.get('id')
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.login)

    //fetch company id by localstorage

    //call get company details api
    console.log("Company details: ", companyDetails);


    const CustomModal = () => {
       return (
        <Modal show={open} onHide={handleClose} animation={false} className = {classes.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div><h5>Select 5 or less photos of your workplace or company events.</h5></div>
            <div>
                <ul>
                    <li>Workplace or company events</li>
                    <li>No selfies</li>
                </ul>
            </div>
            <div>
            By uploading this photograph, you represent that you are the owner of this photograph and verify that you have the right and required permissions to post it to Indeed.
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={handleClose}>Cancel</Button>
             {/* <Button style = {{ backgroundColor: "#000080", color: "white",}}> */}
            <input type="file" style = {{ width : "113px" }}  onChange={upload} multiple />
            {/* </Button>  */}
            
        </Modal.Footer>
      </Modal>
        ) 
      };
    



    return (

        isAuth ? (companyDetails ?

            
            <ThemeProvider theme={theme}>
                <Header /><hr />
                <CompanyHeader /><hr />
                <Container maxwidth="xl">
                <div data-tn-section="head" data-testid="head" class="css-1kmudnk eu4oa1w0">
                    <h1 data-testid="PageHeader-title-photos" class="css-nlnpm8 e1tiznh50">Company Photos</h1>
                </div>

                <div class="css-3oshgk e37uo190"
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                   
                }}>
                    <div>Photos 1-16</div>
                    <div>
                        <button className= {classes.buttonStyle}
                            onClick= {()=> {handleOpen()}}
                        >Upload Photos</button>
                    </div>
                </div>
                <div></div>
                <div></div>
                <div>

                    <ImageList sx={{ width: 1250, height: 500 }} cols={4} rowHeight={240}>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            className = {classes.imageStyle}
                            src={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://assets.entrepreneur.com/content/3x2/2000/20150805204041-google-company-building-corporate.jpeg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt="google"
                            loading="lazy"
                        />
                    </ImageListItem>
                    
                    
                    {/* {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))} */}
                    </ImageList>
                </div>
                <Pagination page={page} setPage={setPage} total={50} perPage ={5}/>
                

                </Container>
            <CustomModal/>
            </ThemeProvider>
            
            : <></>) : <Redirect to="/login" />
    )
}
export default CompanyPhotos;