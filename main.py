import json
import yt_dlp
from fastapi import FastAPI
from pydantic import BaseModel
import datetime


class Params(BaseModel):
    url: str
    proxy_url: str

app = FastAPI()



@app.post("/")
async def root(params: Params):
    now = datetime.datetime.now()
    print(f"[{now}] POST request with body {params.model_dump_json()}")
    ydl_opts = {}
    if params.proxy_url != '': 
        print(f"routing through proxy [{params.proxy_url}]")
        ydl_opts["proxy"] = params.proxy_url
    
    info = {}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:

        raw = ydl.extract_info(params.url, download=False)
        info = ydl.sanitize_info(raw)
    
    return info