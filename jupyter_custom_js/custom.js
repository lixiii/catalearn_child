// customized changes to jupyter
// run "cp custom.js ~/.jupyter/custom/custom.js"

// import dependencies
require(['custom/catalearn_plugin','custom/socket.io'], function(catalearn, io){
    // debugger;
    catalearn.init();
    catalearn.initIO(io);
});
