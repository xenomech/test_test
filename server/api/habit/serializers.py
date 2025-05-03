from rest_framework import serializers
from app.models import Habit, HabitCompletion, Streak


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = "__all__"


class HabitCompletionSerializer(serializers.ModelSerializer):
    habit = HabitSerializer(read_only=True)
    completed_at = serializers.DateTimeField(read_only=True)
    notes = serializers.CharField(required=False)

    class Meta:
        model = HabitCompletion
        fields = ["notes", "completed_at", "habit"]


class StreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Streak
        fields = "__all__"
