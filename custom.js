// customized changes to jupyter
// run "cp custom.js ~/.jupyter/custom/custom.js"

//do NOT add trailing slash as all following URLs have slashes
const API_location = window.location.href.match(/http:\/\/[a-z.0-9]+/)[0];

window.setInterval(function(){
    // console.log('pinging server');
    $.ajax({
        url: API_location + "/api/pingServer",
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
$(document).ready(function(){
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

    console.log("Loaded Catalearn module");
});
