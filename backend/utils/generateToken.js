import jwt from 'jsonwebtoken';

// '30d' -30 days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn:'30d'
  });
}

export default generateToken
