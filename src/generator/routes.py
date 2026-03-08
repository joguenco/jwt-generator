from src.generator.dto.data import (
    DataOut,
    DataIn,
)
from fastapi.encoders import jsonable_encoder
from src.generator.generate_token import generate_token
from fastapi import APIRouter, Request, status, Body

router = APIRouter()


@router.post(
    '/jwt',
    response_description='Generate a JWT',
    status_code=status.HTTP_200_OK,
    response_model=DataOut,
)
async def generate_jwt(
    request: Request,
    data: DataIn = Body(...),
):
    if not validate_data(data):
        return {'error': 'Invalid data'}

    print('Data', data)

    client_token = generate_token(
        data.identifier,
        data.name,
        data.email,
        data.role,
        data.private_key,
        data.audience,
        data.issuer,
        data.expiration_date,
    )

    return DataOut(
        audience=data.audience,
        token=client_token,
    )


def validate_data(data: DataIn) -> bool:
    if not data.identifier:
        return False
    if not data.name:
        return False
    if not data.email:
        return False
    if not data.role:
        return False
    if not data.private_key:
        return False
    if not data.audience:
        return False
    if not data.expiration_date:
        return False

    return True
