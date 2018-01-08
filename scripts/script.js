let gridContainer = document.querySelector(".gridContainer");
let wantedSide = 64;

for (let i = 1; i <= wantedSide * wantedSide; i++) {
	let newDiv = document.createElement("div");
	newDiv.classList.add('gridItem');
	newDiv.setAttribute('id', 'newDiv' + i); // not needed so far
	gridContainer.appendChild(newDiv);
}

gridContainer.style.cssText = 'grid-template-columns: repeat(' + wantedSide + ', ' + 512/wantedSide + 'px);' + 
                              'grid-template-rows: repeat(' + wantedSide + ', ' + 512/wantedSide + 'px);';

let allDivs = document.querySelectorAll(".gridContainer div");

function drawDiv(e) {
	for (let i = 0; i <= wantedSide * wantedSide; i++) {
		if (e.target == allDivs[i]) {
			allDivs[i].style.backgroundColor = 'red';
		}
	}
}

gridContainer.addEventListener("mouseover", drawDiv);


