# -*- coding: utf-8 -*-

import os, sys
import json
import object2db
import shutil
from settings import SETTINGS

class ActionFile:

    def execute(self, json_req ):
        json_obj = json.loads(json_req)
        obj2db = object2db.CObject2Db()
        action = json_obj["action"]
        object_type = json_obj["object"]
        if action == "dir_create":
            path = obj2db.getPathDirCreate(object_type)
            id = json_obj["id"]
            title = json_obj["title"]
            self.dir_create( path, id , title )

    def dir_create(self, path, id, title):
        id_str = SETTINGS.STR_FORMAT_ID_FOR_DIR.format(id)
        title = title.replace(" ", "_")
        dir_path =  path + id_str + "_" + title
        dir_template = path + SETTINGS.TEMPLATE_CREATE_FOLDER
        if not os.path.isdir(dir_path):
            #Если ли есть папка шаблон, то копируем ее
            if os.path.isdir(dir_template):
                 shutil.copytree(dir_template, dir_path)
            #Если шаблона нет, то просто создаем пустую папку
            else:
                os.mkdir( dir_path )

    def file_open(self):
        pass

    def dir_open(self):
        pass

    def script_start(self):
        pass


#req_create_dir = '{ "action":"dir_create", "object":"task", "id":"1", "title":"Привет малыш"}'
#action_file    =  ActionFile()
#action_file.execute( req_create_dir )

#'{"action_type":"file",  "action":"dir_create", "object":"task", "id":"2", "title":"Привет"}'
#'{ "action":"file_open"}'
#'{ "action":"script_start"}'


