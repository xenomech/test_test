from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

# Create your models here.


class Habit(models.Model):
    RECURRENCE_TYPE_CHOICES = [
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="habits")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    recurrence_type = models.CharField(
        max_length=10, choices=RECURRENCE_TYPE_CHOICES, default="daily"
    )
    recurrence_count = models.PositiveIntegerField(
        default=1, help_text="Number of times per day/week/month"
    )
    weekdays = models.CharField(
        max_length=13, blank=True, help_text="Comma-separated list of weekdays (0-6)"
    )
    month_days = models.CharField(
        max_length=100, blank=True, help_text="Comma-separated list of days in month"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-created_at"]


class HabitCompletion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    habit = models.ForeignKey(
        Habit, on_delete=models.CASCADE, related_name="completions"
    )
    completed_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-completed_at"]


class Streak(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="streaks")
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current_count = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-start_date"]

    @property
    def length(self):
        return self.current_count
