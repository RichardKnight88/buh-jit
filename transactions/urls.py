from django.urls import path
from .views import TransactionListView, TransactionIndividualView

urlpatterns = [
    path('', TransactionListView.as_view()),
    path('<int:pk>/', TransactionIndividualView.as_view()),
]