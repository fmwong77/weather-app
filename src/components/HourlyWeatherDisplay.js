import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel2';
import HourlyWeatherForecastCard from './HourlyWeatherForecastCard';
import Slider from 'infinite-react-carousel';

const options = {
	items: 5,
	nav: false,
	rewind: true,
	autoplay: false
};

const settings = {
	slidesPerRow: 4
};

class HourlyWeatherDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="hourly-weather-display">
				<div className="text-center h5 pt-2">Hourly</div>
				<div className="carousel">
					<Slider ref={(el) => el} {...settings}>
						{this.props.hourlyForecasts.map((fc, i) => (
							<HourlyWeatherForecastCard forecast={fc} key={i} />
						))}
					</Slider>
					{/* <OwlCarousel ref={(el) => (this.carousel = el)} options={options}>
						{!!this.props.dailyForecasts &&
							this.props.dailyForecasts.map((fc, i) => (
								<HourlyWeatherForecastCard forecast={fc} key={i} />
							))}
					</OwlCarousel> */}
				</div>
			</div>
		);
	}
}

HourlyWeatherDisplay.propTypes = {
	hourlyForecasts: PropTypes.array.isRequired
};

export default HourlyWeatherDisplay;
