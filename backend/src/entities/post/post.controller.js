const { Post, Image, User } = require('../../models');
const { v4: uuid } = require('uuid');
const sequelize = require('sequelize');
const { post_errors } = require('../../errors/200-post');
const fs = require('fs');
const path = require('path');
const { image_errors } = require('../../errors/600-image');
const { internal_errors } = require('../../errors/500-internal');

module.exports = {
  async index(req, res) {
    try {
      // Variáveis de paginação
      const page = req.query.page ? parseInt(req.query.page) : 1; 
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
      const offset = (page - 1) * pageSize;

      // Variáveis de filtro
      const { mapCenter, mapSearchRadius, tag } = req.query;

      // Condições de filtro
      const whereConditions = { [sequelize.Op.and]: [] };

      // Filtro por localização
      if (mapCenter && Array.isArray(mapCenter) && mapCenter.length === 2 && mapSearchRadius) {
        const [longitude, latitude] = mapCenter;

        whereConditions[sequelize.Op.and].push(
          sequelize.literal(`
            ST_DistanceSphere(latlng, ST_MakePoint(${latitude}, ${longitude})) <= ${parseFloat(mapSearchRadius) * 1000}
          `)
        );
      }

      // Filtro por tags
      if (tag) {
        whereConditions[sequelize.Op.and].push(
          sequelize.literal(`
            array_to_string("tags", ',') LIKE '%${tag}%'
          `)
        );
      }

      // Busca
      const { count, rows } = await Post.findAndCountAll({
        include: [
          { model: Image },
          {
            model: User,
            attributes: ['name', 'email', 'id'],
          },
        ],
        where: whereConditions,
        order: [['updatedAt', 'DESC']],
        limit: pageSize,
        offset,
      });

      // resultados 
      return res.json({
        data: rows,
        pagination: {
          page,
          pageSize,
          totalPages: Math.ceil(count / pageSize),
          totalElements: count,
        },
      });
    } catch (error) {
      console.error('Error getting posts:', error);
      res.status(500).send();
    }
  },

  async get(req, res) {
    try {
      const post = await Post.findOne({
        where: { id: req.params.id },
        include: [
          { model: Image },
          { model: User, attributes: ['name', 'email', 'id'] },
        ],
      });

      return res.json(post);
    } catch (error) {
      console.log('error getting post', error);
      res.status(500).send();
    }
  },

  async create(req, res) {
    try {
      let {
        title,
        biome,
        fitofisionomia,
        userName,
        specie,
        genus,
        family,
        order,
        className,
        phylum,
        kingdom,
        country,
        city,
        weather,
        dateFound,
        description,
        latlng,
        tags,
        userId,
      } = req.body;
      biome = biome.toLowerCase();
      specie = specie.toLowerCase();
      genus = genus.toLowerCase();
      family = family.toLowerCase();
      order = order.toLowerCase();
      className = className.toLowerCase();
      phylum = phylum.toLowerCase();
      kingdom = kingdom.toLowerCase();

      const post = await Post.create({
        id: uuid(),
        title,
        biome,
        fitofisionomia,
        userName,
        specie,
        genus,
        family,
        order,
        className,
        phylum,
        kingdom,
        country,
        city,
        weather,
        dateFound,
        description,
        tags,
        latlng: { type: 'Point', coordinates: [latlng.lng, latlng.lat] }, //geojson format [lng, lat]
        userId,
      });
      return res.json(post.dataValues.id);
    } catch (error) {
      console.log('Error creating post', error);
      res.status(500).send();
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      return res.status(404).json({ code: 200, message: post_errors['200'] });
    }

    if (post.userId !== req.user_id) {
      return res
        .status(401)
        .json({ code: 501, message: internal_errors[501] });
    }

    const updatedPost = await post.update(req.body).catch(error => {
      console.log('error updating post: ', error);
      return res
        .status(500)
        .json({ code: 502, message: internal_errors[502] });
    });

    return res.status(200).json({ UpdatePost: updatedPost.dataValues });
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      // const user_id = req.headers.authorization;
      /*
      if(post.user_id !== user_id){
        return response.status(401).json({ message: 'Unauthorized user.'}); 
        // 401 - nao autorizado
      }
  
      */
      await Post.destroy({
        where: {
          id: id,
        },
      });

      return res.status(204).send(); // 204 - res sucesso sem conteudo
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  },

  async addPostImage(req, res) {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id,
      },
    }).catch(error => {
      console.log(error);
      res.status(500).json(error);
    });

    if (!post) {
      return res.status(404).json({ code: 200, message: post_errors['200'] });
    }
    if (req.files == null) {
      return res.status(400).json({ code: 201, message: post_errors['201'] });
    }

    const created_images = [];
    for (element in req.files) {
      await Image.create({
        id: uuid(),
        url: req.files[element].filename,
        postId: id,
      })
        .then(created_image => {
          created_images.push(created_image);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json(error);
        });
    }

    return res.status(200).json({ AddPostImage: created_images });
  },

  // testar já implementando a funcionalidade no frontend...
  async deletePostImage(req, res) {
    const { id } = req.params;

    const image = await Image.findOne({
      where: {
        id: id,
      },
    }).catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });

    if (!image) {
      return res.status(404).json({ code: 203, message: post_errors['203'] });
    }

    const postImages = await Image.findAll({
      where: {
        postId: image.postId,
      },
    }).catch(error => {
      console.log(error);
      return res.status(500).json(error);
    });

    if (postImages.length <= 1) {
      return res.status(400).json({ code: 204, message: post_errors['204'] });
    }

    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'images',
      image.url
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(500).json({
        code: 601,
        message: image_errors['601'],
      });
    }

    fs.unlink(imagePath, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          code: 602,
          message: image_errors[602],
        });
      }

      await Image.destroy({
        where: {
          id: id,
        },
      }).catch(error => {
        console.log(error);
        return res.status(500).json({
          code: 602,
          message: image_errors[602],
        });
      });
    });

    return res.status(204).send();
  },
};
