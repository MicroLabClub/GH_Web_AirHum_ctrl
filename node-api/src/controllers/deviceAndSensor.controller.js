import deviceSensor from "../models/deviceAndSensor.model";

const deviceSensorController = function() {

}

deviceSensorController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const combination = new deviceSensor({
        device_id: req.body.device_id,
        sensor_id: req.body.sensor_id
    });

    deviceSensor.create(combination, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

deviceSensorController.findOne = (req, res) => {
    deviceSensor.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found combination with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving combination with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

deviceSensorController.findAll = (req, res) => {
    const name = req.query.name;

    deviceSensor.getAll(name, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving combinations."
            });
        }
        else res.send(data);
    });
};

deviceSensorController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    deviceSensor.updateById(
        req.params.id,
        new deviceSensor(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found combination with id ${req.params.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving combination with id " + req.params.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

deviceSensorController.delete = (req, res) => {
    deviceSensor.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found combination with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving combination with id " + req.params.id
                });
            }
        }
        else res.send({message: `Combination was deleted successfully.`});
    });
};

deviceSensorController.deleteAll = (req, res) => {
    deviceSensor.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all combinations."
            });
        }
        else res.send({message: `All combinations were deleted successfully.`});
    });
};

export default deviceSensorController;