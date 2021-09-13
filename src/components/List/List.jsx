import React,  {useState, useEffect, createRef} from 'react'
import useStyles  from './List.styled'
import {CircularProgress, Grid, Typography, MenuItem, FormControl, Select, InputLabel} from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

function List({ places, childClick, isLoading, type, setType, rating, setRating}) {
   const classes = useStyles()
   const [elementRefs, setElementRefs] = useState([])

   useEffect(() => {

      setElementRefs((refs) => Array(places?.length).fill().map((_, index) => refs[index] || createRef()))

   }, [places])
   


   return (
      <div className={classes.container}>
         <Typography variant="h5">
            Restaurants, Hotels & Attractions near you!
         </Typography>
         {isLoading ? (
            <div className={classes.loading} >
               <CircularProgress size="5rem" />
            </div>
         ) : (
            <>
         <FormControl className={classes.formControl}>
            <InputLabel id="type">Select</InputLabel>
            <Select value={type} onChange={(event) => setType(event.target.value)}>
               <MenuItem value="restaurants">Restaurants</MenuItem>
               <MenuItem value="hotels">Hotels</MenuItem>
               <MenuItem value="attractions">Attractions</MenuItem>

            </Select>
         </FormControl>
         <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select value={rating} onChange={(event) => setRating(event.target.value)} id="rating">
               <MenuItem value={0}>All</MenuItem>
               <MenuItem value={3}>Above 3.0</MenuItem>
               <MenuItem value={4}>Above 4.0</MenuItem>
               <MenuItem value={4}>Above 4.5</MenuItem>
            </Select>
         </FormControl>
         <Grid container spacing={3} className={classes.list}>
             {places?.map((place, index) => (
                  <Grid item key={index} xs={12}>
                     <PlaceDetails place={place} selected={Number(childClick) === index} refProp={elementRefs[index]} />
                  </Grid>
                )
             )}
         </Grid>
         </>
         )}
      </div>
         
   )
}

export default List
