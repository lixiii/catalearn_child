var spawn = require('child_process').spawn;

var request_origin = "localhost";
if(global.release) {
    html_location = "release";
    request_origin = "catalearn.com";
}

module.exports = function(app, router, io) 
{
    app.use(headerConfig);

    // router.route("/api/downloadFile").post(downloadController.downloadFile);

    // download file should be handled via an io event so that the live output can be streamed

    app.use(router);

    io.on("connection", function(socket){
        socket.emit("connected", "Welcome. You are now connected to child Catalearn server.");

        socket.on("downloadFile", function(socketData){
            console.log(`download request received, request details: socketData.url = ${socketData.url}`);
            var child = spawn("ping", ["-c 3", socketData.url]);
            child.stdout.on('data', function(data) {
                console.log('stdout: ' + data.toString());
                socket.emit("downloadStatus",data.toString());
            });
            child.stdout.on('exit', function(data) {
                socket.emit("downloadComplete");
            });
        });
    });
};


var headerConfig = function(req, res, next) {
    var origin = req.get('origin');
    if(origin != undefined) {
        if(origin.indexOf(request_origin) != -1)
            {
                // origin is to be allowed
                res.header('Access-Control-Allow-Origin', origin);
            }
        else res.header('Access-Control-Allow-Origin', 'null');            
    }
    else {
        res.header('Access-Control-Allow-Origin', [
            'http://catalearn.com',
            'http://github.com',
            'http://localhost'
        ]);  
    } 

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
}