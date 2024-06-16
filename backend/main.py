from typing import Union
import re
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from model import prepare_model_device, predict
from pydantic import BaseModel
from spellchecker import SpellChecker
from data import evaluations

class Item(BaseModel):
    content: str | None = None


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
    spell = SpellChecker()
    
    @app.post("/grade/")
    def run_model(text: Item):
        punc = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
        res=" "
 
        for ele in text.content:
            if ele not in punc:
                res+=ele
        
        # res = re.sub(r'[^\w\s]', '', text.content)
        misspelleds = spell.unknown(res.split())
        result = predict(model, device, text.content) if len(text.content) > 20 else 1
        
        return {
            "result": result, 
            "evaluation": evaluations[str(result)], 
            "misspelleds": misspelleds
            }

    @app.post("/correct/")
    def correct(word: Item):
        corrected = spell.correction(word)
        return {
            "corrected": corrected
        }

    return app
app = build_application()