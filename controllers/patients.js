const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('patients')
      .find();

    const patients = await result.toArray();

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving patients'
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: 'Invalid patient ID'
      });
    }

    const patient = await mongodb
      .getDb()
      .collection('patients')
      .findOne({ _id: new ObjectId(patientId) });

    if (!patient) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving patient'
    });
  }
};
const createPatient = async (req, res) => {
  try {
    const patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      emergencyContact: req.body.emergencyContact,
      status: req.body.status
    };

    const response = await mongodb
      .getDb()
      .collection('patients')
      .insertOne(patient);

    res.status(201).json({
      message: 'Patient created successfully',
      patientId: response.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating patient'
    });
  }
};
const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: 'Invalid patient ID'
      });
    }

    const patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      emergencyContact: req.body.emergencyContact,
      status: req.body.status
    };

    const response = await mongodb
      .getDb()
      .collection('patients')
      .updateOne(
        { _id: new ObjectId(patientId) },
        { $set: patient }
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      message: 'Patient updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating patient'
    });
  }
};
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: 'Invalid patient ID'
      });
    }

    const response = await mongodb
      .getDb()
      .collection('patients')
      .deleteOne({ _id: new ObjectId(patientId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: 'Patient not found'
      });
    }

    res.status(200).json({
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error deleting patient'
    });
  }
};
module.exports = {
  getAll,
  getSingle,
  createPatient,
  updatePatient,
  deletePatient
};