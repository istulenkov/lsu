

//Здесь хранятся все описания отношений, чтобы не замусорять файлы объектов
G_REL_BLOCKS = {
		"project":{
			"head_title":{
				"text":"Проект",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-8 small rel-title",
					"text":"Описание"
				}
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"
				},
				"title":{
					"class":'col-md-8 small rel-col',
					"type":"obj",
					"field":"title"
				}
			}			
		},
		"task":{
			"head_title":{
				"text":"Задачи:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-6 small rel-title",
					"text":"Описание"
				},
				"status":{
					"class":"col-md-2 small rel-title",
					"text":"Статус"
				},
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"
				},
				"title":{
					"class":'col-md-6 small rel-col',
					"type":"obj",
					"field":"title"
				},
				"status":{
					"field":"status",
					"class":'col-md-2 small rel-col',
					"type":"list",
					"scheme":"status-opf"
				}
			}			
		},
		"think":{
			"head_title":{
				"text":"Мысли:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-6 small rel-title",
					"text":"Описание"
				},
				"status":{
					"class":"col-md-2 small rel-title",
					"text":"Статус"
				},
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"
				},
				"title":{
					"class":'col-md-6 small rel-col',
					"type":"obj",
					"field":"title"
				},
				"status":{
					"field":"status",
					"class":'col-md-2 small rel-col',
					"type":"list",
					"scheme":"status-opf"
				}
			}			
		},
		"question":{
			"head_title":{
				"text":"Вопросы:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-6 small rel-title",
					"text":"Описание"
				},
				"status":{
					"class":"col-md-2 small rel-title",
					"text":"Статус"
				},
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"	
				},
				"title":{
					"class":'col-md-6 small rel-col',
					"type":"obj",
					"field":"title"
				},
				"status":{
					"field":"status",
					"class":'col-md-2 small rel-col',
					"type":"list",
					"scheme":"status-opf"
				}
			}			
		},
		"note":{
			"head_title":{
				"text":"Заметки:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-8 small rel-title",
					"text":"Описание"
				}
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"	
				},
				"title":{
					"class":'col-md-8 small rel-col',
					"type":"obj",
					"field":"title"
				}
			}			
		},
		"timing":{
			"head_title":{
				"text":"Время:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"time_start":{
					"class":"col-md-1 small rel-title",
					"text":"Начало"
				},
				"time_end":{
					"class":"col-md-1 small rel-title",
					"text":"Конец"
				},
				"productivity":{
					"class":"col-md-2 small rel-title",
					"text":"Продуктивность"
				},
				"title":{
					"class":"col-md-4 small rel-title",
					"text":"Описание"
				},
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"field":"rel",
					"type":"rel"
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"	
				},
				"time_start":{
					"class":"col-md-1 small rel-col",
					"field":"time_start",
					"type":"obj"
				},
				"time_end":{
					"class":"col-md-1 small rel-col",
					"field":"time_end",
					"type":"obj"
				},
				"productivity":{
					"class":"col-md-2 small rel-col",
					"field":"productivity",
					"type":"list",
					"scheme":"prod-lvl"
				},
				"title":{
					"class":"col-md-4 small rel-col",
					"field":"title",
					"type":"obj"
				},
			}			
		},
		"snippet":{
			"head_title":{
				"text":"Snippet:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"cat":{
					"class":"col-md-1 small rel-title",
					"text":"Катег."
				},
				"title":{
					"class":"col-md-7 small rel-title",
					"text":"Описание"
				}
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"	
				},
				"snip_cat":{
					"class":"col-md-1 small",
					"field": "snip_cat",
					"type":"list",
					"scheme": "snippet-cat"
					
				},
				"title":{
					"class":'col-md-7 small rel-col',
					"type":"obj",
					"field":"title"
				}
			}			
		},
		"error":{
			"head_title":{
				"text":"Ошибки:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-6 small rel-title",
					"text":"Описание"
				},
				"status":{
					"class":"col-md-2 small rel-title",
					"text":"Статус"
				}
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"	
				},
				"title":{
					"class":'col-md-6 small rel-col',
					"type":"obj",
					"field":"title"
				},
				"status":{
					"field":"status",
					"class":'col-md-2 small rel-col',
					"type":"list",
					"scheme":"status-opf"
				}
			}			
		},
		"project":{
			"head_title":{
				"text":"Проект",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"title":{
					"class":"col-md-8 small rel-title",
					"text":"Описание"
				}
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type":"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type":"obj_link_read"
				},
				"title":{
					"class":'col-md-8 small rel-col',
					"type":"obj",
					"field":"title"
				}
			}			
		},
		"accounting":{
			"head_title":{
				"text":"Аккаунтинг:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"date":{
					"class":"col-md-1 small rel-title",
					"text":"Дата"
				},
				"accounting_cat":{
					"class":"col-md-2 small rel-title",
					"text":"Категория"
				},
				"value":{
					"class":"col-md-1 small rel-title",
					"text":"Сумма"
				},
				"title":{
					"class":"col-md-2 small rel-title",
					"text":"Описание"
				},
				"tags":{
					"class":"col-md-2 small rel-title",
					"text":"Описание"
				}
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type" :"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type" :"obj_link_read"
				},
				"date":{
					"class":"col-md-1 small rel-col",
					"type" :"obj",
					"field":"date"
				},
				"accounting_cat":{
					"field" :"activity_cat",
					"class" :'col-md-2 small rel-col',
					"type"  :"list",
					"scheme":"accounting-cat"
				},
				"value":{
					"class":"col-md-1 small rel-title",
					"type" :"obj",
					"field":"value"
				},
				"title":{
					"class":'col-md-2 small rel-col',
					"type" :"obj",
					"field":"title"
				},
				"tags":{
					"class":'col-md-2 small rel-col',
					"type" :"obj",
					"field":"tags"
				}
			}			
		},
		"activity":{
			"head_title":{
				"text":"Активности:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"date":{
					"class":"col-md-2 small rel-title",
					"text":"Дата время"
				},
				"activity_cat":{
					"class":"col-md-2 small rel-title",
					"text":"Вид"
				},
				"title":{
					"class":"col-md-4 small rel-title",
					"text":"Описание"
				}				
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type" :"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type" :"obj_link_read"
				},
				"date":{
					"class":"col-md-2 small rel-col",
					"type" :"obj",
					"field":"activity_datetime"
				},
				"activity_cat":{
					"field" :"activity_cat",
					"class" :'col-md-2 small rel-col',
					"type"  :"list",
					"scheme":"activity-cat"
				},
				"title":{
					"class":'col-md-4 small rel-col',
					"type" :"obj",
					"field":"title"
				}
			}			
		},
		"contact":{
			"head_title":{
				"text":"Контакт:",
				"class":"col-md-12 text-left rel-head"
			},
			"col_title":{
				"rel":{
					"class":"col-md-2 small rel-title",
					"text":"Отношение"
				},
				"id":{
					"class":"col-md-1 small rel-title",
					"text":"Ид"
				},
				"surname":{
					"class":"col-md-2 small rel-title",
					"text":"Фамилия"
				},
				"name":{
					"class":"col-md-2 small rel-title",
					"text":"Имя"
				}			
			},
			"cols":{
				"rel":{
					"class":"col-md-2 small rel-col",
					"type" :"rel",
				},
				"id":{
					"class":'col-md-1 small rel-col',
					"type" :"obj_link_read"
				},
				"surname":{
					"class":"col-md-2 small rel-col",
					"type" :"obj",
					"field":"surname"
				},
				"name":{
					"field" :"activity_cat",
					"class" :'col-md-2 small rel-col',
					"type" :"obj",
					"field":"name"
				}
			}			
		}
	}