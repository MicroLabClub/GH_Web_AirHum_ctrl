import sql from "./db.js";

const Coordinate = function(coordinate) {
    this.lat = coordinate.lat;
    this.lng = coordinate.lng;
    this.num = coordinate.num;
    this.map_id = coordinate.map_id;
}

Coordinate.create = (newCoordinate, result) => {
    sql.query("INSERT INTO coordinate SET ?", newCoordinate, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created coordinate: ", {coordinate_id: res.insertId, ...newCoordinate});
        result(null, {id: res.insertId, ...newCoordinate});
    });
};

Coordinate.findById = (id, result) => {
    sql.query(`SELECT * FROM coordinate WHERE coordinate_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found coordinate: ", res[0]);
            result(null, res[0]);
            return;
        }

        return({kind : "not_found"}, null);
    });
};

Coordinate.getAll = (result) => {
    let query = "SELECT * FROM coordinate";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("coordinates: ", res);
        result(null, res);
    });
};

Coordinate.updateById = (id, coordinate, result) => {
    sql.query(
        "UPDATE coordinate SET lat = ?, lng = ?, num = ?, map_id = ? WHERE coordinate_id = ?",
        [coordinate.lat, coordinate.lng, coordinate.num, coordinate.map_id, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated coordinate: ", {id: id, ...coordinate});
            result(null, {id: id, ...map});
        });
};

Coordinate.remove = (id, result) => {
    sql.query("DELETE FROM coordinate WHERE coordinate_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted coordinate with id: ", id);
        result(null, res);
    });
};

Coordinate.removeAll = result => {
    sql.query("DELETE FROM coordinate", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} coordinates`);
        result(null, res);
    });
};

export default Coordinate;