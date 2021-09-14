import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';

function App() {
	const [places, setPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coords, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [childClick, setChildClick] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [weatherData, setWeatherData] = useState([]);
	const [autocomplete, setAutoComplete] = useState(null);

	console.log('places from App.js => ', places);
	console.log('filteredPlaces from App.js => ', filteredPlaces);

	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState('');

	useEffect(() => {
		const filtered = places.filter((place) => place.rating > rating);
		setFilteredPlaces(filtered);
	}, [rating]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			setIsLoading(true);

			getWeatherData(coords.lat, coords.lng).then((data) => {
				setWeatherData(data);
			});

			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(
					data && data.filter((place) => place.name && place.num_reviews > 0)
				);
				setFilteredPlaces([]);
				setRating('');
			});
			setIsLoading(false);
		}
	}, [type, bounds]);

	const onLoad = (autocomp) => {
		return setAutoComplete(autocomp);
	};

	const onPlaceChanged = () => {
		const latitude = autocomplete.getPlace().geometry.location.lat();
		const longitude = autocomplete.getPlace().geometry.location.lng();

		setCoordinates(latitude, longitude);
	};
	return (
		<>
			<CssBaseline />
			<Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List
						isLoading={isLoading}
						places={filteredPlaces.length ? filteredPlaces : places}
						childClick={childClick}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={8}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coords={coords}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClick={setChildClick}
						weatherData={weatherData}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
