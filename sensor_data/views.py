from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SensorData
from .serializers import SensorDataSerializer


# Vista para recibir datos del sensor
class SensorDataCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Depurar los datos que están siendo recibidos
        print("Datos recibidos:", request.data)

        # Crear un nuevo registro de datos
        serializer = SensorDataSerializer(data=request.data)
        
        # Depurar los errores de validación, si existen
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        
        # Si hay errores, depurar los errores del serializador
        print("Errores de validación:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)