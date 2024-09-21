'use strict';

// import all required modules
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import gameStore from '../models/game-store.js';
import accounts from "./accounts.js";

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: 'ゲームアプリのダッシュボード',
        games: gameStore.getUsergames(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      logger.info("about to render" + viewData.games);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },
  
  deletegame(request, response) {
    const gameId = request.params.id;
    logger.debug(`Deleting game ${gameId}`);
    gameStore.removegame(gameId);
    response.redirect('/dashboard');
  },
  
    addgame(request, response) {
      const date = new Date();
      const loggedInUser = accounts.getCurrentUser(request);
      const newgame = {
        id: uuidv4(),
        title: request.body.title,
        series: request.body.series,
        genres: [],
        userid: loggedInUser.id,
        picture: request.files.picture,
        date: date,
      };
      logger.debug("新しいゲームの作成" + newgame);
      gameStore.addgame(newgame, function() {
        response.redirect("/dashboard");
      });
  },

};

// export the dashboard module
export default dashboard;