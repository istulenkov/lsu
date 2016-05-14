

function CObjectData(){
	
	this.OBJECT_NAME = "think";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 300;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","sys_created_at","category#list#life-cat","classify#list#think-class","status#list#status-opf","prioritet#list#prio-lmh","title","tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Дата"  	  , "width": "5%"},
		{"title":"Кат."  	  , "width": "5%"},
		{"title":"Класс."  	  , "width": "5%"},
		{"title":"Статус"  	  , "width": "5%"},
		{"title":"Прио"  	  , "width": "5%"},
		{"title":"Заголовок"  , "width": "40%"},
		{"title":"Тэги"  	  , "width": "20%"}
	];

	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"task"     : G_REL_BLOCKS["task"],
		"project"  : G_REL_BLOCKS["project"],
		"note"     : G_REL_BLOCKS["note"],
		"timing"   : G_REL_BLOCKS["timing"],
		"error"    : G_REL_BLOCKS["error"],
		"question" : G_REL_BLOCKS["question"],
	}

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
