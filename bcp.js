"use strict";

const BASE_URL = "https://tools.ietf.org/html/rfc",
	A_TAG_START = '<a href="' + BASE_URL + '$2">',
	CONTENT = document.querySelector( ".content" ),
	PRE = CONTENT.querySelector( "pre" ),
	REGEX = /\n(Request for Comments: 0*([0-9]+))/g,
	MATCHES = CONTENT.innerHTML.match( REGEX );

chrome.storage.local.get( store => {
	const STORED_PROFILE = store.prfl;
	let redirect_to_rfc = true;
	if ( STORED_PROFILE ) {
		redirect_to_rfc = store.prfls[ STORED_PROFILE ].bcp;
	}
	if ( MATCHES.length > 1 ) {
		if ( redirect_to_rfc ) {
			chrome.runtime.sendMessage( { "new_tab": MATCHES.map( mtch => mtch.replace( REGEX, BASE_URL + "$2" ) ) } );
		} else {
			PRE.innerHTML = PRE.innerHTML.replace( /\]\n/, "\n " + MATCHES.map( mtch => mtch.replace( REGEX, A_TAG_START + "RFC $2</a>" ) ).join( ", " ) + "]\n" );
		}
	} else if ( redirect_to_rfc ) {
		chrome.runtime.sendMessage( { "new_tab": [ BASE_URL + REGEX.exec( CONTENT.innerHTML )[ 2 ] ] } );
	} else {
		CONTENT.innerHTML = CONTENT.innerHTML.replace( REGEX, "\n" + A_TAG_START + "$1</a> " );
	}
} );
CONTENT.style.margin = "0 auto";