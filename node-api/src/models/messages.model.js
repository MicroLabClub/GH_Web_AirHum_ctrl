import sql from "./db.js";

const Message = function(message) {
    this.sensor_id = message.sensor_id;
    this.topic = message.topic;
    this.message = message.message;
    this.date = message.date;
}

Message.create = (newMessage, result) => {
    sql.query("INSERT INTO messages_mqqt SET ?", newMessage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created message: ", {message_id: res.insertId, ...newMessage});
        result(null, {id: res.insertId, ...newMessage});
    });
};

Message.findById = (id, result) => {
    sql.query(`SELECT * FROM messages_mqqt WHERE message_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found message: ", res[0]);
            result(null, res[0]);
            return;
        }

        console.log("message not found : id ", id);
        result({kind : "not_found"}, null);
    });
};

Message.findByTopic = (topic, result) => {
    sql.query(`SELECT * FROM messages_mqqt WHERE topic = '${topic}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found messages: ", res);
            result(null, res);
            return;
        }

        console.log("message not found : topic ", topic);
        result({kind : "not_found"}, null);
    });
}

Message.findBySensorId = (id, result) => {
    sql.query(`SELECT * FROM messages_mqqt WHERE sensor_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found messages: ", res);
            result(null, res);
            return;
        }

        console.log("message not found : sensor_id ", id);
        result({kind : "not_found"}, null);
    });
};

Message.getAll = (result) => {
    sql.query("SELECT * FROM messages_mqqt", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }


        console.log("messages: ", res);
        result(null, res);
    });
};

Message.updateById = (id, message, result) => {
    sql.query(
        "UPDATE messages_mqqt SET sensor_id = ?, topic = ?, message = ?, date = ? WHERE message_id = ?",
        [message.sensor_id, message.topic, message.message, message.date, id],
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

            console.log("updated message: ", {id: id, ...message});
            result(null, {id: id, ...message});
        });
};

Message.remove = (id, result) => {
    sql.query("DELETE FROM messages_mqqt WHERE message_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted message with id: ", id);
        result(null, res);
    });
};

Message.removeAll = result => {
    sql.query("DELETE FROM messages_mqqt", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} messages`);
        result(null, res);
    });
};

export default Message;