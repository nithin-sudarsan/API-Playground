# API-Playground
## About
API-Playground is a full-stack web application developed as part of my internship project at [Perfios](https://www.perfios.com/). It serves as a dynamic portal where users can seamlessly experiment with various APIs and instantly observe the corresponding real-time responses
## Working of the web-app
Users are required to upload two files in order to add an API to try it out. The first file being the API Documentation and the second file being a CSV file that contains all the headers that are required by the API. Current version of the application supports OpenAPI Specification 3.0 standards for API documentation. 
### Structure of API Documentation ([sample documentation]())
1. **OpenAPI** (String): The version of the OpenAPI specification

2. **Info** (Object): General information about the API
   - Title (String): The title of the API 
   - Description (String): A brief description of the API's purpose.
   - Version (String): The version number of the API 

3. **Servers** (array): An array of server objects
   - Url (String): The base URL of the server

4. **Paths** (Object): Defines the available API endpoints and their operations
   - Each path is a key-value pair where the key represents the endpoint URL and each endpoint contains details about the HTTP methods and their associated information 

5. **Components** (Object): Contains reusable components like schemas
   - Schemas (Object): Defines data models or schemas used in the API
       - Type (String): The type of the object
       - Properties (Object): Describes the properties of the object
## User Journey
![Flowchart (3) (1)](https://github.com/nithin-sudarsan/API-Playground/assets/84195790/d7d04f96-b48c-467c-939b-f432569e29d8)
## 
