const manager = require('../manager/manager');

let registerManager = async (req, res, next) => 
{
  return manager.registerManager(req)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

let loginManager = async (req, res, next) => 
{
  return manager.loginManager(req.body)
  
   .then(data => {
    let result = {
        status: 200,
        token:data.authToken,
        managerId:data.manager.id,
        expireIn:"1h"
    }
    return res.json(result);
}).catch(next);
}

let login = async (req, res, next) => 
{
  return manager.login(req.body)
  
   .then(data => {
    let result = {
        status: 200,
        mtoken:data.authToken,
        token: data.loginToken,
        playerId:data.id,
    }
    return res.json(result);
}).catch(next);
}

let getAllData = async (req, res, next) => 
{
  return manager.getAllData()
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}


let addGames = async (req, res, next) => 
{
  return manager.addGames(req.body)
   .then(data => {
    let result = {
        status: 200,
        id:data.gameId
    }
    return res.json(result);

}).catch(next);
}

let getGamesList = async (req, res, next) => 
{
  return manager.getGamesList()
   .then(data => {
    let result = {
        status: 200,
        games:data.game
    }
    return res.json(result);

}).catch(next);
}


let getTeam = async (req, res, next) => 
{
  return manager.getTeam(req.params.id)
   .then(data => {
    let result = {
        status: 200,
        team:data.team,
        player:data.player
    }
    return res.json(result);

}).catch(next);
}

let addTournament = async (req, res, next) => 
{
  return manager.addTournament(req.body)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

let getTournamentList = async (req, res, next) => 
{
  return manager.getTournamentList(req.body)
   .then(data => {
    let result = {
        status: 200,
        tournaments:data.tournament
    }
    return res.json(result);
}).catch(next);
}


let registerPlayers = async (req, res, next) => 
{
  return manager.registerPlayers(req.body)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

let loginPlayer = async (req, res, next) => 
{
  return manager.loginPlayer(req.body)
   .then(data => {
    let result = {
        status: 200,
        token: data.loginToken,
        playerId:data.id,
        expiresIn:360,
    }
    return res.json(result);
}).catch(next);
}

let createTeam = async (req, res, next) => 
{
  return manager.createTeam(req.body,req.playername,req.id)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

let getTeamsList = async (req, res, next) => 
{
  return manager.getTeamsList()
   .then(data => {
    let result = {
        status: 200,
        teams:data.team,
        players:data.currentPlayers
    }
    return res.json(result);
}).catch(next);
}



let getPlayersList = async (req, res, next) => 
{
  return manager.getPlayersList()
   .then(data => {
    let result = {
        status: 200,
        players:data.players
    }
    return res.json(result);
}).catch(next);
}

let updateTeam = async (req, res, next) => 
{
  return manager.updateTeam(req.body ,req.params.id)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

let deleteTeam = async (req, res, next) => 
{
  return manager.deleteTeam(req.playername,req.params.id)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

let deleteTournament = async (req, res, next) => 
{
  return manager.deleteTournament(req.params.id)
   .then(data => {
    let result = {
        status: 200,
        data: data
    }
    return res.json(result);
}).catch(next);
}

module.exports = {
    login:login,
    getPlayersList:getPlayersList,
    getTeam:getTeam,
    getTournamentList:getTournamentList,
    getTeamsList:getTeamsList,
    getGamesList:getGamesList, 
    registerManager:registerManager,
    loginManager:loginManager, 
    addGames:addGames,
    registerPlayers:registerPlayers,
    loginPlayer:loginPlayer,
    addTournament:addTournament,
    createTeam:createTeam,
    updateTeam:updateTeam,
    deleteTeam:deleteTeam,
    getAllData:getAllData,
    deleteTournament:deleteTournament 
}