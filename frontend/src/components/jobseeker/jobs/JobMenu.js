import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { getJobSearchData, searchSuccess, setCurrentPage } from '../../../_actions/jobSearchActions';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
));



export default function JobMenu({ job, handleSave, removeFromSaved }) {

  const { jobId, companyName, city, roleName, salaryDetails } = job
  let jobs = useSelector(state => state.search.searched)
  //const {saved_jobs} = useSelector(state=>state.login.loggedUser)
  let saveJobByUserId = localStorage.getItem("saveJobByUserId");
  console.log("saveJobByUserId: jobmenu", saveJobByUserId);
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeFromList = ({ jobId, city, companyName, roleNmae }) => {
    const newJobs = jobs.filter((job) => job.jobId !== jobId)
    dispatch(searchSuccess(newJobs))
  }

  return (
    <div style={{ position: 'absolute', top: "0", right: '0' }}>

      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >
        {

          saveJobByUserId ?
            <MenuItem onClick={() => {
              handleClose();
              //removeFromSaved({ jobId })
            }}>

              <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }} >
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Saved" />
            </MenuItem>

            :

            <MenuItem onClick={() => {
              handleClose();
              handleSave({ jobId, city, companyName, roleName })
            }}>

              <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }} >
                <FavoriteBorderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Save Job" />
            </MenuItem>
        }

      </StyledMenu>

    </div>
  );
}