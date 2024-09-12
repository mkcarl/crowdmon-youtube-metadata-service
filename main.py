import json
import yt_dlp
from fastapi import FastAPI
from pydantic import BaseModel
import datetime


class Params(BaseModel):
    url: str

ydl_opts = {
    "source_address": "175.143.40.77",
}
app = FastAPI()



@app.post("/")
async def root(params: Params):
    now = datetime.datetime.now()
    print(f"[{now}] POST request with body {params.model_dump_json()}")
    
    info = {}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:

        raw = ydl.extract_info(params.url, download=False)
        info = ydl.sanitize_info(raw)
    
    return info