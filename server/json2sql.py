# -*- coding: utf-8 -*-

import json
import object2db
import time

class CJson2sql:

    CONST_AND = " AND "
    CONST_AND_LEN = len(CONST_AND)

    def get(self, json_req):

        obj2db = object2db.CObject2Db()
        json_obj = json.loads(json_req)

        work_db    = obj2db.getDb(json_obj["object"])    #получение бд по объекту
        work_table = obj2db.getTable(json_obj["object"]) #получение таблицы по объекту

        res_sql ={}
        object_name = json_obj["object"]
        action = json_obj["action"].lower()
        res_sql["action"] = action
        res_sql["db_name"] = work_db
        res_sql["items"] = []

        if ( action == "delete_all" ):
            #не очень красивый хак с delete_all
            res_sql["sql"] = self.get_delete_all(work_table)
        else:
            for msg in json_obj["items"]:
                res_msg = {}
                res_msg["id"] = msg["id"]
                res_msg["table"] = work_table
                if ( action == "insert") :
                    sql = self.get_insert(msg["msg"], work_table)
                elif ( action == "delete" ):
                    sql = self.get_delete(msg["msg"], work_table)
                elif ( action == "update" ):
                    sql = self.get_update(msg["msg"], work_table)
                elif ( action == "select" ):
                    sql = self.get_select(msg["msg"], work_table)
                elif ( action == "get_object_status"):
                    sql = self.get_object_status(object_name)
                else:
                    #Генерация исключения
                    pass
                res_msg["sql"] = sql
                res_sql["items"].append(res_msg)

        return res_sql

    def get_object_status(self, object_name):
        return 'select status_scheme, status_text, status_id from sys_status left join sys_object2status on sys_object2status.status_scheme = sys_status.scheme where sys_object2status.object = "' + object_name + '" order by status_id asc'

    def get_insert(self, msg, table):
        fields_name = ""
        fields_value = ""

        #Добавить поле с датой создания
        msg["fields"]["sys_created_at"] = time.strftime("%d.%m.%Y %H:%M:%S", time.localtime())
        msg["fields"]["sys_updated_at"] = msg["fields"]["sys_created_at"]

        for key in msg["fields"].keys():
            fields_name  = fields_name + key + ","
            fields_value = fields_value + '"' + self.screening(msg["fields"][key]) + '"' + ","

        fields_name = self.remove_last_ch(fields_name)
        fields_value = self.remove_last_ch(fields_value)

        return "insert into " + table + " ( " + fields_name + " ) " + " values ( " +  str(fields_value)  + " ) "

    def get_delete(self, msg, table):
        fields_name = ""
        fields_value = ""

        for key in msg["fields"].keys():
            exp_where = key + " = " + str(msg["fields"][key]) + self.CONST_AND

        exp_where = exp_where[:(-1)*self.CONST_AND_LEN]

        return "delete from " + table + " where " + exp_where

    def get_delete_all(self, table):
        return "delete from " + table

    def get_update(self, msg, table):

        #msg["sys_updated_at"] = strftime("%d.%m.%Y %S:%H:%M", gmtime())

        fields_set = ""

        #Обновить поле со временем обновления
        msg["fields_set"]["sys_updated_at"] = time.strftime("%d.%m.%Y %H:%M:%S", time.localtime())

        for key in msg["fields_set"].keys():
            fields_set = fields_set + key + " = " + '"' + str(msg["fields_set"][key]) + '"' + ","
        fields_set = self.remove_last_ch(fields_set)

        fields_where = ""
        for key in msg["fields_where"].keys():
            fields_where = fields_where + key + " = " + str(msg["fields_where"][key]) + self.CONST_AND
        fields_where = fields_where[:(-1)*self.CONST_AND_LEN]

        return "update " + table + " set " + fields_set + " where " + fields_where

    def get_select(self, msg, table):
        exp_where = ""
        for field in msg["fields"]:
            exp_where = exp_where + field["column"] + " " + field["op"] + "'" + str(field["value"]) + "'" + self.CONST_AND
        exp_where = exp_where[:(-1)*self.CONST_AND_LEN]

        return "select * from " + table + " where " + exp_where

    def screening(self, str_sql):
        str_screening = str_sql.replace('"', '\"')
        str_screening = str_screening.replace("'", "\'")
        return str_screening

    def remove_last_ch(self, s):
        return s[:-1]

#x = CJson2sql()

#json_req_get_object_status = '{"object":"person", "action":"get_object_status", "items":[{"id":1}]}';
#y = x.get(json_req_get_object_status)
#print( y )

#json_req_insert = '{"object":"Person", "action":"insert", "items":[{"id":1,"msg":{"fields": {"field1":"val \' sd1","field2":"val2"} } },{"id":2,"msg":{"table":"table_name2","action":"insert", "fields": {"field1":"val1","field2":"val2"} }}]}'
#y = x.get(json_req_insert)
#print( y )

#json_req_delete = '{"object":"Person", "action":"delete", "items":[{"id":1,"msg":{"fields": {"field1":"val1","field2":"val2"} } },{"id":2,"msg":{"table":"table_name2","action":"delete", "fields": {"field1":"val1"} }}]}'
#y = x.get(json_req_delete)
#print( y )

#json_req_delete_all = '{"object":"Person", "action":"delete"_all}'
#y = x.get(json_req_delete)
#print( y )

#json_req_update = '{"object":"Person", "action":"update", "items":[{"id":1,"msg":{"fields_set": {"field1":"val1","field2":"val2"}, "fields_where":{"field_where1": 1, "field_where2": 2} } }]}'
#y = x.get(json_req_update)
#print( y )

#json_req_select = '{"object":"Person", "action":"select", "items":[{"id":1,"msg":{"fields": [{"column":"col1", "op":"=", "value":"val1"},{"column":"col1", "op":">", "value":"5"}]}}]}'
#y = x.get(json_req_select)
#print( y )
