from jwt_auth.serializers.common import UserSerializer
from transactions.serializers.common import TransactionSerializer
from .common import HouseholdSerializer
from ..models import Household

class PopulatedHouseholdSerializer(HouseholdSerializer):
    transactions = TransactionSerializer(many=True)
    members = UserSerializer(many=True)

    class Meta:
        model = Household
        fields = '__all__'