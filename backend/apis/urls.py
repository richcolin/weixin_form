#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-                                                             
# @Author         : imooc
# @Email          : imooc@foxmail.com
# @Created at     : 2018/11/26
# @Filename       : urls.py
# @Desc           :

from django.urls import path,re_path

from .views import  menu, image, service,grade

urlpatterns = [
    # path('', weather.helloworld)
    # path('weather', weather.WeatherView.as_view()),
    path('menu', menu.get_menu),
    path('image', image.ImageView.as_view()),
    path('image/list', image.ImageListView.as_view()),
    re_path('grade', grade.gradeView.as_view()),
    re_path(r'^grade/(?P<pk>\d+)$', grade.gradeView.as_view(), name="grade_detail"),
    # path('grade', grade.gradeView.as_view()),
    path('constellation', service.constellation),
    path('joke', service.joke),
    path('today', service.history_today),
    path('stock', service.stock),
]