// TODO: Object from html
// TODO: Delete
// TODO: Update
// TODO: Add datetime create and datetime update
// TODO: Status - List
// TODO: TinyMCE
// Think about auto scripts
// Think about links among objects

function getURLParameter(name) {
	var url = window.location.href;
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

$( document ).ready(function() {
	
	var g_settings 		 = new CSettings();
	var g_card 		   	 = new CCard();	
	var g_type_converter = new CTypeConverter();		
	var g_ajax 			 = new CMyJSON();
	var g_requester 	 = new CRequester();
	var g_object_items   = NaN;
	var g_object_state   = new CObjectState();
	var g_datatable      = new CMyDatatable();
	var g_tinymce		 = new CMyTinyMCE();
	var g_mainview		 = new CMainView(g_settings);
	var g_object_data	 = new CObjectData(); 
	var g_rel			 = new CRelObject();
	var g_cur_id = NaN;
	var g_validator = new CValidator();
	
	SyntaxHighlighter.all();
	
	g_datatable.init( g_settings.DATATABLE_ID, g_object_data );
	g_tinymce.init( g_settings.TINYMCE_ID, g_object_data );
	g_validator.init();
	g_rel.init( g_object_data.OBJECT_NAME, g_ajax, g_requester, g_type_converter )
	//--------------------------
	//Получить все объекты 
	//--------------------------
	
	//Сделать один запрос для получения информации по статусам\отношениям\типам
	
	//Получить все статусные схемы
	req = g_requester.getStatusList()
	var server_answer = g_ajax.get(req)
	var status_list = g_type_converter.convertServerStatus2Front(server_answer)
	
	//Получить все объекты
	req = g_requester.getObjectTypes();
	server_answer = g_ajax.get(req);
	var object_types = g_type_converter.convertServerObjectType2Front(server_answer)
	g_object_state.setObjectTypes(object_types);
	
	//Получить все отношения по объектам
	req = g_requester.getRelO2O();
	server_answer = g_ajax.get(req);
	var rel_o2o = g_type_converter.convertServerRelO2OFront(server_answer)
	g_object_state.setRelO2OFront(rel_o2o);
	
	x = g_object_state.getRelO2OFrom("task");
	y = g_object_state.getRelO2OTo("think");
	
	//Получить все отношения
	req = g_requester.getRelationList()
	server_answer = g_ajax.get(req)
	var rel_list = g_type_converter.convertServerRel2Front(server_answer);
	
	//Получить все объекты
	var req = g_requester.getSelectAll(g_object_data.OBJECT_NAME)
	var server_answer = g_ajax.get(req)
	
	g_object_state.init(g_type_converter.convertServer2Front(server_answer), status_list, rel_list);		
	g_card.init(g_object_state, g_settings, g_object_data);
	g_card.initCardCreate();
	
	//Название объекта
	ot = g_object_state.getObjectTypeTitle(g_object_data.OBJECT_NAME);
	$(".navbar-brand").html( ot );
	
	//Заполнить datatables
	g_datatable.fillTable(g_object_state.getItems(), g_object_state, g_type_converter, g_object_data);
	
	//Если переданы параметры
	mode 	 = getURLParameter("mode")
	id 		 = getURLParameter("id")
	obj_from = getURLParameter("obj_from")
	id_from  = getURLParameter("id_from")
	rel 	 = getURLParameter("rel")
	//file:///I:/ROOT/BABYLON-4/projects/lsu/frontend/task.html?mode=create&id_from=1&obj_from=task&rel=parent
	is_first = true;
	
	if ( mode != null ){
		switch(mode){
			case "read":
				g_object_state.setCurItemId( id );		
				g_card.clearRead();
				relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
				g_card.fillRead( g_object_state.getCurItem(), relObjectResult )
				g_mainview.modeRead();
			break;
			case "edit":
				g_object_state.setCurItemId( id );		
				//g_card.clearEdit();
				relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
				g_card.fillEdit( g_object_state.getCurItem(), relObjectResult )
				g_mainview.modeEdit();
			break;			
			case "create":
				g_card.initCardCreateFields();
				g_mainview.modeCreate();
			break;
		}
	}
	else{
		//Отобразить табличный вид
		g_mainview.modeTable();
	}
	
	$(document).on("click", "a.datatable-id-click-read" , function(event){
		g_object_state.setCurItemId( $(this).attr("data-datatable-id") );		
		g_card.clearRead();
		relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
		g_card.fillRead( g_object_state.getCurItem(), relObjectResult )
		g_mainview.modeRead();
		
		//RELATIONS
		g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
		
		event.preventDefault();
		SyntaxHighlighter.highlight();
	})
	
	$(document).on("click", "a.datatable-id-click-edit" , function(event){
		g_object_state.setCurItemId( $(this).attr("data-datatable-id") );		
		g_card.clearEdit();
		relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
		g_card.fillEdit( g_object_state.getCurItem(), relObjectResult )
		g_mainview.modeEdit();
		event.preventDefault();
	})
	
	$(document).on("click", "a.datatable-id-click-delete" , function(event){
		var id_delete = $(this).attr("data-datatable-id");

		// Создать запрос на удаление
		var req = g_requester.getDeleteById(g_object_data.OBJECT_NAME, id_delete)
		
		// Направить запрос на удаление
		var msg = g_ajax.get(req);
		
		// Удалить из таблицы
		g_datatable.deleteRowById( id_delete )	
		
		// Удалить из глобальных объектов
		g_object_state.deleteItem(id_delete);
		
		event.preventDefault();
	})
		
	$("#action_edit").click(function(){
		g_card.clearEdit(); 
		relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
		g_card.fillEdit( g_object_state.getCurItem(), relObjectResult )
		g_mainview.modeEdit();
	})
	
	$("#action_create").click(function(event){
		g_card.clearEdit();
		g_card.initCardCreateFields();
		g_mainview.modeCreate();
		event.preventDefault();
	})
	
	$("#action_show_table").click(function(event){
		g_mainview.modeTable();
		event.preventDefault();
	})
	
	$("#action_delete_all").click(function(event){
		req = g_requester.getDeleteAll(g_object_data.OBJECT_NAME);
		g_ajax.get(req);
		g_datatable.deleteRowAll();
		var msg = g_mainview.modeTable();
		event.preventDefault();
	})
	
	$("#action_save").click(function(){
		var fields = g_card.getFields();				
		var req = g_requester.getInsert(g_object_data.OBJECT_NAME, fields);
		var msg = g_ajax.get(req);
		
		// TODO: Create check for result (true\false) 
		
		var data_ret = g_type_converter.getDataRowIdFromSingleInsert(msg)
		g_object_state.setCurItemId( data_ret[g_settings.SERVER_LASTROWID] )
		
		//Запросить одиночный select
		req = g_requester.getSelectById( g_object_data.OBJECT_NAME, g_object_state.getCurItemId() );
		msg = g_ajax.get(req);		
		data_ret = g_type_converter.convertServer2Front(msg);
		
		//Добавить в глобальные данные
		data_cur = data_ret[g_object_state.getCurItemId()]
		g_object_state.addItem( data_cur );
		
		//Добавить в таблицу
		g_datatable.fillTable( g_object_state.getCurItemForDatatables(), g_object_state, g_type_converter, g_object_data );
		
		//Заполнить карточку Read
		//g_card.fillRead( g_object_state.getCurItem() );
		
		//Создать отношение, если в 1-ый раз
		if (is_first == true && id_from != null){
			req = g_requester.getInsertRelation(obj_from, id_from, rel, g_object_data.OBJECT_NAME, data_cur["id"])
			msg = g_ajax.get(req);
			is_first = false;
		}
		
		//Отобразить карточку для чтения
		g_card.clearRead();
		relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
		g_card.fillRead( g_object_state.getCurItem(), relObjectResult )
		g_mainview.modeRead();

	});
	
	$("#action_update").click(function(event){
		var fields = g_card.getFields();
		var id = g_card.getFieldsNoTransmit()["id"];
		var req = g_requester.getUpdate( g_object_data.OBJECT_NAME, fields, id);		
		g_object_state.setCurItemId(id)
		var msg = g_ajax.get(req);
		
		// TODO: Create check for result (true\false) 
		
		var data_ret = g_type_converter.getDataRowIdFromSingleInsert(msg)

		//Запросить одиночный select
		req = g_requester.getSelectById( g_object_data.OBJECT_NAME, g_object_state.getCurItemId() );
		msg = g_ajax.get(req);		
		data_ret = g_type_converter.convertServer2Front(msg);
		
		
		g_object_state.updateItem( data_ret[g_object_state.getCurItemId()] );
		
		//Отобразить карточку для чтения
		g_card.clearRead();
		relObjectResult = g_rel.getRel( g_object_state.getCurItemId(), g_object_data );
		g_card.fillRead( g_object_state.getCurItem(), relObjectResult )
		g_mainview.modeRead();
		
		//Добавить в таблицу
		//-Удалить из таблицы
		//g_datatable.deleteRowById( g_object_state.getCurItemId() )
		
		//-Добавить в таблицу
		//g_datatable.fillTable( g_object_state.getCurItemForDatatables(), g_object_state, g_type_converter, g_object_data );
		
		g_datatable.updateRow( g_object_state.getCurItemForDatatables(), g_object_state, g_type_converter, g_object_data );
		
	})
	
	//Хак на сортировку по статусу
	$("input.filter_process").change(function(){
		//Скрыть строки со статусом "Открыт"
		$(".rel-prev .row").each(function(){
			var row_item = this;
			$(this).children("div").each(function(){
				if ( $(this).html() == "Обработан" ){
					$(row_item).toggle();
					//alert("Обработан");
				}
			})
		})
	})
	
	//-----------------------------------
	// ОБРАБОТКА ОТНОШЕНИЙ
	//-----------------------------------
	//Создание следующего объекта
	$(g_settings.CARD_EDIT_BUTTON_CREATE_REL_FROM).click(function(event){
		//Получить тип отношения
		rel_type = $(g_settings.CARD_EDIT_SELECT_REL_LIST_FROM).val();
		
		//Получить текущий тип объекта
		cur_object_type = g_object_data.OBJECT_NAME;
		
		//Получить тип объекта для создания
		new_object_type = $(g_settings.CARD_EDIT_SELECT_OBJECT_LIST_FROM).val();
		
		//Получить текущий идентификатор объект
		cur_id = g_object_state.getCurItemId();
		
		//Перейти на создание объект
		href = new_object_type +".html?mode=create&id_from=" +cur_id+ "&obj_from=" + cur_object_type + "&rel=" + rel_type;
		
		window.open( href, '_blank');
	})
	
	//Создание связи с предыдущим объектом
	$(g_settings.CARD_EDIT_BUTTON_CREATE_REL_TO).click(function(event){
		//Получить тип отношения
		rel_type = $(g_settings.CARD_EDIT_SELECT_REL_LIST_TO).val();
		
		//Получить текущий тип объекта
		cur_object_type = g_object_data.OBJECT_NAME;
		
		//Получить тип объекта для создания
		new_object_type = $(g_settings.CARD_EDIT_SELECT_OBJECT_LIST_TO).val();
		
		//Получить текущий идентификатор объект
		cur_id = g_object_state.getCurItemId();
		
		//Получить идентификатор объекта для связи
		to_id = $(g_settings.CARD_EDIT_INPUT_OBJECT_ID_TO).val();
		
		//Создать отношение
		req = g_requester.getInsertRelation(new_object_type, to_id, rel_type, cur_object_type, cur_id)
		msg = g_ajax.get(req);
		
		//Автоматически перезагрузить карточку, чтобы увидеть изменения
		href = cur_object_type +".html?mode=read&id="+cur_id;
		
		window.open( href, '_self');

		
	})
	
	
	//Удалить отношение
	$(document).on("click", "a.action_rel_delete" , function(event){
		var id_delete = $(this).attr("data-rel-id");

		// Создать запрос на удаление
		var req = g_requester.getDeleteById(g_settings.OBJECT_NAME_REL, id_delete);
		
		// Направить запрос на удаление
		var msg = g_ajax.get(req);
		
		// Удалить из таблицы
		$(this).parent().parent().remove();
		
		event.preventDefault();
	})
	
	//-----------------------------------
	// ОБРАБОТКА ПУНКТОВ МЕНЮ
	//-----------------------------------
	$(document).on("click", "a.action_menu" , function(event){
		var activity = $(this).attr("field-activity");
		var mode     = $(this).attr("field-mode");
				
		var href = g_card.getCurObjectHrefRead();
		switch(activity){
			case "refresh":				
				window.open(href, '_self');
			break;
			
			case "copy_link":
				var node = document.querySelector(mode + " " + g_settings.CARD_DIV_CUR_REF);
				var range = document.createRange();  
				range.selectNode(node);  
				window.getSelection().addRange(range);  
			    var x = document.execCommand('copy');
				
			break;
			
			case "create_folder":
				//Создать папку, если это предусмотрено для объекта
				var id = g_object_state.getCurItemId()
				var title = g_object_state.getCurItem()["title"]
				var req = g_requester.getActionCreateDir( g_object_data.OBJECT_NAME, id, title );
				var msg = g_ajax.get(req);
			break;
			
		}
		
	})
	
	//-----------------------------------
	// ОТОБРАЖЕНИЕ ЗАГРУЗКИ AJAX
	//-----------------------------------
	//$(document).ajaxStart(function(){
	//	$(g_settings.MESSAGE_INFO).html("Загрузка данных");
	//})
	
	//-----------------------------------
	// ОТОБРАЖЕНИЕ ЗАГРУЗКИ AJAX
	//-----------------------------------
	//$(document).ajaxStop(function(){
	//	$(g_settings.MESSAGE_INFO).html("Загрузка завершена");
	//})
	
});



























