# -*- coding: utf-8 -*-
#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      Admin
#
# Created:     08.08.2015
# Copyright:   (c) Admin 2015
# Licence:     <your licence>
#-------------------------------------------------------------------------------
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
import settings
import json2sql
import dbserver
import actionfile

class MyServer(BaseHTTPRequestHandler):

    def do_POST(self):
        self.send_response(200, "ok")
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*");
        self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        self.end_headers()

        length = int(self.headers.get('content-length'))
        data_string = self.rfile.read(length).decode("utf-8")

        print(b"---")
        print(data_string)
        print("---")
        #Распределение запросов
        #Обработка запроса к файловой системе
        data_obj = json.loads(data_string)
        if 'action_type' in data_obj:
            action_type = data_obj["action_type"]
            if action_type == "file":
                action_file = actionfile.ActionFile()
                action_file.execute(data_string)
        else:
            #Обработка запроса к бд
            j2s = json2sql.CJson2sql()
            db  = dbserver.CDbServer()
            req_sql = j2s.get(data_string)
            res_sql = db.execute(req_sql)

        data = json.dumps(res_sql)
        print(data)
        self.wfile.write(bytes(data, "utf-8"))

myServer = HTTPServer((settings.HOSTNAME, settings.HOSTPORT), MyServer)
print(time.asctime(), "Server Starts - %s:%s" % (settings.HOSTNAME, settings.HOSTPORT))

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    pass

myServer.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (settings.HOSTNAME, settings.HOSTPORT))


##def main():
##    pass
##
##if __name__ == '__main__':
##    main()
