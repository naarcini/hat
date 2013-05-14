(function( $ ) {
    // Constants
    var PROMPT_NAME = "speechJS_prompt";

    // Private variables
    var message = "";
    var listening = false;
    var character_limit = 140;

    // plugin definition
    $.fn.speech = function( action, arg ) {
        if( action == "probe" ) {
            return [message, listening];
        }
        else if( action == "set_limit" ) {
            character_limit = arg;
            return true;
        }
        else if( action == "get_limit" ) {
            return character_limit;
        }
        else if( action == "trigger" ) {
            console.log(this);
            return trigger();
        }
        else if ( action == "add_char" ) {
        }
    };

    // Private methods
    function trigger() {
        // Toggle listening
        listening = !listening;

        // Start listening to keyboard input
        if( listening ) {
            message = "";
            display_prompt();
        }
        else {
            remove_prompt();
        }

        return message;
    };

    function display_prompt() {
        var prompt = '' +
            '' +
            '';
    };

    function remove_prompt() {
    };

})( jQuery );