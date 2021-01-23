const pool = require("../../config/database");
var datetime = new Date();

let fecha = datetime.toISOString().slice(0,19);


module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(username, email, password, phone, address, fullName ) 
                values(?,?,?,?,?,?)`,
      [
        data.username,
        data.email,
        data.password,
        data.phone,
        data.address,
        data.fullName
        // data.createdAt = fecha.replace("T", " "),
        // data.updatedAt = fecha.replace("T", " ")
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,username, email, fullName, address, phone from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select id,username, email, fullName, address, phone from users`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update users set username=?, email=?, password=?, fullName=?, address=?,  phone=? where id = ?`,
      [
        data.username,
        data.email,
        data.password,
        data.fullName,
        data.address,
        data.phone,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
