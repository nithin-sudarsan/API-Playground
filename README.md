# API-Playground
## About
API-Playground is a full-stack web application developed as part of my internship project at [Perfios](https://www.perfios.com/). It serves as a dynamic portal where users can seamlessly experiment with various APIs and instantly observe the corresponding real-time responses
## Working of the web-app
Users are required to upload two files in order to add an API to try it out. The first file being the API Documentation and the second file being a CSV file that contains all the headers that are required by the API. Current version of the application supports OpenAPI Specification 3.0 standards for API documentation. 
### Structure of API Documentation ([sample file](Sample%20Files/OpenAPI3.json))
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
### Structure of Headers File ([sample file](Sample%20Files/OpenAPI3.json))
Headers file is a simple CSV File that contains the headers that are necessary while making API calls.
The Headers CSV file is expected to have the following structure:
|       |  |
| ----------- | ----------- |
| Headers key   | Headers value  |

## User Journey
![Flowchart (6)](https://github.com/AnuroopKeshav/NaiveBayesClassifier/assets/84195790/ffed7813-14a5-4cb1-bf5d-607d89a05e15)

## UI Screenshots
### Home Page
![WhatsApp Image 2023-05-24 at 23 57 51 (1)](https://github.com/AnuroopKeshav/NaiveBayesClassifier/assets/84195790/b6cab4da-01be-4f63-919a-c3fd018d26ee)
### Playground
![WhatsApp Image 2023-05-24 at 23 58 32 (1)](https://github.com/AnuroopKeshav/NaiveBayesClassifier/assets/84195790/aceab046-4a1d-4527-997a-cac2d710e2c1)
