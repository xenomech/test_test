from rest_framework import viewsets, status
from app.models import Habit, HabitCompletion, Streak
from .serializers import HabitSerializer, HabitCompletionSerializer, StreakSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


class HabitViewSet(viewsets.ViewSet):
    serializer_class = HabitSerializer

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def list(self, request):
        queryset = Habit.objects.for_user(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(habit)
        return Response(serializer.data)

    def update(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(habit, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        habit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(habit, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def register_completion(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = HabitCompletionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get the current date to check against habit frequency
        from datetime import datetime, date

        today = date.today()
        today_weekday = today.weekday()  # 0-6 (Monday is 0)
        today_month_day = today.day  # 1-31

        # Check if today is valid for this habit's frequency
        if habit.recurrence_type == "weekly" and today_weekday not in habit.weekdays:
            return Response(
                {"detail": "Cannot complete habit on this day of the week."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            habit.recurrence_type == "monthly"
            and today_month_day not in habit.month_days
        ):
            return Response(
                {"detail": "Cannot complete habit on this day of the month."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check for existing completions today to enforce recurrence_count
        today_start = datetime.combine(today, datetime.min.time())
        today_end = datetime.combine(today, datetime.max.time())

        completions_today = HabitCompletion.objects.filter(
            habit=habit, completed_at__range=(today_start, today_end)
        ).count()

        if completions_today >= habit.recurrence_count:
            return Response(
                {
                    "detail": f"Maximum completions for today ({habit.recurrence_count}) already reached."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        completion = HabitCompletion.objects.create(
            habit=habit, notes=serializer.validated_data.get("notes")
        )

        return Response(
            HabitCompletionSerializer(completion).data, status=status.HTTP_201_CREATED
        )

    @action(methods=["get"], detail=True)
    def completions(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        completions = HabitCompletion.objects.for_user(user=request.user).filter(
            habit=habit
        )
        serializer = HabitCompletionSerializer(completions, many=True)
        return Response(serializer.data)

    @action(methods=["get"], detail=True)
    def streaks(self, request, pk=None):
        try:
            habit = Habit.objects.for_user(user=request.user).get(pk=pk)
        except Habit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        streaks = Streak.objects.for_user(user=request.user).filter(habit=habit)
        serializer = StreakSerializer(streaks, many=True)
        return Response(serializer.data)
