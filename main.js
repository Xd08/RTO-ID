img="";
status="";
objects=[];

function setup() {
    canvas= createCanvas(700, 420);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Current status: Detecting Objects..."
}

function draw() {
    image(video, 0, 0,700, 420);
    if(status != "") {
        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video, gotResult);
        for(i=0; i< objects.length; i++) {
            document.getElementById("status").inneHTML="Current Status: Objects detected"
            document.getElementById("number_of_objects").innerHTML=objects.length + " have been detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" " + percent+ "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
        }
    }
}

function modelLoaded() {
    console.log("COCO.S.S.D Model has succesfully been loaded");
    status=true;
}

function gotResult(error, result) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(result);
        objects=result;
    }
}