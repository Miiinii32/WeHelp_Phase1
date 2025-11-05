const formLogin = document.querySelector("#login");
const checkbox = document.querySelector("#checkbox");
formLogin.addEventListener("submit", function (e) {
  if (!checkbox.checked) {
    alert("請勾選同意條款");
    e.preventDefault();
  }
});

const formHotel = document.querySelector("#hotel");
const hotel_id = document.querySelector("#hotel_id");
formHotel.addEventListener("submit", function (e) {
  const value = Number(hotel_id.value);
  if (value <= 0 || !Number.isInteger(value)) {
    alert("請輸入正整數");
    e.preventDefault();
  }
});

// async function printHotel() {
//   try {
//     const res = await fetch("/hotel/{hotel_id}", { method: "GET" });
//     const data = await res.json();
//     console.log(data);
//     const hotel_text = document.querySelector("#hotel_text");
//     hotel_text.textContent = data;
//   } catch (error) {
//     console.log("串接失敗", error.message);
//   }
// }
