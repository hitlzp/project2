var course_id = -1;
var theclassid = -1;

window.onload=function()
{
      showallcourse();
};

function showallcourse()
{
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/listallcourse/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		success: function(mydata){
			str = "";
			for(var i = 0; i < mydata["num"];i++)
			{
				str += "<br></br><div style = \"width:100%;height:100px;border-bottom: 1px solid #c7aeae;\" onclick = \"selectcourse("
				+mydata["courseid"][i]+")\">"+"<img class = \"thepic\" src=\""+mydata["imgs"][i]+"\" /><h2 class = \"ii\">"+mydata["cname"][i]+
				"<h2><br></br>"+"<h2 class = \"ii\">主讲教师：&nbsp"+mydata["thname"][i]+"<h2></div>"
			}
			document.getElementById("thecour2").innerHTML = str;
		}
	});
}

function selectcourse(event)
{
	var txt=  "选择课程";
	var type = 0;//表示选课
	window.wxc.xcConfirm(txt, type, event, window.wxc.xcConfirm.typeEnum.confirm);
}

function mycourse()
{
	document.getElementById("mycour").style.display="";//隐藏
	document.getElementById("all_course").style.display="none";//隐藏
	document.getElementById("mycl").style.display="none";//隐藏
	document.getElementById("groupbox").style.display="none";
	document.getElementById("sg").style.display="none";
	document.getElementById("sg2").style.display="none";
	document.getElementById("dl-menu-button").click();
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/list/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		success: function(mydata){
			str = "";
			for(var i = 0; i < mydata["num"];i++)
			{
				str += "<br></br><div style = \"width:100%;height:100px;border-bottom: 1px solid #c7aeae;\" onclick = \"selectcourse2("
				+mydata["courseid"][i]+")\">"+"<img class = \"thepic\" src=\""+mydata["imgs"][i]+"\" /><h2 class = \"ii\">"+mydata["cname"][i]+
				"<h2><br></br>"+"<h2 class = \"ii\">主讲教师：&nbsp"+mydata["thname"][i]+"<h2></div>"
			}
			document.getElementById("thecour").innerHTML = str;
		}
	});
}

function selectcourse2(event)
{
	var txt = "课程管理";
	type = 1;//表示退选
	window.wxc.xcConfirm(txt, type, event, window.wxc.xcConfirm.typeEnum.confirm);
}

function allclass(event)
{
	document.getElementById("mycl").style.display="";
	document.getElementById("mycour").style.display="none";//隐藏
	document.getElementById("all_course").style.display="none";//隐藏
	document.getElementById("groupbox").style.display="none";
	document.getElementById("sg").style.display="none";
	document.getElementById("sg2").style.display="none";
	var post_data ={
			"courseid":event,
			};
	course_id = event;
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/myallclass/", //注意结尾的斜线，否则会出现500错误
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
			
			mystr = "要求小班课程至少选择"+mydata["minMclass"].toString()+"次；"+"大班课程至少选择"+mydata["minBclass"].toString()+"次";
			document.getElementById("beizhu").innerHTML = mystr;
		}
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
		selclas(theclass);
		
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

function selclas(event)
{
	var txt = "课程管理";
	type = 2;//表示选择小班或大班
	window.wxc.xcConfirm(txt, type, event, window.wxc.xcConfirm.typeEnum.confirm);
}

function showgroup()
{
	document.getElementById("mycour").style.display="none";//隐藏
	document.getElementById("all_course").style.display="none";//隐藏
	document.getElementById("mycl").style.display="none";//隐藏
	document.getElementById("groupbox").style.display="";
	document.getElementById("dl-menu-button").click();
	document.getElementById("sg").style.display="none";
	document.getElementById("sg2").style.display="none";
}

function selectclass()
{
	course = document.getElementById("selectcourse").value
	var obj_td =  document.getElementById("rtrt");
	$("#rtrt").empty();
	var post_data ={
			"courseid":course,
			};
	course_id = course;
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/group/", //注意结尾的斜线，否则会出现500错误
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
			url : "/student/showgroup/", //注意结尾的斜线，否则会出现500错误
			traditional:true,  //加上此项可以传数组
			data : post_data, //JSON数据
			success: function(mydata){
				str = "";
				for(var i = mydata["rr"] - 1; i >= 0;i--)
				{
					str += "<div class = \"grouptable\"><div style = \"width:90%\" class=\"panel panel-primary\"><div class=\"panel-heading\">第"+(i+1).toString()+"组</div><table class=\"table table-bordered"+ "table-hover\"><thead><tr class=\"success\"><th>#</th><th>学生编号</th><th>学生姓名</th></tr></thead>  <tbody>";
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

function stugrade()
{
	course = document.getElementById("selectcourse").value
	theclass = document.getElementById("rtrt").value
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/stumark/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			if(mydata["isstart"] == 1 && mydata["isparty"] == 0)
			{
				document.getElementById("pretable").innerHTML = mydata["mytable"];
				document.getElementById("qqqq").click();
			}
			else
			{
				alert("不在评分时间内");
			}
		}
	});
}

function all_grade()
{
	course = document.getElementById("selectcourse").value
	theclass = document.getElementById("rtrt").value
	var stunumber = []
	var stugrade = []
	$("#pretable input[type=text]").each(function () {
		stunumber.push(this.value);
	})
	
	$("#pretable select option:selected").each(function () {
		stugrade.push(this.text)
	})
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		"stunumber":stunumber,
		"stugrade":stugrade,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/student/startmark/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){

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
		url : "/student/group/", //注意结尾的斜线，否则会出现500错误
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

function mygrade()
{
	document.getElementById("mycour").style.display="none";//隐藏
	document.getElementById("all_course").style.display="none";//隐藏
	document.getElementById("mycl").style.display="none";//隐藏
	document.getElementById("groupbox").style.display="none";
	document.getElementById("sg2").style.display="none";
	document.getElementById("sg").style.display="";
	document.getElementById("dl-menu-button").click();
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/mygrade/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		success: function(mydata){
			str = "<div class=\"panel-group\"><div class=\"panel panel-primary\">";
			for(var i =0; i < mydata["sum"];i++)
			{
				str += "<table class=\"table table-bordered table-hover\"><thead> <tr class=\"success\"><th colspan = 2 style=\"text-align:center\">"+mydata["coursename"][i]+"</th>   </tr></thead><tbody>"
				for (var j =0; j < mydata["classsum"][i];j++)
				{
					str+= "<tr><td style = \"width:50%\">第"+mydata["classnumber"][i][j].toString()+"讲</td><td style = \"width:50%\">"+mydata["classgrade"][i][j].toString()+"</td></tr> ";
				}
				str += "</tbody></table>";
			}
			str+="</div></div>"
			document.getElementById("showmygrade").innerHTML = str;
		}
	});
}

function myfile()
{
	document.getElementById("mma").click();
	document.getElementById("dl-menu-button").click();
}

function all_file()
{
	document.getElementById("mycour").style.display="none";//隐藏
	document.getElementById("all_course").style.display="none";//隐藏
	document.getElementById("mycl").style.display="none";//隐藏
	document.getElementById("groupbox").style.display="none";
	document.getElementById("sg").style.display="none";
	document.getElementById("sg2").style.display="";
	
	senfile();
	course = document.getElementById("selectcourse7").value
	theclass = document.getElementById("rtrt7").value
	
	var post_data ={
		"courseid":course,
		"theclass":theclass,
		};
	$.ajax({
		type : "POST", //要插入数据，所以是POST协议 
		url : "/student/thfile/", //注意结尾的斜线，否则会出现500错误
		traditional:true,  //加上此项可以传数组
		data : post_data, //JSON数据
		success: function(mydata){
			str = "<div style = \"width: 100%;float: left;height: 7%;background: #61e0e0;text-align: center;\"><a style = \"font-size:25px\">教师分享</a></div><div style = \"width: 100%;float: left;height: 7%;\">";
			
			for(var k = 0; k < mydata["sum"];k++)
			{
				str+= "<a style = \"float:left;width:100%;font-size:18px\" href = \""+mydata["files"][k]+"\">"+mydata["filesname"][k]+"</a>";
			}
			str += "</div>";
			
			str += "<div style = \"width: 100%;float: left;height: 7%;background: #61e0e0;text-align: center;\"><a style = \"font-size:25px\">学生展示</a></div><div style = \"width: 100%;float: left;height: 7%;\">";
			for(var i = 0; i < mydata["allstufile"]; i++)
			{
				str+="<a style = \"float:left;width:80%;font-size:18px\" href = \""+mydata["stuurl"][i]+"\">"+mydata["stufilename"][i]+"</a><a style = \"float:left;width:9%\">"+mydata["stuname"][i]+"</a><a style = \"float:left;width:9%\">第"+mydata["stugroup"][i]+"组</a>";
			}
			str += "</div>";
			
			str += "<div style = \"width: 100%;float: left;height: 7%;background: #61e0e0;text-align: center;\"><a style = \"font-size:25px\">小组展示</a></div><div style = \"width: 100%;float: left;height: 7%;\">";
			for(var i = 0; i < mydata["gallstufile"]; i++)
			{
				str+="<a style = \"float:left;width:80%;font-size:18px\" href = \""+mydata["gstuurl"][i]+"\">"+mydata["gstufilename"][i]+"</a><a style = \"float:left;width:9%\">"+mydata["gstuname"][i]+"</a>";
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