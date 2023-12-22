import Map from "../models/map.model.js";

const MapController = function() {

}

MapController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const map = new Map({
        zoom: req.body.zoom,
        centerLat: req.body.centerLat,
        centerLng: req.body.centerLng,
        name: req.body.name,
        date: req.body.date
    });

    Map.create(map, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

MapController.findOne = (req, res) => {
    Map.findById(req.params.id, (err, data) => {
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

MapController.findAll = (req, res) => {
    Map.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving maps."
            });
        }
        else res.send(data);
    });
};

MapController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Map.updateById(
        req.body.id,
        new Map(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found map with id ${req.body.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving map with id " + req.body.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

MapController.delete = (req, res) => {
    Map.remove(req.params.id, (err, data) => {
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
        else res.send({message: `Map was deleted successfully.`});
    });
};

MapController.deleteAll = (req, res) => {
    Map.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all maps."
            });
        }
        else res.send({message: `All maps were deleted successfully.`});
    });
};

export default MapController;