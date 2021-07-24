from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from django.conf import settings
from rest_framework.permissions import IsAuthenticated

from .models import Contact
from regular_contacts.serializers.common import ContactsSerializer


class ContactsListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data["owner"] = request.user.id
        contact_to_create = ContactsSerializer(data=request.data)
        if contact_to_create.is_valid():
            contact_to_create.save()
            return Response(contact_to_create.data, status=status.HTTP_201_CREATED)
        return Response(contact_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ContactsIndividualView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_contact(self, pk):
        try:
            return Contact.objects.get(pk=pk)
        except:
            raise NotFound(detail="Cannot find that contact")

    def get(self, _request, pk):
        individual_contact = self.get_contact(pk=pk)

        serialized_individual_contact = ContactsSerializer(individual_contact)
        return Response(serialized_individual_contact.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        
        contact_to_edit = self.get_contact(pk=pk)
        changes_to_add = request.data
        serialized_updated_contact = ContactsSerializer(contact_to_edit, data=changes_to_add, partial=True)

        if contact_to_edit.owner != request.user:
            raise PermissionDenied()
        
        if serialized_updated_contact.is_valid():

            serialized_updated_contact.save()
            return Response(serialized_updated_contact.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(serialized_updated_contact.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        contact_to_delete = self.get_contact(pk=pk)

        if contact_to_delete.owner != request.user:
            raise PermissionDenied()
        
        contact_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
