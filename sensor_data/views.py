from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SensorData
from .serializers import SensorDataSerializer

class SensorDataCreateAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Recuperar todos los datos del sensor y serializarlos
        sensor_data = SensorData.objects.all()
        serializer = SensorDataSerializer(sensor_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print("Datos recibidos:", request.data)  # Depuración
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        print("Errores de validación:", serializer.errors)  # Depuración
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)