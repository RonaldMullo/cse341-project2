    const { body, validationResult } = require('express-validator');

const sessionValidationRules = () => {
  return [
    body('patientId')
      .notEmpty()
      .withMessage('Patient ID is required')
      .custom((value) => {
        const { ObjectId } = require('mongodb');
        return ObjectId.isValid(value);
      })
      .withMessage('Patient ID must be valid'),

    body('sessionDate')
      .notEmpty()
      .withMessage('Session date is required')
      .isISO8601()
      .withMessage('Session date must be a valid date'),

    body('sessionNumber')
      .notEmpty()
      .withMessage('Session number is required')
      .isInt({ min: 1 })
      .withMessage('Session number must be a positive integer'),

    body('sessionType')
      .trim()
      .notEmpty()
      .withMessage('Session type is required'),

    body('reason')
      .trim()
      .notEmpty()
      .withMessage('Reason is required'),

    body('notes')
      .trim()
      .notEmpty()
      .withMessage('Notes are required'),

    body('nextSession')
      .notEmpty()
      .withMessage('Next session date is required')
      .isISO8601()
      .withMessage('Next session must be a valid date')
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
  sessionValidationRules,
  validate
};