var song, fft, amp;
var bins = 16,
  smoothing = 0.75;
let mic;

// let slider;
// let slider2;
var yMax;
var gE;

/* Música de biblioteca de youtube https://www.youtube.com/audiolibrary/music */
function preload() {
  song = loadSound("starling.mp3");
}

document.addEventListener("touchstart", {});

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(toggleSound);
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  fft = new p5.FFT(smoothing, bins);
  fft.setInput(mic);

  noFill();
  background(0);

  slider = createSlider(0, 255, 200);
  slider.position(25, 25);
  slider.input(repaint);

  // button = createButton("Full Screen");
  // button.mouseClicked(fullScreenIt);
  // button.size(100, 30);
  // button.position(225, 25);
  // button.style("font-size", "12px");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function toggleSound() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.setVolume(0);
    song.play();
  }
}

function draw() {
  background(0);
  stroke(255, 255, 0);
  strokeWeight(3);
  var spectrum = fft.analyze();

  let volume = mic.getLevel();
  let threshold = gE;

  beginShape();
  fft.getEnergy("mid");
  var level = strokeWeight(level / 125);
  var invertedSpectrum = spectrum.slice().reverse();
  var values = invertedSpectrum.concat(spectrum);
  for (var i = 0; i < values.length; i++) {
    var x = map(i, 0, values.length, 0, width);
    if (volume > threshold) {
      var y = map(values[i], 0, 255, 0, height / 3);
    } else {
      var y = map(values[i] / 5, 0, 255, 0, height / 3);
    }
    if (i % 2 == 0) y *= -1;
    curveVertex(x, y + height / 2);
  }
  endShape();
}

function repaint() {
  if (!slider.value()) {
    g = 1;
  } else {
    var g = slider.value();
    gE = map(g, 0, 255, -0.01, 0.3);
  }
}

// function fullScreenIt() {

//     let fs = fullscreen();
//     fullscreen(!fs);

// }

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 100 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function (event) {
  event.preventDefault();
};
