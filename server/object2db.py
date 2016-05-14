
class CObject2Db:
    CUR_DB = "lsu.db"
    CONST_OBJECT2DB = {
        #----------------------------------

        #----------------------------------
        "rel_items":{
            "db"   : CUR_DB,
            "table": "sys_rel2obj_items"
        },
        "object_types":{
            "db"   :CUR_DB,
            "table": "sys_object_type"
        },
        "rel_types":{
            "db"   :CUR_DB,
            "table": "sys_rel"
        },
        "sys_rel_object2object":{
            "db"   :CUR_DB,
            "table": "sys_rel_object2object"
        },
        "question":{
            "db"   :CUR_DB,
            "table": "question"
        },
        "error":{
            "db"   :CUR_DB,
            "table": "error"
        },
        "status":{
            "db"   :CUR_DB,
            "table": "sys_status"
        },
        "diary":{
            "db"   : CUR_DB,
            "table": "diary"
        },
        "think":{
            "db"   : CUR_DB,
            "table": "think"
        },
        "project":{
            "db"    : CUR_DB,
            "table" : "project",
			"dir_create": "../project/"
        },
        "task":{
            "db"        : CUR_DB,
            "table"     : "task",
            "dir_create": "../task/"
        },
        "sap_object":{
            "db"    : CUR_DB,
            "table" : "sap_object"
        },
		"accounting":{
            "db"    : CUR_DB,
            "table" : "accounting"
        },
        "diary_job":{
            "db"    : CUR_DB,
            "table" : "diary_job"
        },
        "timing":{
            "db"    : CUR_DB,
            "table" : "timing"
        },
        "note":{
            "db"    :CUR_DB,
            "table" :"note"
        },
        "snippet":{
            "db"    :CUR_DB,
            "table" :"snippet"
        },
         "contact": {
            "db"   : CUR_DB,
            "table": "contact"
        },
        "rule": {
            "db"   : CUR_DB,
            "table": "rule"
        },
        "activity": {
            "db"   : CUR_DB,
            "table": "activity"
        }
    }

    def getPathDirCreate(self, object_type):
        return self.CONST_OBJECT2DB[object_type.lower()]["dir_create"]

    def getDb(self, object_type):
        db = self.CONST_OBJECT2DB[object_type.lower()]["db"]
        return db

    def getTable(self, object_type):
        table = self.CONST_OBJECT2DB[object_type.lower()]["table"]
        return table

#print(C_OBJECT2DB["person"]["db"])
#print(C_OBJECT2DB["person"]["table"])