import $ from 'jquery'
import boostrap from 'bootstrap';

import {calculateRow} from './modules/calculateRow';

$(document).ready(function(){

    app.initialize();
});

var app = function(){
    var initialize = function(){
        console.log("Initailizing...");
        console.log(calculateRow());
    };
return{
    initialize: initialize,
}
}();