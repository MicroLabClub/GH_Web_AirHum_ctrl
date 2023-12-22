import sql from "./db.js";

const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.description = user.description;
    this.role = user.role;
}

User.create = (newUser, result) => {
    console.log("user to create");
    console.log(newUser);
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", {user_id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM user WHERE user_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        } else {
            console.log("user not found : id ", id);
            result({kind : "not_found"}, null);
            return;
        }        
    });
};

User.getAll = (result) => {
    let query = "SELECT * FROM user";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET name = ?, email = ?, phone = ?, description = ?, role = ? WHERE user_id = ?",
        [user.name, user.email, user.phone, user.description, user.role, id],
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

            console.log("updated user: ", {id: id, ...user});
            result(null, {id: id, ...user});
        });
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE user_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

export default User;