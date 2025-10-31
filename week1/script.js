const menuIcon = document.querySelector("#menu-icon");
const closeIcon = document.querySelector("#close-icon");
const menuOffcanva = document.querySelector(".menu-offcanva");
const overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", function () {
  menuOffcanva.classList.add("show");
  overlay.classList.add("show");
});

closeIcon.addEventListener("click", function () {
  menuOffcanva.classList.remove("show");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function () {
  menuOffcanva.classList.remove("show");
  overlay.classList.remove("show");
});

// import  dataFixing()進來
import { dataFixing } from "./fetch.js";
const button = document.querySelector(".button");
let currentNum = 3;
let extraNum = 10;

init();

function renderBarCard(data) {
  const barCardUl = document.querySelector("#barCard-ul");
  const barCardColClass = [
    "col-12 col-md-6 col-sm-12",
    "col-8 col-md-6 col-sm-12",
    "col-4 col-md-12 col-sm-12",
    "",
  ];

  data.forEach(function (item, index) {
    const templateBarCard = document
      .querySelector("#template-barCard")
      .content.cloneNode(true);
    const imgBarCard = templateBarCard.querySelector("img");
    const titleBarCard = templateBarCard.querySelector("p");
    const liBarCard = templateBarCard.querySelector("li");
    if (index < 3) {
      imgBarCard.setAttribute("src", Object.values(item));
      titleBarCard.textContent = Object.keys(item);
      barCardUl.appendChild(templateBarCard);
      liBarCard.classList.add(...barCardColClass[index].split(" "));
    }
  });
}
function renderCard(data) {
  const cardUl = document.querySelector("#card-ul");
  const cardColClass = [
    "col-4 col-md-3 col-sm-12 d-flex", //1,6
    "col-2 col-md-3 col-sm-12 d-flex", //2,3,4,5,7,8
    "col-2 col-md-6 col-sm-12 d-flex", //9,10
  ];

  let nextNum = Math.min(currentNum + extraNum, data.length);

  data.slice(currentNum, nextNum).forEach(function (item, index) {
    const templatepCard = document
      .querySelector("#template-card")
      .content.cloneNode(true);
    const imgCard = templatepCard.querySelector("img");
    const titleCard = templatepCard.querySelector("p");
    const liCard = templatepCard.querySelector("li");

    imgCard.setAttribute("src", Object.values(item));
    titleCard.textContent = Object.keys(item);
    cardUl.appendChild(templatepCard);

    // 套上格線系統
    if (index % 10 == 0 || index % 10 == 5) {
      liCard.classList.add(...cardColClass[0].split(" "));
    } else if (index % 10 > 0 && index % 10 < 5) {
      liCard.classList.add(...cardColClass[1].split(" "));
    } else if (index % 10 > 5 && index % 10 < 8) {
      liCard.classList.add(...cardColClass[1].split(" "));
    } else if (index % 10 == 8 || index % 10 == 9) {
      liCard.classList.add(...cardColClass[2].split(" "));
    }
  });

  currentNum = nextNum;

  if (currentNum >= data.length) {
    button.classList.add("hidden");
  }
}

async function init() {
  const travelData = await dataFixing();
  renderBarCard(travelData);
  renderCard(travelData);

  button.addEventListener("click", function () {
    renderCard(travelData);
  });
}

// data.forEach(function (item, index) {
//   if (index == currentNum && index < 12) {
//     imgCard.setAttribute("src", Object.values(item));
//     titleCard.textContent = Object.keys(item);
//     cardUl.appendChild(templatepCard);

//     // 套上格線系統
//     if ((index - 3) % 10 == 0 || (index - 3) % 10 == 5) {
//       liCard.classList.add(...cardColClass[0].split(" "));
//     } else if ((index - 3) % 10 > 0 && (index - 3) % 10 < 5) {
//       liCard.classList.add(...cardColClass[1].split(" "));
//     } else if ((index - 3) % 10 > 5 && (index - 3) % 10 < 8) {
//       liCard.classList.add(...cardColClass[1].split(" "));
//     } else if ((index - 3) % 10 == 8 || (index - 3) % 10 == 9) {
//       liCard.classList.add(...cardColClass[2].split(" "));
//     }
//   }
// });
// travelData.forEach(function (item, index) {
//   //拿模板
//   const templatepCard = document
//     .querySelector("#template-card")
//     .content.cloneNode(true);

//   //拿模板裡的img

//   // const imgCard = templatepCard.querySelector("img");
//   // const titleBarCard = templateBarCard.querySelector("p");
//   // const titleCard = templatepCard.querySelector("p");
//   // const liBarCard = templateBarCard.querySelector("li");
//   // const liCard = templatepCard.querySelector("li");

//   // 照片嵌入
//   if (index < 3) {
//     imgBarCard.setAttribute("src", Object.values(item));
//     titleBarCard.textContent = Object.keys(item);
//     barCardUl.appendChild(templateBarCard);
//     liBarCard.classList.add(...barCardColClass[index].split(" "));
//   } else {
//     imgCard.setAttribute("src", Object.values(item));
//     titleCard.textContent = Object.keys(item);

//     cardUl.appendChild(templatepCard);

//     // 套上格線系統
//     if ((index - 3) % 10 == 0 || (index - 3) % 10 == 5) {
//       liCard.classList.add(...cardColClass[0].split(" "));
//     } else if ((index - 3) % 10 > 0 && (index - 3) % 10 < 5) {
//       liCard.classList.add(...cardColClass[1].split(" "));
//     } else if ((index - 3) % 10 > 5 && (index - 3) % 10 < 8) {
//       liCard.classList.add(...cardColClass[1].split(" "));
//     } else if ((index - 3) % 10 == 8 || (index - 3) % 10 == 9) {
//       liCard.classList.add(...cardColClass[2].split(" "));
//     }
//   }
// });
