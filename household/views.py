from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.conf import settings
from rest_framework.permissions import IsAuthenticated

from .models import Household
from household.serializers.common import HouseholdSerializer
from household.serializers.populated import PopulatedHouseholdSerializer


class HouseholdListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data["created_by"] = request.user.id
        request.data["members"] = []
        request.data["transactions"] = []
        household_to_create = HouseholdSerializer(data=request.data)
        if household_to_create.is_valid():
            household_to_create.save()
            return Response(household_to_create.data, status=status.HTTP_201_CREATED)
        return Response(household_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class HouseholdIndividualView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_household(self, pk):
        try:
            return Household.objects.get(pk=pk)
        except:
            raise NotFound(detail="Cannot find that household")

    def get(self, _request, pk):
        individual_household = self.get_household(pk=pk)
        serialized_individual_household = PopulatedHouseholdSerializer(individual_household)
        return Response(serialized_individual_household.data, status=status.HTTP_200_OK)