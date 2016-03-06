/**
 * Util functions
 */

/**
 * String Util
 */
StringBuffer = function() {
	this.buffer = [];
	for (var i = 0; i < arguments.length; i++) {
		this.buffer.push(arguments[i]);
	}
	this.append = function() {
		for (var i = 0; i < arguments.length; i++) {
			this.buffer.push(arguments[i]);
		}
		return this;
	}
	this.toString = function() {
		return this.buffer.join('');
	}
}

/**
 * Table operation
 */
function insertRecord(tId, record) {
	var records = [];
	records.push(record);
	insertRecords(tId,records);
}

function deleteRows(tId){
	var myTable = $("#"+tId)[0];
	debugger;
    var rowNum=myTable.rows.length;
    for (i=1;i<rowNum;i++)
    {
    	myTable.deleteRow(i);
        rowNum=rowNum-1;
        i=i-1;
    }
}

function insertRecords(tId,datas){
	var myTable = $("#"+tId)[0];
 	var cells = myTable.rows[0].cells;
	for(var j = 0; j < datas.length; j++){  
		var rowj= myTable.insertRow(myTable.rows.length);  	
		for(var i = 0; i < cells.length; i++){  		
			cellI = rowj.insertCell(i);
			cellI.innerHTML=datas[j][cells[i].id]?datas[j][cells[i].id]:"&nbsp;";
		} 
	} 
}

var formBuilder = {};
//isTranslation 1: enable CVT & Date translation, 0: disable CVT translation 
formBuilder.jsonToFileds = function(mapping, json, isTranslation, parentBlk){		
	//mapping[i][0:schema field, 1:screen field, 2:CVT, 3:date translation (1:date trans), 4: mapping ignore]
	if(mapping != null && json != null){
		if(isTranslation == 1){
			for(var i = 0; i < mapping.length; i++){
				if(mapping[i][4] == 1){
					//formBuilder field mapping is ignored
					continue;
				}
				if(mapping[i][2] != undefined){
					formBuilder.setValueWithCVT(mapping[i][1], json[mapping[i][0]],mapping[i][2], parentBlk);
				} else if(mapping[i][3] != undefined){
					formBuilder.setValueWithDateTrans(mapping[i][1], json[mapping[i][0]], parentBlk);
				} else {
					formBuilder.setValue(mapping[i][1], json[mapping[i][0]], parentBlk);
				}					
			}
		}else{
			for(var i = 0; i < mapping.length; i++){
				if(mapping[i][4] == 1){
					//formBuilder field mapping is ignored
					continue;
				}
				if(mapping[i][3] != undefined){
					formBuilder.setValueWithDateTrans(mapping[i][1], json[mapping[i][0]], parentBlk);
				} else {
					formBuilder.setValue(mapping[i][1], json[mapping[i][0]], parentBlk);
				}					
			}
		}			
	}else if(mapping != null && (json == undefined || json == null)){
		//Clear all the data to blank if json is undefined or null
		for(var i = 0; i < mapping.length; i++){
			if(mapping[i][4] == 1){
					//formBuilder field mapping is ignored
					continue;
			}		
			formBuilder.setValue(mapping[i][1], parentBlk);
		}
	}else{
		alert("Mapping or json should not be null");
	}
};

formBuilder.filedsToJson = function(mapping, parentBlk){
	var jsonObj = {};
	if(mapping != null){
		for(var i = 0; i < mapping.length; i++){
			jsonObj[mapping[i][0]] = formBuilder.getValue(mapping[i][1], parentBlk);
		}
	}
	return jsonObj;
};

formBuilder.setValue = function(id, value, parentBlk){
	var component = document.getElementById(id);
	if(component == null){
		alert(id + " does not exists");
		return;
	}
	value = (value == undefined)?"":trim(value);
	if(component.type == "text"){
		component.value = value;
	} else if(component.type == "checkbox"){
		component.checked =(value == "Y")? true:false;
	} else if(component.type == "select-one") {
		formBuilder.setSelectValueByObj(component,value);
	}else if(component.value != undefined){			
		component.value = value;
	}else{
		component.innerText = value;
	}
};


formBuilder.setValueWithCVT = function(id, value, cvt, parentBlk){
	//CVT only for textField, label,span...
	var component = document.getElementById(id);
	if(component == null){
		alert(id + " does not exists");
		return;
	}
	value = (value == undefined)?"":trim(value);
	value = (cvt == undefined || eval(cvt) == undefined)? value:getCVTShortDesc(value, eval(cvt));
	if(component.type == "text"){
		component.value = value;
	} else if(component.type == "checkbox"){
		//component.checked =(value == "Y")? true:false;
	} else if(component.type == "select-one") {
		//component.value = value;
	}else if(component.value != undefined){	
		component.value = value;
	}else{
		component.innerText = value;
	}
};

formBuilder.setValueWithDateTrans = function(id, value, parentBlk){
	//CVT only for textField, label,span...
	var component = document.getElementById(id);
	if(component == null){
		alert(id + " does not exists");
		return;
	}
	value = (value == undefined)?"":formateDateFromDBToPage(value);
	if(component.type == "text"){
		component.value = value;
	} else if(component.type == "checkbox"){
		//component.checked =(value == "Y")? true:false;
	} else if(component.type == "select-one") {
		//component.value = value;
	}else if(component.value != undefined){	
		component.value = value;
	}else{
		component.innerText = value;
	}
};

formBuilder.getValue = function(id, parentBlk){
	var component = document.getElementById(id);
	if(component == null){
		alert(id + " does not exists");
		return;
	}
	var value = "";
	if(component.type == "text"){			
		value = component.value;
		if(id.indexOf("dpk") != -1){
			//formBuilder is datePicker need to tranlate the date to DB format
			value = formateDateFromPageToDB(value);
		}else if(id.indexOf("cur") != -1){
			value=getAmountValue(value);
		}
	} else if(component.type == "checkbox"){			
		value = (component.checked == true)? "Y":"N";
	}else if(component.value != undefined){
		value = component.value;
	}else{
		value = component.innerText;
	}
	return value;
};

formBuilder.setSelectValueByObj = function(obj, value){
	valueUpper = value.toUpperCase();
	obj.value = valueUpper;
	if(value!='' && obj.value != valueUpper){		
		option = new Option(valueUpper,valueUpper);
		obj.options.add(option);
		obj.value = valueUpper;
	}
};