# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.contrib.auth.models import User
from thapp.models import Course, All_class, Group, Stutable, Inclass
from django.contrib import auth
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from stuapp.models import Stucourse
# Create your views here.
import time
import re

def main_s(request):#学生主页
    c = "您还未登陆"
    if request.user.id:
        stu = User.objects.filter(id = request.user.id)[0]
        c = stu.username
        if stu.first_name == 's':
            return HttpResponseRedirect("/student/main/")
    if request.POST:
        post = request.POST
        if post["to"] == 'log':
            if login_s(request) == 1:
                return HttpResponseRedirect("/student/main/")
        elif post["to"] == "reg":
            reg_s(request)
    
    content = {'user':c}
    return render_to_response("login.html",content)

def reg_s(request):
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
                                        first_name = 's',\
                                       )
            new_user.save()
            
def login_s(request):
    if request.POST:
        post = request.POST
        username = post["username"]
        password = post["p"]
        user = auth.authenticate(username=username, password=password)
        if (user is not None) and (user.first_name == 's'):
            if user.is_active:
                auth.login(request, user)
                return 1
    return 0
            
def logout_s(request):#注销
    auth.logout(request)
    return HttpResponseRedirect("/student/login/")

def student_main(request):
    all_course = []
    imgs = Course.objects.all()
    all_cour = Stucourse.objects.filter(stu_id = request.user.id)
    for cour in all_cour:
        course = Course.objects.filter(id = cour.course_id)[0]
        all_course.append(course)
    content = {
        'imgs':imgs,
        "all_course":all_course,
    }
    return render_to_response("stumain.html", content)

def listall(request):
    temp = []
    all_course = []
    imgs = []
    cname = []
    thname = []
    courseid = []
    stuid = request.user.id
    c = Stucourse.objects.filter(stu_id = stuid)
    for t in c:
        temp.append(t.course_id)
    ac = Course.objects.all()
    for tt in ac:
        if tt.id not in temp:
            all_course.append(tt)
    for course in all_course:
        imgs.append(course.img.url)
        cname.append(course.cname)
        thname.append(course.thname)
        courseid.append(course.id)
    num = len(cname)
    content = {"imgs":imgs,"cname":cname,"thname":thname,"num":num, "courseid":courseid}
    return JsonResponse(content)

def stuaddcourse(request):
    if request.POST:
        if request.is_ajax():
            stuid = request.user.id
            courseid = request.POST.get('courseid')
            addcourse = Stucourse(
                                  course_id = courseid,
                                  stu_id = stuid,
                                  )
            addcourse.save()
            content = {"rr":1}
            return JsonResponse(content)

def listmycourse(request):
    imgs = []
    cname = []
    thname = []
    courseid = []
    stuid = request.user.id
    all_course = Stucourse.objects.filter(stu_id = stuid)
    for course in all_course:
        cour = Course.objects.filter(id = course.course_id)[0]
        imgs.append(cour.img.url)
        cname.append(cour.cname)
        thname.append(cour.thname)
        courseid.append(cour.id)
    num = len(cname)
    content = {"imgs":imgs,"cname":cname,"thname":thname,"num":num, "courseid":courseid}
    return JsonResponse(content)

def studelecourse(request):
    if request.POST:
        if request.is_ajax():
            stuid = request.user.id
            courseid = request.POST.get('courseid')
            Stucourse.objects.filter(course_id = courseid, stu_id = stuid,).delete()
            content = {"rr":1}
            return JsonResponse(content)
    
def myclass(request):
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
            stuid = request.user.id
            courseid = request.POST.get('courseid')
            time.localtime(time.time())
            thedatetime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))#获取当前时间
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
                    if Group.objects.filter(course_id = cls.id, stu_id = stuid):
                        state_M.append('已选')
                    else:
                        if str(cls.starttime) > thedatetime:
                            state_M.append('课程尚未开始')
                            
                        elif str(cls.endtime) < thedatetime:
                            state_M.append('课程已结束')
                           
                        else:
                            state_M.append('选课时间，截止'+str(cls.endtime).split('+')[0])
                        
                elif cls.type == '大班':
                    number_B.append(cls.number)
                    period_B.append(cls.period)
                    capacity_B.append(cls.capacity)
                    theme_B.append(cls.theme)
                    isnecessary_B.append(cls.isnecessary)
                    choosed_B.append(len(Group.objects.filter(course_id = cls.id)))
                    if Group.objects.filter(course_id = cls.id, stu_id = stuid):
                        state_B.append('已选')
                    else:
                        if str(cls.starttime) > thedatetime:
                            state_B.append('课程尚未开始')
                        elif str(cls.endtime) < thedatetime:
                            state_B.append('课程已结束')
                        else:
                            state_B.append('选课时间，截止'+str(cls.endtime))
            nums_M = len(number_M)
            nums_B = len(number_B)
            
            
    content = {"number_M":number_M, "period_M":period_M, "capacity_M":capacity_M, "theme_M":theme_M,
               "number_B":number_B, "period_B":period_B,"capacity_B":capacity_B,"theme_B":theme_B,
               "nums_M":nums_M, "nums_B":nums_B, "minMclass":minMclass, "minBclass":minBclass,
               "isnecessary_M":isnecessary_M, "isnecessary_B":isnecessary_B, "state_M":state_M, "state_B":state_B,
               "choosed_M":choosed_M, "choosed_B":choosed_B}
    return JsonResponse(content)


def select_class(request):
    judge = 0
    if request.POST:
        if request.is_ajax():
            stuid = request.user.id
            classnumber = request.POST.get('number')
            courseid = request.POST.get('courseid')
            all_class = All_class.objects.filter(course_id = courseid, number = classnumber)
            if all_class:
                classid = all_class[0].id
                capacity = all_class[0].capacity
                choosed = len(Group.objects.filter(course_id = classid))
                time.localtime(time.time())
                thedatetime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))#获取当前时间
                
                if str(all_class[0].starttime) > thedatetime or str(all_class[0].endtime) < thedatetime:
                    judge = 2
                else:
                    if capacity == 0 or (choosed < capacity):
                        if not Group.objects.filter(course_id = classid, stu_id = stuid):
                            addclass = Group(
                                                stu_id = stuid,
                                                course_id = classid,
                                                groupid = 0,
                                                )
                            addclass.save()
                        judge = 1
                    else:
                        judge = 0
                content = {"rr":judge}
                return JsonResponse(content)
        
def delete_class(request):
    if request.POST:
        if request.is_ajax():
            stuid = request.user.id
            classnumber = request.POST.get('number')
            courseid = request.POST.get('courseid')
            all_class = All_class.objects.filter(course_id = courseid, number = classnumber)
            if all_class:
                classid = all_class[0].id
                Group.objects.filter(
                                    stu_id = stuid,
                                    course_id = classid,
                                    ).delete()
            content = {"rr":1}
            return JsonResponse(content)
        
def selectclass(request):
    myclass = []
    myclassid = []
    if request.POST:
        if request.is_ajax():
            stuid = request.user.id
            courseid = request.POST.get('courseid')
            all_cls = All_class.objects.filter(course_id = int(courseid), type = '小班')
            my_cls =Group.objects.filter(stu_id = stuid)
            for c in my_cls:
                myclassid.append(c.course_id)
            for cls in all_cls:
                if cls.id in myclassid:
                    myclass.append(cls.number)
            myclass.sort()
            num = len(myclass)
    content = {"num":num, "myclass":myclass}
    return JsonResponse(content)

def showgroupstu(request):
    temp = []
    temp2 = []
    groups_id = []
    groups_name = []
    group_num = []#存储各小组成员数量
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
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

def stumark(request):
    isstart = 0
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            theclass = int(re.findall("\d+", theclass)[0])
            
            all_class = All_class.objects.filter(course_id = int(courseid), number = theclass)
            if all_class:
                classid = all_class[0].id
                all_mark = Inclass.objects.filter(theclass_id = classid)
                if all_mark:
                    isstart = 1
                    tableid = all_mark[len(all_mark) - 1].stutable_id
                    all_table = Stutable.objects.filter(id = tableid)
                    if all_table:
                        table = all_table[0]
                        mytable = table.table
                        tablerand = table.tablerande
                        
                        stuid = request.user.id
                        isparty = Group.objects.filter(course_id = classid, stu_id = stuid)[0].isparty
                        content = {"mytable":mytable, "tablerand":tablerand, "isstart":isstart, "isparty":isparty}
                        return JsonResponse(content)
                    
def stustartmark(request):
    maxnumber = 0#小组数
    if request.POST:
        if request.is_ajax():
            courseid = request.POST.get('courseid')
            theclass = request.POST.get('theclass')
            stunumber = request.POST.getlist('stunumber')
            stugrade = request.POST.getlist('stugrade')
            theclass = int(re.findall("\d+", theclass)[0])
            all_class = All_class.objects.filter(course_id = int(courseid), number = theclass)
            if all_class:
                classid = all_class[0].id    
                astugrade = list(stugrade)
                all_group = Group.objects.filter(course_id = classid)
                for group in all_group:
                    if maxnumber < group.groupid:
                        maxnumber = group.groupid
                if Inclass.objects.filter(theclass_id = classid):
                    tableid = Inclass.objects.filter(theclass_id = classid)[0].stutable_id
                    tablerand = Stutable.objects.filter(id = tableid)[0].tablerande
                    groupsum = Stutable.objects.filter(id = tableid)[0].groupsum#小组数
                    groupnum = Stutable.objects.filter(id = tableid)[0].groupnum#小组人数
                    atablerand = list(tablerand)
                    count = 0
                    count2 = 0
                    for therand in atablerand:
                        if int(therand) == 1:
                            for i in range(0, groupnum):
                                if not stunumber[count] == '':
                                    haha = int(stunumber[count]) - 10000000
                                else:
                                    haha = 0
                                thisstu = Group.objects.filter(course_id = classid, stu_id = haha)
                                if thisstu:
                                    pregrade = thisstu[0].stumark1
                                    Group.objects.filter(course_id = classid, stu_id = int(stunumber[count]) - 10000000).update(stumark1 = pregrade + astugrade[count2])
                                    count = count + 1
                                    count2 = count2 + 1
                                else:
                                    count = count + 1
                                    count2 = count2 + 1
                        
                        elif int(therand) == 2:
                            for i in range(0, groupsum):
                                if not stunumber[count] == '':
                                    haha = int(stunumber[count])
                                else:
                                    haha = 0
                                al_g = Group.objects.filter(course_id = classid, groupid = haha)
                                if al_g:
                                    for g in al_g:
                                        Group.objects.filter(id = g.id).update(stumark2 = g.stumark2 + astugrade[count2])
                                    count = count + 1
                                    count2 = count2 + 1
                                else:
                                    count = count + 1
                                    count2 = count2 + 1
                               
                        elif int(therand) == 3:
                            stuid = request.user.id
                            pregrade = Group.objects.filter(course_id = classid, stu_id = stuid)[0].stumark3
                            Group.objects.filter(course_id = classid, stu_id = stuid).update(stumark3 = pregrade + astugrade[count2])
                            count2 = count2 + 1
                        elif int(therand) == 4:
                            if not stunumber[count] == '':
                                haha = int(stunumber[count])- 10000000
                            else:
                                haha = 0
                            thisstu = Group.objects.filter(course_id = classid, stu_id = haha)
                            if thisstu:
                                pregrade = thisstu[0].stumark4
                                Group.objects.filter(course_id = classid, stu_id = int(stunumber[count]) - 10000000).update(stumark4 = pregrade + astugrade[count2])
                                count = count + 1
                                count2 = count2 + 1
                            else:
                                count = count + 1
                                count2 = count2 + 1
                    
                    stuid = request.user.id
                    Group.objects.filter(course_id = classid, stu_id = stuid).update(isparty = 1)
    return JsonResponse({"rr":1})

def mygrade(request):
    courseid = []
    coursename = []
    classnumber = []
    classgrade = []
    classsum = []
    temp = []
    temp2 = []
    stuid = request.user.id
    all_group = Group.objects.filter(stu_id = stuid)
    for group in all_group:
        all_class = All_class.objects.filter(id = group.course_id)
        if all_class:
            if all_class[0].isaval == 1:
                if not all_class[0].id in courseid:
                    courseid.append(all_class[0].course_id)
    for thcourse in courseid:
        coursename.append(Course.objects.filter(id = thcourse)[0].cname)
        all_class2 = All_class.objects.filter(course_id = thcourse)
        temp = []
        temp2 = []
        for al in all_class2:
            if al.isaval == 1:
                thegrade = Group.objects.filter(stu_id = stuid, course_id = al.id)
                if thegrade:
                    temp2.append(thegrade[0].classmark)
                    temp.append(al.number)
        classsum.append(len(temp))
        classnumber.append(temp)
        classgrade.append(temp2)
    content = {"coursename":coursename, "classnumber":classnumber, "classgrade":classgrade, "sum":len(courseid), "classsum":classsum}
    return JsonResponse(content)