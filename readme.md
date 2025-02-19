## Backend Installation
* `npm i` to install dependencies
* Sign up for a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
* Create a new cluster (you can use the free tier)
* Once your cluster is created, click "Connect" and choose "Connect your application"
* Copy the connection string URI provided
* Copy the `.env.sample` file to `.env`
* Add your MongoDB URI to the .env file
* for running the server you can use --> `npm start` or `npm run dev`
* it will run the server on port 4500

<!-- -------------------------------------------------------------------------------------------- -->

## Frontend Installation

* go to the frontend directory ---> cd client

* install all the dependencies by using --> npm i
* run `npm run dev` to start the local server
* it will run the server on --> http://localhost:3000

<!-- -------------------------------------------------------------------------------------------- -->

# Interview Task
## Overview
You are tasked with building a contacts management application that consists of two main components:

## What's Already Set Up:
* Basic project structure with client (Next.js) and server (Node.js) directories
* Initial configuration for MongoDB connection
* Basic authentication boilerplate

## Your Task:
Build a full-stack application where users can:

### Authenticate:
* Sign up with a new account

* Log in with existing credentials

* Be redirected to their contacts page after successful authentication
### Manage Contacts:
* Create new contacts with name, phone number, and address
* View their personal list of contacts
* Edit contact information
* Delete contacts from their list

### The focus should be on:
* Implementing secure API endpoints
* Creating a functional user interface
* Handling errors appropriately
* Following REST API best practices
* Ensuring each user can only access their own contacts

### This task is designed to evaluate your ability to:
* Work with full-stack technologies
* Implement basic CRUD operations
* Handle authentication and authorization
* Create intuitive user interfaces
* Write clean, maintainable code

## Core Requirements

### Authentication & Setup
* Connect the API to your own MongoDB cluster. (see backend installation instructions).
* Ensure implementation of user signup/signin functionality is working in web client.
* Ensure successful redirect to contacts page after authentication

### Contact Management
* Create CRUD endpoints for the Contact model with this schema.
```
Contact {
    userId: string;
    name: string;
    phoneNumber: string; 
    address:
}
```
* Feel free to edit this schema as you see fit

### User Interface Implementation
* Build a frontend interface that allows users to:
  * Create new contacts through a form
  * View their list of contacts
  * Edit existing contact details
  * Delete contacts

## Extra Credit Tasks
* Choose from the list of tasks below with the end user in mind.
* Or work on a feature that we didn't think of.
* Build what you believe would add the most benefit to this project. 
* Remember: Quality over quantity - it's better to implement one feature well with proper error handling and testing than multiple features partially.

### Search & Filter
* Implement a search bar to filter contacts by name and phone number
* Add sorting functionality (e.g., by name, recently added)

### Contact Enhancement
* Add contact categories/groups
* Implement contact favorites
* Add profile picture upload for contacts

### UI/UX Improvements
* Add pagination or infinite scroll for contact list
* Implement dark/light mode toggle
* Add bulk delete/edit functionality

### Technical Improvements
* Add unit tests for both frontend and backend
* Implement request rate limiting
* Add contact data export functionality (CSV/JSON)

## Disclaimer
We don't expect the task to be completed 100%. This task is designed to get an idea of what you can accomplish within the given timeframe.
As long as you can justify your approach with sound technical reasoning, we're interested in seeing:
- Your problem-solving approach
- Code organization and structure
- Technical decision-making
- Implementation quality over quantity

Best of luck!

<!-- -------------------------------------------------------------------------------------------- -->
