module.exports.list = function rrlist(prr, data, isa, count){
  let rrTmpList = new Object();
  rrTmpList.LIST = data;
  let rrTmpList2JSON = JSON.stringify(rrTmpList, null, 4);

  let rrList_object = new Object;
  let country = rrTmpList.LIST.HWInfo.GPS.country;
  rrList_object.COUNTRY = country;
  let city = rrTmpList.LIST.HWInfo.GPS.city;
  rrList_object.CITY = city;
  rrList_object.IP = (isa.remoteAddress).slice(7);
  let port = rrTmpList.LIST.HWInfo.PORT;
  rrList_object.PORT = port;
  rrList_object.PRR = prr;



  let idc_center_code = "003";
  let cluster_code = "5";
  let node_code = (count+0x10000).toString(16).substr(-4).toUpperCase();
  let cluster = idc_center_code + cluster_code;
  rrList_object.CLUSTER = cluster;
  let tmp_name = new Array();
  tmp_name = ['GMBKOREA', 'GMBSEOUL', 'KoreaGMB'];
  let name = tmp_name[count%3];
  rrList_object.NAME = name;
  let p2paddr = rrTmpList.LIST.HWInfo.P2PADDR + idc_center_code + cluster_code + node_code;
  rrList_object.P2PADDR = p2paddr;
  return rrList_object;
}
