from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from thapp.models import Course, All_class

class Stucourse(models.Model):
    course = models.ForeignKey(Course)
    stu = models.ForeignKey(User)
    
