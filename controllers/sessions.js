const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('sessions')
      .find();

    const sessions = await result.toArray();

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving sessions'
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const sessionId = req.params.id;

    if (!ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        message: 'Invalid session ID'
      });
    }

    const session = await mongodb
      .getDb()
      .collection('sessions')
      .findOne({ _id: new ObjectId(sessionId) });

    if (!session) {
      return res.status(404).json({
        message: 'Session not found'
      });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving session'
    });
  }
};

const createSession = async (req, res) => {
  try {
    const session = {
      patientId: req.body.patientId,
      sessionDate: req.body.sessionDate,
      sessionNumber: req.body.sessionNumber,
      sessionType: req.body.sessionType,
      reason: req.body.reason,
      notes: req.body.notes,
      nextSession: req.body.nextSession
    };

    const response = await mongodb
      .getDb()
      .collection('sessions')
      .insertOne(session);

    res.status(201).json({
      message: 'Session created successfully',
      sessionId: response.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating session'
    });
  }
};

const updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    if (!ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        message: 'Invalid session ID'
      });
    }

    const session = {
      patientId: req.body.patientId,
      sessionDate: req.body.sessionDate,
      sessionNumber: req.body.sessionNumber,
      sessionType: req.body.sessionType,
      reason: req.body.reason,
      notes: req.body.notes,
      nextSession: req.body.nextSession
    };

    const response = await mongodb
      .getDb()
      .collection('sessions')
      .updateOne(
        { _id: new ObjectId(sessionId) },
        { $set: session }
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: 'Session not found'
      });
    }

    res.status(200).json({
      message: 'Session updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating session'
    });
  }
};

const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    if (!ObjectId.isValid(sessionId)) {
      return res.status(400).json({
        message: 'Invalid session ID'
      });
    }

    const response = await mongodb
      .getDb()
      .collection('sessions')
      .deleteOne({ _id: new ObjectId(sessionId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: 'Session not found'
      });
    }

    res.status(200).json({
      message: 'Session deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error deleting session'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSession,
  updateSession,
  deleteSession
};
