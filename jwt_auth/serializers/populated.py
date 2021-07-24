from django.contrib.auth import get_user_model
from transactions.serializers.common import TransactionSerializer
from .common import UserSerializer
from household.serializers.common import HouseholdSerializer

User = get_user_model()

class PopulatedUserSerializer(UserSerializer):
    transactions = TransactionSerializer(many=True)
    households = HouseholdSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'password_confirmation', 'email', 'first_name', 'last_name', 'profile_image', 'balance','transactions', 'households')
