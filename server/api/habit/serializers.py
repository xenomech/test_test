from rest_framework import serializers
from app.models import Habit, HabitCompletion, Streak


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = "__all__"


class HabitCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitCompletion
        fields = "__all__"


class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = "__all__"
