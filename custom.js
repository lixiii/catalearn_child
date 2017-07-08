// customized changes to jupyter
// run "cp custom.js ~/.jupyter/custom/custom.js"

//do NOT add trailing slash as all following URLs have slashes
const catalearn_API_location = window.location.href.match(/http:\/\/[a-z.0-9]+/)[0];

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
//         catalearn_load_menu(catalearn_child_API_location);        
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
    var catalearn_child_API_location = "localhost:9999";
    catalearn_load_menu(catalearn_child_API_location);
})

function catalearn_load_menu(catalearn_child_API_location)
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
        $.ajax({
            url: catalearn_API_location + "/api/"
        })
    });
    console.log("Loaded Catalearn module");
}
