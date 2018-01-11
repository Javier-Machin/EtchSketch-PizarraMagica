let wantedSide = 32;
let wantedColor = "black";
let darken = false;
let colorMixer = false;
let gridContainer = document.querySelector(".gridContainer");
let buttons = document.querySelectorAll(".colorSelector");
drawPixels();
buildScreen();
let allScreenDivs = document.querySelectorAll(".gridContainer div"); // It contains the "pixels" of the game's display


// Creates as many divs as "pixels" the game's display is going to have.
function drawPixels() {
	for (let i = 1; i <= wantedSide * wantedSide; i++) {
		let newDiv = document.createElement("div");
		newDiv.classList.add('gridItem');
		newDiv.setAttribute('id', 'newDiv' + i); // not needed so far
		gridContainer.appendChild(newDiv);
	}
}

// Creates a CSS grid that will be used as screen with the size of the 
// rows and columns adjusted depending on the "resolution" to keep always a 512x512 screen
function buildScreen() {
	gridContainer.style.cssText = 'grid-template-columns: repeat(' + wantedSide + ', ' + 512/wantedSide + 'px);' + 
    	                          'grid-template-rows: repeat(' + wantedSide + ', ' + 512/wantedSide + 'px);';
}

// Resets the screen to blank
function clearScreen() {
	for (let i = 0; i < wantedSide * wantedSide; i++ ) {
	allScreenDivs[i].parentNode.removeChild(allScreenDivs[i]);
	}
	buildScreen();
	drawPixels();
	allScreenDivs = document.querySelectorAll(".gridContainer div");
}

// Asks for the new screen resolution within some rules and remake the screen based on that
function changeRes() {
	let userInput;
	while (userInput == undefined || userInput < 1 || userInput > 128 || (isNaN(userInput))) {
		userInput = prompt("Enter a number between 1 and 128 to specify pixels per side");
		if (userInput == null) return;
	}
	clearScreen();
	wantedSide = userInput;
	buildScreen();
	drawPixels();
	allScreenDivs = document.querySelectorAll(".gridContainer div");
}

// Change the pixel to the specified color when the user moves over it with the mouse
function changePixel(e) {
	for (let i = 0; i <= wantedSide * wantedSide; i++) {
		if (e.target == allScreenDivs[i]) {
			selectColor(e)
			allScreenDivs[i].style.backgroundColor = wantedColor;
		}
	}
}

// Selects a color depending on last button pressed and switch the toggle 
// for the special colors mixer and darken
function selectColor(e) {
	let redValue;
	let greenValue;
	let blueValue;

	if (e.target == buttons[0]) {
		wantedColor = "black";
		darken = false;
		colorMixer = false;
	} else if (e.target == buttons[1]) {
		wantedColor = "blue";
		darken = false;
		colorMixer = false; 
	} else if (e.target == buttons[2]) {
		wantedColor = "green";
		darken = false;
		colorMixer = false;
	} else if (e.target == buttons[3]) {
		wantedColor = "red";
		darken = false;
		colorMixer = false;
	} else if (e.target == buttons[4]) {
		darken = false;
		colorMixer = true;
	} else if (e.target == buttons[5]) {
		darken = true;
		colorMixer = false;
	}
	// Takes current "pixel" color and reduce every rgb value by 10
	if (darken == true) {
		let currentColor = window.getComputedStyle(e.target, null).getPropertyValue('background-color');	
		currentColor = currentColor.substring(currentColor.indexOf('(') + 
					   1, currentColor.lastIndexOf(')')).split(",");
		redValue = currentColor[0];
		greenValue = currentColor[1];
		blueValue = currentColor[2];		
		if (redValue >= 10)  redValue -= 10;
		if (greenValue >= 10)  greenValue -= 10;
		if (blueValue >= 10)  blueValue -= 10;
		wantedColor = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";

	// Creates a random color	
	} else if (colorMixer == true) {
		redValue = Math.floor((Math.random() * 100 * 2.5));
		greenValue = Math.floor((Math.random() * 100 * 2.5));
		blueValue = Math.floor((Math.random() * 100 * 2.5));
		wantedColor = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
	}
}

gridContainer.addEventListener("mouseover", changePixel); // Display listener
document.addEventListener("click", selectColor); // Buttons listener


