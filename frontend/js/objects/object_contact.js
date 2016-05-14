

function CObjectData(){
	
	this.OBJECT_NAME = "contact";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 450;

	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id","surname", "name", "middlename","birthday","mobtel", "email", "wemail", "skype", "tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"},
		{"title":"Ид"  	  	  , "width": "5%"},
		{"title":"Фамилия"    , "width": "10%"},
		{"title":"Имя"  	  , "width": "5%"},
		{"title":"Отчество"   , "width": "5%"},
		{"title":"ДР"  	  	  , "width": "5%"},
		{"title":"Моб.тел."   , "width": "10%"},
		{"title":"Email"  	  , "width": "10%"},
		{"title":"Раб.Email"  , "width": "10%"},
		{"title":"Skype"  	  , "width": "10%"},
		{"title":"Тэги"  	  , "width": "20%"}
	];

	this.MENU = {
		"create_dir":false
	}
	
	this.REL_BLOCKS = {
		"question"   : G_REL_BLOCKS["question"],
		"task"   : G_REL_BLOCKS["task"],
		"project": G_REL_BLOCKS["project"],
		"error"  : G_REL_BLOCKS["error"]
	}
	
	
	//Заполнить заголовок нужной информацией
		//Заполнить заголовок нужной информацией
	this.fillCardTitleInfo = function(object_item, settings){		
		$(settings.CARD_OBJECT_INFO).each(function(){
			title = object_item["surname"] + " " + object_item["name"] + " " + object_item["middlename"] 
			if (title.length > 50){
				title = title.substring(0,50) + "...";	
			}
			$(this).html(" " + title);
		})
	}
	
}
