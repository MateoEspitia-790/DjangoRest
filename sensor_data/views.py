from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SensorData
from .serializers import SensorDataSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Vista para recibir datos del sensor
@method_decorator(csrf_exempt, name='dispatch')
class SensorDataCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Crear un nuevo registro de datos
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)