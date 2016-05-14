
function CMainView(settings){
	
	this.SETTINGS = settings;
	
	// TODO: Get object from HTML, not const
	
	/*
	MAINVIEW_CARD_BTN_EDIT   
	MAINVIEW_CARD_BTN_UPDATE 
	MAINVIEW_CARD_BTN_SAVE   
	MAINVIEW_CARD_BTN_CANCEL
	*/
	
	this.modeCreate = function(){
		//show
		$(this.SETTINGS.MAINVIEW_ID_CARD_EDIT).show();
		$(this.SETTINGS.MAINVIEW_CARD_BTN_SAVE).show();
			
		//hide
		$(this.SETTINGS.MAINVIEW_ID_CARD_READ).hide();
		$(this.SETTINGS.MAINVIEW_ID_TABLE).hide();	
		$(this.SETTINGS.MAINVIEW_CARD_BTN_UPDATE).hide();
		
	}
	
	this.modeEdit = function(){
		//show
		$(this.SETTINGS.MAINVIEW_ID_CARD_EDIT).show();
		$(this.SETTINGS.MAINVIEW_CARD_BTN_UPDATE).show();
		
		//hide
		$(this.SETTINGS.MAINVIEW_ID_CARD_READ).hide();
		$(this.SETTINGS.MAINVIEW_ID_TABLE).hide();
		$(this.SETTINGS.MAINVIEW_CARD_BTN_SAVE).hide();					
		
	}
	
	this.modeRead = function(){
		//show
		$(this.SETTINGS.MAINVIEW_ID_CARD_READ).show();
		
		//hide
		$(this.SETTINGS.MAINVIEW_ID_CARD_EDIT).hide();
		$(this.SETTINGS.MAINVIEW_ID_TABLE).hide();
	
	}
	
	this.modeTable = function(){
		//show
		$(this.SETTINGS.MAINVIEW_ID_TABLE).show();
		
		//hide
		$(this.SETTINGS.MAINVIEW_ID_CARD_READ).hide();
		$(this.SETTINGS.MAINVIEW_ID_CARD_EDIT).hide();
	
		//Убрать checkbox
		$("input.filter_process").each(function(){
			if ( $(this).is(':checked') ){
				 $(this).prop('checked', false);
			}
		})
	}
	
}