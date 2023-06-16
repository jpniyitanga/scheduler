# Interview Scheduler

## Description
A user-friendly web application designed to streamline and simplify the process of scheduling interviews. Users may add, modify, and cancel appointments in real time using the app, which makes use of built-in and custom React hooks. The API server uses a PostgreSQL database to persist data. The client application sends and receives JSON data over HTTP from an API server. The project adheres to TDD (Test Driven Development) best practises for quality assurance, testing each component individually (using Storybook and Jest) as well as end-to-end testing (using Cypress).

## Main Functionalities
1. A user can book an interviews between Monday and Friday.
2. A user can switch between weekdays.
3. A user can book an interview in an empty appointment slot.
4. Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
5. A user can cancel an existing interview.
6. A user can edit the details of an existing interview.
7. The list of days informs the user how many slots are available for each day.
8. The expected day updates the number of spots available when an interview is booked or canceled.
9. A user is presented with a confirmation when they attempt to cancel an interview.
10. A user is shown an error if an interview cannot be saved or deleted.
11. A user is shown a status indicator while while an interview is being saved or deleted.
12. When the user presses the close button of the error they are returned to the Form.

## Screeshots


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
