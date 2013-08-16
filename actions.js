// ┌────────────────────────────────────────┐ \\
// │ bindActions - Javascript jQuery Plugin │ \\
// ├────────────────────────────────────────┤ \\
// │ Copyright © 2013 Arthur Féral          │ \\
// ├────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.        │ \\
// └────────────────────────────────────────┘ \\

window.actions = window.actions || {};
actions = $.extend(actions, {
    fireCallback: function(el, e){
        var action = $(el).attr('data-callback');
        var nss = action.split('.');
        var fn = actions[nss[0]];
        nss.shift();
        while(nss.length > 1){
            fn = fn[nss[0]];
            nss.shift();
        }
        if(nss.length==1)fn = fn[nss[0]];
        if(fn) (fn)(el, e);
    }
});

$.fn.bindActions = function(is){
    var ev = [
        'click',
        'keydown',
        "keyup",
        'change'
    ];
    var evName = [
        "bton",
        "key",
        "key",
        "change"
    ];
    $(document).on('DOMNodeInserted', function(e){
        var t = $(e.target);
        var isTarget = t.attr('[data-action]') != undefined && t.attr('[data-event]') != undefined;
        if(isTarget && is == 'on') t.bindActions('on');
    });
    if(is == 'on'){
    	return this.each(function(){
            if(!$(this).hasClass('inactive')){
        		var a = "";
	        	var currentEv = "";
	        	var currentEvName = "";
	            for(var i = 0 ; i < ev.length ; i++){
	                if($(this).attr('data-event') == ev[i]){
	                	a = ev[i]+'.'+evName[i];
	                	currentEv = ev[i];
	                	currentEvName = evName[i];
	                }
	            }
	            if($(this).data('events') != undefined && $(this).data('events')[currentEv] != undefined){
	            	for(var i = 0 ; i < $(this).data('events')[currentEv].length ; i++){
		            	if($(this).data('events')[currentEv][i].namespace == currentEvName){
                            // console.error('element has already an event, rebinding...');
		            		// console.warn($(this), $(this).data('events')[currentEv][i], $(this).attr('data-action'));
                            // $(this).off(currentEvName);
		            		$(this).off(a);
		            		break;
		            	}
		            }
	            }
	            action = $(this).attr('data-action');
                if(action == undefined){
                    console.error($(this), 'has no function defined')
                }
                if(action != undefined){
                    var nss = action.split('.');
                    var fn = actions[nss[0]];
                    nss.shift();
                    while(nss.length > 1){
                        fn = fn[nss[0]];
                        nss.shift();
                    }
                    if(nss.length==1){
                        if(fn == undefined) fn = {};
                        fn = fn[nss[0]];
                    }
                    $(this).on(a, function(e){
                        e.stopPropagation();
                        if(fn) (fn)(this, e);
                        // if($(this).attr('data-callback') != undefined){
                        //     console.info('Calling callback', $(this).attr('data-callback'));
                        //     actions.fireCallback($(this), e);
                        // }
                    });
                }
	        }
        });
    }
    if(is == "off"){
    	return this.each(function(){
            if(!$(this).hasClass('inactive')){
	    		var a = "";
	            for(var i = 0 ; i < ev.length ; i++){
	                if($(this).attr('data-event') == ev[i]){
	                	a = ev[i]+'.'+evName[i];
	                }
	            }
	            $(this).off(a);
            }
        });
    }   
};
