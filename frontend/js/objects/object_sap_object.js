

function CObjectData(){

	
	this.OBJECT_NAME = "sap_object";
	
	//Последнее поле в таблице будет ссылкой для удаления
	this.DATATABLES_LAST_FIELD_IS_DELETE = false;
	
	//Высота для TinyMCE
	this.TINYMCE_HEIGHT = 600;
	
	//Поля, которые будут записаны в таблицу
	this.DATATABLES_FIELD = ["id", "sap_cat#list#sap-cat", "sap_area#list#sap-area", "name", "title","tags"];
	
	this.DATATABLES_COLUMNS = [
		{"title":"Изм"  	  , "width": "5%"  },
		{"title":"Ид"  		  , "width": "5%"  },
		{"title":"Категория"  , "width": "10%"  },
		{"title":"Вид"  	  , "width": "10%"  },
		{"title":"Название"   , "width": "15%"  },
		{"title":"Описание"   , "width": "25%" },
		{"title":"Тэги" 	  , "width": "25%" }
	];
	
	this.MENU = {
		"create_dir":false
	}
	
		this.REL_BLOCKS = {
	}
	
	//Заполнить заголовок нужной информацией
	this.fillCardTitleInfo = function(object_item, settings){		
		$(settings.CARD_OBJECT_INFO).each(function(){
			$(this).html(" " + object_item["title"])
		})
	}
	
	
}


