from .settings import *  # noqa

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'deltebre',
        'USER': 'deltebre',
        'PASSWORD': 'deltebre',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
