from django.urls import path
from .views import ContactsListView, ContactsIndividualView

urlpatterns = [
    path('', ContactsListView.as_view()),
    path('<int:pk>/', ContactsIndividualView.as_view()),
]