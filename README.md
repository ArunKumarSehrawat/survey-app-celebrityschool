# survey-api-celebrityschool

### Use PostMan to communicate with the API
### As per conversation with Prateek Sir, this app uses files inside the `data` directory to store `USERS` and `SURVEYS`.

---

### Fork this repository and run this command in these terminal
```
npm install
npm start
```

---

1. **Register** :  
Endpoint : [http://localhost:3000/register](http://localhost:3000/register)  
Method : `POST` - `form-urlencoded` or `RAW - JSON`   
*Request* : `name, email, password, age, gender : male | female, type: user | admin`  
```json
{
     "name" : "",
     "email" : "",
     "password" : "",
     "age" : "",
     "gender" : "male|female",
     "type" : "admin|user"
}
```
*Response* :
>Failure : `User already exists.`  
Success : `200`  

---

2. **Login** :  
Endpoint : [http://localhost:3000/login](http://localhost:3000/login)  
Method : `POST` - `form-urlencoded` or `RAW - JSON`  
*Request* : `email, password`  
```json
{
     "email" : "",
     "password" : ""
}
```
*Response* :  
>Failure : `Email doesn't exists` OR `Password did not match`  
Success : `uuid, name, email, type, age, gender` 

---

3. **Create Survey** :  
Endpoint : [http://localhost:3000/survey](http://localhost:3000/survey)  
Method : `POST` - `RAW - JSON`  
*Request* :
```json
{
     /* uuid is the uuid of the user */
     "uuid": "686543213565",
     "questions": ["question1", "question2", "..."],
     "parameters": {
          "lowAge": 5,
          "highAge": 15,
          "gender": ["male", "female"]
     }
}
```  
*Response* :  
>failure : `User doesn't exists` OR `User is not admin`  
success : `OK`

---

4. **Update Survey** :  
Endpoint : [http://localhost:3000/survey](http://localhost:3000/survey)  
Method : `PATCH` - `RAW - JSON`  
*Request* :
```json
{
     /* uuid is the uuid of the survey, creator is the uuid of the creator */
     "uuid": 686543213565,
     "creator" : 16546841316,
     "questions": ["question1", "question2", "more questions"],
     "parameters": {
          "lowAge": 0,
          "highAge": 50,
          "gender": ["male"]
     }
}
```  
*Response* :  
>failure : `Survey does not exists` OR `Creator did not match`  
success : `OK`

---

5. **Find Applicable Survey** :  
Endpoint : [http://localhost:3000/survey](http://localhost:3000/survey)  
Method : `GET` - `Query String`  
*Request* :
```
http://localhost:3000/survey?uuid=<uuid of user>
```  
*Response* :  
>failure : `Wrong uuid`  
success : `Applicable surveys in JSON`