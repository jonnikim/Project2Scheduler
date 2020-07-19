# Project 2 - UCLA Bootcamp

## Dubsado Scheduler Application

Authors:

Jonathan Kim

Curtis Pike

Jeff Quittman

## Description:

Scheduler Application - Dubsado
Basic scheduling application that allows Users to create an account and allows clients to schedule an appointment. Clients do not need a login nor do they need to create an account. Clients can access the User's calendar and select a date/time. After, they'll be led to a form to fill out to book the appointment. Booked appointment will then block off that time-slot from being double-booked.


### Primary Goal:

Allow a client to input their contact information to book an appointment on a selected date/time. Client's information is then used to populate an email's details and send an appointment confirmation.

## Implementation:

1. MVC Paradigm
2. Servers: Express and Express-Session
3. Database: MySQL/Sequelize
4. Authentication: Passport, Passport-Local, Passport-Azure-AD, bcrypt, simple-oauth2.
4. Api #1: Micrsoft Azure AD/Microsoft Graph API
5. FullCalendar.js Library


## Installation:

### Latest Development
```bash
git clone https://github.com/jonnikim/Project2Scheduler.git
```
### Setting up the app
```bash
npm install
```
### Configure your config.json
Head to /config/config.json and update fields as needed.

### Load Database
Open MySQLWorkbench or equivalent and use the schema.sql to create the 'scheduler' database

### Start the App
 
```bash
npm start
```
Open up localhost:8084

## Additional Links

Github Repo Link: https://github.com/jonnikim/Project2Scheduler
