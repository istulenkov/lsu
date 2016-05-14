
function CCard(){
	
	//Константы
	this.CARD_EDIT = "#card-edit";
	this.CARD_READ = "#card-read";
	this.CARD_FIELD_CLASS = "card_input";
	this.TINYMCE_ID = "#text_editor";
	
	this.object_state = NaN;
	this.settings = NaN;
	this.object_data = NaN;
	//---------
	
	this.fields = {};
	
	this.init = function(object_state, settings, object_data){
		this.object_state = object_state;
		this.settings = settings;
		this.object_data = object_data;
	};
	
	//Получение данных с карточки объекта
	this.getFields = function(){
		var fields = {};
		var selector = this.CARD_EDIT + " input.field-edit";
		$(selector).each(function(){			
			//Не передаем определенные поля.
			var attr = $(this).attr('data-field-option');// For some browsers, `attr` is undefined; for others,// `attr` is false.  Check for both.
			
			if (attr != undefined){				
				if (attr == "no-transmit"){
					//Если стоит атрибут не передавать, то пропускаем
					return true;
				}
			};
				
			var field_name  = $(this).attr("data-field-name");
			var field_value =  $(this).val();
			fields[field_name] = field_value;
		})
		
		//Получение данных с редактора текста
		if ( $(this.TINYMCE_ID).length ) {
			var field_name  = $(this.TINYMCE_ID).attr("data-field-name");
			var field_value = tinyMCE.get('text_editor').getContent();
			//field_value = field_value.replace(/"/g, "'");
			field_value = field_value.replace(/"/g, "&quot;");
			field_value = field_value.replace(/'/g, "&#39;");			
			fields[field_name] = field_value;	
		}
		
		//Получение данных с поля выбора
		selector = this.CARD_EDIT + " input.field-edit";
		$(this.CARD_EDIT + " select.field-edit[data-field-type=list]").each(function(){
			var field_name  = $(this).attr("data-field-name");
			var field_value =  $(this).val();
			fields[field_name] = field_value;
		})
		
		myConsole("CCard.getFields", fields)
		return fields;
	};
	
	//Получение данных с карточки отмеченных как "Не для передачи"
	this.getFieldsNoTransmit = function(){
		var fields = {}
		var selector = this.CARD_EDIT + " input.field-edit[data-field-option=no-transmit]";
		
		$(selector).each(function(){			
			var field_name  = $(this).attr("data-field-name");
			var field_value =  $(this).val();
			fields[field_name] = field_value;
		})
		
		myConsole("CCard.getFieldsNoTransmit", fields)
		return fields;
	};
	
	//Предварительное заполнение карточки доп.данными, например, статусы \ контролы для создания связей
	this.initCardCreate = function(){
		var status_list = this.object_state.getStatusList();
		//Получить все списки ul
		$("#card-edit select.field-edit[data-field-type=list]").each(function(){
			scheme = $(this).attr("data-scheme-status");
			$(this).append("<option value=''></option>");
			for ( var status_id in status_list[scheme] ){
				$(this).append("<option value='" + status_id + "'>" + status_list[scheme][status_id] + "</option>");
			}
		});
				
		//Заполнить контролы для создания связей
		this.initCardCreateRelControls();
		
		//Заполнить заголовок
		mythis = this;
		$(this.settings.CARD_OBJECT_NAME).each(function(){
			object_title = mythis.object_state.getObjectTypeTitle( mythis.object_data.OBJECT_NAME );
			$(this).html(object_title);
		});
		$(this.settings.CARD_OBJECT_ID).each(function(){
			$(this).html(" Создание нового объекта");
		});
		
		this.createCardMenu("edit");
		this.createCardMenu("read");
	};
	
	//Заполнение полей при открытии карточки за создание
	this.initCardCreateFields = function(){
		//Заполнить текущую дату
		$("#card-edit input.field-edit[data-field-autofill=today_date]").each(function(){			
			var date = new Date();
			var dd = date.getDate();
			if (dd < 10) dd = '0' + dd;

			var mm = date.getMonth() + 1;
			if (mm < 10) mm = '0' + mm;

			var yy = date.getFullYear();

			var today = dd + '.' + mm + '.' + yy;
			$(this).val(today);
		})
		
		//Заполнить текущее время
		$("#card-edit input.field-edit[data-field-autofill=time_now]").each(function(){			
			// TODO time_now
		})
	};
	
	//Заполнить элементы управления для создания связей
	this.initCardCreateRelControls = function(){
			
		//Получить доступные отношения from		
		var list_from = this.object_state.getRelO2OFrom( this.object_data.OBJECT_NAME )
		
		//Получить доступные отношения to
		var list_to = this.object_state.getRelO2OTo( this.object_data.OBJECT_NAME )
	
		
		//антидубль
		var object_type_arr  = {};
		var rel_type_arr = {}; 
		
		//заполнить типами объектов и типами связей для предыдущего
		for (var item in list_from){
			object_type  = list_from[item]["obj2_type"];
			object_title = this.object_state.getObjectTypeTitle( object_type ) 
			rel_type     = list_from[item]["rel_type"];
			rel_title = this.object_state.getRelFromTitlebyType(rel_type);
			
			//Делаем так чтобы не попадали дубли
			if (object_type_arr[object_type] == undefined){
				$(this.settings.CARD_EDIT_SELECT_OBJECT_LIST_FROM).append("<option value='" + object_type + "'>" + object_title + "</option>");
				object_type_arr[object_type]=0;
			}
			if (rel_type_arr[rel_type] == undefined){
				$(this.settings.CARD_EDIT_SELECT_REL_LIST_FROM ).append("<option value='" + rel_type    + "'>" + rel_title + "</option>");
				rel_type_arr[rel_type]=0;
			}
		}
		
		object_type_arr  = {};
		rel_type_arr = {}; 
		//заполнить типами объектов и типами связей для следуюего
		for (var item in list_to){
			object_type  = list_to[item]["obj1_type"];
			object_title = this.object_state.getObjectTypeTitle( object_type ) 
			rel_type     = list_to[item]["rel_type"];
			rel_title = this.object_state.getRelToTitlebyType(rel_type);
			
			if (object_type_arr[object_type] == undefined){
				$(this.settings.CARD_EDIT_SELECT_OBJECT_LIST_TO).append("<option value='" + object_type + "'>" + object_title + "</option>");
				object_type_arr[object_type]=0;
			}
			if (rel_type_arr[rel_type] == undefined){
				$(this.settings.CARD_EDIT_SELECT_REL_LIST_TO ).append("<option value='" + rel_type    + "'>" + rel_title + "</option>");
				rel_type_arr[rel_type]=0;
			}
		}
	};
	
	//Заполнить карточку для редактирования
	this.fillEdit = function(object_item, relObjectResult){
		//Заполнить текстовый редактор
		$("#text_editor").each(function(){
			var field_name  =  $(this).attr("data-field-name");
			var note = object_item[field_name];
			note = note.replace(/&quot;/g, "\"");
			tinyMCE.get('text_editor').setContent(note);
		})
		
		$("#card-edit .field-edit[data-field-type=text]").each(function(){
			var field_name  =  $(this).attr("data-field-name");
			$(this).val(object_item[field_name]);
		})
		$("#card-edit .field-edit[data-field-type=list]").each(function(){
			var field_name    = $(this).attr("data-field-name");
			var status_scheme = $(this).attr("data-scheme-status");
			var status_id     = object_item[field_name];  
			$(this).val(status_id);
		})
		
		this.fillRelationEdit(relObjectResult);
		this.fillTitle(object_item);
		this.fillCurLink();
	};
	
	//Заполнить карточку для просмотра
	this.fillRead = function(object_item, relObjectResult){
		var object_state = this.object_state;
		$('#card-read div.field-read[data-field-type=text]').each(function(){
			var field_name  =  $(this).attr("data-field-name");
			var value = object_item[field_name];
			value = value.replace(/&quot;/g, "\"");
			//value = value.replace(/href=&quot;/g, "href=\"");
			//value = value.replace(/&quot;>/g, "\">");
			$(this).html(value);
		})
		$('#card-read div.field-read[data-field-type=list]').each(function(){
			var field_name    = $(this).attr("data-field-name");
			var status_scheme = $(this).attr("data-scheme-status");
			var status_id     = object_item[field_name];  
			var status_text = object_state.getStatusTextById(status_scheme, status_id);
			$(this).html(status_text);
		})
		this.fillRelationRead(relObjectResult);
		this.fillTitle(object_item);
		this.fillCurLink();
	}
	
	this.fillTitle = function(object_item){
		mythis = this;
		$(this.settings.CARD_OBJECT_NAME).each(function(){
			object_title = mythis.object_state.getObjectTypeTitle( mythis.object_data.OBJECT_NAME );
			$(this).html(object_title);
		})
		$(this.settings.CARD_OBJECT_ID).each(function(){
			$(this).html(" (" + object_item["id"] + "). ");
		})
		this.object_data.fillCardTitleInfo(object_item, this.settings);
	};
	
	this.fillCurLink = function(){
		var href =  this.getCurObjectHrefRead();
		$(this.settings.CARD_DIV_CUR_REF).each(function(){
			$(this).html(href);
		})
	};
	
	this.getCurObjectHrefRead = function(){
		return this.object_data.OBJECT_NAME +".html?mode=read&id=" + this.object_state.getCurItemId();
	};
	
	this.createCardMenu = function(mode){
		var card_id = "";
		if (mode == "edit"){
			card_id = this.settings.MAINVIEW_ID_CARD_EDIT;
		}
		else if(mode == "read"){
			card_id = this.settings.MAINVIEW_ID_CARD_READ;
		}
		var object_data = this.object_data;
		var selector = card_id + " ul.card_menu";
		$(selector).each(function(){		
			$(this).append('<li><a href="#" class="action_menu small" field-activity="refresh"   field-mode="' + card_id +'" >Обновить</a></li>');
			$(this).append('<li><a href="#" class="action_menu small" field-activity="copy_link" field-mode="' + card_id + '" >Скопировать ссылку на объект</a></li>');
			if ( object_data.MENU["create_dir"] == true){
				$(this).append('<li><a href="#" class="action_menu small" field-activity="create_folder" field-mode="edit" >Создать папку</a></li>');
			}
		})
	};
	
	
	this.clearEdit = function(){
		//Очистка заголовка		
		$(this.settings.CARD_OBJECT_INFO).html("");
		
		//Чистим поля
		$("#card-edit .field-edit").each(function(){
			// Для tinyMCE отдельная обработка
			//if (){}
			$(this).val("");
		})
		
		//Чистим TinyMCE
		tinyMCE.get('text_editor').setContent("");
		
		//Чистим связи
		$(this.settings.CARD_EDIT_REL_CNT_FROM).html(""); 
		$(this.settings.CARD_EDIT_REL_CNT_TO).html("");  
		$(this.settings.CARD_EDIT_DIV_REL_FROM).html("");  
		$(this.settings.CARD_EDIT_DIV_REL_TO).html("");  
	};
	
	this.clearRead = function(){
		//Очистка заголовка		
		$(this.settings.CARD_OBJECT_INFO).html("");
		
		$("#card-read .field-read").each(function(){
			$(this).html("");
		})
		$(this.settings.CARD_READ_REL_CNT_FROM).html(""); 
		$(this.settings.CARD_READ_REL_CNT_TO).html(""); 	
		$(this.settings.CARD_READ_DIV_REL_FROM).html("");  
		$(this.settings.CARD_READ_DIV_REL_TO).html("");     
	};

	
	this.fillRelationRead = function(relObjectResult){
		//relObjectResult = CRelObjectResult(rel.js)
		//Заполнить from
		if (Object.getOwnPropertyNames(relObjectResult.items_by_object_from).length  > 0){
			this.processRelationBlock(relObjectResult.object_data, relObjectResult.items_by_object_from, relObjectResult.obj4types, "from", "read" );
		}
		else{
			
		}
		//Заполнить to
		if (Object.getOwnPropertyNames(relObjectResult.items_by_object_to).length  > 0){
			this.processRelationBlock(relObjectResult.object_data, relObjectResult.items_by_object_to, relObjectResult.obj4types, "to"  , "read" );
		}
		else{
			
		}
	};

	this.fillRelationEdit = function(relObjectResult){		
		//relObjectResult = CRelObjectResult(rel.js)
		//Заполнить from
		this.processRelationBlock(relObjectResult.object_data, relObjectResult.items_by_object_from, relObjectResult.obj4types, "from", "edit" );
		//Заполнить to
		this.processRelationBlock(relObjectResult.object_data, relObjectResult.items_by_object_to, relObjectResult.obj4types, "to"  , "edit" );
	};
	
	this.processRelationBlock = function(object_data, items_by_object, obj4types, rel_type, mode ){
		//rel_type = from/to		
		//mode     = read/edit
		
		var id_obj = "";
		var rel_title = "";
		var res_selector = "";
		var cnt_selector = "";
		
		switch(rel_type){
			case "from":
				id_obj = "id2";
				rel_title = "title_from";
				cnt_selector
				if (mode == "read"){
					res_selector = this.settings.CARD_READ_DIV_REL_FROM;
					cnt_selector = this.settings.CARD_READ_REL_CNT_FROM;
				}
				else if(mode == "edit"){
					res_selector = this.settings.CARD_EDIT_DIV_REL_FROM;
					cnt_selector = this.settings.CARD_EDIT_REL_CNT_FROM;
				}
			break;
			case "to":
				id_obj = "id1";
				rel_title = "title_to";
				if (mode == "read"){
					res_selector = this.settings.CARD_READ_DIV_REL_TO;
					cnt_selector = this.settings.CARD_READ_REL_CNT_TO;
				}
				else if(mode == "edit"){
					res_selector = this.settings.CARD_EDIT_DIV_REL_TO;
					cnt_selector = this.settings.CARD_EDIT_REL_CNT_TO;
				}
			break;
		};
		
		var rel_cnt_total = 0;
		var html 	  = "";		
		for (var object_name in object_data.REL_BLOCKS){
			
			var rel_cnt = 0;
			
			//Получить заголовок
			var head_text  = object_data.REL_BLOCKS[object_name]["head_title"]["text"];
			var head_class = object_data.REL_BLOCKS[object_name]["head_title"]["class"];
			var html_head = '<div class="row"><div class="' + head_class + '">' + head_text + '</div></div>';
			
			//Получить заголовки столбцов
			var html_col_title = '<div class="row">';
			for (var col in object_data.REL_BLOCKS[object_name]["col_title"]){
				var title_class = object_data.REL_BLOCKS[object_name]["col_title"][col]["class"];
				var title_text  = object_data.REL_BLOCKS[object_name]["col_title"][col]["text"];
				html_col_title = html_col_title +  '<div class="' + title_class + '">' + title_text + '</div>';			
			}
			if (mode == "edit"){
				html_col_title = html_col_title +  '<div class="col-md-1">Del</div>';
			}
			html_col_title = html_col_title + "</div>";
			//Отобразить строки для from

			var html_rows = "";
			for(var rel in items_by_object[object_name]){
				var row = '<div class="row">'
				for (var col in object_data.REL_BLOCKS[object_name]["cols"]){					
					//for (var item in object_data.REL_BLOCKS[object_name]["cols"][col]){
					var col_class  =  object_data.REL_BLOCKS[object_name]["cols"][col]["class"];
					var col_type   =  object_data.REL_BLOCKS[object_name]["cols"][col]["type"];
					var field      =  object_data.REL_BLOCKS[object_name]["cols"][col]["field"];
					var field_value = "";
					var id = "";
					//Получить значение из объекта
					switch(col_type){
						case "rel":
							rel_type = items_by_object[object_name][rel]["rel"];
							//Получить текст для from
							cur_rel = this.object_state.getRelTitlebyType(rel_type);
							field_value = cur_rel[rel_title]
						break;
						case "obj":
							id = items_by_object[object_name][rel][id_obj];
							field_value = obj4types[object_name][id][field];
						break;
						case "obj_link_read":
							id = items_by_object[object_name][rel][id_obj];
							field_value = '<a target = "_blank" href="' + object_name + '.html?mode=read&id=' + id + '">' + id + '</a>';								
						break;
						case "list":
							id = items_by_object[object_name][rel][id_obj];
							status_id = obj4types[object_name][id][field];
							scheme    = object_data.REL_BLOCKS[object_name]["cols"][col]["scheme"];
							field_value = this.object_state.getStatusTextById(scheme, status_id)
						break;
					}						
					row = row + '<div class="' + col_class + '">' + field_value + '</div>';
				}
				if (mode == "edit"){
					row = row + '<div class="col-md-1" ><a href="#" class="action_rel_delete" data-rel-id="' + items_by_object[object_name][rel]["id"] + '">Del</a></div>';
				}
				
				row = row + '</div>';
				rel_cnt++;
				html_rows = html_rows + row;
			}
			if (rel_cnt > 0){
				html = html + html_head + html_col_title + html_rows;
			}
			
			 
			 rel_cnt_total = rel_cnt_total + rel_cnt;
		};
		
		//Отображаем только если было найдено хотя бы одно отношение
		if( rel_cnt_total > 0 ){
			$(res_selector).html(html);
		}
		$(cnt_selector).html(rel_cnt_total.toString());
		return res;
	};
};

//Инициализация статической переменной
