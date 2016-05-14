

function CRequester(){
	this.id = CRequester.counter++;

	this.getSelectAll = function(object_name){
		res = '{"object": ' + this.addQuotes(object_name) + ', "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"id", "op":">=", "value":"0"}]}}]}';
		myConsole("CRequester:getSelectAll", res);
		return res;
	};
	
	this.getStatusList = function(){
		res = '{"object": "status", "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"id", "op":">=", "value":"0"}]}}]}';
		return res;
	};
	
	this.getObjectTypes = function(){
		res = '{"object": "object_types", "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"id", "op":">=", "value":"0"}]}}]}';
		return res;
	};
	
	this.getRelO2O = function(){
		res = '{"object": "sys_rel_object2object", "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"id", "op":">=", "value":"0"}]}}]}';
		return res;
	};
	
	this.getRelationList = function(){
		res = '{"object": "rel_types", "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"id", "op":">=", "value":"0"}]}}]}';
		return res;

	};
	
	this.getInsert = function(object_name, fields){
		//Надо привести к форме
		/*
		{ “object” : “object”,
		  "action" : "update,"
		  “items”: [
				{
					id: %id%,
					msg: { 						
						fields: {
							column_1: %field_1_value%,
							column_2:%field_2_value%
						}
					}
				}
			]
		}
		*/
		
		var mymsg = {};
		mymsg.fields = fields;
		
		var items = [];
		items[items.length] = {id: this.id, msg: mymsg};
		
		var res = {};
		res.object = object_name;
		res.action = "insert";
		res.items = items;
		
		res = JSON.stringify(res);
		myConsole("CRequester.getUpdate", res);
		
		return res;
	};
	
	this.getUpdate = function(object_name, fields, id){
		/*
		'{
			"object":"Person", 
			"action":"update", 
			"items":[
				{
					"id":1,
					"msg":{
						"fields_set": {"field1":"val1","field2":"val2"}, 
						"fields_where":{"field_where1": 1, "field_where2": 2} 
					} 
				}
			]
		}'
		*/
		
		var res = {};
		res.object = object_name;
		res.action = "update";

		
			var mymsg = {};
			mymsg.fields_set = fields;
			mymsg.fields_where = {};
			mymsg.fields_where.id = id;
		
			var items = [];
			items[items.length] = {id: this.id, msg: mymsg};
		
		res.items = items;
			
		res = JSON.stringify(res);
		myConsole("CRequester.getUpdate", res);
		
		return res;
	};
	
	this.getSelectByIdMass = function(object_name, id_arr){
		start = '{"object": "' + object_name + '", "action":"select", "items":[';		
		body = "";		
		out_id = 1;
		for (var id in id_arr ){
			x = '{"id":' + out_id + ',"msg":{"fields": [{"column":"id", "op":"=", "value":"' + id_arr[id] + '"}]}},';
			body = body + x;
			out_id++;
		}		
		body = body.substring(0, body.length - 1);//Удаляем последнюю запятую.		
		end = "]}";
		res = start + body + end;		
		return res;
	};
	
	this.getSelectById = function(object_name, id){
		res = '{"object": "' + object_name + '", "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"id", "op":"=", "value":"' + id + '"}]}}]}';
		return res;
	};
	
	this.getDeleteById = function(object_name, id){
		res = '{"object": ' + this.addQuotes(object_name) + ', "action":"delete", "items":[{"id":1,"msg":{"fields": {"id":"' + id + '" }}}]}';
		return res;
		return res;
	};
	
	this.getDeleteAll = function(object_name){
		res = '{"object": ' + this.addQuotes(object_name) + ', "action":"delete_all" }';
		return res;
	};
	
	this.addQuotes = function(text){
		return '"' + text + '"';
	};

	
	//--------------------
	//ACTIONS
	//--------------------	
	this.getActionCreateDir = function(object_name, id, title){
		res = '{"action_type":"file", "object": "' + object_name + '", "action":"dir_create", "id":"' + id + '", "title":"' + title + '"}';
		return res;
	};
	
	//--------------------
	//RELATIONS
	//--------------------
	this.getInsertRelation = function(obj1_type, id1, rel, obj2_type, id2){
		res = '{"object": "rel_items", "action":"insert", "items":[{"id":1,"msg":{"fields": {"obj1_type":"' + obj1_type + '", "id1":"' + id1 + '", "obj2_type": "' + obj2_type + '", "id2":"' + id2 + '", "rel":"' + rel + '" }}}]}';
		return res;
	};
	
	this.selectRelFrom = function(obj1_type, id1){
		//res = '{"object": "rel", "action":"insert", "items":[{"id":1,"msg":{"fields": {"obj1_type":"' + obj1_type + '", "id1":"' + id1 + '", "obj2_type": "' + obj2_type + '", "id2":"' + id2 + '" }}}]}';
		res = '{"object": "rel_items" , "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"obj1_type", "op":"=", "value":"' + obj1_type + '"},{"column":"id1", "op":"=", "value":"' + id1 + '"}]}}]}';
		return res;
	};
	
	this.selectRelTo = function(obj2_type, id2){
		res = '{"object": "rel_items" , "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"obj2_type", "op":"=", "value":"' + obj2_type + '"},{"column":"id2", "op":"=", "value":"' + id2 + '"}]}}]}';
		return res;
	};
	
}

CRequester.counter = 0;






