# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import HttpResponse, render_to_response
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib import auth
from models import Course, All_class, Group, Stutable,Inclass,all_file
from django.http import JsonResponse
from stuapp.models import Stucourse
import uuid
from base64 import b64decode
from django.core.files.base import ContentFile
import time
from _ast import Num
import re
import random
from PIL import Image
import json as simplejson
import urllib
# Create your views here.

def test(request):
    return render_to_response("index.html")
def main(request):#教师主页
    c = "您还未登陆！"
    if request.user.id:
        stu = User.objects.filter(id = request.user.id)[0]
        c = stu.username
        if stu.first_name == 's':
            return HttpResponseRedirect("/student/main/")
    if request.POST:
        post = request.POST
        if post["to"] == 'log':
            login_t(request)
        elif post["to"] == "reg":
            reg_t(request)
    all_course = Course.objects.filter(teacher_id = request.user.id)
    nums = len(all_course)
    all_table = Stutable.objects.filter(teacher_id = request.user.id)
    content = {'user':c, "imgnum":range(1, nums+1), "all_course":all_course, "all_table":all_table}
    return render_to_response("th_main.html",content)

def reg_t(request):#教师注册
    if request.POST:
        post = request.POST
        username = post["user"]
        password = post["passwd"]
        email = post["qq"]
        if username and password and email:
            new_user = User.objects.create_user( \
                                        username = username, \
                                        password = password, \
                                        email = email, \
                                        first_name = 't',\
                                       )
            new_user.save()
            
def login_t(request):#教师登陆
    if request.POST:
        post = request.POST
        username = post["username"]
        password = post["p"]
        user = auth.authenticate(username=username, password=password)
        if (user is not None) and (user.first_name == 't'):
            if user.is_active:
                auth.login(request, user)

def logout(request):#注销
    auth.logout(request)
    return HttpResponseRedirect("/")

def Addcourse(request):
    if request.POST:
        thid = request.user.id
        if request.is_ajax():
            cname = request.POST.get('cname')
            thname = request.POST.get('thname')
            picture = request.POST.get('picture')
            count = request.POST.get('count')
            seq = request.POST.getlist('seq')
            subtheme = request.POST.getlist('subtheme') 
            period = request.POST.getlist('period') 
            nums = request.POST.getlist('nums')
            classtype = request.POST.getlist('classtype') 

            #将base64格式的图片转换并存储
            picture = picture.split('base64,', 1 )
            image_data = b64decode(picture[1]) 
            image_name = str(uuid.uuid4())+".jpg"
            mypic  = ContentFile(image_data, image_name)
            new_img = Course(
            img=mypic,
            teacher_id = thid,
            thname = thname,
            cname = cname,
            )
            new_img.save()
            
            sumclass = int(count)
            i = 0
            while sumclass > 0:
                if int(seq[i]) == 1:
                    addclass = All_class(
                                         course_id = new_img.id,
                                         number = i,
                                         period = int(period[i]),
                                         capacity = int(nums[i]),
                                         type = classtype[i],
                                         theme = subtheme[i],
                                         )
                    addclass.save()
                    sumclass = sumclass - 1
                i = i+1

    return JsonResponse({"rr":1})

def Mycourse(request):#教师所有课程的图片列表
    imgs = []#课程封面
    cname = []#课程名称
    courseid = []#课程编号
    username = ""
    if request.POST:
        thid = request.user.id
        name = User.objects.filter(id = thid)
        if name:
            username = name[0].username
        if request.is_ajax():
            all_course = Course.objects.filter(teacher_id = thid)
            for course in all_course:
                imgs.append(course.img.url)
                cname.append(course.cname)
                courseid.append(course.id)
    content = {"rr":1, "imgs":imgs, "nums":len(all_course), "cname":cname, "courseid":courseid,"username":username}
    return JsonResponse(content)

def CheckedCourse(request):#在我的课程中选择某一个课程
    number_M = []#小班编号
    period_M = []#小班课时
    capacity_M = []#小班容量
    theme_M = []#小班主题
    number_B = []#大班编号
    period_B = []#大班课时
    capacity_B = []#大班容量
    theme_B = []#大班主题
    isnecessary_M = []#必选/限选
    isnecessary_B = []#必选/限选
    state_M = []#课程当前状态
    state_B = []#课程当前状态
    choosed_M = []#小班已选学生数
    choosed_B = []#大班已选学生数
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            time.localtime(time.time())
            thedatetime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))#获取当前时间
            print thedatetime
            thisclass = All_class.objects.filter(course_id = int(courseid))
            all_course = Course.objects.filter(id = courseid)
            minMclass = all_course[0].minMclass
            minBclass = all_course[0].minBclass
            for cls in thisclass:
                if cls.type == '小班':
                    number_M.append(cls.number)
                    period_M.append(cls.period)
                    capacity_M.append(cls.capacity)
                    theme_M.append(cls.theme)
                    isnecessary_M.append(cls.isnecessary)
                    choosed_M.append(len(Group.objects.filter(course_id = cls.id)))
                    if str(cls.starttime) > thedatetime:
                        state_M.append('课程尚未开始')
                        
                    elif str(cls.endtime) < thedatetime:
                        state_M.append('课程已结束')
                       
                    else:
                        state_M.append('选课时间，截止'+str(cls.endtime))
                  
                elif cls.type == '大班':
                    number_B.append(cls.number)
                    period_B.append(cls.period)
                    capacity_B.append(cls.capacity)
                    theme_B.append(cls.theme)
                    isnecessary_B.append(cls.isnecessary)
                    choosed_B.append(len(Group.objects.filter(course_id = cls.id)))
                    if str(cls.starttime) > thedatetime:
                        state_B.append('课程尚未开始')
                    elif str(cls.endtime) < thedatetime:
                        state_B.append('课程已结束')
                    else:
                        state_B.append('选课时间，截止'+str(cls.endtime))
            nums_M = len(number_M)
            nums_B = len(number_B)
            print nums_M
            print isnecessary_M
    content = {"number_M":number_M, "period_M":period_M, "capacity_M":capacity_M, "theme_M":theme_M,
               "number_B":number_B, "period_B":period_B,"capacity_B":capacity_B,"theme_B":theme_B,
               "nums_M":nums_M, "nums_B":nums_B, "minMclass":minMclass, "minBclass":minBclass,
               "isnecessary_M":isnecessary_M, "isnecessary_B":isnecessary_B, "state_M":state_M, "state_B":state_B,
               "choosed_M":choosed_M, "choosed_B":choosed_B}      
    return JsonResponse(content)

def ChangeCourse(request):#改变小班/大班次数要求
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            minMclass = request.POST.get('minMclass')
            minBclass = request.POST.get('minBclass')
            Course.objects.filter(id = int(courseid)).update(minMclass = minMclass, minBclass = minBclass)
    return JsonResponse({"rr":1})

def Editclass(request):
    if request.POST:
        if request.is_ajax():
            time.localtime(time.time())
            thedatetime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))#获取当前时间
            courseid = request.POST.get('courseid')
            isNecessary = request.POST.get('isNecessary')
            isstartnow = request.POST.get('isstartnow')
            starttime = request.POST.get('starttime')
            endtime = request.POST.get('endtime')
            theclass = request.POST.get('theclass')
            prestarttime = "2012-05-15 21:05"
            preendtime = "2012-05-15 21:05"
            nooperation = All_class.objects.filter(course_id = int(courseid), number = int(theclass))
            if nooperation:
                prestarttime = nooperation[0].starttime
                preendtime = nooperation[0].endtime
            if int(isstartnow) == 1:
                starttime = thedatetime
            if int(isstartnow) == -1:
                starttime = prestarttime
                endtime = preendtime
            if int(isNecessary) == 1:
                isnes = "必选"
            elif int(isNecessary) == 0:
                isnes = "限选"
            else:
                isnes = ""
            print isnes
            All_class.objects.filter(course_id = int(courseid), number = int(theclass)).update(
                                                                                             isnecessary = isnes,
                                                                                             starttime = starttime,
                                                                                             endtime = endtime,  
                                                                                               )
    return JsonResponse({"rr":1})

def Myclas(request):#分组时课程选择课程列表信息
    allminclassid = []#所有小班课程的id
    allmaxclassid = []#所有大班课程的id
    allclassid = []#所有课程
    myclass = []
    stuid = []
    stuname = []
    minclassnum = []
    maxclassnum = []
    classgrade = []
    all_c = []
    temp = []
    allminclassnumber = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            all_cls = All_class.objects.filter(course_id = int(courseid), type = '小班')
            num = len(all_cls)
            for cls in all_cls:
                myclass.append(cls.number)
            allminclass = All_class.objects.filter(course_id = courseid, type = '小班')
            for minclass in allminclass:
                allminclassid.append(minclass.id)
                allminclassnumber.append(minclass.number)
            allmaxclass = All_class.objects.filter(course_id = courseid, type = '大班')
            for maxclass in allmaxclass:
                allmaxclassid.append(maxclass.id)
            allclass = All_class.objects.filter(course_id = courseid)
            for oclass in allclass:
                allclassid.append(oclass.id)
                all_c.append(oclass.number)
            all1 = Group.objects.all()
            for a in all1:
                if a.course_id in allclassid:
                    if not a.stu_id in stuid:
                        stuid.append(a.stu_id)
                        stuname.append(User.objects.filter(id = a.stu_id)[0].username)
            for sid in stuid:
                mincount = 0
                maxcount = 0
                all2 = Group.objects.filter(stu_id = sid)
                for a2 in all2:
                    if a2.course_id in allminclassid:
                        mincount = mincount + 1
                minclassnum.append(mincount)
                for a3 in all2:
                    if a3.course_id in allmaxclassid and a3.isaval == 1:
                        maxcount = maxcount + 1
                maxclassnum.append(maxcount)
            
            for tid in allminclassid:
                temp = []
                for sid in stuid:
                    pp = Group.objects.filter(stu_id = sid, course_id = tid)
                    if pp:
                        temp.append(pp[0].classmark)
                    else:
                        temp.append('')
                classgrade.append(temp)
    content = {"num":num, "myclass":myclass, "stuid":stuid, "stuname":stuname, "minclassnum":minclassnum, \
               "maxclassnum":maxclassnum, "sum":len(stuid), "classgrade":classgrade, "allminclassnumber":allminclassnumber,\
               "classsum":len(allminclassnumber)}
    return JsonResponse(content)

def Myclas2(request):#分组时课程选择课程列表信息
    myclass = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            all_cls = All_class.objects.filter(course_id = int(courseid), type = '大班')
            num = len(all_cls)
            for cls in all_cls:
                myclass.append(cls.number)
    content = {"num":num, "myclass":myclass}
    return JsonResponse(content)

def MGroup(request):#教师点击分组按钮
    temp = []
    temp2 = []
    groups_id = []
    groups_name = []
    temp3 = []#存储多余人得id
    temp4 = []#存储多余人得姓名
    group_num = []#存储各小组成员数量
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            groupnum = request.POST.get('groupnum')
            theclass = int(re.findall("\d+", theclass)[0])
            groupnum = int(groupnum)
            print courseid
            print theclass
            print groupnum
            myclas = All_class.objects.filter(course_id = int(courseid), number = theclass)
            if myclas:
                clasid = myclas[0].id
            all_group = Group.objects.filter(course_id = clasid)
            a = range(0, len(all_group))
            if all_group:
                random.shuffle(a)
                groupcontent = len(all_group) / groupnum #小组成员数量
                left = len(all_group) % groupnum#多余出来的人数
                for k in range(0, left):
                    stuid = all_group[a[groupnum*groupcontent + k]].stu_id
                    stuname = User.objects.filter(id = stuid)[0].username
                    temp3.append(stuid)
                    temp4.append(stuname)
                w = 0
                for i in range(0, groupnum):
                    temp = []
                    temp2 = []
                    if w < left:
                        temp.append(temp3[w])
                        temp2.append(temp4[w])
                        w = w +1
                    for j in range(0, groupcontent):
                        stuid = all_group[a[i * groupcontent + j]].stu_id
                        stuname = User.objects.filter(id = stuid)[0].username
                        temp.append(stuid)
                        temp2.append(stuname)
                    groups_id.append(temp)
                    groups_name.append(temp2)

                for m in range(0, groupnum):
                    group_num.append(groupcontent)
                for n in range(0, left):
                    group_num[n] += 1
                    
            print a#把all_group按照这个顺序打乱
            print groups_id#打乱后小组成员id
            print groups_name#打乱后小组成员名称
            print group_num#各个小组成员数量
            content = {"prerand":a, "groups_id":groups_id, "groups_name":groups_name, "group_num":group_num,"stunum":len(all_group)}
            return JsonResponse(content)
        
        
def SaveGroup(request):
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            grouped = request.POST.getlist('grouped')
            groupnums = request.POST.getlist('groupnums')
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            
            myclas = All_class.objects.filter(course_id = int(courseid), number = theclass)
            if myclas:
                print groupnums
                print grouped
                clasid = myclas[0].id
                count = 0
                for i in range(0, len(groupnums)):
                    for j in range(0, int(groupnums[i])):
                        print grouped[count]
                        Group.objects.filter(course_id = clasid, stu_id = int(grouped[count])).update(groupid = i+1)
                        count = count + 1
    return JsonResponse({"rr":1})

def ShowGroup(request):
    temp = []
    temp2 = []
    groups_id = []
    groups_name = []
    group_num = []#存储各小组成员数量
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            print courseid
            theclass = int(re.findall("\d+", theclass)[0])
            myclas = All_class.objects.filter(course_id = int(courseid), number = theclass)
            if myclas:
                clasid = myclas[0].id
                groupnum = 0
                all_group = Group.objects.filter(course_id = clasid)
                for group in all_group:
                    if groupnum < group.groupid:
                        groupnum = group.groupid
                for i in range(1, groupnum+1):
                    thegroup = Group.objects.filter(groupid = i, course_id = clasid)
                    temp = []
                    temp2 = []
                    for g in thegroup:
                        temp.append(g.stu_id) 
                        stuname = User.objects.filter(id = g.stu_id)[0].username
                        temp2.append(stuname)
                    group_num.append(len(temp))
                    groups_id.append(temp)
                    groups_name.append(temp2)
            content = {"groups_id":groups_id, "groups_name":groups_name, "group_num":group_num,"stunum":len(all_group),"rr":len(group_num)}
    return JsonResponse(content)

def Stutenttable(request):
    if request.POST:
        if request.is_ajax():
            teacherid = request.user.id
            mytable = request.POST.get('mytable')
            tablename = request.POST.get('tablename')
            tablerand = request.POST.get('tablerand')
            groupsum = request.POST.get('groupsum')
            groupnum = request.POST.get('groupnum')
            print teacherid
            print mytable
            print tablename
            addtable = Stutable(
                                teacher_id = 1,
                                tablename = tablename,
                                table = mytable,
                                tablerande = tablerand,
                                groupsum = groupsum,
                                groupnum = groupnum,
                                )
            addtable.save()
            
    return JsonResponse({"rr":1})

def Showmodel(request):
    table2 = []
    tablename = []
    teacherid = request.user.id
    all_table = Stutable.objects.filter(teacher_id = teacherid)
    for table in all_table:
        table2.append(table.id)
        tablename.append(table.tablename)
    print table2
    content = {"table2":table2, "tablename":tablename, "num":len(tablename)}
    return JsonResponse(content)

def showtable(request):
    if request.POST:
        if request.is_ajax():
            tableid = request.POST.get('tableid')
            all_table = Stutable.objects.filter(id = tableid)
            table2 = all_table[0].table
    content = {"table2":table2}
    return JsonResponse(content)


def showteatable(request):#教师评分表
    stu_id = []
    stu_name = []
    maxgroup = -1
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            tableid = request.POST.get('tableid')
            thmark = request.POST.get('thmark')
            thgroupmark = request.POST.get('thgroupmark')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            
            if myclass:
                classid = myclass[0].id
                tt = Inclass.objects.filter(theclass_id = classid).delete()
                all_stu = Group.objects.filter(course_id = classid)
                for stu in all_stu:
                    if stu.groupid > maxgroup:
                        maxgroup = stu.groupid
                    stu_id.append(stu.stu_id)
                    name = User.objects.filter(id = stu.stu_id)[0].username
                    stu_name.append(name)
                if thmark == "true":
                    teachermark = 1
                else:
                    teachermark = 0
                    
                if thgroupmark == "true":
                    teachergroupmark = 1
                else:
                    teachergroupmark = 0
                add = Inclass(
                              thtable = teachermark,
                              thgrouptable = teachergroupmark,
                              stutable_id = int(tableid),
                              theclass_id = classid,
                              )
                add.save()
                content = {"stuid":stu_id,"stuname":stu_name,"stunum":len(stu_id), "groupnum":maxgroup, "rr":1}
                return JsonResponse(content)
            
def endmark(request):
    groupnum = 0
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            stugrade = request.POST.getlist('stugrade')
            theclass = int(re.findall("\d+", theclass)[0])
            print stugrade
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                
                
                all_class = Inclass.objects.filter(theclass_id = classid)[0]
                thtable = all_class.thtable
                thgrouptable = all_class.thgrouptable
                all_group = Group.objects.filter(course_id = classid)
                for s in all_group:
                    if groupnum < s.groupid:
                        groupnum = s.groupid
                stusum = len(all_group)
                
                count = 0
                if thtable == 1:
                    for group in all_group:
                        pregrade = Group.objects.filter(course_id = classid, stu_id = group.stu_id)[0].thmark1
                        Group.objects.filter(course_id = classid, stu_id = group.stu_id).update(thmark1 = pregrade + stugrade[count])
                        count = count + 1
                    if stusum % 2 == 1:
                        count = count + 1
                if thgrouptable == 1:
                    for i in range(1, groupnum+1):
                        thgroup = Group.objects.filter(course_id = classid, groupid = i)
                        for thg in thgroup:
                            Group.objects.filter(id = thg.id).update(thmark2 = thg.thmark2 + stugrade[count])
                        count = count + 1
                return JsonResponse({"rr":1})
          
def showgradetable(request):
    stuid = []#学生编号
    stuname = []#学生姓名
    grouptogroup = []
    temp = []
    ingroup = []
    theself = []
    other = []
    th = []
    thgroup = []
    flag = 0
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                all_group = Group.objects.filter(course_id = classid)
                for group in all_group:
                    stuid.append(group.stu_id)
                    stuname.append(User.objects.filter(id = group.stu_id)[0].username)
                    temp.append(group.stumark1.count('A'))
                    temp.append(group.stumark1.count('B'))
                    temp.append(group.stumark1.count('C'))
                    temp.append(group.stumark1.count('D'))
                    grouptogroup.append(temp)
                    temp = []
                    temp.append(group.stumark2.count('A'))
                    temp.append(group.stumark2.count('B'))
                    temp.append(group.stumark2.count('C'))
                    temp.append(group.stumark2.count('D'))
                    ingroup.append(temp)
                    temp = []
                    temp.append(group.stumark3.count('A'))
                    temp.append(group.stumark3.count('B'))
                    temp.append(group.stumark3.count('C'))
                    temp.append(group.stumark3.count('D'))
                    theself.append(temp)
                    temp = []
                    temp.append(group.stumark4.count('A'))
                    temp.append(group.stumark4.count('B'))
                    temp.append(group.stumark4.count('C'))
                    temp.append(group.stumark4.count('D'))
                    other.append(temp)
                    temp = []
                    temp.append(group.thmark1.count('A'))
                    temp.append(group.thmark1.count('B'))
                    temp.append(group.thmark1.count('C'))
                    temp.append(group.thmark1.count('D'))
                    th.append(temp)
                    temp = []
                    temp.append(group.thmark2.count('A'))
                    temp.append(group.thmark2.count('B'))
                    temp.append(group.thmark2.count('C'))
                    temp.append(group.thmark2.count('D'))
                    thgroup.append(temp)
                    
                    if group.classmark == '':
                        flag = 1
                content = {"grouptogroup":grouptogroup, "ingroup":ingroup, "theself":theself, "other":other,\
                           "th":th, "thgroup":thgroup, "sum":len(stuid), "stuid":stuid, "stuname":stuname, "flag":flag}
                return JsonResponse(content)

def isparty(request):
    stuid = []
    stuname = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                print classid
                all_class = Group.objects.filter(course_id = classid)
                for cls in all_class:
                    stuid.append(cls.stu_id)
                    stuname.append(User.objects.filter(id = cls.stu_id)[0].username)
                content = {"stuid":stuid, "stuname":stuname, "sum":len(stuid)}
                return JsonResponse(content)

def showisparty(request):
    stuid = []
    stuname = []
    isparty = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                print classid
                all_class = Group.objects.filter(course_id = classid)
                for cls in all_class:
                    stuid.append(cls.stu_id)
                    stuname.append(User.objects.filter(id = cls.stu_id)[0].username)
                    isparty.append(cls.isaval)
                content = {"stuid":stuid, "stuname":stuname, "sum":len(stuid), "isparty":isparty}
                return JsonResponse(content)
                  
def savepartytable(request):
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            iscome = request.POST.getlist('iscome')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                print classid
                all_class = Group.objects.filter(course_id = classid)
                for i in range(1, len(all_class)+1):
                    if str(iscome[i]) == 'true':
                        Group.objects.filter(id = all_class[i-1].id).update(isaval = 1)
                    else:
                        Group.objects.filter(id = all_class[i-1].id).update(isaval = 0)
                
                return JsonResponse({"rr":1})
            
            
def class_mark(request):
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            grade = request.POST.getlist('grade')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                all_group = Group.objects.filter(course_id = classid)
                for i in range(0, len(all_group)):
                    Group.objects.filter(id = all_group[i].id).update(classmark = grade[i])
                return JsonResponse({"rr":1})
            
def sendgradetable(request):
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            
            time.localtime(time.time())
            thedatetime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))#获取当前时间
            all_course = All_class.objects.filter(course_id = courseid, type = '小班')
            for course in all_course:
                if str(course.starttime) < thedatetime:
                    All_class.objects.filter(id = course.id).update(isaval = 1)
            return JsonResponse({"rr":1})
        
def randgs(request):
    myclass = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            all_cls = All_class.objects.filter(course_id = int(courseid))
            num = len(all_cls)
            for cls in all_cls:
                myclass.append(cls.number)
    content = {"num":num, "myclass":myclass}
    return JsonResponse(content)

def startrandgroup(request):
    groupnum = 0
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                all_group = Group.objects.filter(course_id = classid)
                for group in all_group:
                    if groupnum < group.groupid:
                        groupnum = group.groupid
                return JsonResponse({"allgroup":range(1, groupnum+1)})
            
def startrandstu(request):
    allstudent = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                all_group = Group.objects.filter(course_id = classid)
                for group in all_group:
                    stuname = User.objects.filter(id = group.stu_id)[0].username
                    allstudent.append(stuname)
                return JsonResponse({"allstudent":allstudent})
            

def check_existing(request):
    return HttpResponse('0')

def upload_image(request):
    reqfile = request.FILES['Filedata']
    classid = request.POST.get('classid')
    theid = request.user.id
    add = all_file(
                   file = reqfile,
                   theclass_id = classid,
                   theuser_id = theid,
                   )
    add.save()
    return HttpResponse(1)

def theafile(request):
    files = []
    filesname = []
    stuname = []
    stuurl = []
    stufilename = []
    stugroup = []
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            theuser = request.user.id
            myclass  = All_class.objects.filter(number = theclass, course_id = int(courseid))
            if myclass:
                classid = myclass[0].id
                allfile = all_file.objects.filter(theclass_id = classid)
                print len(allfile)
                for f in allfile:
                    if f.theuser_id == theuser:
                        files.append(f.file.url)
                        s = f.file.url.split('/')[len(f.file.url.split('/')) - 1]
                        urllib.unquote(str(s)).decode('utf8') 
                        filesname.append(urllib.unquote(str(s)).decode('utf8'))
                    else:
                        gg = Group.objects.filter(stu_id = f.theuser_id, course_id = classid)
                        if gg:
                            stuname.append(User.objects.filter(id = f.theuser_id)[0].username)
                            stugroup.append(gg[0].groupid)
                            stuurl.append(f.file.url)
                            s = f.file.url.split('/')[len(f.file.url.split('/')) - 1]
                            urllib.unquote(str(s)).decode('utf8')
                            stufilename.append(urllib.unquote(str(s)).decode('utf8'))
                content = {"files":files, "sum":len(files), "allstufile":len(stuname), "stuname":stuname, "stuurl":stuurl,
                               "filesname":filesname, "stufilename":stufilename, "stugroup":stugroup, "classid":classid}
                print filesname
                return JsonResponse(content)