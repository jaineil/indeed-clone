import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton, Typography } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { logout } from '../../../Redux/Login/actions';

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
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
      width:'400px',
    '&:focus': {
      
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        
      },
    },
  },
}))(MenuItem);

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const loggedUser = useSelector(state=>state.login.loggedUser);
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
                >
            <PersonIcon/>
        </IconButton>
  
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        <Typography variant={'h5'} style={{fontSize:'20px',marginLeft:'15px'}}>
            {loggedUser.email}
        </Typography>
        <StyledMenuItem onClick={()=>{
            handleClose()
            history.push('/savedjobs')}}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Jobs" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <RateReviewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Reviews" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{
            handleClose()
            //dispatch(logout())
            }}>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}