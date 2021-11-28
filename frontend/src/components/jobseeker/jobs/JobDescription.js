import { Box, makeStyles, Typography } from '@material-ui/core';
import React , {useReducer,useState} from 'react';
import { Button } from '@material-ui/core';
//import  Section  from './Section';
import { useSelector,useDispatch } from 'react-redux';
//import { makeApplyRequest } from '../../Redux/JobApply/actions';
//import { ApplyModal } from './JobApplyModal/ApplyModal';
const useStyles = makeStyles(theme=>({
    container:{
        position:'sticky',
        top:'20px',
        marginLeft:'50px',
        alignSelf: 'flex-start',
        border:'1px solid black',
        padding:'20px',
        flex:'1',
        borderRadius:'10px '
    },
    link:{
        
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'10px',
        height:'53px',
        padding:'0 25px',
        fontSize:'20px',
        color:'white',
        
        backgroundColor:theme.palette.primary.main,
        '&:hover':{
            color:theme.palette.primary.main,
            backgroundColor:'white',
            border:`1px solid ${theme.palette.primary.main}`

        }
    }
})) 
function JobDescription({jobData}) {
    const classes = useStyles()
    const {companyName,location,snippet,jobTitle,jobDescription,startSalary,endSalary,jobkey} = jobData
    const {saved_jobs,applied_job,id} = useSelector(state=>state.login.loggedUser)
    const [open, setOpen] = useState(false)
    const [jobId, setJobId] = useState("")
    const [ignored, forceUpdate] =useReducer(x => x + 1, 0)

    const dispatch = useDispatch();
    const handleClose=() =>{
        setOpen(false)
        setJobId("")
    }

    const handleOpen=(id)=>{
        setJobId(id)
        setOpen(true)
    }

    const handleApply=()=>{
       
        
        applied_job[jobId] = {
            jobkey,
            location,
            companyName,
            jobTitle,
            dateSaved:new Date()
        }
        //dispatch(makeApplyRequest({user_id:id,saved_jobs,applied_job}))
        setOpen(false)
        forceUpdate()
    }
    
    return (
        <Box className={classes.container}>
            <Typography variant={'h5'} style={{marginBottom:'10px'}}>
                {jobTitle}
            </Typography>
            <Box style={{marginBottom:'10px'}}>
                {companyName},{location}
            </Box>
            
            <Box style={{marginBottom:'10px'}}>
                ₹ {Number(startSalary).toLocaleString('en-IN')} - ₹ {Number(endSalary).toLocaleString('en-IN')}
            </Box>
            {ignored ? null : null}
            <Button className={classes.link} onClick={()=>handleOpen(jobkey)} disabled={applied_job[jobkey]?true:false}  style={{marginBottom:'30px'}}>
                {applied_job[jobkey]?'Applied':'Apply Now'}
            </Button>
            {/* <Section jobDescription={jobDescription} summary={snippet} />
            <ApplyModal 
                    open={open}
                    handleClose = {()=>handleClose()}
                    jobId = {jobId}
                    handleApply ={()=>handleApply()}
            /> */}

            
        </Box>
    );
}

export default JobDescription;