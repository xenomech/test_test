from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

user = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = user.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
