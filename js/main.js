let btnNav = document.getElementById("sidenav");
let nav = document.getElementById("nav");
let btnCloseMenu = document.getElementById("closeMenu");
let btnThemeSwitcher = document.getElementById("btnThemeSwitcher");
let btnAdd = document.getElementById("btnAdd");
let iAdd = document.getElementById("iAdd");


let nodeAnimationTime = 200;
let pointerAnimationTime = 200;

function calculateTimeWaiting(len) {
    return (len * nodeAnimationTime) + (len * pointerAnimationTime) + (nodeAnimationTime + pointerAnimationTime);
}

function createNode() {
    let node = document.createElement("div");
    node.classList.add("node");
    let dataNode = document.createElement("div");
    dataNode.classList.add("data-node");
    dataNode.style.animation = `nodeAppears ${nodeAnimationTime}ms ease-in-out`;
    dataNode.innerHTML = iAdd.value;
    let pointerNode = document.createElement("div");
    pointerNode.classList.add("pointer-node");
    pointerNode.style.animation = `rightArrow ${pointerAnimationTime}ms ease-in-out`;
    let imgPointer = document.createElement("img");
    imgPointer.src = "images/arrowright.png";
    pointerNode.appendChild(imgPointer);

    node.appendChild(dataNode);
    node.appendChild(pointerNode);
    return node;
}


btnAdd.addEventListener(("click"), function() {
    let lista = document.getElementById("lista");
    let len = lista.childNodes.length;
    let i = 0;
    let idTimer = setInterval(function() {
        lista.childNodes[i].firstChild.style.animation = `nodeZoom ${nodeAnimationTime}ms ease-in-out`;
        setTimeout(() => {
            lista.childNodes[i].lastChild.style.animation = `upDownArrow ${pointerAnimationTime}ms ease-in-out`;
            i++;
        }, 	nodeAnimationTime);
        
        if(i >= len-1) {
            clearInterval(idTimer);
        }
    }, nodeAnimationTime + pointerAnimationTime);

    for(let i = 0; i < len; i++) {
        lista.childNodes[i].firstChild.style.animation = "";
        lista.childNodes[i].lastChild.style.animation = "";
    }

    setTimeout(() => {
        lista.appendChild(createNode());
    }, calculateTimeWaiting(len)); 
});





btnNav.addEventListener("click", () => {
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    nav.style.animation = `openNav ${.6}s ease-in`;
    nav.style.transform = `translateX(${0}%)`;
    header.style.opacity = `${0.5}`;
    main.style.opacity = `${0.5}`;
});

btnCloseMenu.addEventListener(("click"), () => {
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    nav.style.animation = `closeNav ${.5}s ease-in`;
    nav.style.transform = `translateX(${-100}%)`;
    document.body.style.opacity = `${1}`;
    header.style.opacity = `${1}`;
    main.style.opacity = `${1}`;
});

btnThemeSwitcher.addEventListener("click", () => {
    let bg = document.body.style.background;
    let sidenav = document.getElementById("sidenav");
    
    if(bg !== "white") {
        document.body.style.background = "white";
        sidenav.style.color = "black";
        btnThemeSwitcher.style.color = "black";
        document.getElementById("h1").style.color = "black";
    } 
    else {
        document.body.style.background = "#191919";
        sidenav.style.color = "white";
        btnThemeSwitcher.style.color = "white";
        document.getElementById("h1").style.color = "white";
    }
});