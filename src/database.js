const mysql = require('mysql2/promise');
const config = require('../config/config.js');
const logger = require('tracer').colorConsole(config.ConsoleOption);
const winlog = require("./winlog.js");

module.exports.connect = async function connect(){
  connection = await mysql.createPool(config.dbConfig);
  logger.info("mysql connection");
  winlog.info("mysql connection");
  return connection;
}

module.exports.truncate = async function truncate(){
  let truncate = "TRUNCATE rrList";
  await connection.execute(truncate);
  logger.info("TRUNCATE database rrList");
  winlog.info("TRUNCATE database rrList");
}

module.exports.query = {
  querys :  {
    InsertRrList: 'INSERT INTO rrList(idrrList, p2paddr, prr, ip, port, country, city, cluster, name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    changeCN : 'UPDATE IndexServer.rrList SET node="CN" WHERE prr IN (SELECT * FROM (SELECT prr FROM IndexServer.rrList ORDER BY prr DESC LIMIT 1, ?) tmp)',
    changeNN : 'UPDATE IndexServer.rrList SET node="NN" WHERE prr IN (SELECT * FROM (SELECT prr FROM IndexServer.rrList ORDER BY prr DESC LIMIT 1) tmp)',
    changeNNs : 'UPDATE IndexServer.rrList SET node="NN" WHERE prr IN (SELECT * FROM (SELECT prr FROM IndexServer.rrList ORDER BY prr DESC LIMIT 1, ?) tmp)',
    descRrList : 'SELECT idrrList, node, ip, port, p2paddr FROM IndexServer.rrList',
    descCheckRrList : 'SELECT node, idrrList, ip FROM IndexServer.rrList ORDER BY prr DESC',
    check_rrList : 'SELECT node, ip, country, city, cluster, name FROM IndexServer.rrList',
    ip_check_NN : 'SELECT node, ip, port FROM IndexServer.rrList WHERE node = \'NN\''
  }
};