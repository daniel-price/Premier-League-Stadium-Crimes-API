# Premier League Stadium Crimes API

## Set up

- Run `npm install`
- Set `AUTH_TOKEN` value to your own token in `api/football-data.js`

## Run server

`node index.js`

## Usage

All API methods are GET requests, so you can use the API in your browser by navigating to `localhost:3000`

### Example requests:

- Request all the crimes committed at a Premier League stadium for a given month and year:

  `http://localhost:3000/crimes?year=2021&month=1`

- Request more information about an area

  `http://localhost:3000/area?postcode=N51BU`

- Request more information about a specific team

  `http://localhost:3000/team?teamId=63`

- Request more information about a specific crime

  `http://localhost:3000/crime?crimeId=4d83433f3117b3a4d2c80510c69ea188a145bd7e94f3e98924109e70333ff735`

## Extra information

data.police.uk API was unavailable at the time of writing, so some crime data is stubbed or not available
