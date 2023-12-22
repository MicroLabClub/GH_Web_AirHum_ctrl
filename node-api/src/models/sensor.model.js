import sql from "./db.js";

const Sensor = function(sensor) {
    this.name = sensor.name;
    this.ttl = sensor.ttl;
    this.identifier = sensor.identifier;
    this.description = sensor.description;
}

Sensor.create = (newSensor, result) => {
    sql.query("INSERT INTO sensor SET ?", newSensor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created sensor: ", {sensor_id: res.insertId, ...newSensor});
        result(null, {id: res.insertId, ...newSensor});
    });
};

Sensor.findById = (id, result) => {
    sql.query(`SELECT * FROM sensor WHERE sensor_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found sensor: ", res[0]);
            result(null, res[0]);
            return;
        }

        console.log("sensor not found : id ", id);
        result({kind : "not_found"}, null);
    });
};

Sensor.getAll = (result) => {
    sql.query("SELECT * FROM sensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("sensors: ", res);
        result(null, res);
    });
};

Sensor.updateById = (id, sensor, result) => {
    sql.query(
        "UPDATE sensor SET name = ?, ttl = ?, identifier = ?, description = ? WHERE sensor_id = ?",
        [sensor.name, sensor.ttl, sensor.identifier, sensor.description, id],
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

            console.log("updated sensor: ", {id: id, ...sensor});
            result(null, {id: id, ...sensor});
        });
};

Sensor.remove = (id, result) => {
    sql.query("DELETE FROM sensor WHERE sensor_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted sensor with id: ", id);
        result(null, res);
    });
};

Sensor.removeAll = result => {
    sql.query("DELETE FROM sensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} sensors`);
        result(null, res);
    });
};

export default Sensor;