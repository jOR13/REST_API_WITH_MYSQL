const pool = require("../../config/database");
const { promisify } = require('util');

let arrayUsers = [];
let arrayImages = [];

module.exports = {
  create: (data, callBack) => {
    promisify(pool.query).bind(pool)(sql)
    pool.query(
      `insert into mascotas (nombre, tipo, raza, direccion, descripcion contacto, user_id, image_id ) 
                values(?,?,?,?,?,?,?)`,
      [
        data.nombre,
        data.tipo,
        data.raza,
        data.direccion,
        data.descripcion,
        data.contacto,
        data.user_id,
        data.image_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPetByUserEmail: (email, callBack) => {
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

  getPetById: (id, callBack) => {
    pool.query(
      `SELECT id, nombre, tipo, raza, direccion, descripccion, contacto, users_id, image_id from mascotas where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

      
        pool.query(
          `select id, username, email, fullName, address, phone from users where id = ?`,
          [results[0].users_id],
          (error1, res) => {
            if(error) {
              return callBack(error);
            }
            pool.query(
              `select * from images where id = ?`,
              [results[0].image_id],
              (error2, res1) => {
                results[0].users_id = res;
                results[0].image_id = res1;
                return callBack(null, results[0]);
              }
            );
          }
        );


      }
    );
  },

  //console.log(pool.query(`select id, username, email, fullName, address, phone from users where id = ?`, [id]));

  getPets: (callBack) => {
    pool.query(`select * from mascotas`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  updatePet: (data, callBack) => {
    pool.query(
      `update mascotas set nombre=?, tipo=?, raza=?, direccion=?, descripcion=?,  contacto=?, user_id=?, image_id=? where id = ?`,
      [
        data.nombre,
        data.tipo,
        data.raza,
        data.direccion,
        data.descripcion,
        data.contacto,
        data.user_id,
        data.image_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deletePet: (data, callBack) => {
    pool.query(
      `delete from mascotas where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};

// getPetById: (async function(id, callBack){
//   let resp = [],
//   arrPr = [
//     fnAsync(
//       ()=>{
//         pool.query(
//           `SELECT id, nombre, tipo, raza, direccion, descripccion, contacto, users_id, image_id from mascotas where id = ?`,
//           [1],
//           (error, results, fields) => {

//               // doSomething(results[0].users_id, results[0].image_id)
//               //   .then((r) => {
//               //     console.log("dsdsdsdsds" + r);
//               //     results[0].users_id = r;
//               //     res = results[0];
//               //     return results[0];
//               //   });

//               resp.push(results[0]);
//               console.log(results[0]);
//               return callback(null, results[0])
//           }
//         )
//       }, (res)=>{
//         console.log(resp);
//       }
//     )
// ];

//   await Promise.all(arrPr).then(()=>{
//     //console.log(s);
//   });

//   console.log('jesus manco v2');

//   return callBack(null, {aasd: resp});

// }) ,
