

function CTypeConverter(){


	//Получить структуру для внутренней работы со статусами т.е. добавление object_state
	/*
	<FROM>
		1: Object
			res: 
				type: "parent"
				rel_to:
				rel_from: "Открыт"
				id: 1
	<TO>
	status_items["type"]["rel_to|rel_from"] = text		
	*/
	this.convertServerRel2Front = function(msg){
		var rel_types = []
		//Заполнить
		for (var name in msg){
			for (var subname in msg[name]["res"]){
				rel_type = msg[name]["res"][subname]["rel_type"]
				title_from   = msg[name]["res"][subname]["title_from"]
				title_to 	  = msg[name]["res"][subname]["title_to"]
				rel_types[rel_type] = [];
				rel_types[rel_type]["title_from"] = msg[name]["res"][subname]["title_from"];
				rel_types[rel_type]["title_to"]	  = msg[name]["res"][subname]["title_to"];
			}
		}
		return rel_types;
	}
	//Получить структуру для внутренней работы со статусами т.е. добавление object_state
	/*
	<FROM>
		1: Object
			res: 
				status_scheme: "com"
				status_text: "Открыт"
				status_id: 1
	<TO>
	status_items["scheme1"]["id"] = text		
	*/
	this.convertServerStatus2Front = function(msg){
		var status_items = []
		var item = {}
		//Создать структуры
		for (var name in msg){
			for (var subname in msg[name]["res"]){
				status_scheme = msg[name]["res"][subname]["scheme"]
				status_items[status_scheme] = []
			}
		}
		//Заполнить
		for (var name in msg){
			for (var subname in msg[name]["res"]){
				status_scheme = msg[name]["res"][subname]["scheme"]
				status_text   = msg[name]["res"][subname]["status_text"]
				status_id 	  = msg[name]["res"][subname]["status_id"]
				status_items[status_scheme][status_id] = status_text;
			}
		}
		return status_items;
	}
	
	/*
	<FROM>
		1: Object
			res: 
				type: "com"
				title: "Открыт"
				status_id: 1
	<TO>
	status_items["scheme1"]["id"] = text		
	*/
	this.convertServerObjectType2Front = function(msg){
		var object_types = []
		for (var name in msg){
			for (var subname in msg[name]["res"]){
				var type  = msg[name]["res"][subname]["type"];
				var title = msg[name]["res"][subname]["title"];
				object_types[type] = title;
			}
		}
		return object_types;
	}
	
	this.convertServerRelO2OFront = function(msg){
		var rel_o2o = []
		for (var name in msg){
			for (var subname in msg[name]["res"]){
				var otype1   = msg[name]["res"][subname]["obj1_type"];
				var rel_type = msg[name]["res"][subname]["rel_type"]
				var otype2   = msg[name]["res"][subname]["obj2_type"];
				var item ={"obj1_type":otype1, "rel_type":rel_type, "obj2_type":otype2};
				rel_o2o.push(item);
			}
		}
		return rel_o2o;
	}
	
	//Получить структуру для внутренней работы
	this.convertServer2Front = function(msg){
		var ret = {}
		for (var name in msg) {			
			for (var subname in msg[name]["res"]){
				id = msg[name]["res"][subname]["id"]
				ret[id] = msg[name]["res"][subname]
			}
		} 
		
		myConsole("CTypeConverter.convertServer2Front", ret)
		
		return ret;
	}
	
	this.relConvertFrontOrderByType = function(items, flagToOrFrom){
		/*
			[
				"type1":[{},{}]
				"type2":[{},{}]
			]
		*/
		var types = [];
		var r_id   = "id"  + flagToOrFrom;
		var r_type = "obj" + flagToOrFrom + "_type";
		
		for (var i in items){
			cur_type = items[i][r_type];
			types[cur_type] = [];
		}
		
		for (var i in items){
			cur_type = items[i][r_type];
			types[cur_type].push( items[i] );
		} 
		return types;
		//На выходе будет структура отсортированная по типам, которую уже легко можно выводить
	}
	
	//Получить структуру для передачи на сервер при запросе типа Insert
	// TODO: Not logic here, transport to requester.js
	this.convertFront2ServerInsert = function(object_type, fields){
		//Надо привести к форме
		/*
		{ “object” : “object”,
		  "action" : "insert,"
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
		res.object = object_type;
		res.action = "insert";
		res.items = items;
		
		myConsole("CTypeConverter.convertFront2ServerInsert", res)
		
		return res;
	}
	
	//Преобразовать поля в форму необходимую для добавления полей в Datatables
	this.convertData2Datatables = function(fields, object_datatable_fields, object_state){
		var res = [];
		
		var id = fields["id"];
		for (var s in object_datatable_fields){
			var cur_name = object_datatable_fields[s].toLowerCase();
			//Отображение значения статуса
			//var n = cur_name.indexOf("#list#")
			if( cur_name.indexOf("#list#") > 0 ){
				//Получить статусную схему
				var status_res = cur_name.split("#");
				var status_name = status_res[0];
				var scheme    = status_res[2];
				//if ( status_id != "None" ){
				for (var f in fields) {
					if (f.toLowerCase() == status_name){
						var status_text = object_state.getStatusTextById( scheme, fields[f] );
						if ( status_text == undefined){
							res.push( "" );
						}
						else{
							res.push( status_text );
						}
					}
				}
			}
			else if( cur_name.indexOf("#href") > 0 ){
				var href_res = cur_name.split("#");
				var field_name = href_res[0];
				for (var f in fields) {
					if ( field_name == f.toLowerCase()){
						var h = "<a href='" + fields[f] + "'>" + fields[f] + "</a>";
						res.push( h );
					}
				}
			}
			else{ 
				//Отображение обычного значение
				for (var f in fields) {
					if (f.toLowerCase() == cur_name){
						res.push( fields[f] );
					}
				}
			}
		}
		
		myConsole("CObjectFunction.convertData2Datatables", res);
		return res;
	}
	
	//Получить данные по ответу из Insert в виде массива
	this.getDataRowIdFromSingleInsert = function(msg){
		var res = [];
		for (var name in msg) {			
			for (var subname in msg[name]){
				res[subname] = msg[name][subname];
			}
		} 
		return res;
	}

	
}



