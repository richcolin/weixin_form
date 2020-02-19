# -*- encoding=utf8 -*-


from django.db import models

# Create your models here.
class User(models.Model):
    # open_id
    open_id = models.CharField(max_length=64, unique=True)
    # 昵称
    nickname = models.CharField(max_length=256)
