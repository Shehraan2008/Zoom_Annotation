/*
Zoom Annotation by Shehraan Rathee 
GitHub repo link: 
Tools used: p5.js, ml5.js, Teachable Machine, Taysui Sketches(i used it for making all the images for the actions).

Other trainig links 
zoom_ann_1 = let imageModelURL = 'https://teachablemachine.withgoogle.com/models/_XyRKoJV-/';
zoom_ann_Fin_1 = let imageModelURL = 'https://teachablemachine.withgoogle.com/models/aViRYGqOc/';
*/
// Classifier Variable
let classifier;

// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/czvZFUbvp/';

// Video
let video;
let flippedVideo;

// To store the classification
let label = "";

// declaring the images
let yes;
let no;
let beBack;
let question;

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    yes = loadImage("yes.png");
    no = loadImage("no.png");
    beBack = loadImage("beBack.png");
    question = loadImage("question.png");
}

// intializing the video and classifier
function setup() {
    // creating a canvas 
    createCanvas(620, 460);

    // Create the video
    video = createCapture(VIDEO);
    video.size(620, 440);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
}

// repeating the things 
function draw() {
    // givign a background
    background('yellow');

    // Draw the video
    image(flippedVideo, 0, 0);

    // Displating the image according to Prediction
    if (label == 'yes') {
        image(yes, 0, 0);
        yes.width = 250;
        yes.height = 250;
    }
    if (label == 'No') {
        image(no, 0, 0);
        no.width = 250;
        no.height = 250;
    }
    if (label == 'Question') {
        image(question, 0, 0);
        question.width = 250;
        question.height = 250;
    }
    if (label == 'iWillBeBack') {
        image(beBack, 100, 30);
        beBack.width = 450;
        beBack.height = 450;
    }

    // making the text more cisible 
    noStroke();
    fill(45, 197, 244);
    rect(180, height - 50, 280, 60, 10);

    // Draw the label
    fill(255);
    textSize(46);
    textStyle(BOLD);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {

    // If there is an error
    if (error) {
        console.error(error);
        return;
    }

    // The results are in an array ordered by confidence.
    label = results[0].label;

    // Classifiy again!
    classifyVideo();
}
