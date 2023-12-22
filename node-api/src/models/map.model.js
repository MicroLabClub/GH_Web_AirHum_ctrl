import sql from "./db.js";

const Map = function(map) {
    this.zoom = map.zoom;
    this.centerLat = map.centerLat;
    this.centerLng = map.centerLng;
    this.name = map.name;
    this.date = map.date;
}

Map.create = (newMap, result) => {
    sql.query("INSERT INTO map SET ?", newMap, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created map: ", {map_id: res.insertId, ...newMap});
        result(null, {id: res.insertId, ...newMap});
    });
};

Map.findById = (id, result) => {
    sql.query(`SELECT * FROM map WHERE map_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found map: ", res[0]);
            result(null, res[0]);
            return;
        }

        console.log("map not found : id ", id);
        result({kind : "not_found"}, null);
    });
};

Map.getAll = (result) => {
    sql.query("SELECT * FROM map", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }


        console.log("maps: ", res);
        result(null, res);
    });
};

Map.updateById = (id, map, result) => {
    sql.query(
        "UPDATE map SET zoom = ?, centerLat = ?, centerLng = ?, name = ?, date = ? WHERE map_id = ?",
        [map.zoom, map.centerLat, map.centerLng, map.name, map.date, id],
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

            console.log("updated map: ", {id: id, ...map});
            result(null, {id: id, ...map});
    });
};

Map.remove = (id, result) => {
    sql.query("DELETE FROM map WHERE map_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted map with id: ", id);
        result(null, res);
    });
};

Map.removeAll = result => {
    sql.query("DELETE FROM map", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} maps`);
        result(null, res);
    });
};

export default Map;