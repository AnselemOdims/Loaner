# Loaner

[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)
[![Build Status](https://travis-ci.org/AnselemOdims/Loaner.svg?branch=develop)](https://travis-ci.org/AnselemOdims/Loaner) 
[![Coverage Status](https://coveralls.io/repos/github/AnselemOdims/Loaner/badge.svg)](https://coveralls.io/github/AnselemOdims/Loaner)
[![Maintainability](https://api.codeclimate.com/v1/badges/31f2930d0fe4fa791126/maintainability)](https://codeclimate.com/github/AnselemOdims/Loaner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/31f2930d0fe4fa791126/test_coverage)](https://codeclimate.com/github/AnselemOdims/Loaner/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


Loaner is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

The application' UI template is on github pages [here](https://anselemodims.github.io/Loaner/UI/)

## Implemented Features

- User (client) can sign up.
- Users can login.
- User can request for loan.
- User can view the loan repayment history
- Admin can mark a client as verified, after confirming his/her home and work address.
- Admin can view a specific loan application.
- Admin can approve or reject a client's loan application.
- Admin can post loan repayment transaction in favour of a client.
- Admin can view all loan applications.
- Admin can view all current loans (not fully repaid).
- Admin can view all repaid loans.
- User can reset password.

---

## Technologies to be Used

- [NodeJS](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [Babel](https://babeljs.io/)

- [ESLint](https://eslint.org/)

- [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/)

---

## Installation

#### Clone this repository and navigate into it.

`git clone https://github.com/anselemodims/loaner.git && cd loaner`

#### Install dependencies.

`npm install`

#### Add Neccessary Environment Variables

 Add a .env file to the root and declare the following environment variables:  

- SECRET_KEY: A jswebtoken secret to encrypt jsonwebtoken

- ADMIN_PASSWORD: An Admin password to log the Admin in

#### Start the application.

`npm start`

---

## Documentation

This application is deployed on [heroku](https://credit-loaner.herokuapp.com) with the following endpoints accessible

| Method                              | Functionality                                                                                 | Endpoint                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------- |
| POST _/auth/signup_                 | Create a User account                                                                         | `api/v1/auth/signup`         |
| POST _/auth/login_         | Login a User                                                                                           | `api/v1/auth/login`          |
| PATCH _/users/\<user-email\>/verify_| Mark a user as verified                                                                       | `api/v1/users/:email/verify` |
| GET _/loans/\<loan-id\>             | Get a specific loan application                                                               | `api/v1/loans/:id`           |
| GET _/loans?status=approved&repaid=false_      | Get all current loans that are not fully repaid                                    | `api/v1/loans`               |
| GET _/loans?status=approved&repaid=true_       | Get all repaid loans                                                               | `api/v1/loans`               |
| GET _/loans_                        | Get all loans  applications                                                                   | `api/v1/loans`               |
| GET _/loans/\<laon-id\>/repayments_ | View loan repayment history                                                                   | `api/v1/loans/:id/repayments`|
| POST _/loans_                       | Create a loan application                                                                     | `api/v1/loans`               |
| PATCH _/loans/\<loan-id\>_          | Approve or reject a loan application                                                          | `api/v1/loans/:id`           |
| POST _/loans/\<loan-id\>/repayment_ | Create a loan repayment record.                                                               | `api/v1/loans/:id/repayment` |
| GET _/users_                        | Get all Users                                                                                 | `api/v1/users`               |
| PUT _/loans/\<loan-id\>_            | Update the repaid status of a client.                                                         | `api/v1/loans/:id`           |


### Response Specifications

#### POST _/auth/signup_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “token” : `45erkjherht45495783`,
    “user” : {....} // the user object
  } ]
}
```
#### POST _/auth/login_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “token” : `45erkjherht45495783`,
    “user” : {....} // the user object
  } ]
}
```

#### GET _/users/\<user-email\>/verify_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : {
    “email” : String ,
    “firstName” : String ,
    “lastName” : String ,
    “password” : String ,
    “address” : String ,
    “status” : String ,
    ....
  } 
}
```

#### GET /loans/\<loan-id\>_

Response spec:

```javascript
{
  {
    “status” : Integer ,
    “data” : {
        “id” : Integer ,
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
      } 
}
```

#### GET _/loans?status=approved&repaid=false_

Response spec:

```javascript
{
  {
    “status” : Integer ,
    “data” : [
    {
        “id” : Integer , 
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    },
    {
        “id” : Integer , 
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    }
  ] 
}
```

#### GET _/loans?status=approved&repaid=true_

Response spec:

```javascript
{
  {
    “status” : Integer ,
    “data” : [
    {
        “id” : Integer ,
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    },
    {
        “id” : Integer ,
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    }
  ] 
}
```

#### GET _/loans_

Response spec:

```javascript
{
  {
    “status” : Integer ,
    “data” : [
    {
        “id” : Integer ,
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    },
    {
        “id” : Integer ,
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    }
    {
        “id” : Integer ,
        “user” : String ,
        “createdOn” : DateTime ,
        “status” : String ,
        “repaid” : Boolean ,
        “tenor” : Integer ,
        “amount” : Float ,
        “paymentInstallment” : Float ,
        “balance” : Float ,
        “interest” : Float ,
        ....
    }
  ] 
}
```

#### GET _/loans/\<loan-id\>/repayments_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : {
    “loanId” : Integer ,
    “createdOn” : Date ,
    “monthlyInstallment” : Float , // what the user is expected to pay
    “amount” : Float ,
    ....
  }
}
```

#### POST _/loans/_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : {
    “loanId” : Number ,
    “firstName” : String , 
    “lastName” : String , 
    “email” : String ,
    “tenor” : String ,
    “amount” : Float ,
    “paymentInstallment” : Float ,
    “status” : String ,
    “balance” : Float ,
    “interest” : Float ,
    ....
  }
}
```

#### PATCH _/loans/\<loan-id\>_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : {
    “loanId” : Integer ,
    “loanAmount” : Float ,
    “tenor” : Integer ,
    “status” : String , // approved or rejected
    “monthlyInstallment” : Float ,
    “interest” : Float ,
  }
}
```

#### POST _/loans/\<loan-id\>/repayment_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : {
    “loanId” : Integer ,
    “createdOn” : DateTime ,
    “amount” : Float ,             // loan amount
    “monthlyInstallment” : Float , // what the user is expected to pay
    “paidAmount” : Float ,
    “balance” : Float ,
    ....
}
```

---

## Testing the Application Locally

**Note:**

> As at the time of writing this, the application is still in development and the following commands might not behave as expected. This docs will be updated as soon as the application can be installed.

If the project has been cloned and navigated into as specified [above](#installation), you can run tests...

### Using POSTMAN

If you do not have POSTMAN installed, download [here](https://www.getpostman.com/)

- In the terminal start the application with `npm start`

- On POSTMAN navigate to `localhost:3000/` and use the documentation [above](#documentation) as guide to access the endpoints.

### Using MOCHA

If you do not have mocha installed, you can install using npm with:
`npm -i mocha -g`
then you can run tests with:  
`npm test`

---


## Acknowledgements

[Andela](https://andela.com/)

---

## Author

[Anselem Odimegwu](https://twitter.com/anselem_)
