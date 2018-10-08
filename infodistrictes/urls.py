from django.contrib import admin
from django.urls import include
from django.urls import path

from infodistrictes.frontend import views


urlpatterns = [
    path('api/', include('deltebre.api.urls')),
    # path('/?', include('deltebre.frontend.urls')),
    path('', views.HomeView.as_view(), name='home'),
    path('embed/<str:include_key>', views.EmbedView.as_view(), name='embed'),
    path('admin/', admin.site.urls),
]
