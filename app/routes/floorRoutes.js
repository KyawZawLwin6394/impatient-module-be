"use strict";

const floor = require("../controllers/floorController");
const { catchError } = require("../lib/errorHandler");
const verifyToken = require("../lib/verifyToken");

module.exports = (app) => {

    app.route('/api/floor')
        .post(catchError(floor.createFloor))
        .put(catchError(floor.updateFloor))
    
    app.route('/api/floor/:id')
        .get(catchError(floor.getFloor))
        .delete(catchError(floor.deleteFloor)) 
        .post(catchError(floor.activateFloor))

    app.route('/api/floors').get(catchError(floor.listAllFloors))
};
