from django.urls import path
from .views import SensorDataCreateAPIView

urlpatterns = [
    path('api/sensor_data/', SensorDataCreateAPIView.as_view(), name='sensor_data_create'),
]
