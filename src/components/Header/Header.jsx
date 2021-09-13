import React, {useState} from 'react'
import useStyles  from './Header.styled'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { createTheme } from '@material-ui/core/styles'
import { lightBlue } from '@material-ui/core/colors'
import { LocationOn } from '@material-ui/icons'

const theme = createTheme({
   
   palette: {
      secondary: {
        main: lightBlue['A700']
      },
    },
    
})

function Header({onLoad, onPlaceChanged}) {
   const classes = useStyles()

   return (
      <AppBar position="static" style={{backgroundColor: theme.palette.secondary.main}}  >
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}> 
               Travel{<LocationOn/>}Pal
            </Typography>
            <Box display="flex">
               <Typography variant="h6" className={classes.title}> 
                  Explore New Places!
               </Typography>
               <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} > 
                  <div className={classes.search}>
                     <div className={classes.searchIcon}>
                        <SearchIcon />
                     </div>
                        <InputBase placeholder="Search..." classes={{root: classes.inputRoot, input: classes.inputInput}} />
                  </div>
               </Autocomplete>
            </Box>
         </Toolbar>
      </AppBar>
   )
}

export default Header
