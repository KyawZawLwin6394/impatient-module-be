'use strict';
const Floor = require('../models/floor');

exports.listAllFloors = async (req, res) => {
    try {
        let result = await Floor.find({ isDeleted: false }).populate('relatedBuilding')
        let count = await Floor.find({ isDeleted: false }).count();
        res.status(200).send({
            success: true,
            count: count,
            data: result
        });
        if (result.length === 0) return res.status(404).send({error:true, message:'No Record Found!'})
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
};

exports.getFloor = async (req, res) => {
    const result = await Floor.find({ _id: req.params.id, isDeleted: false }).populate('relatedBuilding')
    if (result.length === 0 )
        return res.status(500).json({ error: true, message: 'No Record Found' });
    return res.status(200).send({ success: true, data: result });
};

exports.createFloor = async (req, res, next) => {
    let data = req.body;
    try {
        const newFloor = new Floor(data);
        const result = await newFloor.save();
        res.status(200).send({
            message: 'Floor create success',
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).send({ "error": true, message: error.message })
    }
};

exports.updateFloor = async (req, res, next) => {
    let data = req.body;
    try {
        data = { ...data, updatedAt: Date.now() } // updating updatedAt
        const result = await Floor.findOneAndUpdate(
            { _id: data.id },
            data,
            { new: true },
        ).populate('relatedBuilding')
        return res.status(200).send({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ "error": true, "message": error.message })
    }
};

exports.deleteFloor = async (req, res, next) => {
    try {
        const result = await Floor.findOneAndUpdate(
            { _id: req.params.id },
            { isDeleted: true },
            { new: true },
        );
        return res.status(200).send({ success: true, data: { isDeleted: result.isDeleted } });
    } catch (error) {
        return res.status(500).send({ "error": true, "message": error.message })

    }
};

exports.activateFloor = async (req, res, next) => {
    try {
        const result = await Floor.findOneAndUpdate(
            { _id: req.params.id },
            { isDeleted: false },
            { new: true },
        );
        return res.status(200).send({ success: true, data: { isDeleted: result.isDeleted } });
    } catch (error) {
        return res.status(500).send({ "error": true, "message": error.message })
    }
};

// exports.filterFloors = async (req, res, next) => {
//   try {
//     let query = {}
//     const { name,code } = req.query
//     if (name) query.name = name
//     if (code) query.code = code
//     if (Object.keys(query).length === 0) return res.status(404).send({error:true, message: 'Please Specify A Query To Use This Function'})
//     const result = await Floor.find(query)
//     if (result.length === 0) return res.status(404).send({ error: true, message: "No Record Found!" })
//     res.status(200).send({ success: true, data: result })
//   } catch (err) {
//     return res.status(500).send({ error: true, message: err.message })
//   }
// }

// exports.searchFloors = async (req, res, next) => {
//   try {
//     console.log(req.body.search)
//     const result = await Floor.find({ $text: { $search: req.query.search } })
//     if (result.length===0) return res.status(404).send({error:true, message:'No Record Found!'})
//     return res.status(200).send({ success: true, data: result })
//   } catch (err) {
//     return res.status(500).send({ error: true, message: err.message })
//   }
// }