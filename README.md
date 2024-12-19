#  Capital Greenspaces Project - Group 3 - Carbon Sinks 

Capital Greenspaces Project, University of Edinburgh in 2024. This project was done as a part of our TIGIS coure by Frances Lingard, Jingqi Huo, Rachel Fry, Catriona Bruce, Shengying Xin & Ellen Somersalo. 

Our website is available [here](www.geos.ed.ac.uk/roseburnbiomass).  
Our website documentation is available [here](link to our documentation). 

## Description 

The code used on this website contains Python, JavaScript, HTML, CSS and SQL. Our website was created by using [Flask](https://flask.palletsprojects.com/en/stable/), which is a Python web framework to build web applications, designed in an HTML frame. The maps inside the website were based on [Leaflet](https://leafletjs.com/) - a JavaScript library used for building interactive maps.and [Mapbox](https://www.mapbox.com/maps#:~:text=Frequently%20asked%20questions,map%20loads%2C%20and%20monthly%20requests.) - an API for integration and publish of web maps. Deployment was done with the Gunicorn, a Python WSGI HTTP can handle web requests for python applications.  
The main folder contains app.py (nexus of applications, process and transfer data through them), fetchdata.py (fetch data from database), rastermap.py and vectormap.py (render the raster/vector map), static folder (contains our .js, .css, images and downable files), template folder (4 html files, components of the website).  

## Getting Started  

  To run our website on your local machine: 
### Dependencies
  
1. Install the latest version of Python
  
2. Install dependencies (in terminal)
   
       
       pip install Flask
       pip install cx_Oracle
      

### Installing 

1. Clone our repository 
      ```linux
      <cloning link> 
      ```
2. Setting environment variables 
   Navigate to the project directory and set environment variables (interminal):
    
- On Windows: 
     ```batch
    set MAPBOX_API_KEY= pk.eyJ1Ijoia2ZyYW5jZXNsaW5nIiwiYSI6ImNtNHNnMDIzajAwZnEybHFtMXdwM3JlOXEifQ.8HO4zb1PGp2Pa7O7kWKbFw
     ```
- On Linux or Mac: 
     ```linux
     export MAPBOX_API_KEY= pk.eyJ1Ijoia2ZyYW5jZXNsaW5nIiwiYSI6ImNtNHNnMDIzajAwZnEybHFtMXdwM3JlOXEifQ.8HO4zb1PGp2Pa7O7kWKbFw
     ```
3. Create password file 
    Navigate to row 60 in fetchdata.py, replace the user with your own UNN, create a new file in home directory called ‘databasepassword.txt’ with your password to oracle database in it.

### Executing Program 

1. Prepare to run (in terminal):
    ```linux
    python app.py
    ```
2. Get access to website:
 
    Hold ctrl and left click on the provided link in terminal to access the webpage. 

## Troubleshooting 

If you encounter any issues with our code, or need more information or clarification, please don't hesitate to contact s2750126@ed.ac.uk for help. 


 
