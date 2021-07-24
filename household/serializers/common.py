from rest_framework import serializers
from ..models import Household

class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = ('household_name', 'balance', 'created_by', 'members')
