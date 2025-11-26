const { post_errors } = require("../../errors/200-post");
const { Comment, Post, User, UserResolvedContestation } = require("../../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params;
      let post = null;
      try {
        post = await Post.findByPk(id);
      } catch (error) {
        console.log("returning error: ", {
          code: 500,
          message: "Error getting post",
        });
        return res
          .status(500)
          .send({ code: 500, message: "Error getting post" });
      }

      let comments = null;
      if (!post) {
        console.log("returning error: ", post_errors["200"]);
        return res.status(404).send({ code: 200, message: post_errors["200"] });
      }

      try {
        comments = await Comment.findAll({
          include: [
            { model: UserResolvedContestation },
            {
              model: User,
              attributes: ["name", "id"],
            },
          ],
          where: {
            postId: post.dataValues.id,
          },
          order: [["createdAt", "ASC"]],
        });
      } catch (error) {
        console.log("error getting comments", error);
        return res.status(500).send();
      }

      return res.json(comments);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
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
        userId,
      } = req.body;

      const { id } = req.params;

      const comment = await Comment.create({
        id: uuid(),
        userName,
        type,
        description,
        resolvedAmount: 0,
        postId: id,
        userId,
      });

      return res.json(comment.dataValues.id);
    } catch (error) {
      console.log("error:", error);
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
          id,
        },
      });

      return res.status(204).send(); // 204 - res sucesso sem conteudo
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).send();
    }
  },
};
