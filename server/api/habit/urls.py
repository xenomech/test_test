from rest_framework import routers
from .viewsets import HabitViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r"", HabitViewSet, basename="habits")

urlpatterns = [
    path("", include(router.urls)),
]
