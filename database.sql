drop table current_weather;
create table current_weather(
	last_updated int primary key not null,
	temp decimal not null,
	pressure decimal not null,
	humid decimal not null,
	windspeed decimal not null,
	cloudiness decimal not null
);

drop table forecast_weather;
create table forecast_weather(
	forecast_time int primary key not null,
	temp decimal not null,
	pressure decimal not null,
	humid decimal not null,
	windspeed decimal not null,
	cloudiness decimal not null
);

drop table station_status;
create table station_status (
	station_id varchar(64) not null,
	num_bike_available int not null,
	num_bike_disabled int not null,
	num_docks_available int not null,
	num_docks_disabled int not null,
	is_installed int not null,
	is_renting int not null,
	is_returning int not null,
	last_reported int not null
)
