const config = require('../config/config.js');

module.exports.rrnet = function rrnet(list, timeStamp, nn_id, nn_count){
  let sock1 = new Object();
  let sock2 = new Object();
  let sock3 = new Object();
  let nn_list1 = new Object();
  let nn_list2 = new Object();
  let nn_list3 = new Object();
  let nn_list_array = new Array();
  let net_tier = new Object();
  let net_tier_array = new Array();
  let net = new Object();
  let rr_net = new Object();
  if(nn_count == 1){
    sock1.PROTO = config.option.proto;
    sock1.IP = list[0][nn_id[0]].ip;
    sock1.PORT = config.port.NNA2NNA_Srv;
    nn_list1.P2P = list[0][nn_id[0]].p2paddr;
    nn_list1.SOCK = sock1;
    nn_list_array.push(nn_list1);
    net_tier.GEN_TIME = config.option.gen_time;
    net_tier.GEN_ROUND = config.option.gen_round;
    net_tier.START_TIME = timeStamp;
    net_tier.TOTAL_NN = nn_count;
    net_tier.START_BN = config.option.start_block_num;
    net_tier.NN_LIST = nn_list_array;
    net_tier_array.push(net_tier);
    net.TIER_NUM = config.option.tear_num;
    net.TIER = net_tier_array;
    rr_net.NET = net;
    return(rr_net);
  }
  else if(nn_count == 2){
    sock1.PROTO = config.option.proto;
    sock1.IP = list[0][nn_id[0]].ip;
    sock1.PORT = config.port.NNA2NNA_Srv;
    sock2.PROTO = config.option.proto;
    sock2.IP = list[0][nn_id[1]].ip;
    sock2.PORT = config.port.NNA2NNA_Srv;
    nn_list1.P2P = list[0][nn_id[0]].p2paddr;
    nn_list1.SOCK = sock1;
    nn_list2.P2P = list[0][nn_id[1]].p2paddr;
    nn_list2.SOCK = sock1;
    nn_list_array.push(nn_list1);
    nn_list_array.push(nn_list2);
    net_tier.GEN_TIME = config.option.gen_time;
    net_tier.GEN_ROUND = config.option.gen_round;
    net_tier.START_TIME = timeStamp;
    net_tier.TOTAL_NN = nn_count;
    net_tier.START_BN = config.option.start_block_num;
    net_tier.NN_LIST = nn_list_array;
    net_tier_array.push(net_tier);
    net.TIER_NUM = config.option.tear_num;
    net.TIER = net_tier_array;
    rr_net.NET = net;
    return(rr_net);
  }
  else{
    sock1.PROTO = config.option.proto;
    sock1.IP = list[0][nn_id[0]].ip;
    sock1.PORT = config.port.NNA2NNA_Srv;
    sock2.PROTO = config.option.proto;
    sock2.IP = list[0][nn_id[1]].ip;
    sock2.PORT = config.port.NNA2NNA_Srv;
    sock3.PROTO = config.option.proto;
    sock3.IP = list[0][nn_id[2]].ip;
    sock3.PORT = config.port.NNA2NNA_Srv;
    nn_list1.P2P = list[0][nn_id[0]].p2paddr;
    nn_list1.SOCK = sock1;
    nn_list2.P2P = list[0][nn_id[1]].p2paddr;
    nn_list2.SOCK = sock1;
    nn_list3.P2P = list[0][nn_id[2]].p2paddr;
    nn_list3.SOCK = sock1;
    nn_list_array.push(nn_list1);
    nn_list_array.push(nn_list2);
    nn_list_array.push(nn_list3);
    net_tier.GEN_TIME = config.option.gen_time;
    net_tier.GEN_ROUND = config.option.gen_round;
    net_tier.START_TIME = timeStamp;
    net_tier.TOTAL_NN = nn_count;
    net_tier.START_BN = config.option.start_block_num;
    net_tier.NN_LIST = nn_list_array;
    net_tier_array.push(net_tier);
    net.TIER_NUM = config.option.tear_num;
    net.TIER = net_tier_array;
    rr_net.NET = net;
    return(rr_net);
  }
}

module.exports.rrsubnet = function rrsubnet(list, cn_id, count, cn_count){
  let cn_addr = new Array();
  let subnet_tier = new Object();
  let subnet_tier_array = new Array();
  let subnet = new Object();
  let rr_subnet = new Object();

  for(var i = 0; i < cn_count; i++){
    if((list[0][count].p2paddr).slice(0, 14) == (list[0][cn_id[i]].p2paddr).slice(0, 14)){
      cn_addr.push(list[0][cn_id[i]].p2paddr);
    }
  }
  subnet_tier.CN_NUM = cn_count;
  subnet_tier.CN_ADDR = cn_addr;
  subnet_tier_array.push(subnet_tier);
  subnet.TIER_NUM = 1;
  subnet.TIER = subnet_tier_array;
  rr_subnet.SUBNET = subnet;
  return(rr_subnet);
}

module.exports.nnnode = function nnnode(list, count){
  let peer1 = new Object();
  let local1 = new Object();
  let peer2 = new Object();
  let local2 = new Object();
  let peer3 = new Object();
  let local3 = new Object();
  let peer4 = new Object();
  let local4 = new Object();
  let cluster = new Object();
  let num = new Object();
  let udp_svr_1 = new Object();
  let udp_cli_1 = new Object();
  let udp_cli_2 = new Object();
  let tcp_svr_1 = new Object();
  let tcp_svr_2 = new Object();
  let tcp_cli_1 = new Object();
  let tcp_cli_2 = new Object();
  let path = new Object();
  let cons = new Object();
  let p2p = new Object();
  let sock = new Object();
  let node = new Object();
  let jsonNNNode = new Object();

  peer1.IP = config.ipaddr(null, config.division.empIP);
  peer1.PORT = config.ipaddr(null, config.division.empPort);
  local1.IP = config.ipaddr(null, config.division.empIP);
  local1.PORT = config.ipaddr(null, config.division.empPort);
  peer2.IP = config.ipaddr(null, config.division.empIP);
  peer2.PORT = config.ipaddr(null, config.division.empPort);
  local2.IP = config.ipaddr(null, config.division.empIP);
  local2.PORT = config.ipaddr(null, config.division.empPort);
  peer3.IP = config.ipaddr(null, config.division.empIP);
  peer3.PORT = config.ipaddr(null, config.division.empPort);
  local3.IP = list[0][count].ip;
  local3.PORT = config.port.NNA2NNA_Cli;
  cluster.ROOT = list[0][count].p2paddr;
  cluster.ADDR = '0x' + (count+0x10000).toString(16).substr(-4).toUpperCase();
  cluster.MAX = config.option.max;
  num.UDP_SVR = config.option.udp_svr;
  num.UDP_CLI = config.option.udp_cli;
  num.TCP_SVR = config.option.tcp_svr;
  num.TCP_CLI = config.option.tcp_cli;
  udp_svr_1.MREQ_IP = config.ipaddr(null, config.division.empPort);
  udp_svr_1.IP = config.ipaddr(null, config.division.empIP);
  udp_svr_1.PORT = config.ipaddr(null, config.division.empPort);
  udp_cli_1.PEER = peer1;
  udp_cli_1.LOCAL = local1;
  udp_cli_2.PEER = peer2;
  udp_cli_2.LOCAL = local2;
  tcp_svr_1.IP = list[0][count].ip;
  tcp_svr_1.PORT = config.port.NNA2ISA_Srv;
  tcp_svr_2.IP = list[0][count].ip;
  tcp_svr_2.PORT = config.port.NNA2NNA_Srv;
  tcp_cli_1.AUTO_JOIN = config.option.auto_join;
  tcp_cli_1.P2P_JOIN = config.option.p2p_join;
  tcp_cli_1.PEER = peer3;
  tcp_cli_1.LOCAL = local3;
  path.KEY = config.filename.path_key;
  path.MY_PRIKEY = config.filename.path_prv_key;
  path.MY_PUBKEY = config.filename.path_pub_key;
  cons.PATH = path;
  p2p.CLUSTER = cluster;
  sock.NUM= num;
  sock.UDP_SVR_1 = udp_svr_1;
  sock.UDP_CLI_1 = udp_cli_1;
  sock.UDP_CLI_2 = udp_cli_2;
  sock.TCP_SVR_1 = tcp_svr_1;
  sock.TCP_SVR_2 = tcp_svr_2;
  sock.TCP_CLI_1 = tcp_cli_1;
  node.TYPE = config.nodename.rootNode;
  node.RULE = config.nodename.networkNode;
  node.P2P = p2p;
  node.SOCK = sock;
  node.CONS = cons;
  jsonNNNode.NODE = node;
  return(jsonNNNode);
}

module.exports.cnnode = function cnnode(list, count, node_count){
  var peer1 = new Object();
  var local1 = new Object();
  var peer2 = new Object();
  var local2 = new Object();
  var cluster = new Object();
  var num = new Object();
  var udp_svr_1 = new Object();
  var tcp_svr_1 = new Object();
  var tcp_cli_1 = new Object();
  var tcp_cli_2 = new Object();
  var path = new Object();
  var p2p = new Object();
  var sock = new Object();
  var cons = new Object();
  var node = new Object();
  var jsonCNNode = new Object();

  for(var i = 0; i < node_count; i++){
    if(list[0][i].node == config.nodename.networkNode){
      peer1.IP = list[0][i].ip;
      cluster.ROOT = list[0][i].p2paddr;
    }
  }

  peer1.PORT = config.port.NNA2ISA_Srv;
  local1.IP = list[0][count].ip;
  local1.PORT = config.port.CN2NNA_Cli;
  cluster.ADDR = '0x' + (count+0x10000).toString(16).substr(-4).toUpperCase();
  cluster.MAX = 21;
  num.UDP_SVR = 1;
  num.UDP_CLI = 0;
  num.TCP_SVR = 0;
  num.TCP_CLI = 1;
  udp_svr_1.MREQ_IP = config.ipaddr(null, config.division.empIP);
  udp_svr_1.IP = config.ipaddr(null, config.division.empIP);
  udp_svr_1.PORT = config.ipaddr(null, config.division.empPort);
  tcp_cli_1.AUTO_JOIN = 1;
  tcp_cli_1.P2P_JOIN = 1;
  tcp_cli_1.PEER = peer1;
  tcp_cli_1.LOCAL = local1;
  path.KEY = config.filename.path_key;
  path.MY_PRIKEY = config.filename.path_prv_key;
  path.MY_PUBKEY = config.filename.path_pub_key;
  p2p.CLUSTER = cluster;
  sock.NUM = num;
  sock.UDP_SVR_1 = udp_svr_1;
  sock.TCP_CLI_1 = tcp_cli_1;
  cons.PATH = path;
  node.TYPE = config.nodename.branchNode;
  node.RULE = config.nodename.consensusNode;
  node.P2P = p2p;
  node.SOCK = sock;
  node.CONS = cons;
  jsonCNNode.NODE = node;

  return(jsonCNNode);
}
