import os
import hashlib
from django.views import View
from django.http import Http404, HttpResponse, FileResponse, JsonResponse
from rest_framework.response import Response
from ..models import *
from ..util import messageModelSerializers
from rest_framework import exceptions
from rest_framework import mixins
from rest_framework import generics
from utils.auth import already_authorized, get_user
class gradeView(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):

        queryset = message.objects.all()
        serializer_class = messageModelSerializers

        def post(self, request, *args, **kwargs):
            print(already_authorized(request))
            if already_authorized(request):
                return self.create(request, *args, **kwargs)
            else:
                raise exceptions.MethodNotAllowed('weitogguo')
