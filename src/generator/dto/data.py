from typing import Optional
from datetime import date

from pydantic import BaseModel


class DataOut(BaseModel):
    audience: str
    token: Optional[str] = None


class DataIn(BaseModel):
    identifier: str
    name: str
    email: str
    role: list[str] = ["demo"]
    private_key: Optional[str] = None
    audience: str
    issuer: str
    expiration_date: date
