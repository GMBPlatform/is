//sk.quant@gmail.com

const net = require('net');
const fs = require('fs');
const mysql = require('mysql2/promise');
const config = require('./config/config.js');
const logger = require('tracer').colorConsole(config.ConsoleOption);
const winlog = require("./src/winlog.js");
const db = require("./src/database.js");
const rrlist = require("./src/rrList.js");
const jsonfile = require("./src/jsonFile.js");
const send = require("./src/sendFiles.js");

let node_count= 0;
let ctx_count = 0;
var connection;
let rrList = new Object();
let ListArray = new Array();
rrList.LIST = ListArray;
let ctx = new Object();
let ctxArray = new Array();
ctx.CTX = ctxArray;
let timeStamp = String(Math.floor(+ new Date()));

function writeData(socket, data) {
  socket.write(data);
}

function IsJsonString(str){
  try{
    JSON.parse(str);
  }catch(e){
    return false;
  }
  return true;
}

main();
async function main(){
  connection = await db.connect();
  await db.truncate();

  //client -> isa0 , server -> is
  let is = net.createServer(function (isa0) {
    logger.info("isa connection");
    winlog.info("isa connection");
    logger.debug("local = %s : %s", config.ipaddr(isa0, config.division.localIp), config.ipaddr(isa0, config.division.localPort));
    logger.debug("remote = %s : %s", config.ipaddr(isa0, config.division.remoteIp), config.ipaddr(isa0, config.division.remotePort));
    if(config.ipaddr(isa0, config.division.remoteIp) != config.ipaddr(isa0, config.division.localhost)){
      ctx.CTX[ctx_count] = isa0;
      ctx_count++;
    }
    isa0.setEncoding('utf8');
    isa0.on('data', async function (data) {
      logger.debug("Received data from client on port %d : \n %s", config.ipaddr(isa0, config.division.remotePort), data.toString());
      logger.debug("Bytes received : " + isa0.bytesRead);
      logger.debug("Bytes sent : " + isa0.bytesWritten);
      if(IsJsonString(data) == true){
        let tmp_data = JSON.parse(data);
        if(tmp_data.HWInfo != null){
          logger.info("cheking to be node");
          //virtual machine check
          if(tmp_data.HWInfo.virtualChecking1 != null || tmp_data.HWInfo.virtualChecking2 != null){
            let message = "This machine is Virtual machine!!!! can't be a node!!!!";
            writeData(isa0, message);
          }
          //calculate prr
          else {
            logger.info("calculate prr");
            let tmp_prr = new Array();
            tmp_prr = [config.prrPoint.prrNode1, config.prrPoint.prrNode2, config.prrPoint.prrNode3];
            let prr = tmp_prr[node_count%3];
            //make rrList
            if(prr > config.prrPoint.prrSet){
              rrList.LIST[node_count] = rrlist.list(prr, tmp_data, isa0, node_count);
              let rrList2JSON = JSON.stringify(rrList, null, 4);
              
              //line up NN, CN
              await connection.execute(db.query.querys.InsertRrList, [node_count, rrList.LIST[node_count].P2PADDR, rrList.LIST[node_count].PRR, rrList.LIST[node_count].IP,
                rrList.LIST[node_count].PORT, rrList.LIST[node_count].COUNTRY, rrList.LIST[node_count].CITY, rrList.LIST[node_count].CLUSTER, rrList.LIST[node_count].NAME]);
              await connection.execute(db.query.querys.changeCN, [node_count]);
              await connection.execute(db.query.querys.changeNN);
              node_count++;
              if(node_count > 3){
                await connection.execute(db.query.querys.changeNNs, [parseInt((node_count-1)/3)]);
              }
            }
            else{
              writeData(isa0, "Your prr is too low");
            }
          }
        }
      }
    });
    isa0.on('end', function () {
      logger.info("Client disconnected");
      is.getConnections(function (err, count) {
        logger.info("Remaining Connections : " + count);
      });
    });
    isa0.on('lookup', function(){
    });
    isa0.on('error', function (err) {
      logger.error("Socket Error : " + JSON.stringify(err));
    });
    isa0.on('timeout', function () {
      logger.warn("Socket Timed out");
    });
  });

  is.listen(config.port.nodePort, async function () {
    logger.info("Server listening: " + JSON.stringify(is.address()));
    is.on('close', function () {
      logger.info('Server Terminated');
    });
    is.on('error', function (err) {
      logger.error('Server Error: ', JSON.stringify(err));
    });
  });

  await setTimeout(function(){
    logger.info("Update RR List Req");
    send.sendFiles(node_count, ctx, timeStamp);
  }, 20000)
}

//client -> wallet , server -> is
var is_1 = net.createServer(function (wallet) {
  logger.info("wallet connection");
  winlog.info("wallet connection");
  logger.debug("local = %s : %s", config.ipaddr(wallet, config.division.localIp), config.ipaddr(wallet, config.division.localPort));
  logger.debug("remote = %s : %s", config.ipaddr(wallet, config.division.remoteIp), config.ipaddr(wallet, config.division.remotePort));
  wallet.setEncoding('utf8');
  wallet.on('data', async function (data) {
    logger.debug("Received data from client on port %d : \n %s", config.ipaddr(wallet, config.division.remotePort), data.toString());
    logger.debug("Bytes received : " + wallet.bytesRead);
    logger.debug("Bytes sent : " + wallet.bytesWritten);
    const receivedData = JSON.parse(data.toString());
    //to blockexplorer
    if(receivedData.delimiter == "blockExplorer"){
      [check_rrList] = await connection.execute(db.query.querys.check_rrList);
      logger.debug(check_rrList);
      let delimiter = new Object();
      let delimiter_Array = new Array();
      check_rrList.forEach((element)=>{
        delimiter_Array.push({
          //ip:element.ip,
          ip: "211.42.197.193",
          region:`${element.country} ${element.city}`,
          role:element.node,
          name:element.name,
          group:element.cluster
        })
      })
      let response2JSON = JSON.stringify(delimiter_Array, null, 4);
      logger.debug(response2JSON);
      await writeData(wallet, response2JSON);
    }
    //to Wallet
    else{
      [[ip_check_rrList]] = await connection.execute(db.query.querys.ip_check_NN);
      logger.debug(ip_check_rrList);
      //let ip = ip_check_rrList.ip;
      let port = ip_check_rrList.port;
      let sca = new Object();
      sca.ip = "211.42.197.193";
      sca.port = port;
      let response2JSON = JSON.stringify(sca, null, 4);
      logger.debug(response2JSON);
      await writeData(wallet, response2JSON);
    }

    //mapping table
  });
  wallet.on('end', function () {
    logger.info('Client disconnected');
    is_1.getConnections(function (err, count) {
      logger.info('Remaining Connections : ' + count);
    });
  });

  wallet.on('error', function (err) {
    logger.error('Socket Error: ', JSON.stringify(err));
  });

  wallet.on('timeout', function () {
    logger.warn("Socket Timed out");
  });

});

is_1.listen(config.port.walletPort, function () {
  logger.info("Server listening: " + JSON.stringify(is_1.address()));
  is_1.on('close', function () {
    logger.info('Server Terminated');
  });
  is_1.on('error', function (err) {
    logger.error('Server Error: ', JSON.stringify(err));
  });
});
