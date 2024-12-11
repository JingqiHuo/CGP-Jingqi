""" TIGIS Flask app for demonstration and learning
    To run on XRDP
    geos-flask --app myflaskapp run --debug

    See https://flask.palletsprojects.com/en/stable/quickstart/
"""

from flask import Flask, render_template, jsonify
import json
import oracledb
from pathlib import Path
import os
import sys
import logging
from flask import url_for
import cx_Oracle
import cgitb

app = Flask(__name__)

def get_password(passfile='RPPP/Greenspace-R/Captial-Greenspaces-Project-Group-3-main/database_password'):
    """Reads a password from a file in stored in the home directory of the user.
    Args:
        passfile (str, optional): A filename containing the password in the users home directory
    Returns:
        str: a password in plain text
    Raises:
        FileNotFoundError: if the password file does not exist
    """     
    home = Path.home()
    passfile = os.path.join(home, passfile)
    try:
        with open(passfile) as file:
            pw = file.readline().strip()
        return pw
    except FileNotFoundError as detail:
        logging.error(f'Password file not found: {detail}')
        sys.exit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/trees') 
def retreive():
    """ Display Oracle table in an HTML table """
    cgitb.enable()      #not sure if need or not
    password = get_password()

    connect = cx_Oracle.connect(dsn="geoslearn", user="s2630332",password=password)
    with connect.cursor() as c:
        c.execute("select * from s2750126.trees")   #sql query
        data = c.fetchall()
        #present data 
        column_headings = tuple()
    title = "Roseburn Tree data - from an Oracle Database" ##DONT HAVE COLUMN HEADINGS
    return render_template('table1.html', table=data, title=title)

    #c.execute("SELECT Latitude FROM s2750126.trees")
    #for row in c:
    #    print("<p>",row[0],"</p>")
    #    latitude = c.fetchall()
    #c.execute("SELECT Longitude FROM s2750126.trees")
    #for row in c:
    #    print("<p>",row[0],"</p>")
    #    longitude = c.fetchall()
    ##print(latitude)
    ##print(longitude)
    #return render_template('table1.html', table=data)
    ##connect.close()
    
@app.route('/markers')
def map():
    password = get_password()
    connect = cx_Oracle.connect(dsn="geoslearn", user="s2630332",password=password)
    with connect.cursor() as c:
            c.execute("select * from s2750126.trees")     #sql query
            data = c.fetchall()
            print(data)

    #this two lines################
    with open('/home/s2630332/RPPP/Greenspace-R/Captial-Greenspaces-Project-Group-3-main/static/boundary.json') as f:
        geojson_data = json.load(f)    
    #########################

    #geojson_data=json.dumps(geojson_data)###########
    return render_template('leafletmarkers.html',markers=data,geojson_data=json.dumps(geojson_data))
###################





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=55401 , debug=True)