'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const messageStore = {

  store: new JsonStore('./models/message-store.json', { messageCollection: [] }),
  collection: 'messageCollection',

  getAllMessages() {
    return this.store.findAll(this.collection);
  },
  
  getMessage(id) {
    return this.store.findOneBy(this.collection, (collection => collection.id === id));
  },
  
  addMessage(message) {
    this.store.addCollection(this.collection, message);
  },
  
  removeMessage(id) {
    const message = this.getMessage(id);
    this.store.removeCollection(this.collection, message);
  },
  
  removeAllMessages() {
    this.store.removeAll(this.collection);
  },

};

export default messageStore;