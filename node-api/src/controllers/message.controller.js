import Message from "../models/messages.model";

const MessageController = function() {

}

MessageController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const message = new Message({
        sensor_id: req.body.sensor_id,
        topic: req.body.topic,
        message: req.body.message,
        date: req.body.date
    });

    Message.create(message, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

MessageController.findOne = (req, res) => {
    Message.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found message with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving message with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

MessageController.getByTopic = (req, res) => {
    Message.findByTopic(req.body.topic, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found messages with topic ${req.body.topic}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving messages with topic " + req.body.topic
                });
            }
        }
        else res.send(data);
    });
};

MessageController.getBySensorId = (req, res) => {
    Message.findBySensorId(req.body.sensor_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found message with sensor_id ${req.body.sensor_id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving message with sensor_id " + req.body.sensor_id
                });
            }
        }
        else res.send(data);
    });
};

MessageController.findAll = (req, res) => {
    Message.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        }
        else res.send(data);
    });
};

MessageController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Message.updateById(
        req.body.id,
        new Message(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found message with id ${req.body.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving message with id " + req.body.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

MessageController.delete = (req, res) => {
    Message.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found message with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving message with id " + req.params.id
                });
            }
        }
        else res.send({message: `Message was deleted successfully.`});
    });
};

MessageController.deleteAll = (req, res) => {
    Message.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all messages."
            });
        }
        else res.send({message: `All messages were deleted successfully.`});
    });
};

export default MessageController;