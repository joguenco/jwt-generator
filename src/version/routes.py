import sys
import platform
from fastapi import APIRouter

router = APIRouter()


@router.get('/version')
async def version():

    return {
        'name': 'JWT Generator',
        'author': 'Jorge Luis',
        'website': 'https://resolvedor.dev',
        'version': '1.0.0',
        'versionOS': 'Haiku Os',  # platform.platform(),
        'versionRuntime': f'Python {sys.version}',
        'versionDatabase': None,
    }
