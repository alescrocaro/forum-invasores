const { Post, User, Comment } = require('../models');
const { hashPassword, passwordValidation } = require('../services/hash');
const { generateJwt } = require('../services/jwtService');

module.exports = {
  async get(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const user = await User.findByPk(id);

      if (!user) return res.status(400).json({ error: 'User not found' });
      delete user['password'];
      delete user['salt'];

      ////////////// descobrir reino com mais posts do usuário //////////////
      let topKingdomPost = [];

      const animaliaPosts = await Post.findAll({
        where: {
          UserId: id,
          kingdom: 'animalia'
        }
      });
      topKingdomPost.push(animaliaPosts.length);

      const protozoaPosts = await Post.findAll({
        where: {
          UserId: id,
          kingdom: 'protozoa'
        }
      });
      topKingdomPost.push(protozoaPosts.length);

      const plantaePosts = await Post.findAll({
        where: {
          UserId: id,
          kingdom: 'plantae'
        }
      });
      topKingdomPost.push(plantaePosts.length);

      const moneraPosts = await Post.findAll({
        where: {
          UserId: id,
          kingdom: 'monera'
        }
      });
      topKingdomPost.push(moneraPosts.length);

      const fungiPosts = await Post.findAll({
        where: {
          UserId: id,
          kingdom: 'fungi'
        }
      });
      topKingdomPost.push(fungiPosts.length);

      let maxPost = [0, 0];
      for (let i = 0; i < topKingdomPost.length; i++) {
        if (topKingdomPost[i] > maxPost[0]) {
          maxPost[0] = i;
          maxPost[1] = topKingdomPost[i];
        }
      }

      user.dataValues['topKingdomPostsAPI'] = maxPost;

      //////////////////////////////////////////////////////////////////////

      /////////////////////// Top Comments /////////////////////////////////

      let allKingdomComment = [];

      const userComments = await Comment.findAll({
        where: {
          UserId: id,
          type: 'comment'
        }
      });

      var commentInfo = [0, 0, 0, 0, 0];
      for (let i = 0; i < userComments.length; i++) {
        allKingdomComment[i] = await Post.findOne({
          where: {
            id: userComments[i].dataValues.PostId
          }
        });

        switch (allKingdomComment[i].dataValues.kingdom) {
          case 'animalia':
            commentInfo[0] += 1;
            break;
          case 'protozoa':
            commentInfo[1] += 1;
            break;
          case 'plantae':
            commentInfo[2] += 1;
            break;
          case 'monera':
            commentInfo[3] += 1;
            break;
          case 'fungi':
            commentInfo[4] += 1;
            break;
        }
      }

      let maxComment = [0, 0];
      for (let i = 0; i < commentInfo.length; i++) {
        if (commentInfo[i] > maxComment[0]) {
          maxComment[0] = i;
          maxComment[1] = commentInfo[i];
        }
      }

      user.dataValues['commentInfo'] = maxComment;

      //////////////////////////////////////////////////////////////////////

      /////////////////////// Top Contestation /////////////////////////////

      let allKingdomContestation = [];
      const userContestations = await Comment.findAll({
        where: {
          UserId: id,
          type: 'contestation'
        }
      });

      var contestationInfo = [0, 0, 0, 0, 0];
      for (let i = 0; i < userContestations.length; i++) {
        allKingdomContestation[i] = await Post.findOne({
          where: {
            id: userContestations[i].dataValues.PostId
          }
        });

        switch (allKingdomContestation[i].dataValues.kingdom) {
          case 'animalia':
            contestationInfo[0] += 1;
            break;
          case 'protozoa':
            contestationInfo[1] += 1;
            break;
          case 'plantae':
            contestationInfo[2] += 1;
            break;
          case 'monera':
            contestationInfo[3] += 1;
            break;
          case 'fungi':
            contestationInfo[4] += 1;
            break;
        }
      }

      let maxContestation = [0, 0];
      for (let i = 0; i < contestationInfo.length; i++) {
        if (contestationInfo[i] > maxContestation[0]) {
          maxContestation[0] = i;
          maxContestation[1] = contestationInfo[i];
        }
      }

      user.dataValues['contestationInfo'] = maxContestation;

      //////////////////////////////////////////////////////////////////////

      /////////////////////// Somas contribuicois //////////////////////////

      let contributionsInfo = [0, 0, 0, 0, 0];

      for (let i = 0; i < contestationInfo.length; i++) {
        contributionsInfo[i] =
          topKingdomPost[i] + commentInfo[i] + contestationInfo[i];
      }

      user.dataValues['contributionsInfo'] = contributionsInfo;

      //
      //
      //
      //
      //

      res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ error: 'internal error' });
    }
  },

  async create(req, res) {
    const { firstName, lastName, email, password, bio } = req.body;
    if (email === null || password === null)
      return res
        .status(401)
        .json({ error: 'email and password should not be empty' });
    if (password.length < 6)
      return res
        .status(401)
        .json({ error: 'Password should be bigger than 6 digits' });

    try {
      const userFound = await User.findAll({ where: { email: email } });
      if (userFound.length > 0)
        return res.status(400).json({ error: 'Email is already registered' });

      const { hash, salt } = hashPassword(password);

      User.create({
        firstName,
        lastName,
        email,
        password: hash,
        salt: salt,
        bio
      });

      return res.status(200).json(200);
    } catch (e) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const data = await User.findOne({
        where: { email: email }
      });
      if (!data) return res.status(401).json({ error: 'User not found' });
      const user = data.dataValues;
      //console.log(user);
      const isValid = passwordValidation(password, user.password, user.salt);
      if (!isValid) return res.status(401).json({ error: 'password invalid' });

      const token = generateJwt(
        user.id,
        user.firstName,
        user.lastName,
        user.email
      );
      res.status(200).json({ token: token });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: 'Internal error' });
    }
  },

  async deleteAll(req, res) {
    try {
      await User.destroy({
        where: {},
        truncate: true
      });
      console.log('deleteall try');
    } catch (error) {
      console.log('deleteall catch');
      console.log(error);
    }
  }
};
