from django.contrib import admin
from unfold.admin import ModelAdmin
from app.models import Habit, HabitCompletion, Streak

# Register your models here.


@admin.register(Habit)
class HabitAdmin(ModelAdmin):
    pass


@admin.register(HabitCompletion)
class HabitCompletionAdmin(ModelAdmin):
    pass


@admin.register(Streak)
class StreakAdmin(ModelAdmin):
    pass
