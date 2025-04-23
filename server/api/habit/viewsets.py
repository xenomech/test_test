from rest_framework import viewsets
from app.models import Habit, HabitCompletion, Streak
from .serializers import HabitSerializer, HabitCompletionSerializer, StreakSerializer


class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer


class HabitCompletionViewSet(viewsets.ModelViewSet):
    queryset = HabitCompletion.objects.all()
    serializer_class = HabitCompletionSerializer


class StreakViewSet(viewsets.ModelViewSet):
    queryset = Streak.objects.all()
    serializer_class = StreakSerializer
