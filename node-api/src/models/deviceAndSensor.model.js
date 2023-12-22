//const sql = require("./db.js");
import sql from "./db.js";

const deviceSensor = function(deviceSensor) {
    this.device_id = deviceSensor.device_id;
    this.sensor_id = deviceSensor.sensor_id;
}

deviceSensor.create = (newCombination, result) => {
    sql.query("INSERT INTO deviceAndSensor SET ?", newCombination, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created combination: ", {deviceSensor_id: res.insertId, ...newCombination});
        result(null, {id: res.insertId, ...newCombination});
    });
};

deviceSensor.findById = (id, result) => {
    sql.query(`SELECT * FROM deviceAndSensor WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found combination: ", res[0]);
            result(null, res[0]);
            return;
        }

        return({kind : "not_found"}, null);
    });
};

deviceSensor.getAll = (name, result) => {
    sql.query("SELECT * FROM deviceAndSensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("combinations: ", res);
        result(null, res);
    });
};

deviceSensor.updateById = (id, combination, result) => {
    sql.query(
        "UPDATE deviceAndSensor SET device_id = ?, sensor_id = ? WHERE id = ?",
        [combination.device_id, combination.sensor_id, id],
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

            console.log("updated combination: ", {id: id, ...combination});
            result(null, {id: id, ...combination});
        });
};

deviceSensor.remove = (id, result) => {
    sql.query("DELETE FROM deviceAndSensor WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted combination with id: ", id);
        result(null, res);
    });
};

deviceSensor.removeAll = result => {
    sql.query("DELETE FROM deviceAndSensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} combinations`);
        result(null, res);
    });
};

export default deviceSensor;