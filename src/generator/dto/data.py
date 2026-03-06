from typing import Optional
from datetime import date

from pydantic import BaseModel


class DataOut(BaseModel):
    identifier: str
    name: str
    email: str
    token: Optional[str] = None
    status: Optional[bool] = True
    role: list[str]


class DataIn(BaseModel):
    identifier: str
    name: str
    email: str
    expiration_date: date
    role: list[str] = ["demo"]
    private_key: Optional[str] = None
    audience: str
    issuer: str
    service: str
