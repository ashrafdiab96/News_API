//variable to get the data
var news;

//variable to carry the categories
var category = 'general';

//variable to carry the countries
var country = 'eg';

//variable to search
var search;

//get search input
var searchInp = document.getElementById("searchInp");

//get search button
var searchBtn = document.getElementById("searchBtn");

//variable to get links
var links = document.getElementsByClassName("nav-link");

//variable to get the <selsct> which carry the country
var selector = document.getElementById("selectCountry");

//event to choese the country on click
selector.addEventListener("click" , function(){
    country = selector.value;
    getNews();
})

//loop on links
for(var i = 0 ; i < links.length ; i++)
{
    //event to show the category by click on navbar links
    links[i].addEventListener("click" , function(e){
        //put the html content(categories) in category variable (override)
        category = e.target.innerHTML;
        //call the function that show data to show the news after choese the category
        getNews();
    })
}


//call function that get the data
getNews();

//function to get the data
function getNews()
{
    //variable to instance XMLHttpRequest
    var req;

    //chech if the browser support XMLHttpRerquest or not
    if(window.XMLHttpRequest)        //new browsers
    {
        req = new XMLHttpRequest();
    }
    else                             //old browsers IE5,IE6
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
 
    //variable to carry the url of the site which wants to connet
    //var url = `https://newsapi.org/v2/top-headlines?country=`+country+`&category=`+category+`&apiKey=d0058465af734f3188ea9753ac234bbd`;
    var url = `https://jsonplaceholder.typicode.com/posts`;
    //open the connection between the two sites
    req.open("GET" , url);

    //event which fire on any change in data (readyStzte)
    req.onreadystatechange = function()
    {
        //check status is correct and data(responce) is ready
        if(req.status == 200 && req.readyState == 4)
        {
            //put the data on variable and convert it to array of objects
            news = JSON.parse(req.response);
            //get the object that carry the data which wants to show it
            news = news.articles;
            //call function that dhow the data on this section to the function getNews has implemented
            displayNews();
        }
    }
    //send the data
    req.send();
}

//function to show the data
function displayNews()
{
    //variable to carry the data and show it
    var temp = "";
    //loop on the data(news)
    for(var i = 0 ; i < news.length ; i++)
    {
        temp += `<div class="col-md-3 overflow-hidden mb-3">
                 <div class="newsContent">
                 <div class="newsImg"><img class="img-fluid" src="`+news[i].urlToImage+`"/></div>
                 <div class="newsTitle"><h4>`+news[i].title+`</h4></div>
                 <div class="newsAuthor"><p class="text-muted">`+news[i].author+`</p></div>
                 <div class="newsDate"><span>`+news[i].publishedAt+`</span></div>
                 </div>
                </div>`;
    }
    //sow the data in html
    document.getElementById("rowNews").innerHTML = temp;
   
}

//event to search on click search button
searchBtn.addEventListener("click" , function(){
    //put input of search tag in variable and put thi variable in the url
    search = searchInp.value;
    //call the function which search
    searchNews();
})

//function to search
function searchNews()
{
    //variable to instance XMLHttpRequest
    var req;

    //chech if the browser support XMLHttpRerquest or not
    if(window.XMLHttpRequest)        //new browsers
    {
        req = new XMLHttpRequest();
    }
    else                             //old browsers IE5,IE6
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
 
    //variable to carry the searc url
    var url = `https://newsapi.org/v2/everything?q=`+search+`&from=2019-11-18&sortBy=publishedAt&apiKey=d0058465af734f3188ea9753ac234bbd`;
    
    //open the connection between the two sites
    req.open("GET" , url);

    //event which fire on any change in data (readyStzte)
    req.onreadystatechange = function()
    {
        //check status is correct and data(responce) is ready
        if(req.status == 200 && req.readyState == 4)
        {
            //put the data on variable and convert it to array of objects
            news = JSON.parse(req.response);
            //get the object that carry the data which wants to show it
            news = news.articles;
            //call function that dhow the data on this section to the function getNews has implemented
            displayNews();
        }
    }
    //send the data
    req.send();
}






