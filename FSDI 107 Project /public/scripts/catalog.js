
/** Global Variables */
var items = [];
var serverURL = "http://localhost:8081";


/** Functions */

function getCatalogFromServer(){
    //** create a AJAX request to get the data
    //** when the data its received: */
    //** -fill the itmes array */
    //** -call display catalog */
    //**  */
    $.ajax({
        url: serverURL + "/api/products",
        type: "GET",
        success: function(res){
            console.log("Server responded OK", res);
            // filter and only get my items to ITES array
            /** Travel the array */
            //get each item inside the array
            //compare the item.user with your name
            //if equal, add the item to the itmes array

            for(var i = 0; i < res.length; i++){
                var theItem = res[i];
                
                if(theItem.user == "Oliver")
                {
                    //this item belongs to me
                    items.push(theItem);
                }
            }

            //display
            displayCatalog();

        },
        error: function(error){
            console.log("Error in request", error);
        }
    });
}
function displayCatalog(){
    //  /**
    //  * Travel the array
    //  * get each element form tge array
    //  * display the element into the DOM (html)
    //  * /
    
    for (var i = 0; i < items.length; i++){
        var product = items[i];

        displayItem(product);
        
    }
}

function displayItem(product){
    var pLayout = `<div class="item">
    <img src="images/${product.image}">
    <h4>${product.title}</h4>
    <h6>₿${product.price}</h6>
    <p>${product.description}</P>
    <button class="btn btn-sm btn-info"> Add to Chart </button>
    </div>`;

    $("#catalog").append(pLayout);

}

function search(){


    $("#btnSearch").click(search);
    
    //get the text
    var text = $("#txtSearch").val();

    // clear catalog
    $("#catalog").html("");

    //** travel the array */
    //** get each element fro the array */
    //** compare the text with the item.title */
    //** if match, display the product */

    for(var i = 0; i < items.length; i++){
        var product = items[i];

        // Note: parse string to lower case to remove case sensetive 
        if(
             product.title.toLowerCase().includes(text.toLowerCase() )
            || product.code.toLowerCase().includes(text.toLowerCase() )
            || product.description.toLowerCase().includes(text.toLowerCase() ) 
            || product.rating.toString().includes(text)
            
            ) {
            displayItem(product);
        }
    }
}

function init() {
    console.log("Catalog Page");

    //events
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (e) {
        if(e.key == "Enter"){
            search();
            e.preventDefault(); // prevent default action (from submit)
        }

    });


     getCatalogFromServer();
    
}

/** Initalization */
window.onload = init;