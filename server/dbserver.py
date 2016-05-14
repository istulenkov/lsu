# -*- coding: utf-8 -*-

import sqlite3
import json

class CDbServer:

    con    = None
    cursor = None
    table  = None
    CONST_LASTROW_ID = "lastrow_id"
    CONST_STATUS = "status"
    CONST_TEXT = "text"
    CONST_TEXT_SUCCESS = "The operation completed successfully"

    def __del__(self):
        if self.con is not None:
            self.con.close()

    def get_max_id(self, table):
        self.cursor.execute("select max(id) from " + table)
        result=self.cursor.fetchone()
        if result[0] is None:
            return 0
        return result[0]

    def execute(self, json_msg_sql):
        msg_sql = json_msg_sql
        db_name = msg_sql["db_name"]
        action = msg_sql["action"]
        self.con = sqlite3.connect(db_name)
        self.cursor = self.con.cursor()
        data_new = {}


        if action == "delete_all":
            self.cursor.execute(msg_sql["sql"])
            self.con.commit()

        for msg in msg_sql["items"]:
            ret_id = msg["id"]
            data_new[ret_id] = {}

            if action == "insert":
                self.cursor.execute(msg["sql"])
                self.con.commit()
                data_new[ret_id][self.CONST_LASTROW_ID] = self.cursor.lastrowid
                data_new[ret_id][self.CONST_STATUS] = 'true'
                data_new[ret_id][self.CONST_TEXT] = self.CONST_TEXT_SUCCESS
            elif action == "update":
                self.cursor.execute(msg["sql"])
                self.con.commit()
                data_new[ret_id][self.CONST_STATUS] = 'true'
                data_new[ret_id][self.CONST_TEXT] = self.CONST_TEXT_SUCCESS
            elif action == "delete":
                self.cursor.execute(msg["sql"])
                self.con.commit()
                data_new[ret_id][self.CONST_STATUS] = 'true'
                data_new[ret_id][self.CONST_TEXT] = self.CONST_TEXT_SUCCESS
            elif action == "delete_all":
                self.cursor.execute(msg["sql"])
            elif action == "select" or action == "get_object_status":
                data_sql = []
                rows = self.cursor.execute(msg["sql"]).fetchall()
                lst_names = []
                for name in self.cursor.description:
                    #if name[0] is None:
                    #    lst_names.append("")#нужно чтобы не возвращать None в json
                    lst_names.append(name[0])

                for row in rows:
                    res = {}
                    i = 0
                    for name in lst_names:
                        if row[i] is None:
                            res[name] = ""
                        else:
                            res[name] = row[i]
                        i += 1
                    data_sql.append(res)
                data_new[ret_id]["res"] = data_sql
            else:
                pass



        return data_new


#db_server = CDbServer()
#sql_select = {"db_name":"test.db","items":[{"action": "select", "table": "person", "id": 1, "sql": "select * from person where id > 1"}]}
#db_server.execute(sql_select)
