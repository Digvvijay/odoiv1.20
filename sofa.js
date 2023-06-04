img = "";
status = "";
object = [];

function preload()
{
    img=loadImage('sofa.jpg');
}

function setup()
{
    cv=createCanvas(640,420);
    cv.center();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function modelLoaded()
{
    console.log("cocossd status == Initialised.");
    status=true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw()
{
    image(img,0,0,640,420);

    if(status!="")
    {

        objectDetector.detect(img,gotResult);
         r=random(255);
         g=random(255);
         b=random(255);
        for(i = 0;i < object.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Detected objects";
            document.getElementById("no_obj").innerHTML="Number of Objects detected : "+object.length;

            fill(r,g,b);
            p = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + p + "%",object[i].x + 20,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}