from rest_framework import exceptions
from transactions.models import Transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import TransactionSerializer

class TransactionListView(APIView):
  
    permission_classes = (IsAuthenticated, )
    
    def post(self, request):
        request.data["owner"] = request.user.id
        transaction_to_add = TransactionSerializer(data=request.data)
        if transaction_to_add.is_valid():
            transaction_to_add.save()
            return Response(transaction_to_add.data, status=status.HTTP_201_CREATED)
        return Response(transaction_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class  TransactionIndividualView(APIView):

    permission_classes = (IsAuthenticated, )

    def get_transaction(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            raise NotFound(detail="Transaction Not Found")

    
    def get(self, request, pk):
        individual_transaction = self.get_transaction(pk=pk)

        serialized_individual_transaction = TransactionSerializer(individual_transaction)
        return Response(serialized_individual_transaction.data, status=status.HTTP_200_OK)


    def delete(self, request, pk):

        transaction_to_delete = self.get_transaction(pk=pk)

        if transaction_to_delete.owner != request.user:
            raise PermissionDenied()

        transaction_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def put(self, request, pk):
        
        transaction_to_edit = self.get_transaction(pk=pk)
        changes_to_add = request.data
        serialized_updated_transaction = TransactionSerializer(transaction_to_edit, data=changes_to_add, partial=True)

        if transaction_to_edit.owner != request.user:
            raise PermissionDenied()
        
        if serialized_updated_transaction.is_valid():

            serialized_updated_transaction.save()
            return Response(serialized_updated_transaction.data, status=status.HTTP_202_ACCEPTED)
    
