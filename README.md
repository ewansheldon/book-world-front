# Nico's Bookworld

### How to run
Clone this repo, and install the dependencies:

```
$ npm install
```

Create a `.env` file in the root of the directory with something like:

```
MAPBOX_TOKEN=xxxxxxxxxxxxxx
API_URL=https://dry-harbor-33243.herokuapp.com
```

You can create an account with mapbox [here](https://mapbox.com) and generate an access token, to add to the `.env` as your `MAPBOX_TOKEN`.

If you want to run the [bookworld backend](https://github.com/ewansheldon/bookworld-api) locally use the local url as your `API_URL`. 

Then to run the app, run:

```
$ npm start
```