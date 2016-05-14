
function CObjectState(){
	
	this.ITEMS = NaN;
	/*
	status_items = {
		"scheme1":{
			"id1" : "text1"
		}
	}
	*/
	this.STATUS_LIST = NaN;	//Получить все возможные
	
	this.REL_LIST = NaN; 			//Для каждого получать title_from и title_to
	
	this.OBJECT_TYPES = NaN; //Для каждого получать тип объекта\описание
	
	this.REL_O2O = NaN;
	
	this.CUR_ITEMS_ID = NaN;
	
	this.init = function(items, status_list, rel_list){
		this.ITEMS = items;
		this.STATUS_LIST = status_list;
		this.REL_LIST = rel_list;
	}
	
	this.setObjectTypes = function(object_types){
		this.OBJECT_TYPES = object_types
	}
	
	this.getObjectTypeTitle = function(object_type){
		return this.OBJECT_TYPES[object_type];
	}
	
	this.setRelO2OFront = function(rel_o2o){
		this.REL_O2O = rel_o2o;
	}
	
	this.getRelO2OFrom = function(object_type){
		return this.getRelO2O("from", object_type);
	}
	
	this.getRelO2OTo = function(object_type){
		return this.getRelO2O("to", object_type);
	}
	
	this.getRelO2O = function(type, object_type){
		var obj_type = "";
		
		if(type == "from"){
			obj_type = "obj1_type";
		}
		else if (type == "to"){
			obj_type = "obj2_type";
		}
		
		res = [];
		for (var item in this.REL_O2O){
			if (object_type ==  this.REL_O2O[item][obj_type]){
				res.push(this.REL_O2O[item]);
			}
		}
		return res;
	}
	
	this.getItems = function(){
		return this.ITEMS;
	}
	
	this.getRelList = function(){
		return this.REL_LIST;
	}
	
	this.getRelTitlebyType = function(type){
		return this.REL_LIST[type];
	}
	
	this.getRelFromTitlebyType = function(type){
		return this.REL_LIST[type]["title_from"];
	}
	
	this.getRelToTitlebyType = function(type){
		return this.REL_LIST[type]["title_to"];
	}
	
	this.getStatusList = function(){
		return this.STATUS_LIST;
	}
	
	this.getStatusTextById = function(scheme, id){
		return this.STATUS_LIST[scheme][id];
	}
	
	this.setCurItemId = function(cur_id){
		this.CUR_ITEMS_ID = cur_id;
	}
	
	this.getCurItem = function(){
		return this.ITEMS[this.CUR_ITEMS_ID];
	}
	
	this.getCurItemForDatatables = function(){
		var res = {}
		res[this.CUR_ITEMS_ID] = this.ITEMS[this.CUR_ITEMS_ID]
		return res;
	}
	
	this.getCurItemId = function(){
		return this.CUR_ITEMS_ID;
	}
	
	this.addItem = function(item){
		this.ITEMS[item["id"]] = item;
	}
	
	this.updateItem = function(item){
		// = addItem =)
		this.ITEMS[item["id"]] = item;
	}
	
	this.deleteItem = function(id){
		delete(this.ITEMS[id]);
	}
	
}