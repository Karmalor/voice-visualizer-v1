let sound;
let fft;

// Load sound file before setup() function runs
function preload(){
  // Load the sound file saved as "starling.mp3"
  sound = loadSound('starling.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Loop sound file
  sound.loop();
  // Create a new instance of p5.FFT() object
  fft = new p5.FFT();
  
  noStroke();
}

function draw() {
  background(0, 30);
  
  // waveform() method returns an array of amplitude values (between -1 and 1) that represent a snapshot of amplitude readings in a single buffer
  let waveform = fft.waveform();
  
  // Loop through waveform array to draw a circle per time segment
  for(let i = 0; i < waveform.length; i++){
    // Map x location using index number of waveform array
    let x = map(i, 0, waveform.length, 0, width);
    // May y location using the amplitude value for the specific time segment
    let y = map(waveform[i], -1, 1, height, 0);
    
    circle(x, y, 3);
  }
  
}