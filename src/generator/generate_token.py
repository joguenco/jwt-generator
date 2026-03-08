import jwt
from datetime import datetime, timezone, date


def generate_token(
    identifier: str,
    name: str,
    email: str,
    role: list[str],
    private_key: str,
    audience: str,
    issuer: str = 'Resolvedor Service',
    expiration_date: datetime = date.today(),
) -> str:
    current_time = datetime.now(timezone.utc)
    integer_date = expiration_date.timestamp()

    payload = {
        'iss': issuer,
        'iat': current_time,
        'exp': integer_date,
        'aud': audience,
        'sub': email,
        'client': identifier,
        'name': name,
        'email': email,
        'role': role,
    }

    jwt_token = jwt.encode(payload, private_key, algorithm='HS256')

    return jwt_token
