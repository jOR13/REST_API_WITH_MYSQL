const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createPet,
  getPetById,
  getPets,
  updatePets,
  deletePet
} = require("./mascota.controller");

router.get("/", checkToken, getPets);
router.post("/", checkToken, createPet);
router.get("/:id",  getPetById);
router.patch("/", checkToken, updatePets);
router.delete("/", checkToken, deletePet);

module.exports = router;
