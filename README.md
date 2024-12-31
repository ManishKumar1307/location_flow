# build-full-stack-Location_Flow


## How to run this project:

### For Frontend 
Follow the below steps to run the project: 
- Firstly clone or unzip the project folder.
* Go to the frontend directory by using the following command ``` cd frontend ```.
* * create a **.env.local** file in the backend root directory as the same level where the **package.json** is located and keep the following environment variables there:
```
REACT_APP_OPENCAGE_API_KEY=your-api-key-here

+ Then run `` npm install `` commend to install node dependencies.
- Finally, to run the project, use ``npm run dev`` command.


### For Backend
Follow the below steps to run the project: 
- Firstly clone or unzip the project folder.
* Go to the backend directory by using the following command ``` cd backend```.
+ Then run `` npm install `` commend to install node dependencies.
* create a **.env** file in the backend root directory as the same level where the **package.json** is located and keep the following environment variables there: 
```
PORT="5000"
MONGO_URI="mongodb://localhost:27017/location_address"
JWT_SECRET="cc2878e73bbfb52a10906bdd7f86da680c59de76993b6d2dbcac875b2ff18e15"
GEOCODING_API_KEY="your-geocoding_api_key"

Note: Please setup mongodb and change the MongoDB url and set your jwt secret key above.
```

- Finally, to run the project, use ``npm run start:dev`` command.
