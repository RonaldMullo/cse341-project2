const express = require('express');
const router = express.Router();

const patientsController = require('../controllers/patients');

const {
  patientValidationRules,
  validate
} = require('../validation/patients');

// GET all patients
router.get(
  '/',
  /*
    #swagger.tags = ['Patients']
    #swagger.summary = 'Get all patients'
    #swagger.description = 'Returns all fictitious patients stored in the database.'
    #swagger.responses[200] = {
      description: 'Patients retrieved successfully'
    }
    #swagger.responses[500] = {
      description: 'Error retrieving patients'
    }
  */
  patientsController.getAll
);

// GET patient by ID
router.get(
  '/:id',
  /*
    #swagger.tags = ['Patients']
    #swagger.summary = 'Get patient by ID'
    #swagger.description = 'Returns one patient using the MongoDB patient ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB patient ID',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Patient retrieved successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid patient ID'
    }
    #swagger.responses[404] = {
      description: 'Patient not found'
    }
  */
  patientsController.getSingle
);

// CREATE patient
router.post(
  '/',
  /*
    #swagger.tags = ['Patients']
    #swagger.summary = 'Create a new patient'
    #swagger.description = 'Creates a new fictitious psychology clinic patient.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Patient information',
      required: true,
      schema: {
        firstName: 'Lucia',
        lastName: 'Herrera',
        birthDate: '1997-04-22',
        gender: 'Female',
        email: 'lucia.herrera@example.com',
        phone: '0990000006',
        emergencyContact: 'Pedro Herrera',
        status: 'Active'
      }
    }

    #swagger.responses[201] = {
      description: 'Patient created successfully'
    }
    #swagger.responses[400] = {
      description: 'Validation error'
    }
    #swagger.responses[500] = {
      description: 'Error creating patient'
    }
  */
  patientValidationRules(),
  validate,
  patientsController.createPatient
);

// UPDATE patient
router.put(
  '/:id',
  /*
    #swagger.tags = ['Patients']
    #swagger.summary = 'Update a patient'
    #swagger.description = 'Updates an existing fictitious patient.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB patient ID',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated patient information',
      required: true,
      schema: {
        firstName: 'Lucia',
        lastName: 'Herrera',
        birthDate: '1997-04-22',
        gender: 'Female',
        email: 'lucia.herrera@example.com',
        phone: '0991111111',
        emergencyContact: 'Pedro Herrera',
        status: 'Inactive'
      }
    }

    #swagger.responses[200] = {
      description: 'Patient updated successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid data or patient ID'
    }
    #swagger.responses[404] = {
      description: 'Patient not found'
    }
    #swagger.responses[500] = {
      description: 'Error updating patient'
    }
  */
  patientValidationRules(),
  validate,
  patientsController.updatePatient
);

// DELETE patient
router.delete(
  '/:id',
  /*
    #swagger.tags = ['Patients']
    #swagger.summary = 'Delete a patient'
    #swagger.description = 'Deletes a patient using the MongoDB patient ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB patient ID',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Patient deleted successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid patient ID'
    }
    #swagger.responses[404] = {
      description: 'Patient not found'
    }
    #swagger.responses[500] = {
      description: 'Error deleting patient'
    }
  */
  patientsController.deletePatient
);

module.exports = router;