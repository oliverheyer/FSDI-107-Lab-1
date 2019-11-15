
var serverURL = "http://localhost:8081";

// Object constructor for itmes
function Item(code, title, price, desc, cat, rating, image ){
    this.code= code;
    this.title = title;
    this.price = price;
    this.description = desc;
    this.category = cat;
    this.rating = rating;
    this.image = image;
    this.user = "Oliver";

}

function clearForm(){
    $("#txtCode").val("");
    $("#txtTitle").val("");
    $("#txtPrice").val("");
    $("#txtDescription").val("");
    $("#txtCategory").val("");
    $("#txtRating").val("");
    $("#txtImage").val("");
}

function saveItem(){
    // get values
var code = $("#txtCode").val();
var title = $("#txtTitle").val();
var price = $("#txtPrice").val();
var description = $("#txtDescription").val();
var category = $("#txtCategory").val();
var rating = $("#txtRating").val();
var image = $("#txtImage").val();


    //create an object
    var test = new Item(code, title, price, description, category, rating, image);
    console.log(test);


    //send the object to a server

    $.ajax({
        url: serverURL + "/api/products",
        type: "POST", 
        contentType: "application/json",
        data: JSON.stringify(test),
        success : function(details){
            // alert the user 
            console.log("Data Saved", details);
            clearForm();
            $("#alert").removeClass("hide");

            // set timer to do some actions
            setTimeout(
                function(){
                    $("#alert").addClass("hide");
                },
                10000 // 10,000 = 10secs
            );

        },
        error: function(details){
            console.log("Error", details);
        }
    });

    // alert 
    // data savde on the server correctly 

}




function loadMessages(){
    var name = "Oliver";
    var howMany = 10;
    var count = 0;

console.log("load msg");

    $.ajax({
        url: '/api/message/' + name,
        type: 'GET',
        success: function(res){
            console.log("Server says:", res);
            for(var i = res.length - 1; i >= 0; i --) {

                displayMessage(res[i]);
                count += 1;

                if (count >= howMany) break; // break ends the loop
            }
        },
        error: function(error){
            console.log("Error loading messages", error);
        }
    });
}

function displayMessage(message){
    var container = $("#messageList");
    var template = `<li><a href='mailto:${message.mail}'> ${message.name}</a> - ${message.message} </li>`;
    container.append(template);
}
function init(){
    console.log("admin page");


    // events
    $("#btnSave").click(saveItem);

    // load messages
    loadMessages();

    
}


window.onload = init;


