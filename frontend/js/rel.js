
function CRelObjectResult(){
	this.object_data		   = NaN;	
	this.items_by_object_from  = NaN;
	this.items_by_object_to    = NaN;
	this.obj4types			   = NaN;
}

function CRelObject(){
	
	this.requester   = NaN 
	this.ajax        = NaN
	this.object_name = NaN
	this.type_converter = NaN
	
	this.init = function init(object_name, ajax, requester, type_converter ){
		this.requester = requester;
		this.ajax	   = ajax;
		this.object_name = object_name;
		this.type_converter = type_converter;
	}
	
	this.getRel = function(id, object_data){
		msg_rel_from   = this.getRelFromById(id);
		msg_rel_to     = this.getRelToById(id)  ;
		rel_items_from = this.type_converter.convertServer2Front(msg_rel_from);
		rel_items_to   = this.type_converter.convertServer2Front(msg_rel_to);
		items_by_object_from = this.type_converter.relConvertFrontOrderByType(rel_items_from, "2");
		items_by_object_to   = this.type_converter.relConvertFrontOrderByType(rel_items_to  , "1");
		
		items_by_object = items_by_object_from; //+ items_by_object_to
		
		//Получить id для From
		x_t = []
		for (var t in items_by_object_from){
			x_t[t] = []
			for (t1 in items_by_object_from[t]){
				x_t[t].push( items_by_object_from[t][t1]["id2"] )
			}
		}
		// Получить id для to
		for (var t in items_by_object_to){
			if( x_t[t] == undefined ){
				x_t[t] = []
			}
			for (t1 in items_by_object_to[t]){
				x_t[t].push( items_by_object_to[t][t1]["id1"] )
			}
		}
		
		var req4types = [];
		for (var type in x_t){
			req4types[type] = []
		}
		
		for (var type in x_t){
			req = this.requester.getSelectByIdMass( type, x_t[type] );
			req4types[type].push(req);
		}
		
		//Получить заголовок по всем объектам
		var obj4types = [];
		for (var type in x_t){
			obj4types[type] = []
		}
		
		//Получить по каждому типу данные объектов
		for (var type in req4types){
			req = req4types[type][0];
			msg = this.ajax.get(req);
			items = this.type_converter.convertServer2Front(msg);
			obj4types[type] = items;
		}
		
		var relObjectResult = new CRelObjectResult();
		relObjectResult.object_data 		 = object_data;
		relObjectResult.items_by_object_from = items_by_object_from;
		relObjectResult.items_by_object_to	 = items_by_object_to;
		relObjectResult.obj4types 			 = obj4types;
		
		return relObjectResult;
	}
	
	
	this.getRelFromById = function(id){
		req = this.requester.selectRelFrom(this.object_name, id);
		msg = this.ajax.get(req);
		return msg;		
	}
	
	this.getRelToById = function(id){
		req = this.requester.selectRelTo(this.object_name, id);
		msg = this.ajax.get(req);
		return msg;
	}

}
