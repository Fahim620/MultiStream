from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('<str:channel1>/', views.multistream),
    path('<str:channel1>/<str:channel2>/', views.multistream),
]