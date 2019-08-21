# Inspection
SeongKee, Kim ( sk.quant@gmail.com)

# IS
IS is a index server and that's definition is communicates P2P network information to the appropriate Joining NN.
This code made by nodejs.

### ROLE 
 - certification
 - P2P Address Assignment
 - get node information
 - calculate prr
 - make round robin list

# PRR
PRR is a Peer Reliability Rate.
This extracts information from the node based on the hardware information.

# RR List
RR List is a Round Robin List.
This means the network connection information between NN and CN.


You can also:
  - first, Download the latest version from the repository
  - second, run is.js and isa.js (You must run is.js first.)

### global dependencies
>net
>mysql2
>tracer
>fs

### local dependencies
>config
>winlog
>database
>rrList
>jsonFile
>sendFiles

### how to run IS
```sh
$ cd is
$ node is.js
```

