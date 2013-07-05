/**
 * This function is called the first time that the Realtime model is created
 * for a file. This function should be used to initialize any values of the
 * model. In this case, we just create the single string model that will be
 * used to control our text box. The string has a starting value of 'Hello
 * Realtime World!', and is named 'text'.
 * @param model {gapi.drive.realtime.Model} the Realtime root model object.
 */
function initializeModel(model) {
   var myList = model.createList();
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

    var myList = doc.getModel().getRoot().get('myList');
    refreshUI(myList);

    var createButton = document.getElementById('create_element_button');

    createButton.onclick = function(e) {
        var elementValue = $('#element_input').val();
        myList.push(elementValue);
    };

    var onDataChange = function(e) {
        refreshUI(myList);
    };

    myList.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, onDataChange);

    $('#element_list').on('focusout', 'div', function(){
        var divEl = $(this);
        var index = divEl.data()['index'];
        var input = divEl.children()[1];
        var value = $(input).val();
        myList.set(index, value);
    });
    myList.addEventListener(gapi.drive.realtime.EventType.VALUES_SET, onDataChange);

    $('#element_list').on('click', '.close',function(){
        var index = $(this).parent().data()['index'];
        myList.remove(index);
    });
    myList.addEventListener(gapi.drive.realtime.EventType.VALUES_REMOVED, onDataChange);
}

/**
 * Options for the Realtime loader.
 */
var realtimeOptions = {
    /**
     * Client ID from the APIs Console.
     */
    clientId: '621468593885-jutp14bvtokmdraalrgpb12e9edmp8g3.apps.googleusercontent.com',
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
    defaultTitle: "MMT - Realtime API",
    /**
     * Function to be called every time a Realtime file is loaded.
     */
    onFileLoaded: onFileLoaded
};

/**
 * Start the Realtime loader with the options.
 */
function startRealtime() {
    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start();
}

function refreshUI (elements) {
    $('#element_list').empty();
    var i = 0;
    $.each(elements.asArray(), function(index, val) {
        i++;
        $('#element_list').append('<div data-index=' + index + '><span>' + i + '.</span> <input type="text" class="span10" value="' + val + '"><button class="close">&times;</button></div>');
    });
}