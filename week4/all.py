from fastapi import FastAPI, Form, Request
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from fastapi.templating import Jinja2Templates
import csv

app=FastAPI()
app.add_middleware(SessionMiddleware, secret_key="wehelp123")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.post("/login")
def login(request: Request, email=Form(None), password=Form(None)):
    if email == "abc@abc.com" and password == "abc":   
        request.session["userEmail"] = email
        return RedirectResponse("/member", status_code=303)
    if email == None or email == "" or password == None or password == "":
        return RedirectResponse("/ohoh?msg=請輸入信箱和密碼", status_code=303)
    else:
        return RedirectResponse("/ohoh?msg=信箱或密碼輸入錯誤", status_code=303)

@app.get("/member")
def member(request: Request):
    if request.session.get("userEmail"):
        return FileResponse("page/member.html", headers={"Cache-Control": "no-store"})# 讓瀏覽器每次都向 server 重新請求頁面
    else:
        return RedirectResponse("/", status_code=303)


templates = Jinja2Templates(directory="page")
@app.get("/ohoh")
def fail_login(request :Request, msg: str):
    if msg == "信箱或密碼輸入錯誤":
        return templates.TemplateResponse(
            request=request, name="tem_wrong_input.html", context={"msg": msg}
    )
    elif msg == "請輸入信箱和密碼":
        return templates.TemplateResponse(
            request=request, name="tem_empty_input.html", context={"msg": msg}
    )
    

@app.get("/logout")
def logout(request: Request):
    # 1. 清空 session
    request.session.clear()
    # 2. 建立 redirect response
    response = RedirectResponse("/", status_code=303)
    # 3. 刪掉 cookie
    response.delete_cookie(key="session")
    return response


# 設定首頁
@app.get("/")
def index():
    return FileResponse("page/index.html")


# 旅館csv寫入
with open("hotel.csv", mode="r", newline="") as file:
    reader = csv.reader(file)
    hotel_list = []
    for row in reader:
        hotel_list.append(f"{row[0]}、{row[1]}、{row[4]}")

@app.post("/hotel")
def hotel(hotel_id=Form()):
    return RedirectResponse(f"/hotel/{hotel_id}", status_code=303)


@app.get("/hotel/{hotel_id}")
def hotel_id(request :Request, hotel_id):
    id = int(hotel_id)
    if id >= 1 and id <= len(hotel_list):
        result = hotel_list[id - 1]
        return templates.TemplateResponse(
            request=request, name="tem_hotel_info.html", context={"result": result})
    else:
        return FileResponse("page/wrong_id.html")