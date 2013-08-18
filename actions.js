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
        if(nss.length===1)fn = fn[nss[0]];
        if(fn) (fn)(el, e);
    }
});

$.fn.bindActions = function(params){
    function bindDom(){
        $(document).on('DOMNodeInserted.action', '.action', function(e){
            console.log('gzer')
            var t = $(e.target);
            var isTarget = t.data('action') != undefined && t.data('event') != undefined;
            if(isTarget){
                t.bindActions('on');
                //console.info('Bind action on ', t);
            }
        });
    }
    if($(document).data('events') !== undefined){
        if($(document).data('events')['DOMNodeInserted'] === undefined){
            bindDom();
        }else{
            if($(document).data('events')['DOMNodeInserted'][0].namespace != "action"){
                bindDom();
            }
        }
    }
    else{
        bindDom();
    }
    if(this.length === 0) return;
    function bindOn (elems) {
        elems.each(function(){
            if(!$(this).hasClass('inactive')){
                var currentEv = $(this).attr('data-event');
                var a = currentEv+'.action';
                
                if($(this).data('events') != undefined && $(this).data('events')[currentEv] != undefined){
                    for(var i = 0 ; i < $(this).data('events')[currentEv].length ; i++){
                        if($(this).data('events')[currentEv][i].namespace === 'action'){
                            console.error('element has already an event, rebinding...');
                            // console.warn($(this), $(this).data('events')[currentEv][i], $(this).attr('data-action'));
                            // $(this).off(currentEvName);
                            $(this).off(a);
                            break;
                        }
                    }
                }
                action = $(this).attr('data-action');
                if(action === undefined){
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
                    if(nss.length===1){
                        if(fn === undefined) fn = {};
                        fn = fn[nss[0]];
                    }
                    $(this).on(a, function(e){
                        e.stopPropagation();
                        if(fn) (fn)(this, e);
                        if($(this).attr('data-callback') != undefined){
                            console.info('Calling callback', $(this).attr('data-callback'));
                            actions.fireCallback($(this), e);
                        }
                    });
                }
            }
        });
    }
    function bindOff (elems) {
        elems.each(function(){
            if(!$(this).hasClass('inactive')){
                var a = $(this).attr('data-event')+'.action';
                $(this).off(a);
            }
        });
    }
    
    //cas on est plus en train de binder/unbinder un/des elem(s)
    if(typeof params === 'string'){
        if(params === 'on'){
            return bindOn(this);
        }
        if(params === 'off'){
            return bindOff(this);
        }
    }
};
