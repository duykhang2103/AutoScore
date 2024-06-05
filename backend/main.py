from typing import Union

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from model import prepare_model_device, predict
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None


def build_application() -> FastAPI:
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    model, device = prepare_model_device() 

    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Union[str, None] = None):
        return {"item_id": item_id, "q": q}
    
    @app.post("/run_model/")
    def run_model(text: Item):
        return {"result": predict(model, device, text.name)}
    return app
# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

app = build_application()