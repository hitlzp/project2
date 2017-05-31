
window.onload=function(){
      $('.selectpicker').selectpicker();
		mycourse();
		
      };
var course_id = -1;
var theclass = -1;
var theclassid = -1
function mycourse()
{
	document.getElementById("myc").style.display="";//显示
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("thetable").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
	
	var post_data ={
			"cname":1,
			};
			$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/mycourse/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				for(var i = 1; i < mydata["nums"]+1; i ++)
				{
					document.getElementById("haha"+i.toString()).innerHTML ="<li><div class=\"deatil\"><h2>"+mydata["cname"][i-1]+"</h2><a href=\"javascript:void(0)\" onclick =\"choosedcourse("+mydata["courseid"][i-1]+")\">点击进入</a>\
					</div><img src="+mydata["imgs"][i-1]+" width=\"100%\" height=\"120px\"/><div class = \"coursename\">"+mydata["cname"][i-1]+"</div></li>"
				}
				if(mydata["username"] != "")
				{
					document.getElementById("ii1").style.display="none";
					document.getElementById("ii3").innerHTML = mydata["username"];
				}
				},
			});
}
function newcourse()
{
	document.getElementById("myc").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";//隐藏
	document.getElementById("courseadded").style.display="";//显示
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("thetable").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
}

function choosedcourse(event)
{
	document.getElementById("myc").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="";//显示
	course_id = event;
	var post_data ={
		"courseid":event,
	};
	$.ajax({
	type : "POST", //要插入数据，所以是POST协议 
	url : "/teacher/mycourse/checked/", //注意结尾的斜线，否则会出现500错误
	traditional:true,  //加上此项可以传数组
	data : post_data, //JSON数据
	success: function(mydata){
			var str_M = "<div class=\"panel panel-primary\"><div class=\"panel-heading\">小班</div>"+ 
						"<table id = \"wwww\" class=\"table table-bordered table-hover\"><thead><tr class=\"success\">"+
                            "<th>序号</th>"+
                            "<th>小班主题</th>"+  
                            "<th>学时</th>"+ 
                            "<th>容量</th>"+
							"<th>备注</th>"+
							"<th>状态</th></tr></thead>  <tbody> ";
			var str_B = "<div class=\"panel panel-primary\"><div class=\"panel-heading\">大班</div>"+ 
						"<table id = \"wwww\" class=\"table table-bordered table-hover\"><thead><tr class=\"success\">"+
                            "<th>序号</th>"+
                            "<th>大班主题</th>"+ 
                            "<th>学时</th>"+ 
                            "<th>容量</th>"+
							"<th>备注</th>"+
							"<th>状态</th></tr></thead>  <tbody> ";
			for(var i = 0; i < mydata["nums_M"];i++){
				var thecap_M;
				if(mydata["capacity_M"][i] == 0)//若最初课程容量未设置，则默认为不限制
				{
					thecap_M = mydata["choosed_M"][i].toString() + "/";
				}
				else
				{
					thecap_M = mydata["choosed_M"][i].toString() + "/" + mydata["capacity_M"][i].toString();
				}
				str_M = str_M + "<tr><td>"+mydata["number_M"][i]+"</td><td>"+mydata["theme_M"][i]+"</td><td>"+mydata["period_M"][i]+"</td>"+  
                        "<td>"+thecap_M+"</td><td>"+mydata["isnecessary_M"][i]+"</td><td>"+mydata["state_M"][i]+"</td></tr>"
			}
			for(var i = 0; i < mydata["nums_B"];i++){
				var thecap_B;
				if(mydata["capacity_B"][i] == 0)//若最初课程容量未设置，则默认为不限制
				{
					thecap_B = mydata["choosed_B"][i].toString() + "/";
				}
				else
				{
					thecap_B = mydata["choosed_B"][i].toString() + "/" + mydata["capacity_B"][i].toString();
				}
				str_B = str_B + "<tr><td>"+mydata["number_B"][i]+"</td><td>"+mydata["theme_B"][i]+"</td><td>"+mydata["period_B"][i]+"</td>"+  
                        "<td>"+thecap_B+"</td><td>"+mydata["isnecessary_B"][i]+"</td><td>"+mydata["state_B"][i]+"</td></tr>"
			}
			str_B = str_B + "</tbody></table></div>";
			str_M = str_M + "</tbody></table></div>";
			document.getElementById("listmyclass").innerHTML = str_M;
			document.getElementById("listmyclass2").innerHTML = str_B;
			addcheckbox();
			
			document.getElementById("xclass").value = mydata["minMclass"];
			document.getElementById("bclass").value = mydata["minBclass"];
			str_B= "";
			str_M = "";
		},
	});
}

function addcheckbox(){  //为小班表格前添加复选框
	function initTableCheckbox() {  
        var $thr = $('#wwww thead tr');  
        var $checkAllTh = $('<th><input type="checkbox" id="checkAll" name="checkAll" /style = \"display:none\"></th>');  
         /*将全选/反选复选框添加到表头最前，即增加一列*/  
        $thr.prepend($checkAllTh);  
        /*“全选/反选”复选框*/  
        var $checkAll = $thr.find('input');  
        $checkAll.click(function(event){  
        /*将所有行的选中状态设成全选框的选中状态*/ 
        $tbr.find('input').prop('checked',$(this).prop('checked'));  
        /*并调整所有选中行的CSS样式*/  
        if ($(this).prop('checked')) {  
            $tbr.find('input').parent().parent().addClass('warning');  
        } else{  
                $tbr.find('input').parent().parent().removeClass('warning');  
              }  
        /*阻止向上冒泡，以防再次触发点击操作*/  
        event.stopPropagation();  
        });  
        /*点击全选框所在单元格时也触发全选框的点击操作*/  
        $checkAllTh.click(function(){  
        $(this).find('input').click(); 
        });  
        var $tbr = $('#wwww tbody tr');  
        var $checkItemTd = $('<td><input type="checkbox" name="checkItem" /style = \"display:none\"></td>');  
        /*每一行都在最前面插入一个选中复选框的单元格*/  
        $tbr.prepend($checkItemTd);  
        /*点击每一行的选中复选框时*/  
        $tbr.find('input').click(function(event){ 		
		$(this).each(function(){
		var val = $(this).parent().next().text();
		theclass = val;
		document.getElementById("manageclass").click();
		
		});
         /*调整选中行的CSS样式*/  
        $(this).parent().parent().toggleClass('warning');  
        /*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中状态*/  
        $checkAll.prop('checked',$tbr.find('input:checked').length == $tbr.length ? true : false);  
         /*阻止向上冒泡，以防再次触发点击操作*/  
        event.stopPropagation();  
        });  
        /*点击每一行时也触发该行的选中操作*/  
		$tbr.click(function(){  
                    $(this).find('input').click(); 
                });  
        }  
        initTableCheckbox();  
}

function editminclass()
{
	document.getElementById("xclass").disabled= false;
	document.getElementById("bclass").disabled= false;
}

function saveminclass()
{
	document.getElementById("xclass").disabled= true;
	document.getElementById("bclass").disabled= true;
	var minMclass = document.getElementById("xclass").value;
	var minBclass = document.getElementById("bclass").value;
	var post_data ={
			"minMclass":minMclass,
			"minBclass":minBclass,
			"courseid":course_id,
			};
			$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/mycourse/change/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
			}
			});
}

function selecttime()
{
	var sftime = document.getElementById("timeselect").value;
	if(sftime != -1)
	{
		if(sftime == 1)
		{
			document.getElementById("qqq").style.display="none";//隐藏
			document.getElementById("qqq2").style.display="";
		}
		else if(sftime == 0)
		{
			document.getElementById("qqq").style.display="";
			document.getElementById("qqq2").style.display="";
		}
	}
	else
	{
		document.getElementById("qqq").style.display="none";//隐藏
		document.getElementById("qqq2").style.display="none";//隐藏
	}
}


function editclass()
{
	var bx = document.getElementById("bxselect").value;
	var sftime = document.getElementById("timeselect").value;
	var starttime = -1;
	var endtime = -1;
	if(sftime == 1)
	{
		var endtime = document.getElementById("datetimepicker2").value;
	}
	else if(sftime == 0)
	{
		var starttime = document.getElementById("datetimepicker").value;
		var endtime = document.getElementById("datetimepicker2").value;
	}
	else
	{
		document.getElementById("qqq").style.display="none";//隐藏
		document.getElementById("qqq2").style.display="none";//隐藏
	}
	
	var post_data ={
			"isNecessary":bx,
			"isstartnow":sftime,
			"courseid":course_id,
			"starttime":starttime,
			"endtime":endtime,
			"theclass":theclass,
			};
			$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/mycourse/editclass/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				choosedcourse(course_id);
			}
			});
}

function grouping()//学生分组
{
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("myc").style.display="none";
	document.getElementById("groupbox").style.display="";
	document.getElementById("thetable").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
}

				
function selectclass()
{
	course = document.getElementById("selectcourse").value
	var obj_td =  document.getElementById("rtrt");
	$("#rtrt").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}		 
		}
	});
}

function selectclass2()
{
	course = document.getElementById("selectcourse2").value
	var obj_td =  document.getElementById("rtrt2");
	$("#rtrt2").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}		 
		}
	});
}

function selectclass3()
{
	course = document.getElementById("selectcourse3").value
	var obj_td =  document.getElementById("rtrt3");
	$("#rtrt3").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}

			str = "<div style = \"position:absolute;width:100%;top:5%\"><div class=\"panel-group\"><div class=\"panel panel-primary\"></div><table id = \"table10\" class=\"table table-bordered table-hover\"><thead><tr class=\"success\"><th>#</th><th>学生编号</th><th>学生姓名</th>"+
				  "<th>小班（次）</th><th>大班（次）</th>";
			for(var k = 0; k < mydata["classsum"];k++)
			{
				str+="<th>第"+mydata["allminclassnumber"][k].toString()+"讲</th>";
			}
			str+= "</tr></thead><tbody>";
			for(var j = 0;j < mydata["sum"];j++)
			{
				str += "<tr><td>"+(j+1).toString()+"</td><td>"+(mydata["stuid"][j]+10000000).toString()+"</td><td>"+mydata["stuname"][j]+"</td><td>"+mydata["minclassnum"][j].toString()+"</td><td>"+mydata["maxclassnum"][j].toString()+"</td>";
				
				for(var k = 0; k < mydata["classsum"];k++)
				{
					str+="<td>"+mydata["classgrade"][k][j].toString()+"</td>";
				}
				str+="</tr>";
			}
			
			str += "</tbody></table></div></div></div>";
			if(mydata["sum"] == 0)
			{
				str = "";
			}
			document.getElementById("t1").innerHTML = str;
		}
	});
}


function selectclass4()
{
	course = document.getElementById("selectcourse4").value
	var obj_td =  document.getElementById("rtrt4");
	$("#rtrt4").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/largeclass/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}		 
		}
	});
}

function selectclass5()
{
	course = document.getElementById("selectcourse5").value
	var obj_td =  document.getElementById("rtrt5");
	$("#rtrt5").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/largeclass/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}		 
		}
	});
}

function selectclass6()
{
	course = document.getElementById("selectcourse6").value
	var obj_td =  document.getElementById("rtrt6");
	$("#rtrt6").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/rand/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}		 
		}
	});
}

function selectclass7()
{
	course = document.getElementById("selectcourse7").value
	var obj_td =  document.getElementById("rtrt7");
	$("#rtrt7").empty();
	var post_data ={
			"courseid":course,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/group/rand/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			obj_td.options[0]=new Option("请选择");
			for(var i = 0; i < mydata["num"];i++)
			{
				obj_td.options[i+1]=new Option("第"+ mydata["myclass"][i].toString() + "讲");
			}		 
		}
	});
}

function showBclass()
{
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("myc").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("thetable").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="";
	document.getElementById("showallfile").style.display="none";
}

var thecourse = -1;
var grouped = []//这两个保存分组结果
var groupnums = []
var course2 = -1;
var theclass2 = -1;
function fenzu()
{
	course = document.getElementById("selectcourse").value
	theclass = document.getElementById("rtrt").value
	groupnum = document.getElementById("groupnum").value
	
	var post_data ={
			"courseid":course,
			"theclass":theclass,
			"groupnum":groupnum,
			};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/makegroup/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			thecourse = course;
			course2 = course;
			theclass2 = theclass;
			document.getElementById("stunum").innerHTML = mydata["stunum"];
			str = "";
			for(var i = groupnum - 1; i >= 0;i--)
			{
				str += "<div style = \"width:20%;float:left;background-color: #fff;\"><div style = \"width:90%\" class=\"panel panel-primary\"><div class=\"panel-heading\">第"+(i+1).toString()+"组</div><table class=\"table table-bordered"+ "table-hover\"><thead><tr class=\"success\"><th>#</th><th>学生编号</th><th>学生姓名</th></tr></thead>  <tbody>";
				for(var j = 0; j < mydata["group_num"][i];j++)
				{
					str += "<tr><td>"+(j+1).toString()+"</td><td>"+(mydata["groups_id"][i][j]+10000000).toString()+"</td><td>"+mydata["groups_name"][i][j]+"</td></tr>";
				}
				str += "</tbody></table></div></div>";
			}
			document.getElementById("grouped").innerHTML = str;
			
			for(var k = 0; k < groupnum;k++)
			{
				groupnums[k] = mydata["group_num"][k];
			}
			
			var count  = 0;
			for(var m = 0; m < groupnum; m++)
			{
				for(var n = 0; n < groupnums[m];n++)
				{
					grouped[count] = mydata["groups_id"][m][n];
					count++;
				}
			}
			
		}
	});
}

function savefenzu()
{
	if(grouped.length > 0)
	{
		var post_data ={
			"courseid":thecourse,
			"grouped":grouped,
			"groupnums":groupnums,
			"courseid":course2,
			"theclass":theclass2,
			};
		$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/savegroup/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				alert("保存成功");
				scls();
			}
		});
	}
}


function scls()
{
	course = document.getElementById("selectcourse").value
	theclass = document.getElementById("rtrt").value
	var post_data ={
			"courseid":course,
			"theclass":theclass,
			};
		$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/showgroup/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				document.getElementById("stunum").innerHTML = mydata["stunum"];
				str = "";
				for(var i = mydata["rr"] - 1; i >= 0;i--)
				{
					str += "<div style = \"width:20%;float:left;background-color: #fff;\"><div style = \"width:90%\" class=\"panel panel-primary\"><div class=\"panel-heading\">第"+(i+1).toString()+"组</div><table class=\"table table-bordered"+ "table-hover\"><thead><tr class=\"success\"><th>#</th><th>学生编号</th><th>学生姓名</th></tr></thead>  <tbody>";
					for(var j = 0; j < mydata["group_num"][i];j++)
					{
						str += "<tr><td>"+(j+1).toString()+"</td><td>"+(mydata["groups_id"][i][j]+10000000).toString()+"</td><td>"+mydata["groups_name"][i][j]+"</td></tr>";
					}
					str += "</tbody></table></div></div>";
				}
				document.getElementById("grouped").innerHTML = str;
			}
		});
}


function mark()//小班管理
{
	
	
	document.getElementById("myc").style.display="none";//显示
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="";
	document.getElementById("thetable").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
}

function mark2()//大班管理
{
	
	
	document.getElementById("myc").style.display="none";//显示
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("thetable").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
}

function maketable()//设计评分表格
{
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("myc").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("thetable").style.display="";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
	
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/showmodel/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		success: function(mydata){
			str = "";
			for(var i = 0; i < mydata["num"];i++)
			{
				str+="<a style = \"font-family: \'微软雅黑\'; font-size: 12px;color: #333;\" href=\"javascript:void(0)\""+
				"onclick = \"showpreable("+mydata["table2"][i].toString()+")\">• "+mydata["tablename"][i]+"</a><br></br>";
			}
			document.getElementById("showallpretable").innerHTML = str;
		}
	});
}

function showpreable(event)
{
	var post_data ={
			"tableid":event,
			};
		$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/showgrouptable/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				document.getElementById("pretable").innerHTML = mydata["table2"];
			}
		});
}

function confirmtsth(event)
{
	groupsum = prompt("请输入小组数:","5");
	if (groupsum != null){
	thetables(event, groupsum - 1);
	}
}

function confirmtsth2(event)
{
	groupnum = prompt("请输入小组人数:","7");
	if (groupnum != null){
	thetables(event, groupnum - 1);
	}
}

function confirmtsth3(event)
{
	tablename = prompt("表格名称:","");
	if (tablename != null){
	thetables(event, tablename);
	}
}

str9 = "";
tablerand = "";
var groupsum = 0;
var groupnum = 0; 
function thetables(event, event2)
{
	if (event == 1)
	{
		tablerand += event.toString();
		str9+="<table border=\"1\" bordercolor=\"black\" width=\"95%\" cellspacing=\"0\" cellpadding=\"5\">" +
				"<tr><td style = \"width:20%\" rowspan="+(event2+1).toString()+" contentEditable=\"true\">环节名称</td><td style = \"width:20%\" rowspan="+(event2+1).toString()+
				" contentEditable=true>评价参考</td><td style = \"width:20%\">学生编号</td><td style = \"width:20%\">评价结果</td></tr>";
		for(var i = 0; i < parseInt(event2); i++)
		{
			str9+="<tr><td contentEditable=true><input type=\'text\' style = \"width:100%\" onkeyup=\"(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,\'\');}).call(this)\" onblur=\"this.v();\"></td><td><select style = \"width:100%\"><option value =1>A</option>"+
				"<option value =2>B</option><option value =3>C</option><option value =4>D</option></select></td> </tr> "
		}
		str9 += "</table><br></br>"; 
		groupnum = event2;
		
	}
	if(event == 2)
	{
		tablerand += event.toString();
		str9+="<table border=\"1\" bordercolor=\"black\" width=\"95%\" cellspacing=\"0\" cellpadding=\"5\">" +
				"<tr><td style = \"width:20%\" rowspan="+(event2+1).toString()+" contentEditable=\"true\">环节名称</td><td style = \"width:20%\" rowspan="+(event2+1).toString()+
				" contentEditable=true>评价参考</td><td style = \"width:20%\">小组编号</td><td style = \"width:20%\">评价结果</td></tr>";
		for(var i = 0; i < parseInt(event2); i++)
		{
			str9+="<tr><td contentEditable=true><input type=\'text\' style = \"width:100%\" onkeyup=\"(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,\'\');}).call(this)\" onblur=\"this.v();\"></td><td><select style = \"width:100%\"><option value =1>A</option>"+
				"<option value =2>B</option><option value =3>C</option><option value =4>D</option></select></td> </tr> "
		}
		str9 += "</table><br></br>"; 
		groupsum = event2;
	}
	if(event == 3)
	{
		tablerand += event.toString();
		str9+="<table border=\"1\" bordercolor=\"black\" width=\"95%\" cellspacing=\"0\" cellpadding=\"5\">" +
				"<tr><td style = \"width:30%\" rowspan= 2 contentEditable=\"true\">环节名称</td><td style = \"width:30%\">自评得分</td><td style = \"width:30%\" rowspan= 2 contentEditable=\"true\">备注内容</td></tr>";

		str9+="<tr><td><select style = \"width:100%\"><option value =1>A</option>"+
			"<option value =2>B</option><option value =3>C</option><option value =4>D</option></select></td> </tr> "
		str9 += "</table><br></br>";
	}
	if(event == 4)
	{
		tablerand += event.toString();
		str9+="<table border=\"1\" bordercolor=\"black\" width=\"95%\" cellspacing=\"0\" cellpadding=\"5\">" +
				"<tr><td style = \"width:20%\" rowspan=2 contentEditable=\"true\">环节名称</td><td style = \"width:20%\" rowspan=2"+
				" contentEditable=true>评价参考</td><td style = \"width:20%\">学生编号</td><td style = \"width:20%\">评价结果</td></tr>";
		for(var i = 0; i < 1; i++)
		{
			str9+="<tr><td contentEditable=true><input type=\'text\' style = \"width:100%\" onkeyup=\"(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,\'\');}).call(this)\" onblur=\"this.v();\"></td><td><select style = \"width:100%\"><option value =1>A</option>"+
				"<option value =2>B</option><option value =3>C</option><option value =4>D</option></select></td> </tr> "
		}
		str9 += "</table><br></br>";
	}
	
	if(event == 5)
	{
		course = document.getElementById("pretable").innerHTML
		var post_data ={
			"mytable":course,
			"tablename":event2,
			"tablerand":tablerand,
			"groupsum":groupsum,
			"groupnum":groupnum,
			};
		$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/stutable/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				maketable();
			}
		});
	}
	if(event == 0)
	{
		tablerand = "";
		str9 = "";
	}
	document.getElementById("pretable").innerHTML = str9;
}


function startmark()
{
	course = document.getElementById("selectcourse2").value
	theclass = document.getElementById("rtrt2").value
	tableid = document.getElementById("choosedtable").value
	thmark = document.getElementById("checkbox1").checked
	thgroupmark = document.getElementById("checkbox2").checked
	var post_data ={
			"courseid":course,
			"theclass":theclass,
			"tableid":tableid,
			"thmark":thmark,
			"thgroupmark":thgroupmark,
			};
		$.ajax({
			type : "POST", //要插入数据，所以是POST协议 
			url : "/teacher/showteatable/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				str3 = "";
				str = "<table border=1 bordercolor=black width=95% cellspacing=0 cellpadding=5><tbody><tr><td>序号</td><td>学生编号</td><td>学生姓名</td>"+
						"<td>评价结果</td><td>序号</td><td>学生编号</td><td>学生姓名</td><td>评价结果</td></tr>";
				if (mydata["stunum"] % 2 != 0)//学生数为奇数时显示的问题
				{
					mydata["stuid"][mydata["stunum"]] = "";
					mydata["stuname"][mydata["stunum"]] = "";
				}
				for(var i = 0; i < mydata["stunum"];)
				{
					str+= "<tr><td>"+(i+1).toString()+"</td><td>"+(mydata["stuid"][i] + 10000000).toString()+"</td><td>"+mydata["stuname"][i]+"</td><td><select style=\"width:100%\"><option value=-1 selected=\"\"></option><option value=1>A</option><option value=2>B</option><option value=3>C</option><option value=4>D</option></select></td><td>"+(i+2).toString()+"</td><td>"+(mydata["stuid"][i+1] + 10000000).toString()+"</td><td>"+mydata["stuname"][i+1]+"</td><td><select style=\"width:100%\"><option value=-1 selected=\"\"></option><option value=1>A</option><option value=2>B</option><option value=3>C</option><option value=4>D</option></select></td></tr>";
					i+=2;
				}
				str+="</tbody></table><br></br>";
				
				str2 = "<table border=1 bordercolor=black width=95% cellspacing=0 cellpadding=5><tbody><tr><td>小组编号</td>"+
						"<td>评价结果</td><td>小组编号</td><td>评价结果</td></tr>";
				for(var i = 1; i < mydata["groupnum"]+1;)
				{
					str2+= "<tr><td>"+(i).toString()+"</td><td><select style=\"width:100%\"><option value=-1 selected=\"\"></option><option value=1>A</option><option value=2>B</option><option value=3>C</option><option value=4>D</option></select></td><td>"+
					(i+1).toString()+"</td><td><select style=\"width:100%\"><option value=-1 selected=\"\"></option><option value=1>A</option><option value=2>B</option><option value=3>C</option><option value=4>D</option></select></td></tr>";
					i+=2;
				}
				str2+="</tbody></table><br></br>";
				if(document.getElementById("checkbox1").checked){
					str3 += str;
				}
				if(document.getElementById("checkbox2").checked){
					str3 += str2;
				}
				document.getElementById("pretable2").innerHTML = str3;
				
				if(mydata["rr"] == 1)
				{
					alert("开始");
					document.getElementById("sg").disabled= true;
				}
			}
		});
	
}

function endmark()
{
	course = document.getElementById("selectcourse2").value
	theclass = document.getElementById("rtrt2").value
	
	var stugrade = []
	$("#pretable2 select option:selected").each(function () {
		stugrade.push(this.text)
	})
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		"stugrade":stugrade,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/student/endmark/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			if (mydata["rr"] == 1)
			{
				document.getElementById("eg").disabled= true;
			}
		}
	});
}


function thegrade()
{
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("myc").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("thetable").style.display="none";
	document.getElementById("mygrade").style.display="";
	document.getElementById("subm2").style.display="none";
	document.getElementById("stuavail").style.display="";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="none";
	selectclass3();
}

function selclas()
{
	course = document.getElementById("selectcourse3").value
	theclass = document.getElementById("rtrt3").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/student/showgradetable/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			
			
			document.getElementById("subm2").style.display="";
			document.getElementById("stuavail").style.display="none";
			if(mydata["flag"] == 0)
			{
				document.getElementById("subm2").disabled= true;
			}
			str = "<div style = \"position:absolute;width:100%;top:5%\"><div class=\"panel-group\"><div class=\"panel panel-primary\"></div><table id = \"table20\" class=\"table table-bordered table-hover\"><thead><tr class=\"success\">  <th rowspan = 2>#</th>  <th rowspan = 2>学生编号</th> <th rowspan = 2>学生姓名</th><th colspan = 4>组内互评</th><th colspan = 4>组间互评</th><th colspan = 4>学生自评</th><th colspan = 4>其他评价</th><th colspan = 4>教师评价</th><th colspan = 4>教师组评</th><th rowspan = 2>教师总评</th> </tr><tr class=\"success\"><td>A</td>  <td>B</td>  <td>C</td>  <td>D</td><td>A</td><td>B</td><td>C</td><td>D</td><td>A</td><td>B</td><td>C</td><td>D</td><td>A</td><td>B</td><td>C</td><td>D</td><td>A</td><td>B</td><td>C</td><td>D</td><td>A</td><td>B</td><td>C</td><td>D</td></tr></thead><tbody>";
			
			for(var i = 0; i < mydata["sum"];i++)
			{
				str += "<tr>"
				str += "<td>"+(i+1).toString()+"</td>"
				str += "<td>"+(mydata["stuid"][i]+10000000).toString()+"</td>"
				str += "<td>"+mydata["stuname"][i]+"</td>"
				for(var j = 0; j < 4; j++)
				{
					if(mydata["grouptogroup"][i][j] != 0)
					{
						str += "<td>"+mydata["grouptogroup"][i][j]+"</td>"
					}
					else{
						str += "<td></td>"
					}
				}
				for(var j = 0; j < 4; j++)
				{
					if(mydata["ingroup"][i][j] != 0)
					{
						str += "<td>"+mydata["ingroup"][i][j]+"</td>"
					}
					else{
						str += "<td></td>"
					}
				}
				for(var j = 0; j < 4; j++)
				{
					if(mydata["theself"][i][j] != 0)
					{
						str += "<td>"+mydata["theself"][i][j]+"</td>"
					}
					else{
						str += "<td></td>"
					}
				}
				for(var j = 0; j < 4; j++)
				{
					if(mydata["other"][i][j] != 0)
					{
						str += "<td>"+mydata["other"][i][j]+"</td>"
					}
					else{
						str += "<td></td>"
					}
				}
				for(var j = 0; j < 4; j++)
				{
					if(mydata["th"][i][j] != 0)
					{
						str += "<td>"+mydata["th"][i][j]+"</td>"
					}
					else{
						str += "<td></td>"
					}
				}
				for(var j = 0; j < 4; j++)
				{
					if(mydata["thgroup"][i][j] != 0)
					{
						str += "<td>"+mydata["thgroup"][i][j]+"</td>"
					}
					else{
						str += "<td></td>"
					}
				}
				str += "<td><select style = \"width:100%\"><option value =-1></option><option value =1>A</option><option value =2>B</option><option value =3>C</option><option value =4>D</option></select></td>";
				str += "</tr>"
			}
			str += "</tbody></table></div></div></div>";
			if(mydata["sum"] == 0)
			{
				str = "";
			}
			document.getElementById("t1").innerHTML = str;
		}
	});
}


var iscome = new Array(); 
function selclas2()
{
	course = document.getElementById("selectcourse4").value
	theclass = document.getElementById("rtrt4").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/showpartytable/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			thgroupmark = document.getElementById("checkbox3").checked
			
			str = "<div style = \"position:absolute;width:100%;top:5%\"><div class=\"panel-group\"><div class=\"panel panel-primary\"></div><table id = \"table30\" class=\"table table-bordered table-hover\"><thead><tr class=\"success\"><th>#</th><th>学生编号</th><th>学生姓名</th><th></th></tr></thead><tbody>";
			
			if(thgroupmark == true)
			{
				for(var j = 0;j < mydata["sum"];j++)
				{
					str += "<tr><td>"+(j+1).toString()+"</td><td>"+(mydata["stuid"][j]+10000000).toString()+"</td><td>"+mydata["stuname"][j]+"</td><td><a class = \"glyphicon glyphicon-ok\" id = \"qq"+(j+1).toString()+"\"></a></td></tr>";
					iscome[j+1] = thgroupmark;
				}
			}
			else
			{
				for(var j = 0;j < mydata["sum"];j++)
				{
					str += "<tr><td>"+(j+1).toString()+"</td><td>"+(mydata["stuid"][j]+10000000).toString()+"</td><td>"+mydata["stuname"][j]+"</td><td><a class = \"glyphicon glyphicon-remove\" id = \"qq"+(j+1).toString()+"\"></a></td></tr>";
					iscome[j+1] = thgroupmark;
				}
			}
			
			
			str += "</tbody></table></div></div></div>";
			if(mydata["sum"] == 0)
			{
				str = "";
			}
			document.getElementById("t2").innerHTML = str;
			
			addcheckbox2();
		}
	});
}

function addcheckbox2(){  //为小班表格前添加复选框
	function initTableCheckbox() {  
        var $thr = $('#table30 thead tr');  
        var $checkAllTh = $('<th><input type="checkbox" id="checkAll" name="checkAll" /style = \"display:none;width:1%\"></th>');  
         /*将全选/反选复选框添加到表头最前，即增加一列*/  
        $thr.prepend($checkAllTh);  
        /*“全选/反选”复选框*/  
        var $checkAll = $thr.find('input');  
        $checkAll.click(function(event){  
        /*将所有行的选中状态设成全选框的选中状态*/ 
        $tbr.find('input').prop('checked',$(this).prop('checked'));  
        /*并调整所有选中行的CSS样式*/  
        if ($(this).prop('checked')) {  
            $tbr.find('input').parent().parent().addClass('warning');  
        } else{  
                $tbr.find('input').parent().parent().removeClass('warning');  
              }  
        /*阻止向上冒泡，以防再次触发点击操作*/  
        event.stopPropagation();  
        });  
        /*点击全选框所在单元格时也触发全选框的点击操作*/  
        $checkAllTh.click(function(){  
        $(this).find('input').click(); 
        });  
        var $tbr = $('#table30 tbody tr');  
        var $checkItemTd = $('<td><input type="checkbox" name="checkItem" /style = \"display:none;width:1%\"></td>');  
        /*每一行都在最前面插入一个选中复选框的单元格*/  
        $tbr.prepend($checkItemTd);  
        /*点击每一行的选中复选框时*/  
        $tbr.find('input').click(function(event){ 		
		$(this).each(function(){
		var val = $(this).parent().next().text();
		theclass = val;
		if(iscome[val] == true)
		{
			iscome[val] = false;
			document.getElementById("qq"+(val).toString()).className = "glyphicon glyphicon-remove";
		}
		else
		{
			iscome[val] = true;
			document.getElementById("qq"+(val).toString()).className = "glyphicon glyphicon-ok";
		}
		});
         /*调整选中行的CSS样式*/  
        $(this).parent().parent().toggleClass('warning');  
        /*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中状态*/  
        $checkAll.prop('checked',$tbr.find('input:checked').length == $tbr.length ? true : false);  
         /*阻止向上冒泡，以防再次触发点击操作*/  
        event.stopPropagation();  
        });  
        /*点击每一行时也触发该行的选中操作*/  
		$tbr.click(function(){  
                    $(this).find('input').click(); 
                });  
        }  
        initTableCheckbox();  
}

function changetype()
{
	thgroupmark = document.getElementById("checkbox3").checked
	selclas2();
}

function selclas3()
{
	course = document.getElementById("selectcourse5").value
	theclass = document.getElementById("rtrt5").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/showpartytable2/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			
			str = "<div style = \"position:absolute;width:100%;top:5%\"><div class=\"panel-group\"><div class=\"panel panel-primary\"></div><table  class=\"table table-bordered table-hover\"><thead><tr class=\"success\"><th>#</th><th>学生编号</th><th>学生姓名</th><th>出席情况</th></tr></thead><tbody>";
			
			for(var j = 0;j < mydata["sum"];j++)
			{
				str += "<tr><td>"+(j+1).toString()+"</td><td>"+(mydata["stuid"][j]+10000000).toString()+"</td><td>"+mydata["stuname"][j]+"</td>";
				if (mydata["isparty"][j] == 1)
				{
					str+= "<td><a class = \"glyphicon glyphicon-ok\" ></a></td>";
				}
				str += "</tr>";
			}
			
			str += "</tbody></table></div></div></div>";
			if(mydata["sum"] == 0)
			{
				str = "";
			}
			document.getElementById("t3").innerHTML = str;
		}
	});
}

function saveiscome()
{
	course = document.getElementById("selectcourse4").value
	theclass = document.getElementById("rtrt4").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		"iscome":iscome,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/savepartytable/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			alert("保存成功");
		}
	});
}

function submitgrade2()
{
	
	course = document.getElementById("selectcourse3").value
	theclass = document.getElementById("rtrt3").value
	
	var grade = []
	$("#t1 select option:selected").each(function () {
		grade.push(this.text)
	})
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		"grade":grade,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/classmark/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			if(mydata["rr"] == 1)
			{
				alert("评分完成");
			}
		}
	});
}

function exporttable()
{
	if(document.getElementById("table10"))
	{
		$("#table10").table2excel({
		  // 不被导出的表格行的CSS class类
		  exclude: ".noExl",
		  // 导出的Excel文档的名称
		  name: "Excel Document Name",
		  // Excel文件的名称
		  filename: "成绩单",
		  exclude_inputs:false
		});
	}
	
	else if(document.getElementById("table20"))
	{
		$("#table20").table2excel({
		  // 不被导出的表格行的CSS class类
		  exclude: ".noExl",
		  // 导出的Excel文档的名称
		  name: "Excel Document Name",
		  // Excel文件的名称
		  filename: "成绩单",
		  exclude_inputs:false
		});
	}
}

function sendtable()
{
	course = document.getElementById("selectcourse3").value
	var post_data ={
		"courseid":course,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/sendgradetable/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			if(mydata["rr"] == 1)
			{
				alert("成绩单已发布");
			}
		}
	});
}

function randgroup()
{
	document.getElementById("ppp").className = "active";
	document.getElementById("ppp2").className = "";
}

function randstu()
{
	document.getElementById("ppp").className = "";
	document.getElementById("ppp2").className = "active";
}

var alldataarr = new Array();
var num = alldataarr.length-1
var timer
function startrand()
{
	course = document.getElementById("selectcourse6").value
	theclass = document.getElementById("rtrt6").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	if(document.getElementById("ppp").className == "active")
	{
		$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/startrandgroup/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
				alldataarr = []
				for(var i = 0; i < mydata["allgroup"].length;i++)
				{
					alldataarr.push(mydata["allgroup"][i])
				}
				num = alldataarr.length-1;
				start();
		}
		});
	}
	else
	{
		$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/startrandstu/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
				alldataarr = []
				for(var i = 0; i < mydata["allstudent"].length;i++)
				{
					alldataarr.push(mydata["allstudent"][i])
				}
				num = alldataarr.length-1;
				start();
			}
		});
	}
}

function endrand()
{
	clearInterval(timer);
}

function change(){
    document.getElementById("oknum").value = alldataarr[GetRnd(0,num)];
}

function start(){
    clearInterval(timer);
    timer = setInterval('change()',50);    //50（毫秒）为变换间隔，越小变换的越快
}

function GetRnd(min,max){
    return parseInt(Math.random()*(max-min+1));
}

function showFile()
{
	document.getElementById("mma").click();
}

function all_file()
{
	document.getElementById("courseadded").style.display="none";//隐藏
	document.getElementById("thisclass").style.display="none";
	document.getElementById("myc").style.display="none";
	document.getElementById("groupbox").style.display="none";
	document.getElementById("ggrade").style.display="none";
	document.getElementById("thetable").style.display="none";
	document.getElementById("mygrade").style.display="none";
	document.getElementById("subm2").style.display="none";
	document.getElementById("stuavail").style.display="";
	document.getElementById("largeclass").style.display="none";
	document.getElementById("showlargeclass").style.display="none";
	document.getElementById("showallfile").style.display="";
	senfile();
	course = document.getElementById("selectcourse7").value
	theclass = document.getElementById("rtrt7").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/teacher/thfile/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			str = "<div style = \"width: 100%;float: left;height: 7%;background: #61e0e0;text-align: center;\"><a style = \"font-size:25px\">教师分享</a></div><div style = \"width: 100%;float: left;height: 7%;\">";
			
			for(var k = 0; k < mydata["sum"];k++)
			{
				str+= "<a style = \"float:left;width:100%;font-size:15px\" href = \""+mydata["files"][k]+"\">"+mydata["filesname"][k]+"</a>";
			}
			str += "</div>";
			
			str += "<div style = \"width: 100%;float: left;height: 7%;background: #61e0e0;text-align: center;\"><a style = \"font-size:25px\">学生展示</a></div><div style = \"width: 100%;float: left;height: 7%;\">";
			for(var i = 0; i < mydata["allstufile"]; i++)
			{
				str+="<a style = \"float:left;width:80%;font-size:15px\" href = \""+mydata["stuurl"][i]+"\">"+mydata["stufilename"][i]+"</a><a style = \"float:left;width:9%\">"+mydata["stuname"][i]+"</a><a style = \"float:left;width:9%\">第"+mydata["stugroup"][i]+"组</a>";
			}
			str += "</div>";
			document.getElementById("filelist").innerHTML = str;
			theclassid = mydata["classid"]
			senfile();
		}
	});
}

function senfile(){
            //批量上传按钮
            $('#id_upload').uploadify ({
                'swf'		: '/static/js/uploadify.swf',
                'uploader' 	: '/upload_image/',
                'cancelImage' : '/static/css/cancel.png',
                'buttonClass' : 'btn',
                'checkExisting' : '/check_existing/',
				'formData'      : {'classid':theclassid},  
                'removeCompleted': true,
                'fileTypeExts'   : '*',
                'multi'		: true,
                'auto'    : true,
                'buttonText': '',
                'onUploadSuccess' : function (file, data, response) {
                    all_file();
                }
            });
        }