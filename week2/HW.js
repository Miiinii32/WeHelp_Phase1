console.clear();

// Task 1
let characterList = [
  { position: [0, 0], direction: "left", character: "辛巴" },
  { position: [2, 1], direction: "right", character: "丁滿" },
  { position: [-1, -4], direction: "left", character: "貝吉塔" },
  { position: [3, -3], direction: "left", character: "悟空" },
  { position: [4, -5], direction: "left", character: "特南克斯" },
  { position: [7, -4], direction: "right", character: "弗利沙" },
];
let targetC;
function assignTargetC(name) {
  if (name === "辛巴") {
    targetC = characterList[0];
  } else if (name === "丁滿") {
    targetC = characterList[1];
  } else if (name === "貝吉塔") {
    targetC = characterList[2];
  } else if (name === "悟空") {
    targetC = characterList[3];
  } else if (name === "特南克斯") {
    targetC = characterList[4];
  } else {
    targetC = characterList[5];
  }
}
function calcDistance(list) {
  list.forEach(function (c) {
    let len =
      Math.abs(c.position[0] - targetC.position[0]) +
      Math.abs(c.position[1] - targetC.position[1]);
    if (targetC.direction === c.direction) {
      len += 0;
    } else {
      len += 2;
    }
    c.distance = len; // 把算完的距離放回characterList裡，賦予distance屬性
  });
}
function func1(name) {
  assignTargetC(name);
  calcDistance(characterList);

  // 過濾距離是0的(自己)，把剩下數值轉成陣列-> notMeList
  let notMeList = characterList
    .filter(function (c) {
      return c.distance > 0;
    })
    .map(function (c) {
      return c.distance;
    });

  // 找出最大最小值，並找到對應角色，放進陣列中(.join用在陣列)
  let maxCharacter = characterList
    .filter(function (c) {
      return c.distance === Math.max(...notMeList);
    })
    .map(function (c) {
      return c.character;
    });
  let minCharacter = characterList
    .filter(function (c) {
      return c.distance === Math.min(...notMeList);
    })
    .map(function (c) {
      return c.character;
    });

  console.log(`最遠${maxCharacter.join("、")}；最近${minCharacter.join("、")}`);
}
func1("辛巴");

// Task 2
const services = [
  { name: "S1", r: 4.5, c: 1000 },
  { name: "S2", r: 3, c: 1200 },
  { name: "S3", r: 3.8, c: 800 },
];

services.forEach(function (item) {
  item.bookedTime = [];
});

// 正則解析 criteria的字串
let matchResult = [];
function matchSys(str) {
  const pattern = /^(\w+)\s*(=|>=|<=)\s*(.+)$/;
  matchResult = str.match(pattern);
}
function func2(ss, strat, end, criteria) {
  matchSys(criteria);
  let cr = matchResult[1];
  let operator = matchResult[2];
  let value = matchResult[3];

  function operatorChange(a, b) {
    if (operator == ">=") return a >= b;
    if (operator == "<=") return a <= b;
    if (operator == "==") return a == b;
    if (cr == "name") return a == b;
  }

  // 用filter找到，符合criteria的服務
  // 用reduce找出filter篩選出來的服務中，最接近value的值(取距離絕對值後前後比較)
  let bestCriteria = services
    .filter(function (item) {
      return operatorChange(item[cr], value);
    })
    .reduce(function (pre, curr) {
      if (Math.abs(value - pre[cr]) < Math.abs(value - curr[cr])) {
        return pre;
      } else {
        return curr;
      }
    }, 0);

  //找到整體時間段
  let totalTimeList = [];
  for (let i = strat; i <= end; i++) {
    totalTimeList.push(i);
  }

  //先判斷找到一樣name的服務，在判斷時間段有沒有重疊，沒有就把預定時間補上bookedTime
  services.forEach(function (item) {
    if (bestCriteria.name == item.name) {
      const hasConflict = totalTimeList.some(function (time) {
        return item.bookedTime.includes(time);
      });
      if (hasConflict) {
        console.log("sorry");
      } else {
        // 將預定時間放進服務裡，以便下一組客人做對照(看是否衝突)
        totalTimeList.forEach(function (i) {
          item.bookedTime.push(i);
        });
        console.log(item.name);
        // console.log(item);
      }
    }
  });
}

func2(services, 15, 17, "c>=800");
func2(services, 11, 13, "r<= 4");
func2(services, 10, 12, "name=S3");
func2(services, 15, 18, "r<= 4.5");
func2(services, 16, 18, "r>= 4");
func2(services, 13, 17, "name=S1");
func2(services, 8, 9, "c<= 1500");

// Task 3
function func3(index) {
  let numList = [25, 23, 20, 21];
  result = numList[index % 4] - 2 * Math.trunc(index / 4);
  console.log(result);
}

func3(1);
func3(5);
func3(10);
func3(30);

// Task 4
function func4(sp, stat, n) {
  let statArry = stat.split("");
  let statResult = sp
    .map(function (item, index) {
      if (statArry[index] == "1") {
        return (item = 0);
      } else {
        return item;
      }
    })
    .map(function (item) {
      return Math.abs(n - item);
    });
  let minDist4 = Math.min(...statResult);
  statResult.map(function (item, index) {
    if (minDist4 == item) {
      console.log(index);
    }
  });
}
func4([3, 1, 5, 4, 3, 2], "101000", 2);
func4([1, 0, 5, 1, 3], "10100", 4);
func4([4, 6, 5, 8], "1000", 4);
