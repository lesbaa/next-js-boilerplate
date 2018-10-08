from .settings import *  # noqa

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'deltebre',
        'USER': 'circleci',
        'PASSWORD': 'circleci',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
