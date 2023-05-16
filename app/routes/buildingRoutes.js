"use strict";

const building = require("../controllers/buildingController");
const { catchError } = require("../lib/errorHandler");
const verifyToken = require("../lib/verifyToken");

module.exports = (app) => {

    app.route('/api/building')
        .post(catchError(building.createBuilding))
        .put(catchError(building.updateBuilding))
    
    app.route('/api/building/:id')
        .get(catchError(building.getBuilding))
        .delete(catchError(building.deleteBuilding)) 
        .post(catchError(building.activateBuilding))

    app.route('/api/buildings').get(catchError(building.listAllBuildings))
};
