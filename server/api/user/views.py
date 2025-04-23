from rest_framework.views import APIView
from rest_framework.response import Response

from .serializer import UserSerializer


class UserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user.profile)
        return Response(serializer.data)
