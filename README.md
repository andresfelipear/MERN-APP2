# Breakfasts App
This website is based in a small project that my wife and me started in our Country (Colombia) in the middle of the pandemic, nor just as an alternative for get some extra money also as a possibility for connect families and friends in a time where meet with your loved family was almost impossible.

## Database
MongoDB

## Front End
React: Deployed in Netlify

### Front End Url
https://breakfasts-app.netlify.app/

## Back End 
NodeJs, Express: Deployed in Heroku

### Back End Api Url
https://mern-app2-breakfasts.herokuapp.com/

## Install
Clone the repository. 
Use command "npm install"

## Run Project
Use command "npm run dev"  
Note: no forget create a .env file and include the enviroments variables listed bellow:  
REACT_APP_API_FORMAT_IMAGES= png >> "extension images, default png. If you want to change the extension, is neccesary convert the images to another format"  
REACT_APP_API_ENDPOINT= "http://localhost:8000" >> "port where you have running the back end api"  
REACT_APP_STRIPE_KEY=xxxxxx >> "your stripe key used for payment process. If you don't have and account go here https://stripe.com/en-ca and create one."  