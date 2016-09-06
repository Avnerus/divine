var Game = require('./game').default;
var config = require('./config').default;
var Stats = require('stats.js');

var game = new Game(config);
var stats = new Stats();
stats.showPanel(0);

var fullscreen = require('fullscreen');
//var lock = require('pointer-lock-chrome-tolerant');

console.log("Loading...");
game.init();
//var el = document.getElementsByTagName('body')[0];
//var el = document.getElementById('game');
var el = document.documentElement;

window.onload = function() {
    document.getElementById('start-button').addEventListener('click',function(event) {
        /*
        if (!Modernizr.touchevents && config.controls == "locked" && lock.available()) {
            
            var pointer = lock(document.getElementById('game'));

            pointer.on('attain', function() {
                console.log("Pointer attained!");
                if (!game.started) {
                    start();
                }
                });

                pointer.request(); 
        }*/

        
        if (fullscreen.available()) {
            var fs = fullscreen(el);

            fs.on('attain',function() {
                console.log("Full screen attained!");
                if (typeof(pointer) != 'undefined' && !game.started) {
                    pointer.request();
                } else {
                    if (!game.started) {
                        start();
                    }
                }
            });
            fs.request();
        } else {
            if (!game.started) {
                start();
            }
        }

        //start(); 
    });
    game.load(function() {
        document.getElementById('start-container').style.display = "flex";
        document.getElementById('loading-container').style.display = "none";
    });
}

function start() {
    document.getElementById('start-container').style.display = "none";
    document.getElementById('game').appendChild(stats.dom);
    game.start();
    window.addEventListener('resize', resize, false);
    window.addEventListener('vrdisplaypresentchange', resize, true);
    game.resize();
    stats.begin();
    animate();
}


function animate(t) {
    requestAnimationFrame(animate);
    stats.begin();
    game.animate(t);
    stats.end();
}

function resize() {
    game.resize();
}
