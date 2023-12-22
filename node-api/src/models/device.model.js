//const sql = require("./db.js");
import sql from "./db.js";

const Device = function(device) {
    this.name = device.name;
    this.description = device.description;
    this.identifier = device.identifier;
    this.image_device = device.image_device;
    this.image_logo = device.image_logo;
}

Device.create = (newDevice, result) => {
    sql.query("INSERT INTO device SET ?", newDevice, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created device: ", {device_id: res.insertId, ...newDevice});
        result(null, {id: res.insertId, ...newDevice});
    });
};

Device.findById = (id, result) => {
    sql.query(`SELECT * FROM device WHERE device_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found device: ", res[0]);
            result(null, res[0]);
            return;
        }

        console.log("device not found : id ", id);
        result({kind : "not_found"}, null);
    });
};

Device.getAll = (result) => {
    sql.query("SELECT * FROM device", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("devices: ", res);
        result(null, res);
    });
};

Device.updateById = (id, device, result) => {
    sql.query(
        "UPDATE device SET name = ?, description = ?, identifier = ?, image_device = ?, image_logo = ? WHERE device_id = ?",
        [device.name, device.description, device.identifier, device.image_device, device.image_logo, id],
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

            console.log("updated device: ", {id: id, ...device});
            result(null, {id: id, ...device});
        });
};

Device.remove = (id, result) => {
    sql.query("DELETE FROM device WHERE device_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted device with id: ", id);
        result(null, res);
    });
};

Device.removeAll = result => {
    sql.query("DELETE FROM device", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} devices`);
        result(null, res);
    });
};

export default Device;