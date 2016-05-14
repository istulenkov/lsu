

function CObjectData(){
	
	this.OBJECT_NAME = "task";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = true;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 450;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","date_start", "date_end", "category#list#life-cat","status#list#status-opf","prioritet#list#prio-lmh","title","tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Дата отк."  , "width": "5%"},
		{"title":"Дата закр"  , "width": "5%"},
		{"title":"Кат."  	  , "width": "8%"},
		{"title":"Стат."  	  , "width": "8%"},
		{"title":"Прио."  	  , "width": "8%"},
		{"title":"Заг."  	  , "width": "20%"},
		{"title":"Тэги"  	  , "width": "11%"},
		{"title":"Удал"  	  , "width": "5%"}
	];

	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"task"   : G_REL_BLOCKS["task"],
		"project": G_REL_BLOCKS["project"]
	}
	
	/*
	this.SEARCH = {
		"fields":[
			{
				"title" : "Ид.",
				"format": "num",
				"field" : "id",
				"field-class" : "col-md-3"
			},
			{
				"title" : "Статус",
				"format": "list",
				"field" : "status",
				"scheme": "status-opf",
				"field-class" : "col-md-3"
			},
			{
				"title" : "Заголовок",
				"format": "text",
				"field" : "title",
				"field-class" : "col-md-3"
			}
		]		
	}
	*/
	
	//Заполнить заголовок нужной информацией
	this.fillCardTitleInfo = function(object_item, settings){		
		$(settings.CARD_OBJECT_INFO).each(function(){
			title = object_item["title"]
			if (title.length > 50){
				title = title.substring(0,50) + "...";	
			}
			$(this).html(" " + title);
		})
	}
	
}
