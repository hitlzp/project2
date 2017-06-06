"""project2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from thapp.views import main, logout, Addcourse, Mycourse, CheckedCourse, ChangeCourse,  Editclass,\
Myclas, MGroup, SaveGroup, ShowGroup,Stutenttable, Showmodel,showtable,showteatable,endmark, showgradetable,\
sendgradetable,Myclas2, isparty,savepartytable, showisparty,randgs,startrandgroup,startrandstu,test,\
upload_image,check_existing,theafile,Saveconfig,Myconfig

from stuapp.views import main_s,student_main,stuaddcourse,listmycourse, listall,studelecourse,myclass,select_class,\
delete_class,selectclass,showgroupstu,stumark, stustartmark, mygrade,logout_s,theafile2 
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', main),
    url(r'^logout/$', logout),
    url(r'^test/$', test),
    url(r'^student/logout/$', logout_s),
    url(r'^teacher/addcourse/$', Addcourse),
    url(r'^teacher/mycourse/$', Mycourse),
    url(r'^teacher/mycourse/checked/$', CheckedCourse),
    url(r'^teacher/mycourse/change/$', ChangeCourse),
    url(r'^teacher/mycourse/editclass/$', Editclass),
    url(r'^teacher/group/$', Myclas),
    url(r'^teacher/group/largeclass/$', Myclas2),
    url(r'^teacher/makegroup/$', MGroup),
    url(r'^teacher/savegroup/$', SaveGroup),
    url(r'^teacher/showgroup/$', ShowGroup),
    url(r'^teacher/stutable/$', Stutenttable),
    url(r'^teacher/showmodel/$', Showmodel),
    url(r'^teacher/showgrouptable/$', showtable),
    url(r'^teacher/showteatable/$', showteatable),
    url(r'^teacher/sendgradetable/$', sendgradetable),
    url(r'^teacher/showpartytable/$', isparty),
    url(r'^teacher/savepartytable/$', savepartytable),
    url(r'^teacher/showpartytable2/$', showisparty),
    url(r'^teacher/group/rand/$', randgs),
    url(r'^teacher/startrandgroup/$', startrandgroup),
    url(r'^teacher/startrandstu/$', startrandstu),
    url(r"^check_existing/$",check_existing),
    url(r"^upload_image/$",upload_image),
    url(r"^teacher/thfile/$",theafile),
    url(r"^teacher/saveconfig/$",Saveconfig),
    url(r"^teacher/myconfig/$",Myconfig),
    url(r"^student/thfile/$",theafile2),
    
    url(r'^student/login/$', main_s),
    url(r'^student/main/$', student_main),
    url(r'^student/addcourse/$', stuaddcourse),
    url(r'^student/list/$', listmycourse),
    url(r'^student/listallcourse/$', listall),
    url(r'^student/deletecourse/$', studelecourse),
    url(r'^student/myallclass/$', myclass),
    url(r'^student/sellect/class/$', select_class),
    url(r'^student/delete/class/$', delete_class),
    url(r'^student/group/$', selectclass),
    url(r'^student/showgroup/$', showgroupstu),
    url(r'^student/stumark/$', stumark),
    url(r'^student/student/startmark/$', stustartmark),
    url(r'^student/student/showgradetable/$', showgradetable),
    url(r'^student/student/endmark/$', endmark),
    url(r'^student/mygrade/$', mygrade),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
