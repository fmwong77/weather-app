import axios from 'axios';

// const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const WEATHERBIT_BASE_URL = 'http://localhost:3000/api/v1/weathers?';

const getWeather = (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((response) => {
				if (response && response.status === 200) {
					console.log(response.data.data[0].temp);

					// const { main, icon } = response.data.weather[0];
					// const { temp, temp_min, temp_max } = response.data.main;
					const {
						lon,
						lat,
						city_name,
						temp,
						app_temp,
						ob_time,
						state_code,
						aqi,
						uv,
						pod,
						precip,
						vis
					} = response.data.data[0];

					// const { dt, name } = response.data;
					resolve({
						air_quality: aqi,
						uv: uv,
						part_of_day: pod,
						precip: precip,
						vis: vis,
						condition: response.data.data[0].weather.description,
						date: ob_time, //new Date(dt * 1000),
						icon: `../icons/${response.data.data[0].weather.icon}.png`,
						location: {
							name: city_name,
							latitude: lat,
							longitude: lon,
							state: state_code
						},
						temperature: {
							current: temp,
							feels_like: app_temp
						}
					});
				} else {
					reject('Weather data not found');
				}
			})
			.catch((error) => reject(error.message));
	});
};

const getDailyWeather = (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((response) => {
				if (response && response.status === 200) {
					// const location = {
					// 	name: response.data.data[0].city.name,
					// 	latitude: response.data.city.coord.lat,
					// 	longitude: response.data.city.coord.lon
					// };

					const dailyForecasts = response.data.data.map((fc) => {
						return {
							condition: fc.weather.description,
							date: fc.datetime,
							icon: `../icons/${fc.weather.icon}.png`,
							// location: location,
							temperature: {
								current: fc.temp,
								max_temp: fc.max_temp,
								min_temp: fc.min_temp
							}
						};
					});

					resolve(dailyForecasts);
				} else {
					reject('Weather data not found');
				}
			})
			.catch((error) => reject(error.message));
	});
};

const getHourlyWeather = (url) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then((response) => {
				if (response && response.status === 200) {
					const dailyForecasts = response.data.data.slice(0, 10).map((fc) => {
						return {
							condition: fc.weather.description,
							date: fc.datetime,
							icon: `../icons/${fc.weather.icon}.png`,
							// location: location,
							temperature: {
								current: fc.temp,
								max_temp: fc.max_temp,
								min_temp: fc.min_temp
							}
						};
					});

					resolve(dailyForecasts);
				} else {
					reject('Weather data not found');
				}
			})
			.catch((error) => reject(error.message));
	});
};

class WeatherService {
	getCurrentWeatherByPosition({ latitude, longitude }, unit) {
		if (!latitude) {
			throw Error('Latitude is required');
		}

		if (!longitude) {
			throw Error('Longitude is required');
		}

		const url = `${WEATHERBIT_BASE_URL}forecastLocation="current"&forecastType="current"&lat=${latitude}&lon=${longitude}&units=${unit}`;

		return getWeather(url);
	}

	getDailyWeatherByPosition({ latitude, longitude }, unit) {
		if (!latitude) {
			throw Error('Latitude is required');
		}

		if (!longitude) {
			throw Error('Longitude is required');
		}

		const url = `${WEATHERBIT_BASE_URL}forecastLocation="current"&forecastType="daily"&lat=${latitude}&lon=${longitude}&units=${unit}`;

		return getDailyWeather(url);
	}

	getHourlyWeatherByPosition({ latitude, longitude }, unit) {
		if (!latitude) {
			throw Error('Latitude is required');
		}

		if (!longitude) {
			throw Error('Longitude is required');
		}

		const url = `${WEATHERBIT_BASE_URL}forecastLocation="current"&forecastType="current"&lat=${latitude}&lon=${longitude}&units=${unit}`;

		return getHourlyWeather(url);
	}
}

export { WeatherService };
