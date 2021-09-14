# Healthcare-Companion-API

> Backend API for the Healthcare Companion application

## Setup and Usage

- Rename config.env.env to config.env
- Update .env values to your own

<span style="color:#F9A03C" >
In the config file the HCC_EMIL field
if you are going to use Gmail as the mail serves on the app make sure to alow the less secure apps on the security settings.
</span>

read more about this [Nodemailer: Using Gmail](https://nodemailer.com/usage/using-gmail/)

## Install Dependencies

```
npm install
```

## Run App

- Run in development mode

```
npm run dev
```

- Run in production mode

```
npm start
```

---

## API Documentation

- <a href="#Authentication-Users">Authentication & Users</a>
  - <a href="#Register-Patient">Register a user (Patient)</a>
  - <a href="#Register-Doctor">Register a user (Doctor)</a>
  - <a href="#Register-Medical-Facility-Worker">Register a user (Medical Facility Worker)</a>
  - <a href="#Login-User">Login User</a>
  - <a href="#Get-logged-in-user-data">Get logged in user data</a>
  - <a href="#Logout">Logout</a>
  - <a href="#Get-access-code-for-Patient">Get access code for (Patient)</a>
  - <a href="#Forgot-Password">Forgot Password</a>
  - <a href="#Reset-password">Reset password</a>
- <a href="#Account-Management">Account Management</a>
  - <a href="#Change-user-email">Change user email</a>
  - <a href="#Change-user-password">Change user password</a>
  - <a href="#Change-user-habits">Change user habits</a>
  - <a href="#Change-user-profile-picture">Change user profile picture</a>
- <a href="#Medical-Reports">Medical Reports</a>
  - <a href="#Create-New-Medical-Report">Create New Medical Report</a>
  - <a href="#Get-All-Medical-Reports">Get All Medical Reports</a>
  - <a href="#Get-Reports-By-Access-Code">Get All Patient Medical Reports By Access Code</a>
  - <a href="#Get-Medical-Reports-By-Id">Get a Medical Reports By Id</a>
  - <a href="#Toggle-Medical-Report-Visibility">Toggle Medical Report Visibility</a>
- <a href="#Health-Tests">Health Tests</a>
  - <a href="#Get-All-Health-Tests">Get All Health Tests</a>
  - <a href="#Get-Tests-By-Access-Code">Get Requested Health Tests By Access Code</a>
  - <a href="#Get-a-Health-Test-By-Id">Get a Health Test By Id</a>
  - <a href="#Upload-Health-Test-Results">Upload Health Test Results</a>
- <a href="#Prescriptions">Prescriptions</a>
  - <a href="#Get-All-Prescriptions">Get All Prescriptions</a>
  - <a href="#Get-a-Prescription-By-Id">Get a Prescription By Id</a>
  - <a href="#Set-Prescription-As-Fulfilled">Set Prescription As Fulfilled</a>

---

<div id="Authentication-Users"></div>

- ### Authentication & Users

<div id="Register-Patient"></div>

> #### Register a user (Patient).

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#FF6C37;
     font-weight:500;
     " >
POST
</span>
http://localhost:5000/api/auth/register
</div>

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "user":{
        "role":"Patient",
        "firstName":"John",
        "middleName":"Joey",
        "lastName":"Doe",
        "gender":"Male",
        "dateOfBirth": "1980-01-01",
        "email":"john_doe@gmail.com",
        "password":"123456"
    },
    "patient":{
        "smokingHistory":"Smoker",
        "alcoholIntake": "Abstaining",
        "drugUse":"Abstaining"
    }
}
```

---

<div id="Register-Doctor"></div>

> #### Register a user (Doctor).

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#FF6C37;
     font-weight:500;
     " >
POST
</span>
http://localhost:5000/api/auth/register
</div>

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "user":{
        "role":"Doctor",
        "firstName":"John",
        "middleName":"Joey",
        "lastName":"Doe",
        "gender":"Male",
        "dateOfBirth": "1980-01-01",
        "email":"john_doe@gmail.com",
        "password":"123456"
    },
    "doctor":{
        "specialty":"Dermatology",
        "clinicName":"Doe central clinic",
        "phoneNumbers":["0123456789","0012345678"]
    }
}
```

---

<div id="Register-Medical-Facility-Worker"></div>

> #### Register a user (Medical Facility Worker).

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#FF6C37;
     font-weight:500;
     " >
POST
</span>
http://localhost:5000/api/auth/register
</div>

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "user":{
        "role":"Medical-Facility-Worker",
        "firstName":"John",
        "middleName":"Joey",
        "lastName":"Doe",
        "gender":"Male",
        "dateOfBirth": "1980-01-01",
        "email":"john_doe@gmail.com",
        "password":"123456"
    },
    "medicalFacilityWorker":{
        "facilityName":"Radiology-X",
        "facilityType":"Radiology-center",
        "facilityPhoneNumbers":["0123456789","0012345678"]
    }
}
```

---

<div id="Login-User"></div>

> #### Login User

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#FF6C37;
     font-weight:500;
     " >
POST
</span>
http://localhost:5000/api/auth/login
</div>

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "email":"john_doe@gmail.com",
    "password":"123456"
}
```

---

<div id="Get-logged-in-user-data"></div>

> #### Get logged in user data

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/auth/me
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Logout"></div>

> #### Logout

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/auth/logout
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Get-access-code-for-Patient"></div>

> #### Get access code for (Patient)

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/auth/access-code
</div>

##### Description

An access code is a way doctors and medical facility workers
access a patient and his medical information.

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Forgot-Password"></div>

> #### Forgot password

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/auth/forgot-password
</div>

##### Description

Sends an email to the user with a verification code.

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "email":"john_doe@gmail.com",
}
```

---

<div id="Reset-password"></div>

> #### Reset password

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/auth/reset-password
</div>

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "email":"john_doe@gmail.com",
    "newPassword":"123456789",
    "verificationCode":"4W32I9W"
}
```

---

<div id="Account-Management"></div>

- ### Account Management

<div id="Change-user-email"></div>

> #### Change user email

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/account/update-email
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "newEmail":"john.doe@gmail.com",
    "password":"123456"
}
```

---

<div id="Change-user-password"></div>

> #### Change user password

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/account/update-password
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "newPassword":"1234567",
    "oldPassword":"123456"
}
```

---

<div id="Change-user-habits"></div>

> #### Change user habits

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/account/update-habits
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

##### Headers

| Key          |      Value       | Description |
| ------------ | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "habits":{
        "smokingHistory":"Abstaining",
        "alcoholIntake":"Abstaining",
        "drugUse": "Abstaining"
    }
}
```

---

<div id="Change-user-profile-picture"></div>

> #### Change user profile picture

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/account/update-profile-image
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

##### Body

Form data
| Key | Value | Description |
| ------------ | :--------------: | ----------: |
| img | Image | File:Image |

---

<div id="Medical-Reports"></div>

- ### Medical Reports

<div id="Create-New-Medical-Report"></div>

> #### Create New Medical Report

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#FF6C37;
     font-weight:500;
     " >
POST
</span>
http://localhost:5000/api/medical-reports/:accessCode
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

##### Headers

|     Key      |      Value       | Description |
| :----------: | :--------------: | ----------: |
| Content-type | application/json |   JSON Type |

##### Body

```Json
{
    "mainReport":{
        "familyHistoryFindings":{
            "findings":["Info 1","Info 2"]
        },
        "discoveredAllergies": {
            "allergies":["Allergy 1","Allergy 2"]
        },
        "discoveredChronicConditions":{
            "conditions":[" Chronic Condition 1","Chronic Conditions 2"]
        },
        "patientComplaints": "Demo text",
        "symptoms":"Demo text",
        "diagnose":"Demo text"
    },
    "prescription":{
        "medications": ["Medication 1","Medication 2"],
        "additionalInformation": "Demo text"
    },
    "radiologyTests":{
        "testType":"Radiology-Test",
        "tests":["Radiology test 1","Radiology test 2","Radiology test 3"]
    },
    "labTests":{
        "testType":"Lab-Test",
        "tests":["Lab test 1","Lab test 2","Lab test 3"]
    }
}
```

---

<div id="Get-All-Medical-Reports"></div>

> #### Get All Medical Reports

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/medical-reports/history
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Get-Reports-By-Access-Code"></div>

> #### Get All Patient Medical Reports By Access Code

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/medical-reports/history/:accessCode
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Get-Medical-Reports-By-Id"></div>

> #### Get a Medical Reports By Id

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/medical-reports/:id
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Toggle-Medical-Report-Visibility"></div>

> #### Toggle Medical Report Visibility

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/medical-reports/:id
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Health-Tests"></div>

- ### Health Tests

<div id="Get-All-Health-Tests"></div>

> #### Get All Health Tests

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/health-tests/
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Get-Tests-By-Access-Code"></div>

> #### Get Requested Health Tests By Access Code

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/health-tests/requests/:accessCode
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Get-a-Health-Test-By-Id"></div>

> #### Get a Health Test By Id

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/health-tests/:id
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Upload-Health-Test-Results"></div>

> #### Upload Health Test Results

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/health-tests/:id
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

##### Body

Form data
| Key | Value | Description |
| :------------: | :--------------: | :-------------: |
| results | Images/PDFs | File:Image And/Or File:PDF |

---

<div id="Prescriptions"></div>

- ### Prescriptions

<div id="Get-All-Prescriptions"></div>

> #### Get All Prescriptions

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/prescriptions/
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Get-a-Prescription-By-Id"></div>

> #### Get a Prescription By Id

<div style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#13aa52;
     font-weight:500;
     " >
GET
</span>
http://localhost:5000/api/prescriptions/:id
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

<div id="Set-Prescription-As-Fulfilled"></div>

> #### Set Prescription As Fulfilled

<div id="bottom" style="
    color:#fff; 
    background-color:#6b6b6b; 
    display:inline-block; 
    padding-right:20px ;
    border-radius:3px;">
<span style="
     display:inline-block;
     text-align:center;
     border-radius:3px; 
     width:60px; 
     color:#fff; 
     padding:2px; 
     margin-right:5px;
     background-color:#1572B6;
     font-weight:500;
     " >
PUT
</span>
http://localhost:5000/api/prescriptions/:id
</div>

##### Authorization

Bearer Token: The response of (login/register) user, looks like:

```Json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ZjMjA2ODIzMTQ0ZTI3ZjVkMzRkMCIsImlhdCI6MTYzMTU2ODM5MCwiZXhwIjoxNjM0MTYwMzkwfQ.yejLr6o1YWZpWqJFzAdkadsamssPvZsh2-UGkPjxMaI"
}
```

---

---

- Version: 1.0.0
- License: MIT
