let wantedSide = 32;
let wantedColor = "black";
let darken = false;
let gridContainer = document.querySelector(".gridContainer");
let buttons = document.querySelectorAll(".colorSelector");
drawPixels();
buildScreen();
let allScreenDivs = document.querySelectorAll(".gridContainer div");


// Creates as many divs as "pixels" our game's screen is going to have.
function drawPixels() {
	for (let i = 1; i <= wantedSide * wantedSide; i++) {
		let newDiv = document.createElement("div");
		newDiv.classList.add('gridItem');
		newDiv.setAttribute('id', 'newDiv' + i); // not needed so far
		gridContainer.appendChild(newDiv);
	}
}

// Creates a CSS grid that will be used as screen with the size of the rows and columns adjusted depending on the "resolution" to keep always a 512x512 screen
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
	clearScreen();
	while (userInput == undefined || userInput < 1 || userInput > 128 || (isNaN(userInput))) {
		userInput = prompt("Enter a number between 1 and 128 to specify pixels per side");
	}
	wantedSide = userInput;
	buildScreen();
	drawPixels();
	allScreenDivs = document.querySelectorAll(".gridContainer div");
}

// Change the pixel to the specified color when the user move over it with the mouse
function changePixel(e) {
	for (let i = 0; i <= wantedSide * wantedSide; i++) {
		if (e.target == allScreenDivs[i]) {
			selectColor(e)
			allScreenDivs[i].style.backgroundColor = wantedColor;
		}
	}
}

function selectColor(e) {
	if (e.target == buttons[0]) {
		wantedColor = "black";
		darken = false;
	} else if (e.target == buttons[1]) {
		wantedColor = "blue";
		darken = false; 
	} else if (e.target == buttons[2]) {
		wantedColor = "green";
		darken = false;
	} else if (e.target == buttons[3]) {
		wantedColor = "red";
		darken = false;
	} else if (e.target == buttons[4]) {
		darken = true;
	}

	if (darken == true) {
		let currentColor = window.getComputedStyle(e.target, null).getPropertyValue('background-color');	
		currentColor = currentColor.substring(currentColor.indexOf('(') + 1, currentColor.lastIndexOf(')')).split(",");
		redValue = currentColor[0];
		greenValue = currentColor[1];
		blueValue = currentColor[2];
		
		if (redValue >= 10)  redValue = redValue - 10;
		if (greenValue >= 10)  greenValue = greenValue - 10;
		if (blueValue >= 10)  blueValue = blueValue - 10;

		wantedColor = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
	}
}

gridContainer.addEventListener("mouseover", changePixel);
document.addEventListener("click", selectColor);


