import sql from "./db.js";

const Mission = function(mission) {
    this.device_id = mission.device_id;
    this.map_id = mission.map_id;
    this.user_id = mission.user_id;
    this.startDate = mission.startDate;
    this.ttl = mission.ttl;
    this.config = mission.config;
}

Mission.create = (newMission, result) => {
    sql.query("INSERT INTO mission SET ?", newMission, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created mission: ", {mission_id: res.insertId, ...newMission});
        result(null, {id: res.insertId, ...newMission});
    });
};

Mission.findById = (id, result) => {
    sql.query(`SELECT * FROM mission WHERE mission_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found mission: ", res[0]);
            result(null, res[0]);
            return;
        }

        console.log("mission not found : id ", id);
        result({kind : "not_found"}, null);
    });
};

Mission.getAll = (result) => {
    let query = "SELECT * FROM mission";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("missions: ", res);
        result(null, res);
    });
};

Mission.updateById = (id, mission, result) => {
    sql.query(
        "UPDATE mission SET device_id = ?, map_id = ?, user_id = ?, startDate = ?, ttl = ?, config = ? WHERE mission_id = ?",
        [mission.device_id, mission.map_id, mission.user_id, mission.startDate, mission.ttl, mission.config, id],
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

            console.log("updated mission: ", {id: id, ...mission});
            result(null, {id: id, ...mission});
        });
};

Mission.remove = (id, result) => {
    sql.query("DELETE FROM mission WHERE mission_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted mission with id: ", id);
        result(null, res);
    });
};

Mission.removeAll = result => {
    sql.query("DELETE FROM mission", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} missions`);
        result(null, res);
    });
};

export default Mission;