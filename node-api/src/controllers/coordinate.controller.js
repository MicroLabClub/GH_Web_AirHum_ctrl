import Coordinate from "../models/coordinate.model.js";

const CoordinateController = function() {

}

CoordinateController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const coordinate = new Coordinate({
        lat: req.body.lat,
        lng: req.body.lng,
        num: req.body.num,
        map_id: req.body.map_id
    });

    Coordinate.create(coordinate, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

CoordinateController.findOne = (req, res) => {
    Coordinate.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found coordinate with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving coordinate with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

CoordinateController.findAll = (req, res) => {
    Coordinate.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving coordinates."
            });
        }
        else res.send(data);
    });
};

CoordinateController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Coordinate.updateById(
        req.params.id,
        new Coordinate(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found coordinate with id ${req.params.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving coordinate with id " + req.params.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

CoordinateController.delete = (req, res) => {
    Coordinate.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found coordinate with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving coordinate with id " + req.params.id
                });
            }
        }
        else res.send({message: `Coordinate was deleted successfully.`});
    });
};

CoordinateController.deleteAll = (req, res) => {
    Coordinate.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all coordinates."
            });
        }
        else res.send({message: `All coordinates were deleted successfully.`});
    });
};

export default CoordinateController;