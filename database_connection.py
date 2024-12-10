#!/usr/bin/env python3


import cgitb
import cx_Oracle
cgitb.enable()
print("Content-Type: text/html\n")


print('<!DOCTYPE html>')
print('<html>')
print('<head>')
print('<title>The Crop Report</title>')
print('</head>')
print('<body>')
conn = cx_Oracle.connect(dsn="geoslearn", user="s2630332", password='005588')
c = conn.cursor()

c.execute("SELECT * FROM s2750126.TREES")
for row in c:
 print("<p>",row[0],"<b>,",row[1],"</b>,",row[2],",",row[3],',',row[4],"</p>")
conn.close()
print('</body>')
print('</html>')

