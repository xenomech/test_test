from rest_framework import serializers

from core.models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            "name",
            "age",
            "gender",
            "bio",
        ]
