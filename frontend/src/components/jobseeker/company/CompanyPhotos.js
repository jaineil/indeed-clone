import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPointObj from '../../../endPointUrl.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Container,
    Input,
    makeStyles,
    Snackbar,
} from '@material-ui/core';

import { Redirect } from 'react-router-dom';
import companyDetails from './companyDetails';
import CompanyHeader from './CompanyHeader';
import JwPagination from 'jw-react-pagination';
import Header from "../../common/Header";
import { ThemeProvider } from "@material-ui/core";
import { Modal, Button} from 'react-bootstrap';


import theme from "../../common/MenuTheme";
import { ImageList, ImageListItem, ImageListItemBar, Alert } from '@mui/material';


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
        maxWidth:"300px",
        maxHeight: "300px",
        width:"300px",
        height:"300px",
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'black',
            border: `1px solid ${theme.palette.primary.main}` 
        }
    },

    previewImageStyle: {
        borderRadius: "10px",
        width:"350px",
        height: "300px",
        marginLeft: "55px",
        marginBottom: "10px",
        alignItems: 'center'
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
    let [pageOfItems, setPageOfItems] = useState([])

    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);};
    const [previewopen, setPreviewOpen] = useState(false);
    const handlePreviewOpen = () => setPreviewOpen(true);
    const handlePreviewClose = () => {setPreviewOpen(false);};

    const [previewPhotos, setPreviewPhotos] = useState([{
        photos: [],
        url: ""
    }])
    const companyId = localStorage.getItem('currentcompanyid')
    const userId = localStorage.getItem('userId')
    const [photos, setPhotos] = useState([]);
    const [displayPhotos, setDisplayPhotos] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);



    const onImageChange = e => {
        const tempArr = [];
      
        [...e.target.files].forEach(file => {
          console.log("file >>> ", file);
      
          tempArr.push({
            data: file,
            url: URL.createObjectURL(file)
          });
      
          console.log("pictures >> ", tempArr);
        });
        setPreviewPhotos(tempArr);
        setPhotos([...e.target.files]);
        handlePreviewOpen();
        handleClose();
      };
    

      useEffect(() => {
        console.log("Inside get company photos");

        axios.get(`${endPointObj.url}/job-seeker/get-company-photos/${companyId}`)
            .then(response => {
                console.log("Get company reviews response", response.data.response);
                setDisplayPhotos(response.data.response);
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log("Error", err.response);
                }
            });
    }, [])

    const upload = (e) => {
        console.log("on upload");
        const formData = new FormData();
        photos.forEach(photo=>{
            formData.append("file", photo);
          });
        setUploading(true)
        axios(
            {
                method: "POST",
                url: `${endPointObj.url}/job-seeker/add-company-photo?companyId=${companyId}&jobSeekerId=${userId}`,
                data: formData,
                headers: {
                "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
            console.log("Image Uploaded", response.data);
            setUploading(false)
            setUploaded(true)
            handlePreviewClose();

        })
        .catch(err => {
            if (err.response && err.response.data) {
                handlePreviewClose();
                alert("Image not Uploaded")
    
                console.log("Error", err.response);
            }
        });;
        

    }
    

    const query = new URLSearchParams(props.location.search);
    const id = query.get('id')
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.login)

    //fetch company id by localstorage

    //call get company details api
    console.log("Company details: ", companyDetails);


    const UploadPhotoModal = () => {
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
            <input type="file" style = {{ width : "113px" }} name="choose" onChange={onImageChange} multiple />
            {/* </Button>  */}
            
        </Modal.Footer>
      </Modal>
        ) 
      };
    
    const PreviewPhotoModal = () => {
        return (
         <Modal show={previewopen} onHide={handlePreviewClose} animation={false} className = {classes.modal}>
         <Modal.Header closeButton>
           <Modal.Title>Preview Photos</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="form-group multi-preview">
                    {previewPhotos.map(photo => (
                        <img src={photo.url} className={classes.previewImageStyle} alt="..." />
                    ))}
            </div>
             
            <div>
             By uploading this photograph, you represent that you are the owner of this photograph and verify that you have the right and required permissions to post it to Indeed.
            </div>
         </Modal.Body>
         <Modal.Footer>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                            {
                                uploading?<CircularProgress disableShrink />:<></>
                                
                            }  
                            
                </div>
             <Button variant="light" onClick={handlePreviewClose}>Cancel</Button>
             <Button style = {{ backgroundColor: "#000080", color: "white",}} onClick= {upload}> Upload
             </Button> 
             
         </Modal.Footer>
       </Modal>
         ) 
       };
     


    return (

        isAuth ? (companyDetails ?

            
            <ThemeProvider theme={theme}>
                {isAuth ? (<Header />): <><br/><br/></> }
			    <br/>
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
                     <div></div>
                    
                   
                    <div>
                        <button className= {classes.buttonStyle}
                            onClick= {()=> {handleOpen()}}
                        >Upload Photos</button>
                    </div>
                </div>
                <div></div>
                <div></div>
                <div>

                    <ImageList sx={{ width: 1250, height: 350 }} cols={4} rowHeight={300}>
                         
                    {pageOfItems.map((item) => (
                        <ImageListItem key={item}>
                        <img className = {classes.imageStyle}
                            src={item}
                            srcSet={item}
                            alt="dummy"
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))}

                    
                   
                    </ImageList>
                </div>
                <JwPagination pageSize={12} items={displayPhotos} onChangePage={setPageOfItems} />
                

                </Container>
            <UploadPhotoModal/>
            <PreviewPhotoModal/>
            </ThemeProvider>
            
            : <></>) : <Redirect to="/login" />
    )
}
export default CompanyPhotos;