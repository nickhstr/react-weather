var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
	getInitialState: function() {
		return {
			isLoading: false
		};
	},
	handleSearch: function(location) {
		var self = this;

		this.setState({
			isLoading: true
		});

		openWeatherMap.getTemp(location).then(function(temp) {
			self.setState({
				location: location,
				temp: temp,
				isLoading: false
			});
		}, function(errorMessage) {
			alert(errorMessage);
			self.setState({
				isLoading: false
			});
		});
	},
	render: function() {
		var {isLoading, location, temp} = this.state;

		function renderMessage() {
			if (isLoading) {
				return <h3>Fetching weather...</h3>;
			}
			else if (temp && location) {
				return <WeatherMessage location={location} temp={temp}></WeatherMessage>;
			}
		}

		return (
			<div>
				<h3>Weather Component</h3>
				<WeatherForm onSearch={this.handleSearch}></WeatherForm>
				{renderMessage()}
			</div>
		);
	}
});

module.exports = Weather;