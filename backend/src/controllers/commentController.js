const { Comment, Post,User, Contestation } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params;
      //console.log('ID PARAM INDEX:::::::::',id)
      const post = await Post.findByPk(id);

      var comments = null;
      try {
        comments = await Comment.findAll({
          include:[
            {model: Contestation},
            {model: User, attributes: ["firstName","lastName", "email", "id"]}
          ],
          where: {
            PostId: post.dataValues.id
          },
          order: [['createdAt', 'ASC']]
        });
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }

      return res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  },

  // async get(req, res){
  //   try {
  //     const post = await Comment.findOne({ where: { id: req.params.id } });

  //     return res.json(post);
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).send();
  //   }
  // },

  async create(req, res) {
    try {
      const { 
        userName,
        type,
        description,
        contestation,
        userId
      } = req.body;

      const { PostId } = req.params;

      const comment = await Comment.create({
        userName,
        type,
        description,
        contestation,
        PostId,
        UserId:userId
      }); 
      
      return res.json(comment.dataValues.id); 
    } catch (error) {
      console.log('MENSAGEM:', error.message);
      console.log(error);
      res.status(500).send();
    }
  },

  // async updateContestation(req, res) {
  //   try {
  //     const { commentId, contestation } = req.body;
  //     const comment = await Comment.findByPk(commentId);
  //     console.log('TESTETESTE', commentId, contestation);

  //     comment.contestation = contestation;

  //     await comment.save();

  //     return res.json(comment);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send();
  //   }
  // },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Comment.destroy({
        where: {
          id: id
        }
      });

      return res.status(204).send(); // 204 - res sucesso sem conteudo
    } catch (error) {
      console.log('MENSAGEM: ', error.message);
      res.status(500).send();
    }
  }
};
