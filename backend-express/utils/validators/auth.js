const { body } = require('express-validator'); //* import express-validator
const prisma = require('../../prisma/client');

//* define validate for register
const validatorRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (value) => {
      if (!value) {
        throw new Error('Email is required');
      }
      const user = await prisma.users.findUnique({ where: { email: value } });
      if (user) {
        throw new Error('Email already exists');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

//* define validate for login
const validateLogin = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  validatorRegister,
  validateLogin,
};
