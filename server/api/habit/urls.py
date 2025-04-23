from rest_framework import routers
from .viewsets import HabitViewSet, HabitCompletionViewSet, StreakViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r"", HabitViewSet)
router.register(r"completions", HabitCompletionViewSet)
router.register(r"streaks", StreakViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
