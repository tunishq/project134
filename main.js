sound = "";
STATUS= "";
objects = [];
baby_status = "";

function preload()
{
sound = loadSound("alarm.mp3");
}

function setup ()
{
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
objects = results;
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function draw ()
{
    image(video, 0, 0, 380, 380);
    for(i = 0; i < objects.length; i++)
    {
    if(objects[i].label == "person")
    {
        document.getElementById("status").innerHTML = "Status : object detected";
        document.getElementById("baby_status").innerHTML = "Person found";


        fill(255, 0, 0);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(255, 0, 0);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        sound.stop("alarm.mp3");
    }
    else
    {
        document.getElementById("baby_status").innerHTML = "Person not found";
        sound.play();
    }
    
    

    }



}

function modelLoaded ()
{
    console.log("model loaded");
    STATUS = true;
}
   

function gotResult(error, results)
{
    if (error)
    {
        console.error("error");
    }
    console.log(results);
    objects = results;
}