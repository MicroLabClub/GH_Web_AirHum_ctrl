import User from "../models/user.model.js";

const UserController = function() {

}

UserController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        role: req.body.role
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

UserController.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

UserController.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        }
        else res.send(data);
    });
};

UserController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log("body: ")
    console.log(req.body);
    User.updateById(
        req.body.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.body.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving user with id " + req.body.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

UserController.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        }
        else res.send({message: `User was deleted successfully.`});
    });
};

UserController.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users."
            });
        }
        else res.send({message: `All users were deleted successfully.`});
    });
};

export default UserController;