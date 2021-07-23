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
  
    def delete(self, request, pk):
        try:
            transaction_to_delete = Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            raise NotFound(detail="Transaction Not Found")

        if transaction_to_delete.owner != request.user:
            raise PermissionDenied()

        transaction_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
