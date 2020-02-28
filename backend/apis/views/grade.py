import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from rest_framework.response import Response
from ..models import *
from ..util import messageModelSerializers
from  rest_framework.views import APIView
from rest_framework import serializers,viewsets
# class gradeView(viewsets.ModelViewSet):
#     queryset = message.objects.all()
#     serializer_class = messageModelSerializers
import json
class gradeView(viewsets.ModelViewSet):
    queryset = message.objects.all()
    serializer_class = messageModelSerializers