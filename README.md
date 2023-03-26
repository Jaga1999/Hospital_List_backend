# Hospital_List_backend

## Hospital Management System API Docummentation

This backend code provides API endpoints for hospitals. It is built using Node.js and Express, and uses MongoDB as the database.

# Prerequisites

1. Node.js and npm must be installed on your system.
2. MongoDB instance should be up and running.
3. You should have the URL to your MongoDB instance.

# Getting started

1. Clone the repository.
2. Install dependencies using npm install.
3. Create a .env file in the root directory and add the following environment variables:
    * PORT: the port number to run the server on (default is 5000)
    * MONGO_CONNECT: the connection string for MongoDB
    ```
      MONGO_CONNECT=<your_mongo_url>
      PORT=<port_number>
    ```
4. Start the server using npm start.

# API Endpoints

## GET /hospitals

This endpoint retrieves all hospitals in the database.

```
http://localhost:5000/hospitals
```
### Request
  * Method: GET
  * URL: /hospitals
  * Headers: None

### Response
  * 200 OK: Returns an array of hospital objects.
  
  ```
  [  
    {   
          "_id": "<hospital_id>",  
          "name": "<hospital_name>",  
          "address": "<hospital_address>",    
          "phone": "<hospital_phone>",    
          "task": "<hospital_task>"  
    },  
  ]
  ```
  
  * 404 Not Found: If no hospitals are found in the database.
  
## GET /hospitals/:id

This endpoint retrieves a hospital with the specified ID.

```
http://localhost:5000/hospitals/:id
```

### Parameters
  * id: the ID of the hospital to retrieve.

### Request
  * Method: GET
  * URL: /hospitals/:id
  * Headers: None
  
### Response
  * 200 OK: Returns the hospital object with the specified ID.
  
```
  {    
      "_id": "<hospital_id>",  
      "name": "<hospital_name>",  
      "address": "<hospital_address>",    
      "phone": "<hospital_phone>",    
      "task": "<hospital_task>"  
  }
```
  
  * 404 Not Found: If a hospital with the specified ID is not found.
  
## POST /hospitals

This endpoint adds a new hospital to the database.

```
http://localhost:5000/hospitals
```

### Request
  * Method: POST
  * URL: /hospitals
  * Headers:
    * Content-Type: application/json
  * Body:
  
```
  {
      "name": "<hospital_name>",
      "address": "<hospital_address>",
      "phone": "<hospital_phone>",
      "task": "<hospital_task>"
  } 
```

### Request Body
  * name: the name of the hospital (required).
  * address: the address of the hospital (required).
  * phone: the phone number of the hospital (required).
  * task: a task related to the hospital (optional).
  
### Response
  * 201 Created: Returns the newly created hospital object.
```
  {
    "_id": "<hospital_id>",
    "name": "<hospital_name>",
    "address": "<hospital_address>",
    "phone": "<hospital_phone>",
    "task": "<hospital_task>"
  }
```
  
  * 500 Internal Server Error: If there was an error adding the hospital to the database.
  
## PUT /hospitals/:id

This endpoint updates a hospital with the specified ID.

```
http://localhost:5000/hospitals/:id
```

### Parameters
  * id: the ID of the hospital to update.

### Request
  * Method: PUT
  * URL: /hospitals/:id
  * Headers:
    *Content-Type: application/json
  *Body:
  
```
  {
      "name": "<hospital_name>",
      "address": "<hospital_address>",
      "phone": "<hospital_phone>",
      "task": "<hospital_task>"
  } 
```

### Request Body
  * name: the updated name of the hospital.
  * address: the updated address of the hospital.
  * phone: the updated phone number of the hospital.
  * task: the updated task related to the hospital.
  
### Response
  * 200 OK: Returns the updated hospital object.
```
  {
    "_id": "<hospital_id>",
    "name": "<hospital_name>",
    "address": "<hospital_address>",
    "phone": "<hospital_phone>",
    "task": "<hospital_task>"
  }
```

  * 404 Not Found: If a hospital with the specified ID is not found.
  * 500 Internal Server Error: If there was an error updating the hospital in the database.

## DELETE /hospitals/:id

This endpoint deletes a hospital with the specified ID.

```
http://localhost:5000/hospitals/:id
```

### Parameters
  * id: the ID of the hospital to delete.
  
### Response
  * 200 OK: Returns a message indicating the hospital was deleted.
  
  ```
  Hospital <hospital_id> deleted
  ```
  * 404 Not Found: If a hospital with the specified ID is not found.
  * 500 Internal Server Error: If there was an error deleting the hospital from the database.
