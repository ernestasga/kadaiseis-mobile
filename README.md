# Kadaiseis.lt mobile application
Made with react native. Mobile implementation of https://kadaiseis.lt web app.

## Setup
* Clone this repo and cd into it

    `git clone https://github.com/ernestasga/kadaiseis-mobile`

    `cd kadaiseis-mobile`

* Install expo-cli globally

    `npm install expo-cli --global`
* Install npm dependencies

    `npm install`

* Follow cli instructions to launch expo server
## Production buil
### Setup ads
* Edit `app.json`  **googleMobileAdsAppId** fields. Replace with real admob app id.
* Edit `/screens/HomeScreen.js` and `/screens/WatchlistScreen.js` ad component. Replace with real ad unit id.