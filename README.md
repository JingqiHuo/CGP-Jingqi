#  Capital Greenspaces Project - Group 3 - Carbon Sinks

This project has been completed as a core component of the TIGIS course (University of Edinburgh, 2024-25). Our team has produced a website that interactively presents the findings of our Capital Green Space project.


The website can be accessed [here](www.geos.ed.ac.uk/roseburnbiomass).  
The website report can be accessed [here](link to our documentation). 

## Description 

This website utilises a combination of Python, JavaScript, HTML, CSS and SQL. It was created using [Flask](https://flask.palletsprojects.com/en/stable/), which is a Python web framework used to build web applications. The maps inside the website were based on [Leaflet](https://leafletjs.com/) - a JavaScript library used for building interactive maps and [Mapbox](https://www.mapbox.com/maps#:~:text=Frequently%20asked%20questions,map%20loads%2C%20and%20monthly%20requests.) - an API that provides tools for integration and publication of web maps. The website was deployed using Gunicorn, a Python WSGI HTTP server that can handle web requests for python applications.  


The main folder for this project contains app.py (from where the website can be started); fetchdata.py (used to fetch data from the database); rastermap.py and vector.py (to render the raster/vector maps); the static folder; and the templates folder. 

## Getting Started  

  To run the website from your local machine: 
### Dependencies
  
1. Install the latest version of Python
  
2. Install dependencies (in terminal)
   
       
       pip install Flask
       pip install cx_Oracle
      

### Setup 

1. Clone the repository 
      ```linux
    git clone https://github.com/kfrancesling/Captial-Greenspaces-Project-Group-3.git
      ```
2. Set environment variables: Navigate to the project directory and set environment variables (in terminal):
    Go to the [Mapbox Website](https://www.mapbox.com/)
- On Windows: 
     ```batch
    set MAPBOX_API_KEY= <your tokens>
     ```
- On Linux or Mac: 
     ```linux
     export MAPBOX_API_KEY= <your tokens>
     ```
3. Create the password file: Navigate to row 60 in fetchdata.py, replace the username with your own UUN, and create a new file in home directory called ‘databasepassword.txt’ with your password to Oracle database in it.

### Executing Program 

1. Prepare to run (in terminal):
    ```linux
    python app.py
    ```
2. Access the website:
 
    Hold ctrl and left click on the provided link in terminal to access the webpage. 

## Troubleshooting 

There might be a CORS issue about the deployment platform, which blocks the images display, may get fixed in the future.
If you encounter any other issues or require any further clarification, please don't hesitate to contact s2750126@ed.ac.uk. 

## Authors

Frances Lingard (primary contributor), Jingqi Huo, Rachel Fry, Catriona Bruce, Shengying Xin and Ellen Somersalo






 
