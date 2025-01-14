from django.db import models
from django.utils import timezone

# Create your models here.
class SensorData(models.Model):
    sensor_id = models.CharField(max_length=50)  # Identificador único del sensor
    name = models.CharField(max_length=100)  # Nombre del sensor 
    value = models.FloatField()  # Valor medido
    timestamp = models.DateTimeField(default=timezone.now)  # Fecha y hora de recepción

    def __str__(self):
        return f"{self.name} ({self.sensor_id}) - {self.value} at {self.timestamp}"