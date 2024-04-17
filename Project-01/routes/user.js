const express = require( 'express' );
const router = express.Router()
const { handleGetAllUsers,handleGetUsersById,handleCreateNewUser,handleDeleteUserById,handleUpdateUserById } = require('../controllers/user');

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
router.route("/:id").get(handleGetUsersById)
                    .delete(handleDeleteUserById)
                    .patch(handleUpdateUserById);

module.exports = router;