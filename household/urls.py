from django.urls import path
from .views import HouseholdListView, HouseholdIndividualView

urlpatterns = [
    path('', HouseholdListView.as_view()),
    path('<int:pk>/', HouseholdIndividualView.as_view()),
]