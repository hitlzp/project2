/** 
* Created by DreamBoy on 2016/4/19. 
*/

var count = 0;//�γ�����
seq = [];//���
subtheme = [];//����
period = [];//ѧʱ
nums = [];//����
classtype = [];//С�����

for(var q = 0; q < 20;q++)
{
	seq[q] = 0;
}

$(function() { 
$.fn.handleTable = function (options) { 
//1.Settings ��ʼ������ 
var c = $.extend({ 
"operatePos" : -1, //-1��ʾĬ�ϲ�����Ϊ���һ�� 
"handleFirst" : true, //��һ���Ƿ���Ϊ�����Ķ��� 
"edit" : "�༭", 
"save" : "����", 
"cancel" : "ȡ��", 
"add" : "���", 
"confirm" : "ȷ��", 
"del" : "ɾ��", 
"editableCols" : "all", //�ɱ༭���У���0��ʼ 
//"pos" : 0, //λ��λ�ڸ��п�ͷ�����ǽ�β�������Ҳࣩ 
"order" : ["edit", "add", "cancel"], //ָ���������ܵ�˳�� 
"saveCallback" : function(data, isSuccess) { //�������дajax���ݣ����ڱ���༭������� 
//data: ���ص����� 
//isSuccess: ���������ڱ������ݳɹ��󣬽��ɱ༭״̬��Ϊ���ɱ༭״̬ 
//ajax����ɹ����������ݳɹ������Żص�isSuccess�������޸ı���״̬Ϊ�༭״̬�� 
}, 
"addCallback" : function(data, isSuccess) { 
//isSuccess: ����������������ݳɹ��󣬽��ɱ༭״̬��Ϊ���ɱ༭״̬ 
}, 
"delCallback" : function(isSuccess) { 
//isSuccess: ����������ɾ�����ݳɹ��󣬽���Ӧ��ɾ�� 
} 
}, options); 
//�������� 
var colsNum = $(this).find('tr').last().children().size(); 
//2.��ʼ�������У�Ĭ��Ϊ���һ�У���1���� 
if(c.operatePos == -1) { 
c.operatePos = colsNum - 1; 
} 
//3.��ȡ������Ҫ���������� 
var rows = $(this).find('tr'); 
if(!c.handleFirst) { 
rows = rows.not(":eq(0)"); 
} 
//4.��ȡ���á����������У�ͨ��operatePos��ȡ 
var rowsTd = []; 
var allTd = rows.children(); 
for(var i = c.operatePos; i <= allTd.size(); i += colsNum) { 
if(c.handleFirst) { //���������һ�У��Ͱѷ��ò�������������Ϊ�� 
allTd.eq(i).html(""); 
} 
rowsTd.push(allTd.eq(i)[0]); 
} 
//6.�޸����� order Ϊ��ʱ��Ĭ��ֵ 
if(c.order.length == 0) { 
c.order = ["edit"]; 
} 
//7.����ɱ༭���� 
var cols = getEditableCols(); 
//8.��ʼ�����ӵĹ��� 
var saveLink = "", cancelLink = "", editLink = "", addLink = "", confirmLink = "", delLink = ""; 
initLink(); 
//9.��ʼ������ 
initFunc(c.order, rowsTd); 
/** 
* ������������ 
*/
function createLink(str) { 
return "<a href=\"javascript:void(0)\" style=\"margin:0 3px\">" + str + "</a>"; 
} 
/** 
* ��ʼ���ֲ��������� 
*/
function initLink() { 
for(var i = 0; i < c.order.length; i++) { 
switch (c.order[i]) { 
case "edit": 
//���༭������ 
editLink = createLink(c.edit); 
saveLink = createLink(c.save); 
cancelLink = createLink(c.cancel); 
break; 
case "add": 
//����ӡ����� 
addLink = createLink(c.add); 
//��ȷ�ϡ����� 
confirmLink = createLink(c.confirm); 
//��ȡ�������� 
cancelLink = createLink(c.cancel); 
break; 
case "del": 
//��ɾ�������� 
delLink = createLink(c.del); 
break; 
} 
} 
} 
/** 
* ��ȡ�ɽ��б༭�������� 
*/
function getEditableCols() { 
var cols = c.editableCols; 
if($.type(c.editableCols) != "array" && cols == "all") { //����������ж����Ա༭�Ļ� 
cols = []; 
for(var i = 0; i < colsNum; i++) { 
if(i != c.operatePos) { //�ų����ò������� 
cols.push(i); 
} 
} 
} else if($.type(c.editableCols) == "array") { //��ָ��ѡ��༭���еĻ���Ҫ������á��༭�����ܵ��� 
var copyCols = []; 
for(var i = 0; i < cols.length; i++) { 
if(cols[i] != c.operatePos) { 
copyCols.push(cols[i]); 
} 
} 
cols = copyCols; 
} 
return cols; 
} 
/** 
* ����c.order���������ṩ�Ĳ��� 
* @param func ��Ҫ���õĲ��� 
* @param cols ���ò������� 
*/
function initFunc(func, cols) { 
for(var i = 0; i < func.length; i++) { 
var o = func[i]; 
switch(o) { 
case "edit": 
createEdit(cols); 
break; 
case "add": 
createAdd(cols); 
break; 
case "del": 
createDel(cols); 
break; 
} 
} 
} 
/** 
* �������༭һ�С��Ĺ��� 
* @param operateCol ���ñ༭�������� 
*/
function createEdit(operateCol) { 
$(editLink).appendTo(operateCol).on("click", function() { 
if(replaceQuote($(this).html()) == replaceQuote(c.edit)) { //�����ʱ�Ǳ༭״̬ 
toSave(this); //���༭״̬��Ϊ����״̬ 
} else if(replaceQuote($(this).html()) == replaceQuote(c.save)) { //�����ʱ�Ǳ���״̬ 
var p = $(this).parents('tr'); //��ȡ������ĵ�ǰ��
var data = []; //�����޸ĺ�����ݵ������� 
for(var i = 0; i < cols.length; i++) { 
var tr = p.children().eq(cols[i]); 
var inputValue = tr.children('input').val(); 
data.push(inputValue); 
} 
$this = this; //��ʱ��this��ʾ���� ������� �༭���� 
c.saveCallback(data, function() { 
toEdit($this, true); 
}); 
} 
}); 
var afterSave = []; //�����޸�ǰ����Ϣ�������û����ȡ�������ֵ���ز��� 
//�޸�Ϊ�����桱״̬ 
function toSave(ele) { 
$(ele).html(c.save); //�޸�Ϊ�����桱 
$(ele).after(cancelLink); //�����Ӧ��ȡ������ġ�ȡ�����ӡ� 
$(ele).next().on('click', function() { 
//if($(this).html() == c.cancel.replace(eval("/\'/gi"),"\"")) { 
toEdit(ele, false); 
//} 
}); 
//��ȡ������༭�ĵ�ǰ�� tr jQuery���� 
var p = $(ele).parents('tr'); 
afterSave = []; //���ԭ����������� 
for(var i = 0; i < cols.length; i++) { 
var tr = p.children().eq(cols[i]); 
var editTr = "<input type=\"text\" class=\"form-control\" value=\"" + tr.html() + "\"/>"; 
afterSave.push(tr.html()); //����δ�޸�ǰ������ 
tr.html(editTr); 
} 
} 
//�޸�Ϊ���༭��״̬����ʱ����Ҫͨ��isSave��־�ж��� 
// ��Ϊ����ˡ����桱������ɹ�����Ϊ���༭��״̬�ģ�������Ϊ����ˡ�ȡ������Ϊ���༭��״̬�ģ� 
function toEdit(ele, isSave) { 
$(ele).html(c.edit); 
if(replaceQuote($(ele).next().html()) == replaceQuote(c.cancel)) { 
$(ele).next().remove(); 
} 
var p = $(ele).parents('tr'); 
for(var i = 0; i < cols.length; i++) { 
var tr = p.children().eq(cols[i]); 
var value; 
if(isSave) { 
value = tr.children('input').val(); 
} else { 
value = afterSave[i]; 
} 
tr.html(value); 
} 
} 
} 
/** 
* ���������һ�С��Ĺ��� 
* @param operateCol 
*/ 
function createAdd(operateCol) { 
$(addLink).appendTo(operateCol).on("click", function() { 
//��ȡ���������ӡ��ĵ�ǰ�� tr jQuery���� 
var p = $(this).parents('tr'); 
var copyRow = p.clone(); //�����µ�һ�� 
var input = "<input type=\"text\"/>"; 
var childLen = p.children().length; 
for(var i = 0; i < childLen; i++) { 
copyRow.children().eq(i).html("<input type=\"text\" class=\"form-control\"/>"); 
} 
//���һ���ǲ����� 
var last = copyRow.children().eq(c.operatePos); 
last.html(""); 
p.after(copyRow); 
var confirm = $(confirmLink).appendTo(last).on("click", function() { 
var data = []; 
for(var i = 0; i < childLen; i++) { 
if(i != c.operatePos) { 
var v = copyRow.children().eq(i).children("input").val(); 
data.push(v); 
copyRow.children().eq(i).html(v); 
} 
} 
c.addCallback(data, function() { 
last.html(""); 
//------------������Խ����޸� 
initFunc(c.order, last); 
}); 
}); 
$(confirm).after(cancelLink); //�����Ӧ��ȡ������ġ�ȡ�����ӡ� 
$(confirm).next().on('click', function() { 
copyRow.remove(); 
}); 
}); 
} 
/** 
* ������ɾ��һ�С��Ĺ��� 
* @param operateCol 
*/ 
function createDel(operateCol) { 
$(delLink).appendTo(operateCol).on("click", function() { 
var _this = this; 
c.delCallback(function() { 

//ɾ��ǰ��ȡ��Ҫɾ������Ϣ
var p = $(_this).parents('tr'); 
afterSave = []; //���ԭ����������� 
for(var i = 0; i < cols.length; i++) { 
var tr = p.children().eq(cols[i]); 
var editTr = "<input type=\"text\" class=\"form-control\" value=\"" + tr.html() + "\"/>"; 
afterSave.push(tr.html()); //����δ�޸�ǰ������ 
tr.html(editTr); 
}

//��ʾ��������ɾ��
var id = Number(afterSave[0]);
seq[id] = -1;
count = count - 1;

$(_this).parents('tr').remove(); 
}); 
}); 
} 
/** 
* ��str�еĵ�����תΪ˫���� 
* @param str 
*/
function replaceQuote(str) { 
return str.replace(/\'/g, "\""); 
} 
}; 
});







$(function() { 
//$('.edit').handleTable({"cancel" : "<span class='glyphicon glyphicon-remove'></span>"}); 
$('.editable').handleTable({ 
"handleFirst" : false, 
"cancel" : " <span class='glyphicon glyphicon-remove'></span> ", 
"del" : " <span class='glyphicon glyphicon-trash'></span> ", 
"edit" : " <span class='glyphicon glyphicon-edit'></span> ", 
"add" : " <span class='glyphicon glyphicon-plus'></span> ", 
"save" : " <span class='glyphicon glyphicon-saved'></span> ", 
"confirm" : " <span class='glyphicon glyphicon-ok'></span> ", 
"operatePos" : -1, 
"editableCols" : [0, 1, 2,3,4], 
"order": ["add", "del"], 
"saveCallback" : function(data, isSuccess) { //�������дajax���ݣ����ڱ���༭������� 
//data: ���ص����� 
//isSucess: ���������ڱ������ݳɹ��󣬽��ɱ༭״̬��Ϊ���ɱ༭״̬ 
var flag = true; //ajax����ɹ����������ݳɹ������Żص�isSuccess�������޸ı���״̬Ϊ�༭״̬�� 

return true; 
}, 
"addCallback" : function(data,isSuccess) { 
var flag = true; 
if(flag) { 
isSuccess();
var id = Number(data[0]) 
seq[id] = 1;
subtheme[id] = data[1];
period[id] = Number(data[2]);
nums[id] = Number(data[3]);
classtype[id] = data[4];
count = count+1;

} else { 
} 
}, 
"delCallback" : function(isSuccess) { 
var flag = true; 
if(flag) { 
isSuccess(); 
alert("ɾ���ɹ�"); 
} else { 
alert("ɾ��ʧ��"); 
} 
} 
}); 
}); 


document.onclick=function()//����ʦ����ύ��ť
{ 
	var obj = event.srcElement;//�������ᱨ��
	if(obj.type == "button"){
		if(obj.id == "addcourse"){
			cname = document.getElementById("cname").value;
			thname = document.getElementById("thname").value;
			picture = document.getElementById("preview").src;
			var post_data ={
			"cname":cname,
			"thname":thname,
			"picture":picture,
			"seq":seq,
			"subtheme":subtheme,
			"period":period,
			"nums":nums,
			"classtype":classtype,
			"count":count,
			};
			$.ajax({
			type : "POST", //Ҫ�������ݣ�������POSTЭ�� 
			url : "/teacher/addcourse/", //ע���β��б�ߣ���������500����
			traditional:true,  //���ϴ�����Դ�����
			data : post_data, //JSON����
			success: function(mydata){
				if (mydata["rr"] == 1)
					alert("�γ���ӳɹ���");
				},
			});
		}
	}
}
