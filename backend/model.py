import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import torch
from transformers import AutoTokenizer, DataCollatorWithPadding
from transformers import TrainingArguments, AutoModelForSequenceClassification, Trainer

repository_id = "hoanghoavienvo/htk-aes-3"

def prepare_model_device():
  model = AutoModelForSequenceClassification.from_pretrained(repository_id)
  model_info = model.__dict__

  model.training = False

  # Chuẩn bị tokenizer
  device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
  model.to(device)

  return model, device

def predict(model, device, text):
  predictions = []
  tokenizer = AutoTokenizer.from_pretrained(repository_id)
  inputs = tokenizer.encode_plus(text, add_special_tokens=True, truncation=True, padding='max_length', max_length=512, return_tensors='pt')
  inputs.to(device)
  outputs = model(**inputs)
  probabilities = outputs.logits.softmax(dim=1)
  _, predicted_class = torch.max(probabilities, dim=1)
  predictions.append(predicted_class.item())

  return predictions[0] + 1
