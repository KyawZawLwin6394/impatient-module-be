'use strict';
const Building = require('../models/building');

exports.listAllBuildings = async (req, res) => {
    try {
        let result = await Building.find({ isDeleted: false })
        let count = await Building.find({ isDeleted: false }).count();
        res.status(200).send({
            success: true,
            count: count,
            data: result
        });
    } catch (error) {
        return res.status(500).send({ error: true, message: 'No Record Found!' });
    }
};

exports.getBuilding = async (req, res) => {
    const result = await Building.find({ _id: req.params.id, isDeleted: false })
    if (!result)
        return res.status(500).json({ error: true, message: 'No Record Found' });
    return res.status(200).send({ success: true, data: result });
};

exports.createBuilding = async (req, res, next) => {
    let data = req.body;
    try {
        const newBuilding = new Building(data);
        const result = await newBuilding.save();
        res.status(200).send({
            message: 'Building create success',
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).send({ "error": true, message: error.message })
    }
};

exports.updateBuilding = async (req, res, next) => {
    let data = req.body;
    try {
        data = { ...data, updatedAt: Date.now() } // updating updatedAt
        const result = await Building.findOneAndUpdate(
            { _id: data.id },
            data,
            { new: true },
        )
        return res.status(200).send({ success: true, data: result });
    } catch (error) {
        return res.status(500).send({ "error": true, "message": error.message })
    }
};

exports.deleteBuilding = async (req, res, next) => {
    try {
        const result = await Building.findOneAndUpdate(
            { _id: req.params.id },
            { isDeleted: true },
            { new: true },
        );
        return res.status(200).send({ success: true, data: { isDeleted: result.isDeleted } });
    } catch (error) {
        return res.status(500).send({ "error": true, "message": error.message })

    }
};

exports.activateBuilding = async (req, res, next) => {
    try {
        const result = await Building.findOneAndUpdate(
            { _id: req.params.id },
            { isDeleted: false },
            { new: true },
        );
        return res.status(200).send({ success: true, data: { isDeleted: result.isDeleted } });
    } catch (error) {
        return res.status(500).send({ "error": true, "message": error.message })
    }
};

// exports.filterBuildings = async (req, res, next) => {
//   try {
//     let query = {}
//     const { name,code } = req.query
//     if (name) query.name = name
//     if (code) query.code = code
//     if (Object.keys(query).length === 0) return res.status(404).send({error:true, message: 'Please Specify A Query To Use This Function'})
//     const result = await Building.find(query)
//     if (result.length === 0) return res.status(404).send({ error: true, message: "No Record Found!" })
//     res.status(200).send({ success: true, data: result })
//   } catch (err) {
//     return res.status(500).send({ error: true, message: err.message })
//   }
// }

// exports.searchBuildings = async (req, res, next) => {
//   try {
//     console.log(req.body.search)
//     const result = await Building.find({ $text: { $search: req.query.search } })
//     if (result.length===0) return res.status(404).send({error:true, message:'No Record Found!'})
//     return res.status(200).send({ success: true, data: result })
//   } catch (err) {
//     return res.status(500).send({ error: true, message: err.message })
//   }
// }