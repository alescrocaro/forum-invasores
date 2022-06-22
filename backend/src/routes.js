const express = require('express');
const routes = express.Router();
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');

const uploadService = require('./services/upload');

routes.get('/posts', postController.index);
routes.get('/posts/:id', postController.get);
routes.post('/posts', uploadService, postController.create);
routes.delete('/posts/:id', postController.delete);

routes.post(
  '/updatePostImage/:id',
  uploadService,
  postController.updatePostImage
);
/*
routes.post('/posts', postController.update);
*/

// COMMENTS
routes.get('/posts/:id/comments', commentController.index);
routes.post('/posts/:PostId/comments', commentController.create);
routes.delete('/posts/:id/comments/:id', commentController.delete);
routes.post(
  '/posts/:id/comments/updateContestation',
  commentController.updateContestation
);

// USER ROUTES
routes.get('/users/:id', userController.get);
routes.post('/users', userController.create);
routes.post('/login', userController.login);
routes.delete('/usersDelete', userController.deleteAll);

module.exports = routes;
