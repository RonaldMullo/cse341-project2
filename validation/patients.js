const { body, validationResult } = require('express-validator');

const patientValidationRules = () => {
  return [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required'),

    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required'),

    body('birthDate')
      .notEmpty()
      .withMessage('Birth date is required')
      .isISO8601()
      .withMessage('Birth date must be a valid date'),

    body('gender')
      .trim()
      .notEmpty()
      .withMessage('Gender is required'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be valid'),

    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone is required'),

    body('emergencyContact')
      .trim()
      .notEmpty()
      .withMessage('Emergency contact is required'),

    body('status')
      .trim()
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['Active', 'Inactive'])
      .withMessage('Status must be Active or Inactive')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  patientValidationRules,
  validate
};