const express = require('express');
const routes = express.Router();
const postController = require('./entities/post/post.controller');
const commentController = require('./entities/comment/comment.controller');
const userController = require('./entities/user/user.controller');
const contestationController = require('./entities/contestation/contestation.controller');
const { uploadSpecieImages, uploadProfilePicture } = require("./services/upload");
const { validateUpdatePost } = require('./entities/post/post.validator');
const { authenticateToken } = require('./services/jwtService');

routes.get('/posts', postController.index);
routes.get('/posts/:id', postController.get);
routes.post('/posts', uploadSpecieImages, postController.create);
routes.delete('/posts/:id', postController.delete);
routes.patch(
  '/posts/:id',
  authenticateToken,
  validateUpdatePost,
  postController.update
);
routes.post(
  '/posts/:id/image',
  authenticateToken,
  uploadSpecieImages,
  postController.addPostImage
);
routes.delete(
  '/posts/image/:id',
  authenticateToken,
  postController.deletePostImage
);

// COMMENTS
routes.get('/posts/:id/comments', commentController.index);
routes.post('/posts/:id/comments', commentController.create);
routes.delete('/posts/:id/comments/:id', commentController.delete);
// routes.post('/posts/:id/comments/updateContestation', commentController.updateContestation);

// USER ROUTES
routes.get('/users/:id', userController.get);
routes.post('/users', userController.create);
routes.post('/login', userController.login);
routes.post(
  '/users/:id/profile-picture',
  authenticateToken,
  uploadProfilePicture,
  userController.uploadProfilePicture
);
routes.get('/users/:id/profile-pic', userController.getProfilePicture);

// CONTESTATION
routes.post('/resolve-contestation', contestationController.create);

module.exports = routes;
