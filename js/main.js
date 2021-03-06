let btnNav = document.getElementById("sidenav");
let nav = document.getElementById("nav");
let btnCloseMenu = document.getElementById("closeMenu");
let btnThemeSwitcher = document.getElementById("btnThemeSwitcher");
let btnAdd = document.getElementById("btnAdd");
let btnRemove = document.getElementById("btnRemove");
let btnInsert = document.getElementById("btnInsert");
let btnSet = document.getElementById("btnSet");
let iAdd = document.getElementById("iAdd");
let btnSave = document.getElementById("btnSave");
let btnSettingRemove = document.getElementById("settingRemove");

let fillError = document.getElementById("fill-field");
let indexOutBound = document.getElementById("index-out-bound");

let nodeAnimationTime = 500;
let pointerAnimationTime = 500;
let deleteAnimationTime = 500;

const NODE_ANIMATION_IN = 'nodeZoom';
const POINTER_ANIMATION = 'upDownArrow';
const NODE_ANIMATION_OUT = 'nodeOut';

const isEmpty = id => {
  let input = document.getElementById(id).value;
  if (input === "") return true;
  return false;
}

const calculateTimeWaiting = len => {
  return (
    len * nodeAnimationTime +
    len * pointerAnimationTime +
    (nodeAnimationTime + pointerAnimationTime)
  );
}

const animate = (node, time, animation) => {
  node.style.animation = `${animation} ${time}ms ease-in-out`;
}

const createNode = value => {
  let node = document.createElement("div");
  node.classList.add("node");
  let dataNode = document.createElement("div");
  dataNode.classList.add("data-node");
  animate(dataNode, nodeAnimationTime, 'nodeAppears');
  dataNode.innerHTML = value;
  let pointerNode = document.createElement("div");
  pointerNode.classList.add("pointer-node");
  animate(pointerNode, pointerAnimationTime, 'rightArrow');
  let imgPointer = document.createElement("img");
  imgPointer.src = "images/arrowright.png";
  pointerNode.appendChild(imgPointer);

  node.appendChild(dataNode);
  node.appendChild(pointerNode);
  return node;
}

const animateNode = async (node, animation = NODE_ANIMATION_IN, time = nodeAnimationTime) => {
  node.style.animation = `${animation} ${time}ms ease-in-out`;
}

const animatePointer = async arrow => {
  setTimeout(() => {
    arrow.classList.remove('animation-pointer-node');
    arrow.style.animation = `${POINTER_ANIMATION} ${pointerAnimationTime}ms ease-in-out`;
  }, nodeAnimationTime);
}

const cleanAnimation = element => {
  element.style.animation = '';
}

btnSet.addEventListener("click", function () {
  let idIndex = "iSet";
  let idData = "dSet";
  fillError.style.opacity = "0";

  if (!isEmpty(idIndex) && !isEmpty(idData)) {
    let lista = document.getElementById("lista");
    let len = lista.childNodes.length;
    let index = Number.parseInt(document.getElementById(idIndex).value);
    let value = Number.parseInt(document.getElementById(idData).value);
    indexOutBound.style.opacity = "0";
    if (index < len) {
      // NEW NODE
      let newNode = createNode(value);
      // END NEW NODE

      if (len > 0) {
        let actual = lista.childNodes[index];
        let i = 0;
        if (index !== 0) {
          let idTimer = setInterval(() => {
            animateNode(lista.childNodes[i].firstChild)
              .then(() => {
                return animatePointer(lista.childNodes[i].lastChild)
              })
              .then(() => i++);

            if (i === index - 1) {
              clearInterval(idTimer);
            }
          }, nodeAnimationTime + pointerAnimationTime);

          for (let i = 0; i < len; i++) {
            cleanAnimation(lista.childNodes[i].firstChild);
            cleanAnimation(lista.childNodes[i].lastChild);
          }

          setTimeout(() => {
            lista.replaceChild(newNode, actual);
          }, calculateTimeWaiting(len));
        } else {
          lista.replaceChild(newNode, actual);
        }
      }
    } else {
      indexOutBound.style.opacity = "1";
    }
  } else {
    fillError.style.opacity = "1";
  }
});

btnInsert.addEventListener("click", function () {
  let idIndex = "iInsert";
  let idData = "dInsert";
  fillError.style.opacity = "0";
  if (!isEmpty(idIndex) && !isEmpty(idData)) {
    let lista = document.getElementById("lista");
    let len = lista.childNodes.length;
    let index = Number.parseInt(document.getElementById(idIndex).value);
    let value = Number.parseInt(document.getElementById(idData).value);
    indexOutBound.style.opacity = "0";
    if (index < len + 1) {
      // NEW NODE
      let newNode = createNode(value);
      // END NEW NODE

      if (len > 0) {
        let actual = lista.childNodes[index];
        let i = 0;
        if (index !== 0) {
          let idTimer = setInterval(() => {
            animateNode(lista.childNodes[i].firstChild)
              .then(() => {
                return animatePointer(lista.childNodes[i].lastChild)
              })
              .then(() => i++);

            if (i === index - 1) {
              clearInterval(idTimer);
            }
          }, nodeAnimationTime + pointerAnimationTime);
          for (let i = 0; i < len; i++) {
            cleanAnimation(lista.childNodes[i].firstChild);
            cleanAnimation(lista.childNodes[i].lastChild);
          }

          setTimeout(() => {
            lista.insertBefore(newNode, actual);
          }, calculateTimeWaiting(len));
        } else {
          lista.insertBefore(newNode, actual);
        }
      } else {
        lista.appendChild(newNode);
      }
    } else {
      indexOutBound.style.opacity = "1";
    }
  } else {
    fillError.style.opacity = "1";
  }
});

btnAdd.addEventListener("click", () => {
  let id = "iAdd";
  let lista = document.getElementById("lista");
  let len = lista.childNodes.length;

  fillError.style.opacity = "0";

  if (!isEmpty(id)) {
    if (len > 0) {
      let i = 0;
      let cicle = setInterval(() => {
        animateNode(lista.childNodes[i].firstChild)
          .then(() => {
            return animatePointer(lista.childNodes[i].lastChild)
          })
          .then(() => i++);

        if (i >= len - 1) {
          clearInterval(cicle);
        }
      }, nodeAnimationTime + pointerAnimationTime);

      for (let i = 0; i < len; i++) {
        cleanAnimation(lista.childNodes[i].firstChild);
        cleanAnimation(lista.childNodes[i].lastChild);
      }

      setTimeout(() => {
        lista.appendChild(createNode(iAdd.value));
      }, calculateTimeWaiting(len));
    } else {
      lista.appendChild(createNode(iAdd.value));
    }

  } else {
    fillError.style.opacity = "1";
  }
});

btnRemove.addEventListener("click", function () {
  let lista = document.getElementById("lista");
  let len = lista.childNodes.length;
  let iRemove = document.getElementById("iRemove");
  let dRemove = document.getElementById("dRemove");

  fillError.style.opacity = "0";
  indexOutBound.style.opacity = "0";

  if (iRemove.style.display === "block" && dRemove.style.display === "none") {
    if (!isEmpty("iRemove")) {
      if (iRemove.value < len) {
        let index = Number.parseInt(iRemove.value);
        let node = lista.childNodes[index];

        if (index > 0) {
          let i = 0;
          let idTimer = setInterval(() => {
            animateNode(lista.childNodes[i].firstChild)
              .then(() => {
                return animatePointer(lista.childNodes[i].lastChild);
              })
              .then(() => i++);

            if (i === index - 1) {
              clearInterval(idTimer);
            }
          }, nodeAnimationTime + pointerAnimationTime);

          for (let i = 0; i < len; i++) {
            cleanAnimation(lista.childNodes[i].firstChild);
            cleanAnimation(lista.childNodes[i].lastChild);
          }
        }

        setTimeout(() => {
          animateNode(node, NODE_ANIMATION_OUT, deleteAnimationTime);
          setTimeout(() => {
            node.remove();
          }, deleteAnimationTime);
        }, calculateTimeWaiting(len));
      } else {
        indexOutBound.style.opacity = "1";
      }
    } else {
      fillError.style.opacity = "1";
    }
  } else if (
    iRemove.style.display === "none" &&
    dRemove.style.display === "block"
  ) {
    if (!isEmpty("dRemove")) {
      let data = Number.parseInt(dRemove.value);

      let nodesToDelete = 0;
      for (let i = 0; i < len; i++) {
        if (
          Number.parseInt(lista.childNodes[i].firstChild.innerHTML) === data
        ) {
          nodesToDelete++;
        }
      }

      let countDeleted = 0;
      let before;
      let i = 0;
      let idTimer = setInterval(() => {
        if (lista.childNodes[i] != null) {
          if (
            Number.parseInt(lista.childNodes[i].firstChild.innerHTML) === data
          ) {
            animateNode(lista.childNodes[i], NODE_ANIMATION_OUT, deleteAnimationTime);
            setTimeout(() => {
              lista.childNodes[i].remove();
              countDeleted++;
            }, deleteAnimationTime);
          } else if (countDeleted < nodesToDelete) {
            animateNode(lista.childNodes[i].firstChild)
              .then(() => {
                return animatePointer(lista.childNodes[i].lastChild);
              })
              .then(() => {
                before = i;
                i++;
              });
          }
        } else {
          i = len;
        }

        if (i === len) {
          clearInterval(idTimer);
        }
      }, nodeAnimationTime + pointerAnimationTime);

      for (let i = 0; i < len; i++) {
        cleanAnimation(lista.childNodes[i].firstChild);
        cleanAnimation(lista.childNodes[i].lastChild);
      }
    } else {
      fillError.style.opacity = "1";
    }
  } else {
    alert("Choose index mode or data mode!");
  }
});

btnNav.addEventListener("click", () => {
  let header = document.querySelector("header");
  let main = document.querySelector("main");
  nav.style.animation = `openNav ${0.6}s ease-in`;
  nav.style.transform = `translateX(${0}%)`;
  header.style.opacity = `${0.5}`;
  main.style.opacity = `${0.5}`;
});

btnCloseMenu.addEventListener("click", () => {
  let header = document.querySelector("header");
  let main = document.querySelector("main");
  nav.style.animation = `closeNav ${0.5}s ease-in`;
  nav.style.transform = `translateX(${-100}%)`;
  document.body.style.opacity = `${1}`;
  header.style.opacity = `${1}`;
  main.style.opacity = `${1}`;
});

btnThemeSwitcher.addEventListener("click", () => {
  let bg = document.body.style.background;
  let sidenav = document.getElementById("sidenav");

  if (bg !== "white") {
    document.body.style.background = "white";
    sidenav.style.color = "black";
    btnThemeSwitcher.style.color = "black";
    document.getElementById("h1").style.color = "black";
  } else {
    document.body.style.background = "#191919";
    sidenav.style.color = "white";
    btnThemeSwitcher.style.color = "white";
    document.getElementById("h1").style.color = "white";
  }
});

btnSettingRemove.addEventListener("click", () => {
  let btnIndexRemove = document.getElementById("btnIndexSelect");
  let btnDataRemove = document.getElementById("btnDataSelect");
  let iconSettings = document.getElementById("icon-settings");
  let iRemove = document.getElementById("iRemove");
  let dRemove = document.getElementById("dRemove");

  iRemove.style.display = "none";
  dRemove.style.display = "none";

  if (
    btnIndexRemove.style.display !== "block" &&
    btnDataRemove.style.display !== "block"
  ) {
    btnIndexRemove.style.display = "block";
    btnDataRemove.style.display = "block";
    iconSettings.style.animation = `rotateSettingsLeft ${0.8}s ease-in-out`;
    btnIndexRemove.style.animation = `openInputIndexRemove ${0.6}s ease-in-out`;
    btnDataRemove.style.animation = `openInputDataRemove ${0.58}s ease-in-out`;
  } else {
    iconSettings.style.animation = `rotateSettingsRight ${0.8}s ease-in-out`;
    btnIndexRemove.style.animation = `closeInputIndexRemove ${0.6}s ease-in-out`;
    btnDataRemove.style.animation = `closeInputDataRemove ${0.58}s ease-in-out`;
    setTimeout(() => {
      btnIndexRemove.style.display = "none";
      btnDataRemove.style.display = "none";
    }, 500);
  }

  btnIndexRemove.addEventListener("click", () => {
    iRemove.style.display = "block";
    dRemove.style.display = "none";

    btnIndexRemove.style.display = "none";
    btnDataRemove.style.display = "none";
  });
  btnDataRemove.addEventListener("click", () => {
    iRemove.style.display = "none";
    dRemove.style.display = "block";

    btnIndexRemove.style.display = "none";
    btnDataRemove.style.display = "none";
  });
});

btnSave.addEventListener("click", () => {
  let nodeSpeed = Number.parseInt(document.getElementById("node-speed").value);
  let pointerSpeed = Number.parseInt(
    document.getElementById("pointer-speed").value
  );
  let deleteSpeed = Number.parseInt(
    document.getElementById("delete-speed").value
  );

  let iconError = document.getElementById("fa-exclamation-circle");
  let iconCheck = document.getElementById("fa-check");

  if (nodeSpeed < 0 || pointerSpeed < 0 || deleteSpeed < 0) {
    let errors = document.getElementById("error-nav");
    iconError.style.animation = `nodeZoom ${300}ms linear`;
    errors.style.display = "block";
  } else {
    nodeSpeed > 0 ? (nodeAnimationTime = nodeSpeed) : (nodeAnimationTime = 500);
    pointerSpeed > 0 ? (pointerAnimationTime = pointerSpeed) : (pointerAnimationTime = 500);
    deleteSpeed > 0 ? (deleteAnimationTime = deleteSpeed) : (deleteAnimationTime = 500);
    let saves = document.getElementById("save-nav");
    iconCheck.style.animation = `nodeZoom ${300}ms linear`;
    saves.style.display = "block";
  }

  setTimeout(() => {
    iconError.style.animation = "";
    iconCheck.style.animation = "";
  }, 300);
});
