let BadRequestError = require('../error/badRequestError');
const Manager = require('../model/manager');
const ManagerAuth = require('../model/managerauth');
const PlayerAuth = require('../model/playerauth');
const Players = require('../model/players');

let managerValidate = async (req, res, next) => {
  try{
  let token = req.headers.token
  let manager = await ManagerAuth.findOne({ where:{ token:token} , raw: true  });
  if(!manager){
    throw new BadRequestError("Manager Invalid!")
  }
  let isManagerExist = await Manager.findOne({where:{id:manager.id}, raw:true});
  if(!isManagerExist){
    throw new BadRequestError("Entry not valid");
  }
  req.id= isManagerExist.id;
  next()
}catch(e){ 
next(e)}
}

let playerValidate = async (req, res, next) => {
 try{ let token = req.headers.token
  let player = await PlayerAuth.findOne({ where:{ token:token} , raw: true  });
  if(!player){
    throw new BadRequestError (" Invalid Player!")
  }
  let isPlayerExist = await Players.findOne({where:{id:player.id}, raw:true});       
  if(!isPlayerExist){
    throw new BadRequestError("Entry not valid");
  }
  req.playername = isPlayerExist.name
  req.id= isPlayerExist.id 
  console.log(req.id , req.playername);

  next()
}catch(e){
next(e)}
}  

module.exports = {playerValidate ,managerValidate}