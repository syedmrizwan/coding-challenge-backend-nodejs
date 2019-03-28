# Stolen Bike Cases - JOIN Coding Challenge - Backend (Node.js)
![JOIN Stolen Bike Cases](https://github.com/join-com/coding-challenge-backend-nodejs/raw/master/illustration.png)

## Context
Stolen bikes are a typical problem in Berlin. The Police want to be more efficient in resolving stolen bike cases. They decided to build a software that can automate their processes — the software that you're going to develop. 

## Product Requirements
- [ ] Bike owners can report a stolen bike.
- [ ] A bike can have multiple characteristics: license number, color, type, full name of the owner, date, and description of the theft.
- [ ] Police have multiple departments that are responsible for stolen bikes. 
- [ ] A department can have some amount of police officers who can work on stolen bike cases.
- [ ] The Police can scale their number of departments, and can increase the number of police officers per department.
- [ ] Each police officer should be able to search bikes by different characteristics in a database and see which department is responsible for a stolen bike case.
- [ ] New stolen bike cases should be automatically assigned to any free police officer in any department.  
- [ ] A police officer can only handle one stolen bike case at a time. 
- [ ] When the Police find a bike, the case is marked as resolved and the responsible police officer becomes available to take a new stolen bike case. 
- [ ] The system should be able to assign unassigned stolen bike cases automatically when a police officer becomes available.

## Your Mission
Your task is to provide APIs for a frontend application that satisfies all requirements above.

Please stick to the Product Requirements. You should not implement authorisation and authentication, as they are not important for the assessment. Assume everyone can make requests to any api. 

## Tech Requirements
- Node.js
- You are free to use any framework, but it’s recommended that you use one that you’re good at
- Use only SQL Database
- Tests (quality and coverage)
- Typescript is a plus


## Built With
- Node
- Hapi
- Sequelize(Postgresql)
- Lab and Chai for unit testing and coverage
- Hosted with Heroku



## Running the app
1. In the root folder run `npm install`.
2. Go to file `sequelize/config/config.json` and change db credentials.
3. `cd sequelize` & run `sequelize db:migrate` this command will create your tables in the db.
4. `cd` to root folder & run `npm start`.
5. Navigate to `localhost:8000/documentation` (swaggerized ui will open).


## Deployment
Bike-Stolen-Case API deployed to Heroku: 
https://stolen-bike-case.herokuapp.com/


## Api Docs
Api Docs for Bike-Stolen-Case App:
https://stolen-bike-case.herokuapp.com/documentation