var searchStr;
var linkWiki = 'https://en.wikipedia.org/wiki/';
var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=';


//simple function to move form up the page after submit
$("#searchIcon").click(function pageUp() {
  $("form").addClass("paddingUp");
});

//event to enable submit after 'enter' press
$("input").keypress(function(event) {
    if (event.which == 13) {
    $("form").addClass("paddingUp"); 
        event.preventDefault();
        getStr();
    }
});

//main function which sends search term (searchStr) to ajax (getWikiResult) to fetch data from API
function getStr(){
  searchStr = document.getElementById('searchQ').value;
  
  $(document).ready(function getWikiResult(){
    $.ajax({
        type: "GET",
        url: url+searchStr+"&srwhat=text&continue=&format=json&callback=?",
        dataType: "jsonp",
        success: function(data){

//here I'm using empty() method to clear div before loading data from Wiki API
        var clearDiv;
        clearDiv = $("#wikiData").empty();
          
          for(var i = 0; i<data.query.search[i].title.length; i++){
           clearDiv = $('#wikiData').append('<div class="linkDiv">'+(i+1)+'. '+'<a href="'+linkWiki+data.query.search[i].title+'" target="_blank">'+data.query.search[i].title+'</a>'+'<br>'+data.query.search[i].snippet+'</div>')
          }
        },
        error: function (errorMessage) {
          $("#wikiData").html("Problem with fetching data from API.")
        }
    });
});
}