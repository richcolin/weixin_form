import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from rest_framework.response import Response
from .models import *
from  rest_framework.views import APIView
from rest_framework import serializers
class messageModelSerializers(serializers.ModelSerializer):
    class Meta:
        model=message
        fields='__all__'