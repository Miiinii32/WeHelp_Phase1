// 第三週作業
const url_img = "https://cwpeng.github.io/test/assignment-3-2";
const url_title = "https://cwpeng.github.io/test/assignment-3-1";

async function fetchImg() {
  try {
    const response = await fetch(url_img);
    const data = await response.json();
    const imgData = data.rows.map(function (item) {
      // 用return 把物件{}明確回傳回去
      return {
        id: item.serial,
        imgURL: item.pics
          .split(".jpg")
          .map((text) => "https://www.travel.taipei" + text + ".jpg")[0],
      };
    });
    console.log("img有成功拿到");
    return imgData;
  } catch (error) {
    console.log("img串接失敗");
    return [];
  }
}

async function fetchTitle() {
  try {
    const response = await fetch(url_title);
    const data = await response.json();
    const titleData = data.rows.map(function (item) {
      return {
        id: item.serial,
        title: item.sname,
      };
    });
    console.log("title API串接成功");
    return titleData;
  } catch (error) {
    console.log("title API串接失敗");
    return [];
  }
}
export async function dataFixing() {
  try {
    const [img, title] = await Promise.all([fetchImg(), fetchTitle()]);
    let travelData = [];
    img.forEach(function (a) {
      title.forEach(function (b) {
        if (a.id == b.id) {
          let obj = {};
          obj[b.title] = a.imgURL;
          travelData.push(obj);
        }
      });
    });
    return travelData;
  } catch (error) {
    console.log("API串接錯誤", error);
    return [];
  }
}
dataFixing();
