'use strict';
const Patient = require('../models/patient');
const Attachment = require('../models/attachment');

exports.listAllPatients = async (req, res) => {
  try {
    let result = await Patient.find({ isDeleted: false }).populate('img')
    let count = await Patient.find({ isDeleted: false }).count();
    res.status(200).send({
      success: true,
      count: count,
      data: result
    });
    if (result.length === 0) return res.status(404).send({ error: true, message: 'No Record Found!' })
  } catch (error) {
    return res.status(500).send({ error: true, message: error.message });
  }
};

exports.getPatient = async (req, res) => {
  const result = await Patient.find({ _id: req.params.id, isDeleted: false }).populate('img')
  if (result.length === 0 )
    return res.status(500).json({ error: true, message: 'No Record Found' });
  return res.status(200).send({ success: true, data: result });
};

exports.createPatient = async (req, res, next) => {
  let data = req.body;
  let files = req.files;
  try {
    //prepare CUS-ID
    const latestDocument = await Patient.find({}, { seq: 1 }).sort({ _id: -1 }).limit(1).exec();
    if (latestDocument.length === 0) data = { ...data, seq: '1', patientID: "CUS-1" } // if seq is undefined set initial patientID and seq
    if (latestDocument.length) {
      const increment = latestDocument[0].seq + 1
      data = { ...data, patientID: "CUS-" + increment, seq: increment }
    }

    //img preparation
    if (files.img) {
      let imgPath = files.img[0].path.split('cherry-k')[1];
      const attachData = {
        fileName: files.img[0].originalname,
        imgUrl: imgPath,
        image: imgPath.split('\\')[2]
      };
      const newAttachment = new Attachment(attachData);
      const attachResult = await newAttachment.save();
      data = { ...data, img: attachResult._id.toString() };
    } //prepare img and save it into attachment schema

    const newPatient = new Patient(data);
    const result = await newPatient.save();
    res.status(200).send({
      message: 'Patient create success',
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(500).send({ "error": true, message: error.message })
  }
};

exports.updatePatient = async (req, res, next) => {
  let data = req.body
  try {
    data = { ...data, updatedAt: Date.now() } // updating updatedAt
    const result = await Patient.findOneAndUpdate(
      { _id: data.id },
      data,
      { new: true },
    ).populate('img')
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(500).send({ "error": true, "message": error.message })
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const result = await Patient.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true },
      { new: true },
    );
    return res.status(200).send({ success: true, data: { isDeleted: result.isDeleted } });
  } catch (error) {
    return res.status(500).send({ "error": true, "message": error.message })

  }
};

exports.activatePatient = async (req, res, next) => {
  try {
    const result = await Patient.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: false },
      { new: true },
    );
    return res.status(200).send({ success: true, data: { isDeleted: result.isDeleted } });
  } catch (error) {
    return res.status(500).send({ "error": true, "message": error.message })
  }
};

// exports.filterPatients = async (req, res, next) => {
//   try {
//     let query = {}
//     const { name,code } = req.query
//     if (name) query.name = name
//     if (code) query.code = code
//     if (Object.keys(query).length === 0) return res.status(404).send({error:true, message: 'Please Specify A Query To Use This Function'})
//     const result = await Patient.find(query)
//     if (result.length === 0) return res.status(404).send({ error: true, message: "No Record Found!" })
//     res.status(200).send({ success: true, data: result })
//   } catch (err) {
//     return res.status(500).send({ error: true, message: err.message })
//   }
// }

// exports.searchPatients = async (req, res, next) => {
//   try {
//     console.log(req.body.search)
//     const result = await Patient.find({ $text: { $search: req.query.search } })
//     if (result.length===0) return res.status(404).send({error:true, message:'No Record Found!'})
//     return res.status(200).send({ success: true, data: result })
//   } catch (err) {
//     return res.status(500).send({ error: true, message: err.message })
//   }
// }