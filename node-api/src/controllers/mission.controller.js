import Mission from "../models/mission.model.js";

const MissionController = function() {

}

MissionController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const mission = new Mission({
        device_id: req.body.device_id,
        map_id: req.body.map_id,
        user_id: req.body.user_id,
        startDate: req.body.startDate,
        ttl: req.body.ttl,
        config: req.body.config
    });

    Mission.create(mission, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

MissionController.findOne = (req, res) => {
    Mission.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found mission with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving mission with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

MissionController.findAll = (req, res) => {
    Mission.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving missions."
            });
        }
        else res.send(data);
    });
};

MissionController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Mission.updateById(
        req.body.id,
        new Mission(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found mission with id ${req.body.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving mission with id " + req.body.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

MissionController.delete = (req, res) => {
    Mission.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found mission with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving mission with id " + req.params.id
                });
            }
        }
        else res.send({message: `Mission was deleted successfully.`});
    });
};

MissionController.deleteAll = (req, res) => {
    Mission.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all missions."
            });
        }
        else res.send({message: `All missions were deleted successfully.`});
    });
};

export default MissionController;