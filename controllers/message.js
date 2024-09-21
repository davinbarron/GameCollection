'use strict';

// import all required modules
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import messageStore from '../models/message-store.js';

// create message object
const message = {
  
// index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('message rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'メッセージ',
      messages: messageStore.getAllMessages(),
    };
    
    // render the message view and pass through the data
    logger.info('about to render', viewData.messages);
    response.render('message', viewData);
  },

  deleteMessage(request, response) {
    const messageId = request.params.id;
    logger.debug(`Deleting Message ${messageId}`);
    messageStore.removeMessage(messageId);
    response.redirect('/message');
  },
  
  addMessage(request, response) {
    const newMessage = {
      id: uuidv4(),
      name: request.body.name,
      message: request.body.message,
    };
    messageStore.addMessage(newMessage);
    response.redirect('/message');
  },
};

// export the message module
export default message;
