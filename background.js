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
	if ( port.name !== "init" ) {
		port.onDisconnect.addListener( syncronize );
	}
} );

chrome.runtime.onMessage.addListener( ( msg, sender ) => {
	switch ( Object.keys( msg )[ 0 ] ) {
		case "css": chrome.scripting.insertCSS( { "target": { tabId: sender.tab.id }, "files": [ "init.css" ] } );
			break;
		case "update": syncronize( ( () => chrome.tabs.update( sender.tab.id, { "url": msg.update } ) ) );
			break;
		default: syncronize( ( () => chrome.tabs.reload() ) );
	}
} );
