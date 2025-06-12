const {
  Post,
  User,
  Comment,
  UserResolvedContestation,
} = require('../../models');
const { hashPassword, passwordValidation } = require('../../services/hash');
const { generateJwt } = require('../../services/jwtService');
const { user_errors } = require('../../errors/100-user');
const { v4: uuid } = require('uuid');
const path = require('path');

async function get(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'bio'],
    });

    if (!user) return res.status(400).json({ error: 'User not found' });

    const allPosts = await Post.findAll({
      where: {
        userId: id,
        kingdom: [
          'animalia',
          'protozoa',
          'plantae',
          'bacteria',
          'fungi',
          'chromista',
        ],
      },
    });

    const posts = allPosts.map(post => {
      return post.dataValues;
    });

    const allComments = await Comment.findAll({
      where: {
        userId: id,
        type: ['COMMENT', 'CONTESTATION'],
      },
      include: [
        {
          model: Post,
          attributes: ['kingdom'],
        },
      ],
    });

    const contestations = allComments
      .map(comment => comment.dataValues)
      .filter(comment => comment.type === 'CONTESTATION');
    const comments = allComments
      .map(comment => comment.dataValues)
      .filter(comment => comment.type === 'COMMENT');

    const postKingdoms = posts.reduce(
      (acc, post) => {
        const kingdom = post.kingdom || 'unknown';
        acc[kingdom] = (acc[kingdom] || 0) + 1;
        return acc;
      },
      {
        animalia: 0,
        protozoa: 0,
        plantae: 0,
        bacteria: 0,
        fungi: 0,
        chromista: 0,
      }
    );

    const topPostKingdom = Object.keys(postKingdoms).reduce((a, b) =>
      postKingdoms[a] > postKingdoms[b] ? a : b
    );

    const commentKingdoms = comments.reduce(
      (acc, comment) => {
        const kingdom = comment.Post.kingdom || 'unknown';
        acc[kingdom] = (acc[kingdom] || 0) + 1;
        return acc;
      },
      {
        animalia: 0,
        protozoa: 0,
        plantae: 0,
        bacteria: 0,
        fungi: 0,
        chromista: 0,
      }
    );

    const topCommentKingdom = Object.keys(commentKingdoms).reduce((a, b) =>
      commentKingdoms[a] > commentKingdoms[b] ? a : b
    );

    const contestationKingdoms = contestations.reduce(
      (acc, contestation) => {
        const kingdom = contestation.Post.kingdom || 'unknown';
        acc[kingdom] = (acc[kingdom] || 0) + 1;
        return acc;
      },
      {
        animalia: 0,
        protozoa: 0,
        plantae: 0,
        bacteria: 0,
        fungi: 0,
        chromista: 0,
      }
    );

    const topContestationKingdom = Object.keys(contestationKingdoms).reduce(
      (a, b) => (contestationKingdoms[a] > contestationKingdoms[b] ? a : b)
    );

    const statistics = {
      animalia: {
        totalCount:
          postKingdoms.animalia +
          commentKingdoms.animalia +
          contestationKingdoms.animalia,
        postsCount: postKingdoms.animalia,
        commentsCount: commentKingdoms.animalia,
        contestationsCount: contestationKingdoms.animalia,
      },
      protozoa: {
        totalCount:
          postKingdoms.protozoa +
          commentKingdoms.protozoa +
          contestationKingdoms.protozoa,
        postsCount: postKingdoms.protozoa,
        commentsCount: commentKingdoms.protozoa,
        contestationsCount: contestationKingdoms.protozoa,
      },
      plantae: {
        totalCount:
          postKingdoms.plantae +
          commentKingdoms.plantae +
          contestationKingdoms.plantae,
        postsCount: postKingdoms.plantae,
        commentsCount: commentKingdoms.plantae,
        contestationsCount: contestationKingdoms.plantae,
      },
      bacteria: {
        totalCount:
          postKingdoms.bacteria +
          commentKingdoms.bacteria +
          contestationKingdoms.bacteria,
        postsCount: postKingdoms.bacteria,
        commentsCount: commentKingdoms.bacteria,
        contestationsCount: contestationKingdoms.bacteria,
      },
      fungi: {
        totalCount:
          postKingdoms.fungi +
          commentKingdoms.fungi +
          contestationKingdoms.fungi,
        postsCount: postKingdoms.fungi,
        commentsCount: commentKingdoms.fungi,
        contestationsCount: contestationKingdoms.fungi,
      },
      chromista: {
        totalCount:
          postKingdoms.chromista +
          commentKingdoms.chromista +
          contestationKingdoms.chromista,
        postsCount: postKingdoms.chromista,
        commentsCount: commentKingdoms.chromista,
        contestationsCount: contestationKingdoms.chromista,
      },
      topPostKingdom: {
        name: topPostKingdom,
        count: postKingdoms[topPostKingdom],
      },
      topCommentKingdom: {
        name: topCommentKingdom,
        count: commentKingdoms[topCommentKingdom],
      },
      topContestationKingdom: {
        name: topContestationKingdom,
        count: contestationKingdoms[topContestationKingdom],
      },
      totalPosts: posts.length,
      totalComments: comments.length,
      totalContestations: contestations.length,
      totalContributions: posts.length + comments.length + contestations.length,
    };

    res.status(200).json({ user, statistics });
  } catch (e) {
    console.error('Error fetching user:', e);
    return res.status(500).json({ error: 'internal error' });
  }
}

/**
 * Validates the input for creating an account.
 *
 * @param {string} email - the email input
 * @param {string} password - the password input
 * @return {type} object or boolean - an error object or false
 */
function validateCreateAccountInput(email, password) {
  if (email === null || password === null) {
    return { status: 401, code: 104, message: user_errors[104] };
  }
  if (password.length < 6) {
    return res.status(401).json({ code: 103, message: user_errors[103] });
  }

  return false;
}

async function create(req, res) {
  const { name, email, password, bio } = req.body;

  const validationError = validateCreateAccountInput(email, password);

  if (validationError) {
    return res
      .status(validationError.status)
      .json({ code: validationError.code, message: validationError.message });
  }

  const userFound = await User.findOne({ where: { email: email } }).catch(
    error => {
      console.log('error getting user', error);
      return res.status(500).json({ code: 102, message: user_errors[102] });
    }
  );

  if (userFound) {
    return res.status(400).json({ code: 100, message: user_errors[100] });
  }
  const { hash, salt } = hashPassword(password);

  return await User.create({
    id: uuid(),
    name,
    email,
    password: hash,
    salt,
    bio,
    profilePicture: 'profile.jpg',
  })
    .then(() => {
      return res.status(200).json(200);
    })
    .catch(e => {
      console.log(e);
      return res
        .status(500)
        .json({ code: 500, message: 'Error creating user' });
    });
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const data = await User.findOne({
      where: { email: email },
    });
    if (!data) {
      console.log('user not found');
      return res.status(401).json({ code: 101, message: user_errors[101] });
    }
    const user = data.dataValues;

    const isValid = passwordValidation(password, user.password, user.salt);
    if (!isValid) return res.status(401).json({ message: 'password invalid' });

    const token = generateJwt(user.id, user.name, user.email);
    res.status(200).json({ token: token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal error' });
  }
}

async function uploadProfilePicture(req, res) {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const profilePicturePath = `/uploads/images/${req.file.filename}`;

    // Atualiza o registro de foto de perfil no banco de dados
    await User.update(
      { profilePicture: profilePicturePath },
      { where: { id } }
    );

    return res.status(200).json({ profilePicture: profilePicturePath });
  } catch (error) {
    console.error('Erro ao fazer upload da foto de perfil:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function getProfilePicture(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user || !user.profilePicture) {
      return res.status(404).json({ error: 'Imagem de perfil não encontrada' });
    }
    const imagePath = path.join(
      __dirname,
      '../../../uploads/images',
      path.basename(user.profilePicture)
    );
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Erro ao buscar a imagem de perfil:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = {
  get,
  create,
  login,
  validateCreateAccountInput,
  uploadProfilePicture,
  getProfilePicture,
};
