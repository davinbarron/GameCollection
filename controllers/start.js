'use strict';

// import all required modules
import logger from '../utils/logger.js';
import gameStore from '../models/game-store.js';
import accounts from './accounts.js';
import userStore from '../models/user-store.js';

// create start object
const start = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    // app statistics calculations
    if (loggedInUser) {
      const games = gameStore.getAllgames();
      const users = userStore.getAllUsers();

      const numgames = games.length;
      const numusers = users.length;
      
      let numgenres = 0;
      for (let item of games) {
         numgenres += item.genres.length;
      }

      let average = 0;
      if (numgames > 0) {
        average = numgenres / numgames;
        average = average.toFixed(2);
      }

      let currentLargest = 0;
      let largestgameTitle = "";
      for (let game of games) {
        if (game.genres.length > currentLargest) {
          currentLargest = game.genres.length;
        }
      }
      for (let game of games) {
        if (game.genres.length === currentLargest) {
              largestgameTitle += game.title + " ";
        }
      }

      let currentSmallest = 1;
      if (numgames > 0) {
        currentSmallest = games[0].genres.length;
      } 
      let smallestgameTitle = "";

      for (let game of games) {
        if (game.genres.length < currentSmallest) {
          currentSmallest = game.genres.length;
        }
      }
      for (let game of games) {
        if (game.genres.length === currentSmallest) {
          smallestgameTitle += game.title + " ";
        }
      }

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: "Welcome to the game App!",
        totalgames: numgames,
        totalgenres: numgenres,
        totalusers: numusers,
        average: average,
        largest: largestgameTitle,
        smallest: smallestgameTitle,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      // render the start view and pass through the data
      response.render('start', viewData);
    } else {
      response.redirect('/');
    }
  },
};

// export the start module
export default start;
