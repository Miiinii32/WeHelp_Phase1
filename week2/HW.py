# Task 1
characterList = [
    {"position": [0, 0], "direction": "left", "character": "辛巴"},
    {"position": [2, 1], "direction": "right", "character": "丁滿"},
    {"position": [-1, -4], "direction": "left", "character": "貝吉塔"},
    {"position": [3, -3], "direction": "left", "character": "悟空" },
    {"position": [4, -5], "direction": "left", "character": "特南克斯" },
    {"position": [7, -4], "direction": "right", "character": "弗利沙" }
]
targetC = []
def assignTargetC(name):
    global targetC
    if(name == "辛巴"):
        targetC = characterList[0]
    elif(name == "丁滿"):
        targetC = characterList[1]
    elif(name == "貝吉塔"):
        targetC = characterList[2]
    elif(name == "悟空"):
        targetC = characterList[3]
    elif(name == "特南克斯"):
        targetC = characterList[4]
    else:
        targetC = characterList[5]

def calcDistance(list):
    for c in characterList :
        dist = abs(c["position"][0] - targetC["position"][0]) + abs(c["position"][1] - targetC["position"][1])
        if(targetC["direction"] == c["direction"]):
            dist += 0
        else:
            dist += 2
        c["distance"] = dist

def func1(name):
    assignTargetC(name)
    calcDistance(characterList)
    notMeList = []
    for c in characterList:
        if(c["distance"] > 0):
            notMeList.append(c["distance"])
    maxDist = max(notMeList)
    minDist = min(notMeList)

    maxCharacter = []
    minCharacter = []
    for c in characterList:
        if(c["distance"] == maxDist):
            maxCharacter.append(c["character"])
        elif(c["distance"] == minDist):
            minCharacter.append(c["character"])
    listSymbol = "、"
    print(f"最遠{listSymbol.join(maxCharacter)}；最近{listSymbol.join(minCharacter)}")

func1("辛巴")

# Task 2
services = [
  { "name": "S1", "r": 4.5, "c": 1000 },
  { "name": "S2", "r": 3, "c": 1200 },
  { "name": "S3", "r": 3.8, "c": 800 },
]
for item in services:
    item["bookedTime"] = []

matchResult = []
import re
def matchSys(string):
    pattern = re.compile(r"^(\w+)\s*(=|>=|<=)\s*(.+)$")
    global matchResult
    matchResult = pattern.findall(string)

def func2(ss, strat, end, criteria):
    matchSys(criteria)
    cr = matchResult[0][0]
    operator = matchResult[0][1]
    value = matchResult[0][2]
    if cr in ["c", "r"]:
        value = float(value)
    # print(cr)
    # print(operator)
    # print(value)

    def operatorChange(a, b):
        if (operator == ">="):
             return a >= b
        if (operator == "<="):
             return a <= b
        if (operator == "=="):
             return a == b
        if (cr == "name"):
             return a == b

    # 找到符合criteria的服務們
    filterResult = []
    for item in services:
        if(operatorChange(item[cr], value)):
            filterResult.append(item)

    # 找到最適合的
    if(cr in ["c", "r"]):
        preDiffer = float("inf")
        for item in filterResult:
            currDiff = abs(item[cr]-value)
            if(currDiff < preDiffer):
                preDiffer = currDiff
                bestCriteria = item
    else:
        bestCriteria = filterResult[0]

    # 找到整體時間段
    totalTimeList = []
    for x in range(strat, end+1):
        totalTimeList.append(x)

    hasConflict = False
    for x in totalTimeList:
        if(x in bestCriteria["bookedTime"]):
            hasConflict = True
            break
    if(hasConflict):
        print("Sorry")
    else:
        for x in totalTimeList:
            bestCriteria["bookedTime"].append(x)
        print(bestCriteria["name"])

func2(services, 15, 17, "c>=800")
func2(services, 11, 13, "r<= 4")
func2(services, 10, 12, "name=S3")
func2(services, 15, 18, "r<= 4.5")
func2(services, 16, 18, "r>= 4")
func2(services, 13, 17, "name=S1")
func2(services, 8, 9, "c<= 1500")

# Task 3
def func3(index):
    numList = [25, 23, 20, 21]
    Result = numList[index % 4] - 2 * (index // 4)
    print(Result)

func3(1)
func3(5)
func3(10)
func3(30)

# Task 4
def func4(sp, stat, n):
        statArry = list(stat)
        statResult = []
        for index, value in enumerate(sp):
            if (statArry[index] == "1"):
                statResult.append(0)
            else:
                statResult.append(value)
        statDist = []
        for value in statResult:
            statDist.append(abs(n - value))
        for index, value in enumerate(statDist):
            if(min(statDist) == value):
                print(index)
            
func4([3, 1, 5, 4, 3, 2], "101000", 2)
func4([1, 0, 5, 1, 3], "10100", 4)
func4([4, 6, 5, 8], "1000", 4)