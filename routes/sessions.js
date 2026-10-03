const express = require('express');
const router = express.Router();

const sessionsController = require('../controllers/sessions');

const {
  sessionValidationRules,
  validate
} = require('../validation/sessions');
const { isAuthenticated } = require('../middleware/auth');

// GET all sessions
router.get(
  '/',
  /*
    #swagger.tags = ['Sessions']
    #swagger.summary = 'Get all sessions'
    #swagger.description = 'Returns all fictitious psychology sessions stored in the database.'

    #swagger.responses[200] = {
      description: 'Sessions retrieved successfully'
    }
    #swagger.responses[500] = {
      description: 'Error retrieving sessions'
    }
  */
  sessionsController.getAll
);

// GET session by ID
router.get(
  '/:id',
  /*
    #swagger.tags = ['Sessions']
    #swagger.summary = 'Get session by ID'
    #swagger.description = 'Returns one session using the MongoDB session ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB session ID',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Session retrieved successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid session ID'
    }
    #swagger.responses[404] = {
      description: 'Session not found'
    }
  */
  sessionsController.getSingle
);

// CREATE session
router.post(
  '/',
  /*
    #swagger.tags = ['Sessions']
    #swagger.summary = 'Create a new session'
    #swagger.description = 'Creates a new fictitious psychology session.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Session information',
      required: true,
      schema: {
        patientId: '6ab5db08ddfc9487b7b8fcd3',
        sessionDate: '2026-09-25',
        sessionNumber: 2,
        sessionType: 'Individual',
        reason: 'Follow-up for anxiety management',
        notes: 'Fictitious session for academic purposes.',
        nextSession: '2026-10-02'
      }
    }

    #swagger.responses[201] = {
      description: 'Session created successfully'
    }
    #swagger.responses[400] = {
      description: 'Validation error'
    }
    #swagger.responses[500] = {
      description: 'Error creating session'
    }
  */
  isAuthenticated,
  sessionValidationRules(),
  validate,
  sessionsController.createSession
);

// UPDATE session
router.put(
  '/:id',
  /*
    #swagger.tags = ['Sessions']
    #swagger.summary = 'Update a session'
    #swagger.description = 'Updates an existing fictitious psychology session.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB session ID',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated session information',
      required: true,
      schema: {
        patientId: '6ab5db08ddfc9487b7b8fcd3',
        sessionDate: '2026-09-25',
        sessionNumber: 2,
        sessionType: 'Individual',
        reason: 'Follow-up for anxiety management',
        notes: 'Patient showed improvement. Fictitious data for academic purposes.',
        nextSession: '2026-10-09'
      }
    }

    #swagger.responses[200] = {
      description: 'Session updated successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid data or session ID'
    }
    #swagger.responses[404] = {
      description: 'Session not found'
    }
    #swagger.responses[500] = {
      description: 'Error updating session'
    }
  */
  isAuthenticated,
  sessionValidationRules(),
  validate,
  sessionsController.updateSession
);

// DELETE session
router.delete(
  '/:id',
  /*
    #swagger.tags = ['Sessions']
    #swagger.summary = 'Delete a session'
    #swagger.description = 'Deletes a session using the MongoDB session ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB session ID',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Session deleted successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid session ID'
    }
    #swagger.responses[404] = {
      description: 'Session not found'
    }
    #swagger.responses[500] = {
      description: 'Error deleting session'
    }
  */
  isAuthenticated,
  sessionsController.deleteSession
);

module.exports = router;