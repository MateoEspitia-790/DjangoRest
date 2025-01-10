from rest_framework import serializers
from .models import SensorData

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ['id', 'sensor_name', 'value', 'timestamp']  # Campos que quieres exponer en la API
