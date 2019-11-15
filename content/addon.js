// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const fs = require('fs');
const ini = require('ini');
const config = ini.parse(fs.readFileSync('./config.py', 'utf-8'));
document.getElementById("channel_id").value = config.DiscordChannel;



(function handleWindowControls() {
    // When document has loaded, initialise
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            closeButton = document.getElementById('close-button');

        minButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.minimize();
        });


        closeButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.close();
        });


    }
})();
