left_wrist_x = 0;
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_y = 0;
score_left = 0;
score_right = 0;
song = "";
function preload(){
song = loadSound("music.mp3");
}

function setup(){
canvas = createCanvas(500,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
image(video,0,0,500,500);
fill("red");
stroke("red");

if(score_right>0.2){
circle(right_wrist_x,right_wrist_y,20);
if(right_wrist_y>0 && right_wrist_y<=100){
document.getElementById("speed").innerHTML = "speed = 0.5 x ";
song.rate(0.5);
}
if(right_wrist_y>100 && right_wrist_y<=200){
    document.getElementById("speed").innerHTML = "speed = 1 x ";
    song.rate(1);
}
if(right_wrist_y>200 && right_wrist_y<=300){
    document.getElementById("speed").innerHTML = "speed = 1.5 x ";
     song.rate(1.5);
}
if(right_wrist_y>300 && right_wrist_y<=400){
    document.getElementById("speed").innerHTML = "speed = 2 x ";
    song.rate(2);
    }
if(right_wrist_y>400){
        document.getElementById("speed").innerHTML = "speed = 2.5 x ";
        song.rate(2.5);
        }
}
if(score_left>0.2){
circle(left_wrist_x,left_wrist_y,20);
number = Number(left_wrist_y);
removeDecimal = floor(number);
vol = removeDecimal/500;
document.getElementById("volume").innerHTML = "volume = " + vol;
song.setVolume(vol);
}

}

function volume(){
song.play();
song.setVolume(1);
song.rate(1);
}
function modelLoaded(){
console.log("poseNet is initialized");
}
function gotPoses(results){
if(results.length>0){
console.log(results);
right_wrist_x = results[0].pose.rightWrist.x;
left_wrist_x = results[0].pose.leftWrist.x;
right_wrist_y = results[0].pose.rightWrist.y;
left_wrist_y = results[0].pose.leftWrist.y;
console.log("rightWrist X = " + right_wrist_x + " rightWrist Y = " + right_wrist_y);
console.log("leftWrist X = " + left_wrist_x + " leftWrist Y = " + left_wrist_y);
score_left = results[0].pose.keypoints[9].score;
score_right = results[0].pose.keypoints[10].score;
console.log("score_left = " + score_left);
console.log("score_right = " + score_right);
}
}