# Buh-Jit
Software Engineering Immersive Course || Project-4 || Individual Project || 1 week

## Overview

Buh-jit is a budgeting app that allows you to add transactions and visualise your spending month-to-month.
 
<p align="center" >
 <img width="80%" src="./client/src/images/dashboardScreenshot.png" alt="Bih-Jit Dashboard Screenshot"/>
</p>
 
[Buh-jit - Deployed App](https://bit.ly/buh-jit)

Feel free to login with the details below to have access to existing transactions.

username: ```richard@email.com```
<br>
password: ```richard1988```

## Installation

- Clone the repo
- In root add/install ```pipenv```
- Move into shell with ```pipenv shell``` 
- Make Migrations with ```python manage.py makemigrations```
- Migrate with ```python manage.py migrate```
- Load user seeds with ```python manage.py loaddata jwt_auth/seeds.json```
- Load transaction seeds with ```python manage.py loaddata transactions/seeds.json```
- Split Terminal window and move into ```client``` folder with ```cd client```
- Install all frontend packages (from package.json) by running ```yarn```
- IN ROOT, start server with ```python manage.py runserver```
- IN CLIENT, start frontend with ```yarn start```
 
 
## Table of Contents
[The Brief](#the-brief) <br>
[The Build](#the-build) <br>
[Wins](#wins) <br>
[Challenges](#challenges) <br>
[Bugs](#bugs) <br>
[Future Improvements](#future-improvements) <br>
[Key Learnings](#key-learnings) <br>

 
 
## The Brief
 
Create a Fullstack application with CRUD functionality using Django, PostrgreSQL, React and Node.

With this project I wanted to develop an app that had real world value and be very different from my third project.

I thought about apps that I would find useful and became fixated on making my household budgeting spreadsheet an intuitive, user-friendly app!

<br>
 
## The Build

Taking lessons learned from my third project I really was more stringent in planning this app. I knew 1 week would not be long enough to implement the complex functionality I wanted the app to have long term but I knew there was massive potential here that needed to be accommodated at the beginning of the project.

I began by noting all of the functionality I expected the final app to have before planning my models and their relationships. While the key models are users and transactions, I also wanted to have 'household functionality' - where multiple users can add transactions relative to a combined household.

<p align="center" >
 <img width="80%" src="./client/src/images/models-screenshot.png" alt="Screenshot of models and relationships"/>
</p>

The app also had to be very user friendly and intuitive to use. I created a rough wireframe of how I wanted the app to look and flow. I wanted it to be clean and display the information in a simple way, using as few paths as possible - an elegant dashboard that all of the information could be accessed from.

<p align="center" >
 <img width="80%" src="./client/src/images/figma.png" alt="Screenshot of wireframe"/>
</p>

With models, relationships and flow ideated I used Trello to plan the project in a Kanban system. Using labels to differentiate between frontend, backend, styling and UI I created cards for each task. When creating the cards I used comments to add any thoughts I had on how to achieve the task or any considerations to be mindful of for that task.

<p align="center" >
 <img width="80%" src="./client/src/images/trello-board.png" alt="Screenshot of Trello Board"/>
</p>


I started building out the backend models, serializers and views. With the users and transactions being the foundation of the app I worked on these first, testing them on Django's admin path and Insomnia in the absence of my own 'client'. I really enjoyed using the Django REST framework and found it to be a great help for the functional heavy lifting in the backend.

With the fundamental backend apps in place as well as some extras for future development I connected the front end. 

The format of the app means that the CRUD functionality of transactions is only accessible to the user logged in and is handled on the frontend. They are only shown transactions attached to their account and there are no paths that allow them access to other transactions.

As I had been able to register users through Insomnia I started with the navbar and adding 'Login' functionality so that I could store the token - and therefore user information - in local storage. With this I could use a ternary to decide what should be shown on the navbar before adding registration functionality.

My next focus was to add the post request functionality for transactions. This was particularly challenging as I was trying to ensure the form was user friendly and reactive to selections.

In particular The first was the label on the ```recipient_sender``` updating depending on the transaction being ingoing or outgoing.

```js

<Form.Group className="mb-3" controlId="recipient_sender">
                    <Form.Label>{formData.transaction_type !== 'Incoming' ? 'Recipient' : 'Sender'}</Form.Label>
                    <Form.Control
                      name="recipient_sender"
                      type="text"
                      value={formData.recipient_sender}
                      placeholder={formData.transaction_type !== 'Outgoing' ? 'Who sent you money?' : 'Who are you paying?'}
                      required
                      onChange={handleChange}
                    />
                  </Form.Group>

```

A more complex problem to solve was using the status of a checkbox as a 'value' for the ```formData``` as well as controlling additional fields displaying on the form.

```js

{formData.repeat === 'true' &&

  <Form.Group as={Col} controlId="repeat_frequency">
  
    <Form.Label>Frequency</Form.Label>
    
    <Form.Select
      name="repeat_frequency"
      defaultValue="Monthly"
      required
      onChange={handleChange}
      >
        {repeatFrequency.map((item, index) => {
          return <option key={index}>{item}</option>
        })} 
    </Form.Select>
    
  </Form.Group>


  <Form.Group as={Col} controlId="repeatUntilDate">
  
    <Form.Label>Repeat Until</Form.Label>
    
      <Form.Control
        type="date"
        name="repeat_until"
        placeholder="Select a date"
        defaultValue={formData.transaction_date}
        onChange={handleChange}
      />
      
   </Form.Group>

}

```

I had a number of attempts at solving this issue with applying the value from the checkbox to state, however, the asynchronous nature meant that the 'value' of ```repeat``` in ```formData``` was 'delayed'. I eventually resolved the issue by adding the below special condition relating to the ```repeat``` input.


```js

const handleChange = async (event) => {

  if (event.target && event.target.name === 'repeat') {
    event.target.value = event.target.checked
    }

  const newFormData = { ...formData, [event.target.name]: event.target.value }
  
  setFormData(newFormData)
    
}

```

With the form functioning as expected I then added a table and pie chart to visualise the transactions.

One of the most enjoyable parts was implementing the function to the dashboard.

- Filtering transactions by month controlled by user input - clicking left and right arrows - then sorting this in date order.

- Summing transactions.

- Creating the logic for this user interaction of toggling through months.

- Filtering 'outgoing' transactions to pass as props to the pie chart component.

- Further filtering the transactions by label to give the user a breakdown of the percentages of outgoing transactions by type.

Logically and methodically working through this was very satisfying.

In order to display more information about the transaction - then accommodate Update and Delete functionality - I needed to gain access to the transaction ID through the form row. The table rows and columns did not have 'value' attached to them as targets -  therefore quickly grabbing ```event.target.value``` was not possible.

I had to look through the ```target``` object and find somewhere I could assign a 'value'. The outcome was the below snippet of code that would then show a modal with the extended description of the transaction. 

```js

const checkClick = (event) => {
  const idAsString = event.target.outerHTML.toString().replace('<td value="', '').split('"')[0]
  const idAsInt = parseInt(idAsString)
  setTransactionId(idAsInt)
  handleShow()
 }

```

<br>
 
 
## Wins

All of the satisfying breakthroughs outlined in 'The Build' section were wins. They all came together to form a clean, intuitive designed app. 
 
## Challenges

The most satisfying challenge to solve was accessing the transaction ID from each row in the table.

Another challenge was the rerendering of the components when Creating, Updating or Deleting a transaction. I quickly solved this with a ```setTimeout``` after any ```post``` ```put``` or ```delete``` request before making the ```get``` request of the user.

I think the biggest challenge was time and planning. As mentioned, I was cognisant of developing this app over an extended period of time. I potentially spent too long planning this which led to me having to implement solutions on the front end in order to move on and solve other problems.
 
## Bugs

At the time of initial deployment there is no error handling for registration or login.

The popovers for the delete confirmation needs to be closed by clicking the same button again - there is no ```onBlur``` event listener.
 
 
## Future Improvements

I intend to add error handling to the login and register forms and redeploy.

With more time I would like to allow users the opportunity to add their own regular contacts and labels, storing these on the backend.

I would like to build the app out to be able to be able to filter and display only specific labelled items before applying tabs for refunds and credits. 

Exploring using local storage to temporarily store transactions/contacts/labels in order to minimise API requests is something I would like to do.

## Key Learnings

I think I may have tried to add too much to the app in the planning stages that left me with less time in delivery. Being more aware of what I could achieve in the time frame may have helped me fully explore some of the future improvements before initial deployment.

