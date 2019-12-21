/**
* app.js
* @author Merubokkusu
* @description 
* @created Sat Mar 30 2019 00:40:08 GMT-0400 (Eastern Daylight Time)
* @copyright 2018 - 2019
* @license CC BY-NC-ND 3.0 US | https://creativecommons.org/licenses/by-nc-nd/3.0/us/
* @website https://github.com/Merubokkusu/discord-spam-bots/
* @email liam@merubokkusu.com
* @last-modified Sun Mar 31 2019 18:42:42 GMT-0400 (Eastern Daylight Time)
*/

const fs = require('fs');
const ini = require('ini');
const config = ini.parse(fs.readFileSync('./config.py', 'utf-8'));
var cp = require('child_process');
var os = require('os');

function LoadConfig(){
//# Basic Config (For all bots)
document.getElementById("pythonCom_id").value = config.pythonCommand;
document.getElementById("channel_id").value = config.DiscordChannel;
document.getElementById("spmspd_id").value = config.SpamSpeed;
document.getElementById("txtrng_id").value = config.textRandom;
document.getElementById("txtful_id").value = config.textFull;
//Server Joiner
document.getElementById("useTokenJoin").value = config.useTokenJoin;
document.getElementById("inviteLink").value = config.inviteLink;
document.getElementById("autojoinServer").value = config.autojoinServer;
document.getElementById("useBrowser").value = config.useBrowser;
document.getElementById("joinSpeed").value = config.joinSpeed;
//DM Spam
document.getElementById("server_id").value = config.DiscordServer;
document.getElementById("ScanAllServers").value = config.ScanAllServers;
document.getElementById("HeavyScrape").value = config.HeavyScrape;
//Account Creator
document.getElementById("captchaAPI").value = config.captchaAPI;
document.getElementById("mailServer").value = config.mailServer;
//Picture spam
document.getElementById("DirPictures").value = config.DirPictures;
}

function ConfigWriter(config_ID,set2){
    config.config_ID = set2;
    fs.writeFileSync('./config_modified.ini', ini.stringify(config))

}

//Logger
rewireLoggingToElement(
    () => document.getElementById("log"),
    () => document.getElementById("log-container"), true);

function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll) {
    fixLoggingFunc('log');
    fixLoggingFunc('debug');
    fixLoggingFunc('warn');
    fixLoggingFunc('error');
    fixLoggingFunc('info');

    function fixLoggingFunc(name) {
        console['old' + name] = console[name];
        console[name] = function(...arguments) {
            const output = produceOutput(name, arguments);
            const eleLog = eleLocator();

            if (autoScroll) {
                const eleContainerLog = eleOverflowLocator();
                const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
                eleLog.innerHTML += output + "<br>";
                if (isScrolledToBottom) {
                    eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
                }
            } else {
                eleLog.innerHTML += output + "<br>";
            }

            console['old' + name].apply(undefined, arguments);
        };
    }

    function produceOutput(name, arguments) {
        return arguments.reduce((output, arg) => {
            return output +
                "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
                +'\x5B'+new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")+ '] '+  (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
                "</span>&nbsp;";
        }, '');
    }
}
//End Logger

function writeToFile(d1){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("t.txt", 8, true, 0);
    console.log(fh)
    fh.WriteLine(d1);
    fh.Close();
}
var submit = document.getElementById("add_token_button");
submit.onclick = function () {
    console.warn("meme");
    fs.appendFileSync('message.txt', document.getElementById("token_add").value);
    console.error("Saved : "+token_text)
}

function startBot () {
    console.info("Starting Bot");
    var lines = document.getElementById('text_spam').value.split('\n');
    if (fs.existsSync('text.txt')){
        fs.unlinkSync('text.txt')
    }
    for(var i = 0;i < lines.length;i++){
        //code here using lines[i] which will give you each line
        fs.appendFileSync('text.txt', lines[i]+'\n');

    }

    var python = cp.spawn('python', ['start.py','1',document.getElementById('text_spam').value]);
    python.stdout.on('data',function(data){
        logMessage = data.toString('utf8');
        console.log(logMessage.trim());
    });
    
}

function killBot(){
    console.error('Killed All Instances Of Bot')
    if(os.platform() == 'win32'){
        cp.spawn('taskkill',['/F', '/IM', 'python.exe', '/T'])
    }else{
        cp.spawn('pkill -9 python')
    }

}



