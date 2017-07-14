//do NOT add trailing slash as all following URLs have slashes
define(function(require){

const catalearn_API_location = window.location.href.match(/http:\/\/[a-z.0-9]+/)[0];
var catalearn_child_API_location;

function init(){

    window.setInterval(function(){
        // console.log('pinging server');
        $.ajax({
            url: catalearn_API_location + "/api/pingServer",
            method: "POST",
            data: {
                url: window.location.href
            },
            statusCode: {
                200: function() {
                    console.log('server acknowledged');
                }
            }
        })
    }, 5000);

    // append Catalearn widget bar

    // Currently disabled for debugging. Use hardcoded API Location

    // $(document).ready(function(){
    //     $.ajax({
    //         url: catalearn_API_location + "/api/getChildServerLocation",
    //         method:"GET",
    //         data: {}
    //     }).done(function( data, textStatus, jqXHR ) {
    //         _catalearnLoadMenu(catalearn_child_API_location);        
    //     }).fail(function( data, textStatus, jqXHR) {
    //         $("div#new-buttons").after(`
    //             <div id="catalearn" class="btn-group">
    //                 <button class="dropdown-toggle btn btn-default btn-xs disabled" data-toggle="dropdown" aria-expanded="false">
    //                 Catalearn not available.
    //                 </button>
    //             </div>`);
    //     });
    // });

    $(document).ready(function(){
        catalearn_child_API_location = "localhost:9999";
        _catalearnLoadMenu();
    });

}

function _catalearnLoadMenu()
{
    // append content to the home screen
    $("div#new-buttons").after(`
    <div id="catalearn" class="btn-group">
        <button class="dropdown-toggle btn btn-default btn-xs" data-toggle="dropdown" aria-expanded="false">
        <span>Catalearn</span>
        <span class="caret"></span>
        </button>
        <ul id="catalearn_menu" class="dropdown-menu">
            <li role="presentation" class="dropdown-header">Import Content</li>
            <li role="presentation" id="catalearn_download_url">
                <a href="#" title="Download from a given URL to the notebook home directory">Download from URL</a>
            </li>
            <li role="presentation" class="divider"></li>
            <li role="presentation" class="dropdown-header">Export Content</li>
            <li role="presentation" id="catalearn_download_all">
                <a href="#" title="Download all files in current directory">Download all files</a>
            </li>
        </ul>
    </div>`);


    // Button event listeners
    $("#catalearn_download_url").on("click", function(){
        if(window._catalearnWSConnected){
            var url = window.prompt("Enter the URL to the file that you wish to download to the base directory of the notebook. Note: This operation will download whatever you put in the URL, ie. even an HTML page");
            if(!_validateURL(url)) url = window.prompt("Enter the URL to the file that you wish to download to the base directory of the notebook. Note: This operation will download whatever you put in the URL, ie. even an HTML page");
            window.socket.emit("downloadFile", {url: url });
        }
    });
    console.log("Loaded Catalearn module");
}

function initIO(io){
    window.socket = io.connect(catalearn_child_API_location);

    // socket even listeners
    window.socket.on('connected', function (data) {
        console.log(data);
        window._catalearnWSConnected = true;
    });
    window.socket.on("downloadStatus", function(data){
        console.log(`Download status: ${data}`)
    });
}

function _validateURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

return {
    // constants
    catalearn_API_location: catalearn_API_location,
    catalearn_child_API_location: catalearn_child_API_location,


    //methods
    initIO: initIO,
    init: init
}
})
