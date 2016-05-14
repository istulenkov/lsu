
function CMyDatatable(){
	
	this.table = NaN;
	
	this.init = function(table_id, object_data){

		this.table = $(table_id).DataTable({
			"columns": object_data.DATATABLES_COLUMNS,
			"lengthMenu": [ 500, 1000, "All" ],
			"dom": '<"top"flp<"clear">>rt<"bottom"p<"clear">>'
		});
		
	}
	
	//Заполнение таблицы данными объектов.
	this.fillTable = function(object_items, object_state, type_converter, object_data){		

		//Если добавление нескольких объектов
		for (var n in object_items) {
			var fields = type_converter.convertData2Datatables(object_items[n], object_data.DATATABLES_FIELD, object_state);			
				var id = fields[0];
				
				//Добавить первое поле для ссылки на редактирование
				var link_edit = '<a href="#" class = "datatable-id-click-edit" data-datatable-id="' + id + '" >Изм</a>';
				fields.unshift(link_edit)
				
				//Сделать второе поле ссылкой на объект для просмотра.
				var id = fields[1];
				fields[1] = '<a href="#" class = "datatable-id-click-read" data-datatable-id="' + id + '" >' + id + '</a>';
				
				//Сделать последнее поле ссылкой на удаление.
				if (object_data.DATATABLES_LAST_FIELD_IS_DELETE == true){
					fields[fields.length] = '<a href="#" class = "datatable-id-click-delete" data-datatable-id="' + id + '" > Del </a>';
				}
				
			this.table.row.add(fields).draw();
		}
	}
	
	this.updateRow = function(object_items, object_state, type_converter, object_data){
		
		for (var n in object_items) {
				var fields = type_converter.convertData2Datatables(object_items[n], object_data.DATATABLES_FIELD, object_state);			
				var id = fields[0];
				
				//Добавить первое поле для ссылки на редактирование
				var link_edit = '<a href="#" class = "datatable-id-click-edit" data-datatable-id="' + id + '" >Изм</a>';
				fields.unshift(link_edit)
				
				//Сделать второе поле ссылкой на объект для просмотра.
				var id = fields[1];
				fields[1] = '<a href="#" class = "datatable-id-click-read" data-datatable-id="' + id + '" >' + id + '</a>';
				
				//Сделать последнее поле ссылкой на удаление.
				if (object_data.DATATABLES_LAST_FIELD_IS_DELETE == true){
					fields[fields.length] = '<a href="#" class = "datatable-id-click-delete" data-datatable-id="' + id + '" > Del </a>';
				}
					
			
			var selector = "a[data-datatable-id=" + id + "]";
			this.table.row( $(selector).parents('tr') ).data(fields).draw();
			
			//this.table.row.add(fields).draw();
		}
		
		/*

		
		
		table.row( this ).data( d ).draw();
		
			//Добавить в таблицу
			//-Удалить из таблицы
			g_datatable.deleteRowById( g_object_state.getCurItemId() )
			
			//-Добавить в таблицу
			g_datatable.fillTable( g_object_state.getCurItemForDatatables(), g_object_state, g_type_converter, g_object_data );
		*/
		
	}
	
	this.deleteRowById = function(id){
		var selector = "a[data-datatable-id=" + id + "]";
		this.table.row( $(selector).parents('tr') ).remove().draw();
	}
	
	this.deleteRow = function(link_a){
		link_a.parents('tr').remove();
		//this.table.draw();
	}
	
	this.deleteRowAll = function(){
		this.table.rows().remove();
	}

}