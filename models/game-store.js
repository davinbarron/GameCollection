'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

import cloudinary from 'cloudinary';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const gameStore = {

  store: new JsonStore('./models/game-store.json', { gameCollection: [] }),
  collection: 'gameCollection',

  getAllgames() {
    return this.store.findAll(this.collection);
  },
  
  getgame(id) {
    return this.store.findOneBy(this.collection, (collection => collection.id === id));
  },
  
  removegenre(id, genreId) {
    const arrayName = "genres";
    this.store.removeItem(this.collection, id, arrayName, genreId);
  },
  
  removegame(id) {
    const game = this.getgame(id);
    this.store.removeCollection(this.collection, game);
  },
  
  removeAllgames() {
    this.store.removeAll(this.collection);
  },
  
    //updated
  async addgame(game, response) {
  function uploader(){
    return new Promise(function(resolve, reject) {  
      cloudinary.uploader.upload(game.picture.tempFilePath,function(result,err){
        if(err){console.log(err);}
        resolve(result);
      });
    });
  }
  let result = await uploader();
  logger.info('cloudinary result', result);
  game.picture = result.url;

  this.store.addCollection(this.collection, game);
  response();
},

  addgenre(id, genre) {
    const arrayName = "genres";
    this.store.addItem(this.collection, id, arrayName, genre);
  },
  
  editgenre(id, genreId, updatedgenre) {
    const arrayName = "genres";
    this.store.editItem(this.collection, id, genreId, arrayName, updatedgenre);
  },
  
  getUsergames(userid) {
    return this.store.findBy(this.collection, (game => game.userid === userid));
  },

};

export default gameStore;