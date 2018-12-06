"use strict";
function pop( p ) {
	p.onDisconnect.removeListener( pop );
	chrome.storage.local.get( s => {
		if ( s.sync ) chrome.storage.sync.set( s );
	} );
}
chrome.runtime.onConnect.addListener( p => {
	if ( p.name === "i" ) {
		chrome.pageAction.show( p.sender.tab.id );
	} else p.onDisconnect.addListener( pop );
} );
chrome.runtime.onMessage.addListener( ( msg, msgSndr ) => {
	switch ( Object.keys( msg )[ 0 ] ) {
		case "r": chrome.tabs.reload();
			break;
		case "c": chrome.tabs.insertCSS( msgSndr.tab.id, { file: "init.css" } );
			break;
		default: chrome.tabs.update( msgSndr.tab.id, { url: msg.u } );
	}
} );
