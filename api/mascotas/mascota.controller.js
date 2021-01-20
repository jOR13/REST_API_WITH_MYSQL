const {
  createPet,
  getPetById,
  getPets,
  updatePets,
  deletePet,
} = require("./mascota.service");

const { getUserById } = require("../users/user.controller");

module.exports = {
  createPet: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection eror" + err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },


  getPetById:  (req, res) => {
    const id = req.params.id;
    getPetById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getPets: (req, res) => {
    getPets((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updatePets: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    updatePet(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deletePet: (req, res) => {
    const data = req.body;
    deletePet(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
