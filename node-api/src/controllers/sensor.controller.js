import Sensor from "../models/sensor.model.js";

const SensorController = function() {

}

SensorController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const sensor = new Sensor({
        name: req.body.name,
        ttl: req.body.ttl,
        identifier: req.body.identifier,
        description: req.body.description
    });

    Sensor.create(sensor, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

SensorController.findOne = (req, res) => {
    Sensor.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found map with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving map with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

SensorController.findAll = (req, res) => {
    Sensor.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sensors."
            });
        }
        else res.send(data);
    });
};

SensorController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Sensor.updateById(
        req.body.id,
        new Sensor(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found sensor with id ${req.body.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving sensor with id " + req.body.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

SensorController.delete = (req, res) => {
    Sensor.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found sensor with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving sensor with id " + req.params.id
                });
            }
        }
        else res.send({message: `Sensor was deleted successfully.`});
    });
};

SensorController.deleteAll = (req, res) => {
    Sensor.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all sensors."
            });
        }
        else res.send({message: `All sensors were deleted successfully.`});
    });
};

export default SensorController;