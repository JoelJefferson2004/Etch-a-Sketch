// global variables 
let active = false;
let color = "rgb(1, 1, 1)";
let rainbowOn = false;


function layTiles(tileCount){
    let tileSize = (600/(tileCount)) - 2;
    const newContainer = document.createElement("div");
    newContainer.classList.add('container');
    for(let i = 0; i < tileCount * tileCount; i ++){
        const tile = document.createElement("div");
        tile.classList.add("item");
        tile.setAttribute("style", `height:${tileSize}px; width: ${tileSize}px`);
        newContainer.appendChild(tile);
    }
    let parent = document.querySelector(".content");
    let oldContainer = document.querySelector(".container");
    parent.removeChild(oldContainer);
    parent.appendChild(newContainer);
    addItemEventListener();
}

function addItemEventListener(){
    let items = document.querySelectorAll(".item");
    items.forEach((item) =>{
        item.addEventListener("mousedown", colorOnClick);
        item.addEventListener("mouseenter", colorOnHover);
        item.addEventListener("mouseup", colorOff);
    }); 
}

function displayTileCount(value){
    let tileCount = document.querySelector(".tile-count");
    tileCount.textContent = `${value} x ${value}`;
}

function resize(e){
    const tileCount = e.target.value;
    console.log(tileCount);
    layTiles(tileCount);
    displayTileCount(tileCount);
}


function clearContainer(){
    const tiles = document.querySelectorAll(".item");
    for(const tile of tiles){
        tile.style.backgroundColor = "white";
    }
}

function tagEventListeners(){
    // slider event listener
    const slider = document.querySelector("#slider");
    slider.addEventListener("input", resize);

    //clear 
    const clear = document.querySelector(".clear");
    clear.addEventListener("click", clearContainer);

    // tiles
    const colorSelector = document.querySelector(".color-selector");
    colorSelector.addEventListener("change", ()=>{
        color = colorSelector.value;
        console.log(colorSelector.value);
    });

    const eraser = document.querySelector('.eraser');
    eraser.addEventListener("click", ()=>{
        color = "#ffffff";
        const colorSelector = document.querySelector(".color-selector");
        colorSelector.value = color;
    })

}

// coloring 
function colorOnClick(e){
    colorTile(e.target);
    active = true;
}

function colorOnHover(e){
    if(active){
        colorTile(e.target);
    }
}

function colorOff(){
    active = false;
}

function colorTile(element){
    element.style.backgroundColor = color;


}

function rainbow(){
    let r = 1 + Math.floor(Math.random() * 255);
    let g =  1 + Math.floor(Math.random() * 255);
    let b =  1 + Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// selecting color;

function main(){
    layTiles(25);
    tagEventListeners();
}

main();

