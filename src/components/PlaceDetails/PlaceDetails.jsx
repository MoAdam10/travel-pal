import React from 'react'
import useStyles  from './PlaceDetails.styled'
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import  Rating from '@material-ui/lab/Rating'
import  LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

function PlaceDetails({ place, selected, refProp }) {

   const classes = useStyles()

   if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"})

   return (
      <Card elevation={6}>
         <CardMedia 
            style={{height: 350}}
            image={place.photo? place.photo.images.large.url : 'https://cdn.vox-cdn.com/thumbor/7LNykfucBU-Og_PPXiy2tUOojwk=/0x0:5996x4003/1200x900/filters:focal(2519x1523:3477x2481)/cdn.vox-cdn.com/uploads/chorus_image/image/56624447/2021_03_23_Merois_009.32.jpg'}
            title={place.name}
         />
           
         <CardContent>
            <Typography  variant="h5">    
               {place.name}
            </Typography>
            <Box display="flex" justifyContent="space-between" my={2}>
               <Rating value={Number(place.rating)} readOnly />
               <Typography  variant="subtitle1"> out of {place.num_reviews} reviews</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
               <Typography variant="subtitle1">Price</Typography>
               <Typography  variant="subtitle1">{place.price_level}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
               <Typography variant="subtitle1">Rank{' '}</Typography>
               <Typography  variant="subtitle1"> {place.ranking}</Typography>
            </Box>
            {place?.awards?.map(award => (
               <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                  <img src={award.images.small} alt={award.display_name}/>
                  <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
               </Box>
            ))}
            {place?.cuisine?.map(({name}) => (
               <Chip key={name} size="small" label={name} className={classes.chip}/>
            ))}
            {place?.address && (
               <Typography  variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                  <LocationOnOutlinedIcon /> {place.address}
               </Typography>
            )}
            {place?.phone && (
               <Typography  variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                  <PhoneIcon /> {place.phone}
               </Typography>
            )}
            <CardActions>
               {/* <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                  Trip Advisor
               </Button> */}
               <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                  Website
               </Button>
            </CardActions>
         </CardContent>
      </Card>
  
   )
}

export default PlaceDetails
