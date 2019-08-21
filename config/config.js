module.exports.ConsoleOption = {
  format: [
    "[{{title}}] [{{timestamp}}] [in {{file}}:{{line}}] {{message}}", //default format
    {
      log: "[{{title}}]   [{{timestamp}}] [in {{file}}:{{line}}] {{message}}",
      debug: "[{{title}}] [{{timestamp}}] [in {{file}}:{{line}}] {{message}}",
      info: "[{{title}}]  [{{timestamp}}] [in {{file}}:{{line}}] {{message}}",
      warn: "[{{title}}]  [{{timestamp}}] [in {{file}}:{{line}}] {{message}}",
      error: "[{{title}}] [{{timestamp}}] [in {{file}}:{{line}}] {{message}}" // error format
    }
  ],
  dateformat: "yyyy.mm.dd HH:MM:ss.L",
  preprocess: function (data) {
    data.title = data.title.toUpperCase();
  }
};

module.exports.dbConfig = {
  host: process.env.localhost,
  user : process.env.DBUser,
  password : process.env.DBPassword,
  database : "IndexServer",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

module.exports.division = {
  localhost : 'localhost',
  remoteIp : 'remoteIp',
  remotePort : 'remotePort',
  localIp : 'localIp',
  localPort : 'localPort',
  empIP : 'emptyIp',
  empPort : 'emptyPort'
}

module.exports.ipaddr = function ipaddr(socket, division){
  if(division == 'localhost'){
    var localhost = process.env.localhost;
    return(localhost);
  }
  else if(division == 'remoteIp'){
    var remote_ip = (socket.remoteAddress).slice(7);
    return(remote_ip);
  }
  else if(division == 'localIp'){
    var local_ip = (socket.localAddress).slice(7);
    return(local_ip);
  }
  else if(division == 'localPort'){
    var local_port = socket.localPort;
    return(local_port);
  }
  else if(division == 'remotePort'){
    var remote_port = socket.remotePort;
    return(remote_port);
  }
  else if(division == "emptyIp"){
    var ip = "0.0.0.0";
    return(ip);
  }
  else if(division == "emptyPort"){
    var port = 0;
    return(port);
  }
}

module.exports.port = {
  nodePort : process.env.nodePort,
  walletPort : process.env.walletPort,
  NNA2NNA_Srv : process.env.NNA2NNA_Srv,
  NNA2NNA_Cli : process.env.NNA2NNA_Cli,
  NNA2ISA_Srv : process.env.NNA2ISA_Srv,
  CN2NNA_Cli : process.env.CN2NNA_Cli
}

module.exports.option = {
  proto : 1,
  gen_time : 2000,
  gen_round : 1,
  start_block_num : 1,
  tear_num : 1,
  max : 21,
  udp_svr : 1,
  udp_cli : 2,
  tcp_svr : 2,
  tcp_cli : 1,
  auto_join : 0,
  p2p_join : 1
}

module.exports.nodename = {
  networkNode : "NN",
  consensusNode : "CN",
  rootNode : "RN",
  branchNode : "BN"
}

module.exports.filename = {
  rr_net : "rr_net.json",
  node_nn : "node_nn.json",
  path_rr_net : "./rr_net.json",
  path_node_nn : "./node_nn.json",
  path_key : "key/",
  path_prv_key : "key/me/privkey.pem",
  path_pub_key : "key/me/pubkey.pem"
}

module.exports.prrPoint = {
  prrSet : 5000,
  prrNode1 : 9999,
  prrNode2 : 8888,
  prrNode3 : 7777
}
