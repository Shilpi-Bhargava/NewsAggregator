

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

const API_KEY = process.env.API_KEY; // Store API key from environment variables

// Function to fetch news data from the API
function fetchNews(url, res) {
    axios.get(url)
        .then(response => {
            if (response.data.totalResults > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Successfully fetched the data",
                    data: response.data // Corrected here
                });
            } else {
                res.json({
                    status: 200,
                    success: true,
                    message: "No more results to show"
                });
            }
        })
        .catch(error => {
            res.json({
                status: 500,
                success: false,
                message: "Failed to fetch data from the API",
                error: error.message
            });
        });
}

// Route to get all news
app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40; // Default to 40 if not provided
    let page = parseInt(req.query.page) || 1; // Default to 1 if not provided
    let url = ` https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`; // Fixed URL
    fetchNews(url, res);
});

// Setting port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

console.log(API_KEY)






/*require("dotenv").config();//This will safe all sensitive information(Api key) 
//is used to load environment variables from a .env file into your Node.js application.

const express = require("express"); //imported all three
const axios = require("axios");
const cors = require("cors");

const app =express();

app.use(cors()); //from this function this app object will use to set up our routes and we use app.use cors to enable the cors for all routes
//in our application that allows the frontend which might be running diff origins tomake
// request to our backend
app.use(express.urlencoded({extended:true}));//app.use express URL encoded exyended to pass the incoming request with URL
//encoded payload setting extended:true-which alow pass nested objects which will be used for more complex data structure

const API_KEY = process.env.API_KEY;// store api key, we using the ket from enviroment variable using process.enev
//this key will be used to authenticate our request to the news api for
//ensuring that we have permission to acess the data


//Now we will create a function fetch, will be responsible  for making the create request to our provided URL
//using axios

function fetchNews(url, res){
    axios.get(url)
    .then(response  =>{
        if(response.data.totalResults >0){
            res.json({
                status:200,
                success: true,
                message: "Successfully fetched the data",
                data:response.data
            });
        } else{
            res.json({
                status:200,
                success: true,
                message: "No more results top show"
            });
        }

    })
    .catch(error =>{
        res.json({
            status:500,
            success:false,
            message:"Failed to fetch data from the API",
            error:error.message
        });
    });
}

// creating route to all news creating callback fundtion for News api site

app.get("/all-news", (req, res) =>{
    let pageSize = parseInt(req.query.pageSize) || 40; //parsing integer because parsing from frontend onto the string
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    fetchNews(url, res);
});

/*The function you provided is an Express route handler for the endpoint /all-news. Here’s a breakdown of what it does:

Route Definition: app.get("/all-news", (req, res) => {...}) sets up a GET route for the /all-news endpoint. When a client makes a GET request to this URL, the callback function is executed.

Query Parameters:

req.query.pageSize: This retrieves the pageSize query parameter from the request. It specifies how many news articles to fetch per page. If it's not provided, it defaults to 40.
req.query.page: This retrieves the page query parameter from the request, which indicates which page of results to fetch. If it's not provided, it defaults to 1.
Both values are parsed into integers using parseInt.
Constructing the API URL:

let url=https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}apiKey=${API_KEY}`;`: This line constructs a URL to fetch news articles from an external API (likely the News API). However, there seems to be a small formatting error in the URL where it should have an & before apiKey. It should look like this:
javascript
Copy code
let url=`https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
Fetching News:

fetchNews(url, res);: This line calls a function named fetchNews, passing in the constructed URL and the response object (res). The fetchNews function is presumably responsible for making the actual request to the News API using the constructed URL, processing the response, and then sending the data back to the client.
Summary
In essence, this function handles requests to the /all-news endpoint by:

Extracting pagination parameters (pageSize and page).
Constructing a URL to query an external news API for articles.
Calling a separate function (fetchNews) to fetch the data from that API and respond to the client with the results.

//setting port
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
})*/