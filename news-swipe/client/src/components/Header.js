import React from 'react';
import '../Header.css'
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';

function Header() {
  return (
    <div className='header'>
      <IconButton>
        <PersonIcon className='header__icon' fontSize='large'/>
      </IconButton>
      <h1>Logo</h1>
      <IconButton>
        <NotificationsIcon className='header__icon'  fontSize='large'/>
      </IconButton>
    </div>
  )
}

export default Header