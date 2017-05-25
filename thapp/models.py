# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    teacher = models.ForeignKey(User)
    cname = models.CharField(max_length=20)
    img = models.ImageField(upload_to='img')
    thname = models.CharField(max_length=20, null = True)
    minMclass = models.IntegerField(default=1)#要求小班课程最少选课次数
    minBclass = models.IntegerField(default=1)#要求大班课程最少选课次数
class All_class(models.Model):
    course = models.ForeignKey(Course)
    number = models.IntegerField(default=0)#在所有大班小班中的编号
    period = models.IntegerField(default=0)#学时
    capacity = models.IntegerField(default=0)#课程容量
    type = models.CharField(max_length=10, null = True)#大班or小班
    theme = models.TextField()#课程主题
    isnecessary = models.CharField(max_length=10, null = True)
    starttime = models.DateTimeField(default = "2012-05-15 21:05")
    endtime = models.DateTimeField(default = "2012-05-15 21:05")
    isaval = models.IntegerField(default=0)

class Group(models.Model):
    stu = models.ForeignKey(User)
    course = models.ForeignKey(All_class)
    groupid = models.IntegerField(default=0)
    stumark1 = models.TextField(default = '')
    stumark2 = models.TextField(default = '')
    stumark3 = models.TextField(default = '')
    stumark4 = models.TextField(default = '')
    thmark1 = models.TextField(default = '')
    thmark2 = models.TextField(default = '')
    isparty = models.IntegerField(default=0)#是否参加了本轮评分
    classmark = models.CharField(max_length=1, default = '')
    isaval = models.IntegerField(default=1)#主要针对大班点名，为0时代表缺席
    
class Stutable(models.Model):#学生评分表格
    teacher = models.ForeignKey(User)
    tablename = models.CharField(max_length=50, null = True)
    table = models.TextField(null = True)
    tablerande = models.TextField(null = True)#四种表格的顺序
    groupsum = models.IntegerField(default=0)#教师设定表格中小组数-1
    groupnum = models.IntegerField(default=0)#教师设定表格中小组人数-1
    
class Inclass(models.Model):
    theclass = models.ForeignKey(All_class)
    stutable = models.ForeignKey(Stutable)
    thtable = models.IntegerField(default=0)
    thgrouptable = models.IntegerField(default=0)