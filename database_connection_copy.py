#!/usr/bin/env python3

from flask import Flask, render_template
import cgitb
import cx_Oracle

app = Flask(__name__)

@app.route("/trees")
def retrieve():
    cgitb.enable()

    conn = cx_Oracle.connect(dsn="geoslearn", user="s2630332",password='005588')
    c = conn.cursor()

    c.execute("SELECT Latitude FROM s2750126.trees")
    for row in c:
        print("<p>",row[0],"</p>")
        latitude = c.fetchall()
    c.execute("SELECT Longitude FROM s2750126.trees")
    for row in c:
        print("<p>",row[0],"</p>")
        longitude = c.fetchall()
    print(latitude)
    print(longitude)
    # html = []
    #         #loop through each retrieved greenspace name and get rid of non-required characters
    # for row in c.fetchall():
    #     html.extend(row)
    conn.close()

    return longitude

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=55401, debug=True)