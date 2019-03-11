"use strict";

function syncronize( fnc ) {
	chrome.storage.local.get( store => {
		if ( store.sync ) {
			chrome.storage.sync.set( store );
		}
		if ( typeof fnc === "function" ) {
			fnc();
		}
	} );
}

chrome.runtime.onConnect.addListener( port => {
	if ( port.name === "init" ) {
		chrome.pageAction.show( port.sender.tab.id );
	} else {
		port.onDisconnect.addListener( syncronize );
	}
} );

chrome.runtime.onMessage.addListener( ( msg, sender ) => {
	switch ( Object.keys( msg )[ 0 ] ) {
		case "css": chrome.tabs.insertCSS( sender.tab.id, { "file": "init.css" } );
			break;
		case "update": syncronize( ( () => chrome.tabs.update( sender.tab.id, { "url": msg.update } ) ) );
			break;
		case "new_tab": msg.new_tab.forEach( ( addr, ndx ) => {
				if ( !ndx ) {
					chrome.tabs.update( sender.tab.id, { "url": addr } );
				} else {
					chrome.tabs.create( { "url": addr, "active": false } );
				}
			} );
			break;
		default: syncronize( ( () => chrome.tabs.reload() ) );
	}
} );