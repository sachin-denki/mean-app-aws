const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const middleware = require('../middleware/middleware');
const fileuploader = require('../multer/fileuploader');

// MANAGER
router.post('/create_manager',fileuploader.uploadUserProfileImage.single('image'), controller.registerManager);
// router.post('/login_manager',controller.loginManager);
router.post('/login',controller.login);
router.post('/create_games',controller.addGames);
router.post('/create_tournament', middleware.managerValidate ,controller.addTournament);

// PLAYERS
router.post('/create_players',controller.registerPlayers);
router.post('/login_players',controller.loginPlayer);
router.post('/create_team',middleware.playerValidate, controller.createTeam);
router.put('/edit_team/:id', middleware.playerValidate ,controller.updateTeam);

//GEt myprofile( Only Manager)
router.get('/get_all_data', middleware.managerValidate, controller.getAllData);

// Delete
router.delete('/delete_team/:id', middleware.playerValidate ,controller.deleteTeam);
router.delete('/delete_tournament/:id', middleware.managerValidate , controller.deleteTournament);

router.get('/list_games',controller.getGamesList);
router.get('/list_teams',controller.getTeamsList);
router.get('/list_tournament',controller.getTournamentList)
router.get('/list_players',controller.getPlayersList);


router.get('/team/:id',controller.getTeam);

module.exports = router;