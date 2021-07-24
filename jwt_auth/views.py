from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticated

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer


User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_register = UserSerializer(data=request.data)

        if user_to_register.is_valid():
            user_to_register.save()
            return Response({'message': 'Registration Successful!'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_register.errors, status=status.HTTP_401_UNAUTHORIZED)


class LoginView(APIView):

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')

        dt = datetime.now() + timedelta(days=3)
        token = jwt.encode(
            {
                'sub': user_to_login.id,
                'exp': int(dt.strftime('%s')),
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response({'message': f'Welcome Back {user_to_login.first_name}', 'token': token})


class UserView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):

        header = request.headers.get('Authorization')
        token = header.replace('Bearer ', '')
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_username = User.objects.get(pk=payload.get('sub'))

        user_to_display = User.objects.get(username=user_username)
        serialized_user = PopulatedUserSerializer(user_to_display)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

