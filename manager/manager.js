// const {sequelize,DataTypes} = require('../index')
const  Manager  = require('../model/manager')
const ManagerAuth = require('../model/managerauth');
const BadRequestError = require('../error/badRequestError');
const AccessDeniedError = require('../error/accessDeniedError');
const Games = require('../model/games');
const Players = require('../model/players');
const PlayerAuth = require('../model/playerauth');
const Team = require('../model/team');
const Tournament = require('../model/tournament');
const md5 = require('md5');

// MANAGER register
let registerManager = async (req) => {
  console.log(req.file.filename,"FILEEEEEEEEEEEEEEEEEEEE");
  const data = JSON.parse(JSON.stringify(req.body));
  let body =  JSON.parse(data.body);
  console.log(data,"ddd");
  if (!body.name || !body.email || !body.password || !body.mobile || !body.gender || !req.file) {
    throw new BadRequestError("Please enter all fields..!");
  } 
  
  let findEmail = await Manager.findOne({ where:{email:body.email}, raw: true });
  if(findEmail){
    throw new AccessDeniedError("Email Already Exist!")
  }
  let findMobile = await Manager.findOne({ where:{mobile:body.mobile}, raw: true });
  if(findMobile){
    throw new AccessDeniedError("Mobile Number Already Exist!")
  }

  let newManager = {
    name: body.name,
    email: body.email,
    mobile: body.mobile,
    password: body.password,
    image:req.file.filename,
    gender:body.gender,
  }
  console.log(newManager);
  let createManager =  await Manager.create(newManager);
  let registerToken = {token: md5(Date.now()), managerid:createManager.id}
  await ManagerAuth.create(registerToken);
  return {createManager,registerToken}
}

// MANAGER login (will return TOKEN)
let loginManager = async (body) => {
  console.log("reached manager function",body);
  if (!body.email) {
    throw new BadRequestError("Please Enter  Email");
  } if (!body.password) {
    throw new BadRequestError("Please Enter Password");
  }
  let findData = {};
  findData["$or"] = [
      { email: { $eq: body.email } }
  ]
  findData["$and"] = [
      { password: { $eq: body.password } }
  ]
  let manager = await Manager.findOne({ where: findData, raw: true });
  if (!manager) {
    throw new AccessDeniedError("Invalid Password or Email");
  }
  let authToken = md5(Date.now());
  await ManagerAuth.update({token:authToken},{where:{managerid:manager.id}});
  return  {manager, authToken};
}

//LOGINNNNNNNNNNNNNNNNNNNNNNNNN
let login = async (body) => {
  console.log("reached manager function",body);
  if (!body.email) {
    throw new BadRequestError("Please Enter  Email");
  } if (!body.password) {
    throw new BadRequestError("Please Enter Password");
  }
  let findData = {};
  findData["$or"] = [
      { email: { $eq: body.email } },
      { mobile: { $eq: body.email } }
  ]
  findData["$and"] = [
      { password: { $eq: body.password } }
  ]
  let manager = await Manager.findOne({ where: findData, raw: true });
  let player = await Players.findOne({ where: findData, raw: true });
  if(!manager && !player){
    throw new AccessDeniedError("Invalid Password or Email");
  }
  if(manager){
    let authToken = md5(Date.now());
    await ManagerAuth.update({token:authToken},{where:{managerid:manager.id}});
    return  {manager, authToken};
  }
  if(player){
    let loginToken = md5(Date.now())
    await PlayerAuth.update({token:loginToken}, {where:{playerid:player.id}, raw:true} );
    let id = player.id
    console.log(id);
    return  {player,loginToken,id};
  }
}



// ADD GAMES (if TOKEN VALID)
let addGames = async (body) => {
  console.log(body);
  if (!body.name || !body.description || !body.category ) {
    throw new BadRequestError("Please enter all fields..!");
  }
  let findName = await Games.findOne({ where:{name:body.name}, raw: true });
  if(findName){
    throw new AccessDeniedError("Game Already Exist!")
  }
  let newGame = {
    name: body.name,
    description: body.description,
    category: body.category,
  }
  return  await  Games.create( newGame );
  
}


// Create Tournament
let addTournament = async (body) => {
  if (!body.name || !body.maxNoOfTeamsAllowed || !body.startDate || !body.endDate || !body.gameName || !body.teamName) {
    throw new BadRequestError("Please enter all fields..!");
  }
  let findName = await Tournament.findOne({ where:{name:body.name}, raw: true });
  if(findName){
    throw new AccessDeniedError(" Tournament Already Exist!")
  }
  let findGame = await Games.findOne({ where:{name:body.gameName}, raw: true });
  if(!findGame){
    throw new AccessDeniedError(" Game Does Not Exist!")
  }
  let newTournament = {
    name: body.name,
    maxNoOfTeamsAllowed: body.maxNoOfTeamsAllowed,
    startDate: body.startDate,
    endDate: body.endDate,
    gameName: body.gameName,
    teamName: body.teamName,
  }
  let creatTournament = await  Tournament.create( newTournament );
  return creatTournament
}


// Register Players
let registerPlayers = async (body) => {
  console.log(body);
  if (!body.name || !body.email || !body.mobile || !body.password) {
    throw new BadRequestError("Please enter all fields..!");
  }
  let findEmail = await Players.findOne({ where:{email:body.email}, raw: true });
  console.log(findEmail);
  if(findEmail){
    throw new AccessDeniedError("Email Already Exist!")
  }
  let findMobile = await Players.findOne({ where:{mobile:body.mobile}, raw: true });
  if(findMobile){
    throw new AccessDeniedError("Mobile Number Already Exist!")
  }
  let newPlayer = {
    name: body.name,
    email: body.email,
    mobile: body.mobile,
    password:body.password,
  }
  let creatPlayer = await Players.create(newPlayer);
  let registerToken = {token: md5(Date.now()), playerid:creatPlayer.id}
  await PlayerAuth.create(registerToken);
  return {creatPlayer};
}

//Login Players
let  loginPlayer = async (body) => {
  if (!body.mobile) {
      throw new BadRequestError("Please Enter Your Mobile Number");
  } if (!body.password) {
      throw new BadRequestError("Please Enter Your Password");
  }
  let findData = {};
  findData["$or"] = [
      { mobile: { $eq: body.mobile } }
  ]
  findData["$and"] = [
      { password: { $eq: body.password } }
  ]
    let player = await Players.findOne({ where:findData, raw: true });
    if (!player) {
      throw new AccessDeniedError("Invalid Password or Mobile Number");
    }
    console.log(player);

    let loginToken = md5(Date.now())
    await PlayerAuth.update({token:loginToken}, {where:{playerid:player.id}, raw:true} );
    let id = player.id
    console.log(id);
    return  {player,loginToken,id};
}



// Create Team
let createTeam = async (body,playername, id ) => {
  console.log(body);
  if (!body.teamName || !body.maxNoOfPlayersAllowed || !body.tournamentName || !body.players) {
    throw new BadRequestError("Please enter all fields..!");
  }
  let findTeam = await Team.findOne({ where:{teamName:body.teamName}, raw: true });
  if(findTeam){
    throw new AccessDeniedError("Team Already Exist!")
  }
  let str1 = body.players
  const split_string = str1.split(",");
  console.log(split_string,"cuurrenty")
  let currentplayers = split_string;
  let existPlayers =[]
  for (let index = 0; index < currentplayers.length; index++) {
    const element = await Players.findOne({ where:{name:currentplayers[index]}, raw: true });
    if(!element){
      throw new BadRequestError(`Player ${currentplayers[index]} Does Not Exist!`)
    }if(element){
      existPlayers.push(currentplayers[index])
    }
  }
  if(existPlayers.length > body.maxNoOfPlayersAllowed ){
    existPlayers = existPlayers.slice(0, body.maxNoOfPlayersAllowed)
  }
  let allPlayers  =  '"'+existPlayers.join(",")+'"';
  console.log("currentplayerss",allPlayers);
  let newTeam = {
    teamName: body.teamName,
    maxNoOfPlayersAllowed: existPlayers.length,
    tournamentName: body.tournamentName,
    teamCreator: playername,
    players: allPlayers,
    teamCreatorID:id
  }
  let createTeam = await Team.create(newTeam);
  console.log(createTeam,"team");
  return createTeam
} 



//  Update Team
let updateTeam = async (body,id) => {
  let str1 = body.players
  const split_string = str1.split(",");
  let currentplayers = split_string;
  let existPlayers =[]
  for (let index = 0; index < currentplayers.length; index++) {
    const element = await Players.findOne({ where:{name:currentplayers[index]}, raw: true });
    if(!element){
      throw new BadRequestError(`Player ${currentplayers[index]} Does Not Exist!`)
    }if(element){
      existPlayers.push(currentplayers[index])
    }
  }
  if(existPlayers.length > body.maxNoOfPlayersAllowed ){
    existPlayers = existPlayers.slice(0, body.maxNoOfPlayersAllowed)
  }
  let allPlayers  =  '"'+existPlayers.join(",")+'"';
  console.log("currentplayerss",allPlayers);
 
  let newTeam = {
    teamName: body.teamName,
    maxNoOfPlayersAllowed: existPlayers.length,
    players: allPlayers 
  }
  console.log(newTeam);
  let findTounamentName = await Team.findOne({where:{id:id}, raw:true});
  let updateName = await Tournament.update({teamName:body.teamName},{where:{teamName:findTounamentName.teamName}, raw:true})
  let updateTeamDetails = await Team.update(newTeam, {where:{id:id}, raw:true} );
  return {updateTeamDetails, updateName}
}

let getTeamsList = async () => {
  let team =  await Team.findAll({raw:true});
  return { team }
}

let getTeam = async (id) => {
  let team =  await Team.findOne({where:{id:id},raw:true});
  return {team}
}

let getGamesList = async () => {
  let game =  await Games.findAll({raw:true});
  console.log(game);
  return {game}
}

let getTournamentList = async () => {
  let tournament =  await Tournament.findAll({raw:true});
  console.log(tournament);
  return {tournament}
}

let getPlayersList = async () => {
  let players =  await Players.findAll({raw:true});
  console.log(players);
  return {players}
}

// GetAllData(Only MANAGER can get)
let getAllData = async () => {
  let findAllGames = await Games.findAll();
  let findAllPlayers = await Players.findAll();
  let findAllTeams = await Team.findAll();
  let findAllTournaments = await Tournament.findAll();
  return  {findAllGames,findAllPlayers,findAllTournaments,findAllTeams};
}

// Delete Team
let deleteTeam = async(playername, id) =>{         
  let findTeam = await Team.findOne({where:{teamCreator:playername}});
  if(!findTeam){
    throw new AccessDeniedError ('Invalid User')
  }
  let deleteTeamTournament = await Tournament.destroy({where:{teamName:findTeam.teamName}});
  let deleteTeam = await Team.destroy({where:{id:id}});
  return {deleteTeam,deleteTeamTournament}
} 

// Delete Tournament
let deleteTournament = async(id) =>{   
  let TeamName = await Tournament.findOne({where:{id:id}});
  console.log(TeamName);
  let deleteTeam = await Team.destroy({where:{teamName:TeamName.teamName}});
  let deleteTournament = await Team.destroy({where:{tournamentName:TeamName.name}});
  let deleteTournaments = await Tournament.destroy({where:{id:id}});
  console.log("hh"); 
  return {TeamName,deleteTeam,deleteTournament,deleteTournaments}
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