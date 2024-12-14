""" TIGIS Flask app for demonstration and learning
    To run on XRDP
    geos-flask --app myflaskapp run --debug

    See https://flask.palletsprojects.com/en/stable/quickstart/
"""

from flask import Flask
import json
from flask import render_template
import oracledb
from pathlib import Path
import os
import sys
import logging
from flask import url_for
import cx_Oracle
import cgitb

app = Flask(__name__)

def get_password(passfile='/home/s2630332/RPPP/Greenspace-R/Captial-Greenspaces-Project-Group-3-main/database_password'):
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
    message = """Hello world. This is a flask app. 
            Explore the other pages by appending the various @app.route arguments to this URL."""
    return message

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
    with open('/home/s2630332/RPPP/Greenspace-R/Captial-Greenspaces-Project-Group-3-main/static/boundary.json') as file:
        geojson_data = json.load(file)
    #geojson_data=json.dumps(geojson_data)
    return render_template('leafletmarkers_copy.html',markers=data,geojson_data=json.dumps(geojson_data))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=55401 , debug=True)