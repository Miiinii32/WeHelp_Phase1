# 串接資料
import ssl, urllib.request, json
zh_url = "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116.gitlab.io/hotels-ch"
en_url = "https://resources-wehelp-taiwan-b986132eca78c0b5eeb736fc03240c2ff8b7116.gitlab.io/hotels-en"
with urllib.request.urlopen(zh_url) as zh_res:
    zh_data = json.load(zh_res)["list"]
with urllib.request.urlopen(en_url) as en_res:
    en_data = json.load(en_res)["list"]

# 中英hotel資訊

hotel_info = []
for zh_item in zh_data:
    for en_item in en_data:
        if zh_item["_id"] == en_item["_id"]:
            hotel_info.append([
                zh_item["_id"],
                zh_item["旅宿名稱"], en_item["hotel name"], zh_item["地址"], en_item["address"], zh_item["電話或手機號碼"], zh_item["房間數"]
            ])

# print(hotel_info)
def get_id(item):
    return item[0]

hotel_info_sorted = sorted(hotel_info, key=get_id)
# print(hotel_info_sorted)

for result in hotel_info_sorted:
    del result[0]
print(hotel_info_sorted)


# 中英hotel資訊寫入csv
import csv
with open("hotel.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    for hotel in hotel_info_sorted:
        writer.writerow(hotel)




districts = []
for item in zh_data:
    districts.append({"行政區": item["地址"][3:6], "房間數": item["房間數"]})

hotel_num = {}
for item in districts:
    area = item["行政區"] #萬華區
    if area not in hotel_num:
        hotel_num[area] = 1
    else:
        hotel_num[area] += 1


room_num = {}
for item in districts:
    area = item["行政區"]
    if area not in room_num:
        room_num[area] = int(item["房間數"])
    else:
        room_num[area] += int(item["房間數"])


districts_info = []
for key1 in hotel_num:
    for key2 in room_num:
        if(key1 == key2):
            districts_info.append([key1, hotel_num[key1], room_num[key2]])


# 行政區hotel數和房間數資訊寫入csv
with open("districts.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    for distr in districts_info:
        writer.writerow(distr)




