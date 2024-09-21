'use strict';

// import all required modules
import logger from '../utils/logger.js';
import gameStore from '../models/game-store.js';
import accounts from './accounts.js';
import { v4 as uuidv4 } from 'uuid';


const game = {
  index(request, response) {
    const gameId = request.params.id;
    logger.debug('game id = ' + gameId);
    const loggedInUser = accounts.getCurrentUser(request);
    
    let game = gameStore.getgame(gameId)
    let totDuration = 0;
    for (let genre of game.genres) {
        totDuration += parseFloat(genre.duration)
    }
    const viewData = {
      title: 'game',
      game: game,
      Duration: totDuration,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
    response.render('game', viewData);
  },

  deletegenre(request, response) {
    const gameId = request.params.id;
    const genreId = request.params.genreid;
    logger.debug(`Deleting genre ${genreId} from game ${gameId}`);
    gameStore.removegenre(gameId, genreId);
    response.redirect('/game/' + gameId);
  },
  addgenre(request, response) {
    const gameId = request.params.id;
    const game = gameStore.getgame(gameId);
    const newgenre = {
      id: uuidv4(),
      title: request.body.title,
      developer: request.body.developer,
      publisher: request.body.publisher,
      genre: request.body.genre,
      release: request.body.release,
    };
    gameStore.addgenre(gameId, newgenre);
    response.redirect('/game/' + gameId);
  },
  updategenre(request, response) {
    const gameId = request.params.id;
    const genreId = request.params.genreid;
    logger.debug("updating genre " + genreId);
    const updatedgenre = {
      id: genreId,
      title: request.body.title,
      developer: request.body.developer,
      publisher: request.body.publisher,
      genre: request.body.genre,
      release: request.body.release,
    };
    gameStore.editgenre(gameId, genreId, updatedgenre);
    response.redirect('/game/' + gameId);
  }
};

export default game;