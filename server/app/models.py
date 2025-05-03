from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

# Create your models here.


class HabitManager(models.Manager):
    def for_user(self, user):
        return self.get_queryset().filter(user=user)


class Habit(models.Model):
    objects = HabitManager()
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
    weekdays = models.JSONField(
        default=list(range(7)),
        help_text="Comma-separated list of weekdays (0-6)",
    )
    month_days = models.JSONField(
        default=list(range(1, 32)),
        help_text="Comma-separated list of days in month",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-created_at"]


class HabitCompletionManager(models.Manager):
    def for_user(self, user):
        return self.get_queryset().filter(habit__user=user)


class HabitCompletion(models.Model):
    objects = HabitCompletionManager()
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    habit = models.ForeignKey(
        Habit, on_delete=models.CASCADE, related_name="completions"
    )
    completed_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-completed_at"]


class StreakManager(models.Manager):
    def for_user(self, user):
        return self.get_queryset().filter(habit__user=user)


class Streak(models.Model):
    objects = StreakManager()
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


class HabitReminderManager(models.Manager):
    def for_user(self, user):
        return self.get_queryset().filter(habit__user=user)


class HabitReminder(models.Model):
    objects = HabitReminderManager()
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="reminders")
    time = models.TimeField()
    is_enabled = models.BooleanField(default=True)

    class Meta:
        ordering = ["time"]
