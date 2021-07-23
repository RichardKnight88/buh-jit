from transactions.serializers.common import TransactionSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    transactions = TransactionSerializer(many=True)
