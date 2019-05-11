let sketch = function(p){
var ws;

var player1, player2;
var ball;
var movementSpeed = 10;
var playerType;
var isReady = false;
var roomId;
var score1 = 0;
var score2 = 0;
var p1ready = false;
var p2ready = false;
var ballSpeed = 5;
var ballRadius = 5;
p.setup = function(){

    p.createCanvas(1110, 600);
    p.frameRate(30);
    player1 = new Player(true);
    player2 = new Player(false);
    playerType = getParameterByName('player');
    if(!playerType){
        alert('Select your player type first');
        window.location ='room.html';
    }
    roomId = getParameterByName('roomId');
    if(!roomId){
        alert('Select room first');
        window.location ='room.html';
    }
    init();
}



p.draw = function (){
    p.background(51);
    if(playerType == 1){
        if(p.keyIsPressed && p.key == 'd'){
            player1.move(movementSpeed);
        }
        if(p.keyIsPressed && p.key == 'a'){
            player1.move(-movementSpeed);
        }
        if(isReady){
            let p1 = {command: 'player_one_position', data: {position: player1.getPos(), room_id: roomId}};
            ws.send(JSON.stringify(p1));
        }
    } else if(playerType == 2){
        if(p.keyIsPressed && p.key == 'd'){
            player2.move(movementSpeed);
        }
        if(p.keyIsPressed && p.key == 'a'){
            player2.move(-movementSpeed);
        }
        if(isReady){
            let p2 = {command: 'player_two_position', data: {position: player2.getPos(), room_id: roomId}};
            ws.send(JSON.stringify(p2));
        }
    }
    
   
    player1.draw();
    player2.draw();
    if(ball){
        if(playerType == 1){
            ball.draw();
        } else if(playerType == 2){
            ball.draw2();
        } else if(playerType == 0){
            ball.draw2();
        }
    }
    
    //console.log(JSON.stringify(p1));
    //ws.send()
}

p.keyPressed = function (){
    if(p.keyCode == 32 && p1ready && p2ready){
        ball = new Ball();
    }
}

function Ball(an){
    var pos = [p.width/2, p.height/2];
    const pi = 3.141592653589793238462;
    var startAngle = Math.random() * (360 - 0) + 0;
    //console.log(startAngle);
    var angle = (pi/180) * startAngle;
    if(an){
        angle = an;
    }
    var speed = ballSpeed;
    var radius = ballRadius;

    this.draw = function(){
        //console.log(angle);
        if(pos[0] + radius >= player2.getPos()[0] && pos[1] >= player2.getPos()[1] && pos[1] <= (player2.getPos()[1]+100)){
            angle = pi - angle;
            speed = speed <= 8 ? speed+1 : 8;
            let rnd = Math.random()
            if(rnd <= 0.3){
                angle = angle - rnd;
            }
        }
        if(pos[0] - radius <= player1.getPos()[0]+10 && pos[1] >= player1.getPos()[1] && pos[1] <= (player1.getPos()[1]+100)){
            angle = pi - angle;
            speed = speed <= 8 ? speed+1 : 8;
            let rnd = Math.random()
            if(rnd <= 0.3){
                angle = angle - rnd;
            }
        }
        if(pos[1] - radius <= 0){
            angle = pi - (angle - pi);
            let rnd = Math.random()
            if(rnd <= 0.3){
                angle = angle - rnd;
            }
        }
        if(pos[1] + radius >= p.height){
            angle = pi + (pi - angle);
            let rnd = Math.random()
            if(rnd <= 0.3){
                angle = angle - rnd;
            }
        }
        
        

        pos[0] += speed*p.cos(angle);
        pos[1] += speed*p.sin(angle);
        p.fill(255);
        p.circle(pos[0], pos[1], radius);
        if(playerType == 1){
            let po = {command: 'ball_position', data:{ position: pos, angle: angle, room_id: roomId } };
            ws.send(JSON.stringify(po));
        }
        if(pos[0] <= 0){
            ball = null;
            $("#score2").html(++score2);
            let sc = {command: 'add_player_two_score', data: {room_id: roomId}};
            ws.send(JSON.stringify(sc));
        }
        if(pos[0] >= p.width){
            ball = null;
            $("#score1").html(++score1);
            let sc = {command: 'add_player_one_score', data: {room_id: roomId}};
            ws.send(JSON.stringify(sc));
        }
        
    }
    this.draw2 = function(){
        p.fill(255);
        p.circle(pos[0], pos[1], radius);
        if(pos[0] <= 0){
            ball = null;
            $("#score2").html(++score2);
            let sc = {command: 'add_player_two_score', data: {room_id: roomId}};
            ws.send(JSON.stringify(sc));
        }
        if(pos[0] >= p.width){
            ball = null;
            $("#score1").html(++score1);
            let sc = {command: 'add_player_one_score', data: {room_id: roomId}};
            ws.send(JSON.stringify(sc));
        }
    }
    this.setPos = function(x, y, ang){
        pos[0] = x;
        pos[1] = y;
        angle = ang
    }
    
}

function Player(first){
    var playerWidth = 100;
    let x = first ? 10 : p.width - 20;
    var pos = [x, p.height/2 - playerWidth/2];
    
    
    this.move = function(direction){
        pos[1] += direction;
        if(pos[1] > (p.height - playerWidth)){
            pos[1] = p.height - playerWidth;
        }
        if(pos[1] < 0){
            pos[1] = 0;
        }
    }
    this.draw = function(){
        if(playerType == 1 && first){
            p.fill(255, 0, 0);
        } else if(playerType == 2 && !first){
            p.fill(255, 0, 0);
        } else {
            p.fill(255);
        }
        
        p.rect(pos[0], pos[1], 10, playerWidth);
    }

    this.getPos = function(){
        return pos;
    }

    this.setPos = function(x, y){
        pos[0] = x;
        pos[1] = y;
    }
}





function init() {

    // Connect to Web Socket
    ws = new WebSocket("ws://192.168.1.2:9001/");

    // Set event handlers.
    ws.onopen = function() {
        console.log("on open");
        isReady = true;
        
        if(playerType == 1){
            var join = {'command': 'player_one_join', 'data': {'room_id': roomId}};
            ws.send(JSON.stringify(join));
            $("#p1").html("Player One");
            p1ready = true;
        } else if(playerType == 2){
            var join = {'command': 'player_two_join', 'data': {'room_id': roomId}};
            ws.send(JSON.stringify(join));
            $("#p2").html("Player Two");
            p2ready = true;
        } else if(playerType == 0){
            var join = {'command': 'spectactor_join', 'data': {'room_id': roomId}};
            ws.send(JSON.stringify(join));
            var sc = {'command': 'get_score', 'data': {'room_id': roomId}};
            ws.send(JSON.stringify(sc));
        }
        var setting = {'command': 'get_setting'};
        ws.send(JSON.stringify(setting));
    };
      
    ws.onmessage = function(e) {
        // e.data contains received string.
        console.log("on message: " + e.data);
        // var move = JSON.parse(e.data);
        // if(move.isPlayer){
        //     if(move.playerType == 1 && playerType == 2){
        //         player1.setPos(move.position[0], move.position[1])
        //     }
        //     if(move.playerType == 2 && playerType == 1){
        //         player2.setPos(move.position[0], move.position[1])
        //     }
        // } else {
        //     if(playerType == 2){
        //         if(!ball){
        //             ball = new Ball(move.angle);
        //         }
        //         ball.setPos(move.ball[0], move.ball[1], move.angle);
        //     }
        // }
        var json = JSON.parse(e.data);
        if(json.command == 'player_one_join'){
            $("#p1").html("Player One");
            p1ready = true;
            if(json.status){
                console.log('Player one success join');
            } else {
                alert('Room full or wrong room id');
            }
        } else if(json.command == 'player_two_join'){
            $("#p2").html("Player Two");
            p2ready = true;
            if(json.status){
                console.log('Player two success join');
            } else {
                alert('Room full or wrong room id');
            }
        } else if(json.command == 'player_one_leave'){
            $("#p1").html("Player One (Not Connected)");
            p1ready = false;
        } else if(json.command == 'player_two_leave'){
            $("#p2").html("Player Two (Not Connected)");
            p2ready = false;
        } else if(json.command == 'get_setting'){
            ballSpeed = json.ball_speed;
            ballRadius = json.ball_size;
        } else if(json.command == 'get_score'){
            score1 = json.data.score_1;
            score2 = json.data.score_2;
               
        }
        if(playerType == 1){
            if(json.status){
                if(json.command == 'player_two_position'){
                    player2.setPos(json.data.position[0], json.data.position[1]);
                    $("#p2").html("Player Two");
                    p2ready = true;
                }
            }
        }
        else if(playerType == 2){
            if(json.status){
                if(json.command == 'player_one_position'){
                    player1.setPos(json.data.position[0], json.data.position[1]);
                    $("#p1").html("Player One");
                    p1ready = true;
                }
                else if(json.command == 'ball_position'){
                    if(!ball){
                        ball = new Ball(json.data.angle);
                    }
                    ball.setPos(json.data.position[0], json.data.position[1], json.data.angle);
                }
            }
        } else if(playerType == 0){
            if(json.status){
                if(json.command == 'player_one_position'){
                    $("#p1").html("Player One");
                    player1.setPos(json.data.position[0], json.data.position[1]);
                } else if(json.command == 'player_two_position'){
                    $("#p2").html("Player Two");
                    player2.setPos(json.data.position[0], json.data.position[1]);
                } else if(json.command == 'ball_position'){
                    if(!ball){
                        ball = new Ball(json.data.angle);
                    }
                    ball.setPos(json.data.position[0], json.data.position[1], json.data.angle);
                }
            }
        }
        
    };
      
    ws.onclose = function() {
        console.log("on close");
        isReady = false;
    };

    ws.onerror = function(e) {
        console.log(e)
        isReady = false;
    };

}
    
function onSubmit() {
    var input = document.getElementById("input");
    // You can send message to the Web Socket using ws.send.
    ws.send(input.value);
    output("send: " + input.value);
    input.value = "";
    input.focus();
}
    
function onCloseClick() {
    ws.close();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
}
new p5(sketch, 'container');
    