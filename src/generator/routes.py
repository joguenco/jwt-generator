from src.generator.dto.data import (
    DataOut,
    DataIn,
)
from fastapi.encoders import jsonable_encoder
from src.generator.generate_token import generate_token
from fastapi import APIRouter, Request, status, Body

router = APIRouter()


@router.post(
    "/jwt",
    response_description="Generate a JWT",
    status_code=status.HTTP_201_CREATED,
    response_model=DataOut,
)
async def generate_jwt(
    request: Request,
    data: DataIn = Body(...),
):
    data = jsonable_encoder(data)

    client_token = generate_token(
        data["identifier"],
        data["name"],
        data["email"],
        data["role"],
        data["private_key"],
        data["expiration_date"],
        data["issuer"],
        data["service"],
    )

    return DataOut(
        identifier=data["identifier"],
        name=data["name"],
        email=data["email"],
        token=client_token,
        role=data["role"],
    )
