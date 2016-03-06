definePackage("core", function(core){	
	// isTranslation 1: enable CVT & Date translation, 0: disable CVT translation 
	core.jsonToFileds = function(mapping, json, isTranslation, parentBlk){		
		//mapping[i][0:schema field, 1:screen field, 2:CVT, 3:date translation (1:date trans), 4: mapping ignore]
		if(mapping != null && json != null){
			if(isTranslation == 1){
				for(var i = 0; i < mapping.length; i++){
					if(mapping[i][4] == 1){
						//core field mapping is ignored
						continue;
					}
					if(mapping[i][2] != undefined){
						core.setValueWithCVT(mapping[i][1], json[mapping[i][0]],mapping[i][2], parentBlk);
					} else if(mapping[i][3] != undefined){
						core.setValueWithDateTrans(mapping[i][1], json[mapping[i][0]], parentBlk);
					} else {
						core.setValue(mapping[i][1], json[mapping[i][0]], parentBlk);
					}					
				}
			}else{
				for(var i = 0; i < mapping.length; i++){
					if(mapping[i][4] == 1){
						//core field mapping is ignored
						continue;
					}
					if(mapping[i][3] != undefined){
						core.setValueWithDateTrans(mapping[i][1], json[mapping[i][0]], parentBlk);
					} else {
						core.setValue(mapping[i][1], json[mapping[i][0]], parentBlk);
					}					
				}
			}			
		}else if(mapping != null && (json == undefined || json == null)){
			//Clear all the data to blank if json is undefined or null
			for(var i = 0; i < mapping.length; i++){
				if(mapping[i][4] == 1){
						//core field mapping is ignored
						continue;
				}		
				core.setValue(mapping[i][1], parentBlk);
			}
		}else{
			Logger.log("Mapping or json should not be null");
		}
	};
	
	core.filedsToJson = function(mapping, parentBlk){
		var jsonObj = {};
		if(mapping != null){
			for(var i = 0; i < mapping.length; i++){
				jsonObj[mapping[i][0]] = core.getValue(mapping[i][1], parentBlk);
			}
		}
		return jsonObj;
	};
	
	core.setValue = function(id, value, parentBlk){
		var component = $(id,parentBlk);
		if(component == null){
			Logger.log(id + " does not exists");
			return;
		}
		value = (value == undefined)?"":trim(value);
		if(component.type == "text"){
			component.value = value;
		} else if(component.type == "checkbox"){
			component.checked =(value == "Y")? true:false;
		} else if(component.type == "select-one") {
			core.setSelectValueByObj(component,value);
		}else if(component.value != undefined){			
			component.value = value;
		}else{
			component.innerText = value;
		}
	};
	
	core.setValueWithCVT = function(id, value, cvt, parentBlk){
		//CVT only for textField, label,span...
		var component = $(id,parentBlk);
		if(component == null){
			Logger.log(id + " does not exists");
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
	
	core.setValueWithDateTrans = function(id, value, parentBlk){
		//CVT only for textField, label,span...
		var component = $(id, parentBlk);
		if(component == null){
			Logger.log(id + " does not exists");
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
	
	core.getValue = function(id, parentBlk){
		var component = $(id, parentBlk);
		if(component == null){
			Logger.log(id + " does not exists");
			return;
		}
		var value = "";
		if(component.type == "text"){			
			value = component.value;
			if(id.indexOf("dpk") != -1){
				//core is datePicker need to tranlate the date to DB format
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
	
	core.setSelectValueByObj = function(obj, value){
		valueUpper = value.toUpperCase();
		obj.value = valueUpper;
		if(value!='' && obj.value != valueUpper){		
			option = new Option(valueUpper,valueUpper);
			obj.options.add(option);
			obj.value = valueUpper;
		}
	};
	
	core.disableFields = function(mapping, isDis, parentBlk){
		if(mapping != null && mapping != undefined){						
			for(var i = 0; i < mapping.length; i++){	
				core.disableField(mapping[i],isDis);
			}			
		}else{
			Logger.log("Fields Array should not be null");
		}
	};
	core.disableFieldsByRuleMapping = function(mapping, isDis, parentBlk){
		// To reuse the rule mapping array
		if(mapping != null && mapping != undefined){						
			for(var i = 0; i < mapping.length; i++){	
				core.disableField(mapping[i][1],isDis, parentBlk);
			}			
		}else{
			Logger.log("Mapping should not be null");
		}
	};
	
	core.disableField = function(id, isDis, parentBlk){
		var component = $(id, parentBlk);
		if(component == null){
			Logger.log(id + " does not exists");
			return;
		}		
		isDis = (isDis == undefined)?1:isDis;
		if(component.type == "text" || component.type == "select-one"){			
			component.disabled = (isDis == 1)?"disabled":"";
			if(id.indexOf("dpk") == 0){
				//If id start with "dpk", it means core is a DatePicker component, image link should be disabled
				var dpkHrefId = id.replace(/dpk/,"dpkHref");				
				hrefComponent = $(dpkHrefId, parentBlk);
				if(isDis == 1){
					hrefComponent.onclick = null;
					hrefComponent.children[0].src = com.citi.ci.CIConstants.CONTEXTROOT + '/ci2/images/calendar_icon_d.gif';
				}else{
					hrefComponent.onclick = new Function("onDateClick('" + id +"')");
					hrefComponent.children[0].src = com.citi.ci.CIConstants.CONTEXTROOT + '/ci2/images/calendar_icon.gif';
				}				
			}
		}else if(component.type == "checkbox" || component.type == "radio"){
			component.disabled = (isDis == 1)?true:false;
		}else if(component.type == "button"){
			component.disabled = (isDis == 1)?disableButton(id):enableButton(id);
		} else{
			Logger.log("Disable function should support core component:" + id);
		}
	};	
	
	//mappingArray [[0,"id"],[1,"name"]];  if [X,"rawData"], "rawData" means a json obj stores in the hidden fields
	//return Obj = [{id:"",name:""},{id:"",name:""}];
	core.getDoucumentByGrid = function(grid, mappingArray){
		if(!grid || !mappingArray){
			Logger.log("grid or mapping Array should not be undefined");
			return;
		}
		var data = new Array();
		var record = {};
		var gridDatas = grid.getMatrixValues();
		var rowData = null;
		var rawValue = "";		
		for(var i = 0; i < gridDatas.length; i++){
			record = {};
			rowData = gridDatas[i];
			for(var j = 0; j < mappingArray.length; j++){
				if(mappingArray[j][0] > -1 && mappingArray[j][0] < rowData.length){
					if(mappingArray[j][1] == "rawData"){
						//There should be only one rawData in one record.
						rawValue = rowData[mappingArray[j][0]].value;
						rawValue = rawValue.replace(/\"/,'"');
						record[mappingArray[j][1]] = eval("("+ rawValue +")");
					}else{
						record[mappingArray[j][1]] = rowData[mappingArray[j][0]].value;
					}					
				}else{
					Logger.log("Mapping Array out of index error. Index" + mappingArray[j]);
				}
			}
			data.push(record);
		}
		return data;
	}
	core.getRecordByGrid = function(grid, mappingArray, rowNo){
		if(!grid || !mappingArray || rowNo == undefined){
			Logger.log("grid or mapping Array or rowNo should not be undefined");
			return;
		}
		var rowData = grid.getRowDataByRowIndx(rowNo);
		rowData = rowData[0];
		var record = {};
		for(var j = 0; j < mappingArray.length; j++){
				if(mappingArray[j][0] > -1 && mappingArray[j][0] < rowData.length){
					if(mappingArray[j][1] == "rawData"){
						//There should be only one rawData in one record.
						rawValue = rowData[mappingArray[j][0]].value;
						rawValue = rawValue.replace(/\"/,'"');
						record[mappingArray[j][1]] = eval("("+ rawValue +")");
					}else{
						record[mappingArray[j][1]] = rowData[mappingArray[j][0]].value;
					}					
				}else{
					Logger.log("Mapping Array out of index error. Index" + mappingArray[j]);
				}
		}
		return record;
	};
	core.createTable=function(tId,datas){
		var myTable =	document.getElementById(tId);
	 	var cells = myTable.rows[0].cells;
		for(var j = 0; j < datas.length; j++){  
			var rowj= myTable.insertRow(myTable.rows.length);  	
			for(var i = 0; i < cells.length; i++){  		
				cellI = rowj.insertCell(i);
				cellI.innerHTML=datas[j][cells[i].id]?datas[j][cells[i].id]:"&nbsp;";
			} 
		} 
	}
	 core.checkEntitlement=function(id){
      var actionList=com.citi.ci.CIConstants.entitleList;
      var isEntitlement="Y"
      dojo.forEach(actionList, function (item) {
      	if(item.buttonID==id&&(!item.isButtonEntitled)){
      			isEntitlement="N"
      	}
      });
      return isEntitlement;
   }
	core.StringBuffer = function() {
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
	core.strech=function(id,rootId){
	     dojo.byId(rootId).style.display=dojo.byId(rootId).style.display=='none'?'':'none';
	     if(id && dojo.byId(id)) dojo.byId(id).innerText=dojo.byId(id).innerText=="-"?"+":"-";
		 if(!dojo.isIE){
			Logger.log("***********core.strech");
			resizeGridWithScopeInChrome(rootId);
		}
	
	};
	
	core.onclickHeaderStrech=function(id,strechid,rootId){
          Logger.log("id-->"+id+" rootId-->"+rootId);
          Logger.log("style.display"+dojo.byId(rootId).style.display);
          dojo.byId(rootId).style.display=dojo.byId(rootId).style.display=='none'?'':'none';
          dojo.byId(strechid).innerText=dojo.byId(strechid).innerText=="-"?"+":"-"
    };

	core.initstrech=function(arrayTabs){
		 dojo.forEach(arrayTabs,function(item){
		 	 dojo.byId(item.RootId).style.display="none";
	         dojo.byId(item.Id).innerText="+"
		 })
	};
});

definePackage("core.entitlement", function(entitlement){
	entitlement.maskStar = "****";
	//mask None editable field
	entitlement.maskNoneEditableField = function(fieldId){
		if("Y" != core.checkEntitlement(fieldId)){
			dojo.byId(fieldId).innerText = entitlement.maskStar;
			dojo.byId(fieldId).value= entitlement.maskStar;
		}		
	};
});
definePackage("core.component.select", function(select){	
	select.width;
	select.enhance = function(){
		
		logFunc="enhance";
		selectList = document.getElementsByTagName("select");		
		if(!selectList)
			return;
		for(var i = 0; i < selectList.length; i++){
			if(selectList[i].onmouseover){
				//Logger.log("already have onmouseover function-->"+selectList[i].onmouseover);
			}else if(selectList[i].multiple){
				Logger.log("this is a multiple select");
			}else{
				selectList[i].onmouseover = function(){select.wrapSelf(this); };
			}
		}		
	};	
	select.onfocus = function(obj){	
		logFunc = "onfocus";	
		select.width = obj.offsetWidth;
		position = select.position(obj);
		obj.style.position = "absolute";
		obj.style.left = obj.offsetLeft;
		obj.style.top = obj.offsetTop;
		obj.style.zIndex = 10;	
		obj.style.width = "auto";
	}
	select.onblur = function(obj){
		logFunc = "onblur";	
		obj.style.width = select.width + "px";
		obj.style.position = "";
		obj.style.zIndex="";
	}
	
	/*Private functions */
	select.wrapSelf = function(obj,isWrapped){	
		logFunc = "wrapSelect";	
		var oldWidth = obj.offsetWidth;
		obj.style.width = "auto";
		var newWidth = obj.offsetWidth;	
		if(oldWidth>=newWidth){
			obj.style.width = oldWidth+"px";
			obj.onfocus = "";		
			obj.onblur = "";
			return;
		}
		//Select width will not change when mouseover.				
		obj.style.width = oldWidth+"px";
					
		if(isWrapped){
			obj.onfocus = function(){select.onfocus(this); };
			obj.onblur = function(){select.onblur(this); };	
		}else if(select.isWrapped(obj)){
			obj.onfocus = function(){select.onfocus(this); };
			obj.onblur = function(){select.onblur(this); };	
		}else{
		var span = document.createElement("span");		
		span.style.display="inline-block";
		var newObj = obj.cloneNode(true);
		newObj.onchange= obj.onchange;
		newObj.value= obj.value;
		newObj.onbeforeactivate=obj.onbeforeactivate;
		span.appendChild(newObj);	
		span.style.width= obj.offsetWidth+"px";	
		span.style.height = obj.offsetHeight+"px"; 
		obj.parentNode.replaceChild(span, obj);	
		newObj.onfocus = function(){select.onfocus(this); };
		newObj.onblur = function(){select.onblur(this); };	
		}
	}	
	select.isWrapped = function(obj){
		logFunc = "isWrapped";
		var isWrapped = false;
		var parentNode = obj.parentNode;
		//var gridParentwidth=parentNode.offsetWidth+2;
		if(dojo.getComputedStyle(parentNode).display.toLowerCase()=="inline-block" 
				&& dojo.getComputedStyle(parentNode).position.toLowerCase() == "absolute"
				&& (obj.offsetWidth == parentNode.offsetWidth)){
			isWrapped = true;
		} else {
			isWrapped = false;
		}
		return isWrapped;
	}
	
	select.position = function(obj){
		logFunc = "position";		
		var position = {top:0, left:0};
		var node = obj;
		while(node.tagName.toLowerCase() != "html"){
			position.top += node.offsetTop;
			position.left += node.offsetLeft;
			node = node.parentNode;
		}
		return position;
	}	
 });