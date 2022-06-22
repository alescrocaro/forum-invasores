const jwt = require('jsonwebtoken');

module.exports = {
  generateJwt(id, firstName, lastName, email) {
    const jwtSecret = 'secret';
    const token = jwt.sign(
      {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email
      },
      jwtSecret
    );
    return token;
  }
};
