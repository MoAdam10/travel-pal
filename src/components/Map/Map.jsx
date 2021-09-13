import React from 'react'
import useStyles  from './Map.styled'
import GoogleMapReact from 'google-map-react'
import {Paper, Typography, useMediaQuery} from '@material-ui/core'

import  LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

import Rating  from '@material-ui/lab/Rating'
import mapStyles from './mapStyles'

function Map({coords, setCoordinates, setBounds, places, setChildClick, weatherData}) {
   const classes  = useStyles()
   const isDesktop = useMediaQuery('(min-width:600px)')
   
   return (
     
      <div className={classes.mapContainer}>
         <GoogleMapReact 
            boostrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} defaultCenter={coords} 
            center={coords} 
            defaultZoom={14} 
            margin={[50, 50, 50, 50]} 
            options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}} 
            onChange={(event) => {
               setCoordinates({lat: event.center.lat, lng: event.center.lng});
               setBounds({ne: event.marginBounds.ne, sw: event.marginBounds.sw})
               }
            } 
            onChildClick={(child) => setChildClick(child)}>
            {places && places.map((place, index) =>(
               <div
                  className={classes.markerContainer}
                  lat={Number(place.latitude)}
                  lng={Number(place.longitude)}
                  key={index}
               >
                  {!isDesktop ? (
                      <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                  ) : (
                        <Paper elevation={3} className={classes.paper}>
                           <Typography className={classes.typography} variant="subtitle2" >
                              {place.name}
                           </Typography>
                           <img 
                              className={classes.pointer}
                              src={place.photo? place.photo.images.large.url : 'https://cdn.vox-cdn.com/thumbor/7LNykfucBU-Og_PPXiy2tUOojwk=/0x0:5996x4003/1200x900/filters:focal(2519x1523:3477x2481)/cdn.vox-cdn.com/uploads/chorus_image/image/56624447/2021_03_23_Merois_009.32.jpg'}
                              alt={place.name}
                           />
                           <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                        </Paper>
                     )
                  }
               </div>
            ))}
            {weatherData?.list?.length && weatherData.list.map((data, index) => (
               <div key={index} lat={data.coordinates.lat} lng={data.coord.lon}>
                  <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={''} height={120}/>
               </div>
            ))}
         </GoogleMapReact>
      </div>
     
   )
}

export default Map
