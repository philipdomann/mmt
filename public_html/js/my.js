/**
 * This function is called the first time that the Realtime model is created
 * for a file. This function should be used to initialize any values of the
 * model. In this case, we just create the single string model that will be
 * used to control our text box. The string has a starting value of 'Hello
 * Realtime World!', and is named 'text'.
 * @param model {gapi.drive.realtime.Model} the Realtime root model object.
 */
function initializeModel(model) {

    var bubbles = new Array();
    for (var i = 0; i < BubbleWorld.count; i++) {
        bubbles.push(true);
    }

    var myList = model.createList(bubbles);
    model.getRoot().set('myList', myList);
}

/**
 * This function is called when the Realtime file has been loaded. It should
 * be used to initialize any user interface components and event handlers
 * depending on the Realtime model. In this case, create a text control binder
 * and bind it to our string model that we created in initializeModel.
 * @param doc {gapi.drive.realtime.Document} the Realtime document.
 */
function onFileLoaded(doc) {



//    var ownButton = document.getElementById('own_button');
//
//    ownButton.onclick = function(e) {
//        myList.set(0, !myList.get(0));
//    };
//
//    var onOwnButtonClick = function(e) {
//        ownButton.disabled = true;
//    };
//
//    myList.addEventListener(gapi.drive.realtime.EventType.VALUES_SET, onOwnButtonClick);

}

/**
 * Options for the Realtime loader.
 */
var realtimeOptions = {
    /**
     * Client ID from the APIs Console.
     */
    clientId: '621468593885-8nquh0jl33fqmgfuu3r2p34huuiav6qb.apps.googleusercontent.com',
    /**
     * The ID of the button to click to authorize. Must be a DOM element ID.
     */
    authButtonElementId: 'authorizeButton',
    /**
     * Function to be called when a Realtime model is first created.
     */
    initializeModel: initializeModel,
    /**
     * Autocreate files right after auth automatically.
     */
    autoCreate: true,
    /**
     * Autocreate files right after auth automatically.
     */
    defaultTitle: "New Realtime Quickstart File",
    /**
     * Function to be called every time a Realtime file is loaded.
     */
    onFileLoaded: onFileLoaded
}

/**
 * Start the Realtime loader with the options.
 */
function startRealtime() {
    for (var i = 0; i < BubbleWorld.count; i++) {
        $('body').append('<div class="bubble" data-bid="' + i + '"></div>');
    }

    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start();
}

var BubbleWorld = {
    count: 3
};

$(document).on('click', '.bubble', function() {
    var data = $(this).data();
});

$(".bubble").click(function() {
    // Holds the product ID of the clicked element
    var data = $(this).data();
});