'use strict';

// import express and initialise router
import express from 'express';
const router = express.Router();

// import controllers
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import contact from './controllers/contact.js';
import message from './controllers/message.js';
import game from './controllers/game.js';
import accounts from './controllers/accounts.js';

// connect routes to controllers
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/contact', contact.index);
router.get('/message', message.index);
router.get('/game/:id', game.index);

router.get('/game/:id/deletegenre/:genreid', game.deletegenre);
router.get('/dashboard/deletegame/:id', dashboard.deletegame);

router.post('/game/:id/addgenre', game.addgenre);
router.post('/dashboard/addgame', dashboard.addgame);
router.post('/game/:id/updategenre/:genreid', game.updategenre);

router.post('/message/addmessage', message.addMessage);
router.get('/message/deletemessage', message.deleteMessage);

// export router module
export default router;