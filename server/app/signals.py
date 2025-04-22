from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import HabitCompletion, Streak


@receiver(post_save, sender=HabitCompletion)
def handle_habit_completion(sender, instance, created, **kwargs):
    if not created:
        return

    habit = instance.habit
    today = instance.completed_at.date()

    # Get or create today's streak
    current_streak = Streak.objects.filter(habit=habit, is_active=True).first()

    if current_streak:
        # Check if the completion is consecutive
        if (today - current_streak.start_date).days <= habit.recurrence_count:
            current_streak.current_count += 1
            current_streak.end_date = today
            current_streak.save()
        else:
            # Break the streak and start new one
            current_streak.is_active = False
            current_streak.save()
            Streak.objects.create(habit=habit, start_date=today, end_date=today)
    else:
        # Start new streak
        Streak.objects.create(habit=habit, start_date=today, end_date=today)
