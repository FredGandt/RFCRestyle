"use strict";

const FORM = document.querySelector( "form" ),

	writeForm = store => {
		const PRFL = store.prfls[ store.prfl ];
		let optn_val, optn_elmnt;
		FORM.stylrs.disabled = !PRFL.styl;
		FORM.sync.checked = store.sync;
		Object.getOwnPropertyNames( PRFL ).forEach( optn_name => {
			optn_elmnt = FORM[ optn_name ];
			if ( optn_elmnt ) {
				optn_val = PRFL[ optn_name ];
				optn_elmnt[ typeof optn_val === "boolean" ? "checked" : "value" ] = optn_val;
			}
		} );
	};

chrome.runtime.connect( { name: "popup" } );

document.querySelector( "input" ).addEventListener( "click", () => self.close() );

chrome.storage.local.get( store => {
	writeForm( store );
	FORM.addEventListener( "input", evt => {
		const PROFILE = {};
		// build PROFILE object of options
		FORM.querySelectorAll( 'input:not([name="sync"],[type="radio"]),input[type="radio"]:checked' ).forEach( npt => {
			PROFILE[ npt.name ] = ~[ "color", "radio" ].indexOf( npt.type ) ? npt.value : npt.type === "range" ? npt.valueAsNumber : npt.checked;
		} );
		store.sync = FORM.sync.checked;
		const PRFL_NME = PROFILE.prfl;
		store.prfl = PRFL_NME;
		if ( evt.target.name === "prfl" ) {
			if ( !store.prfls[ PRFL_NME ] ) {
				return;
			}
			writeForm( store );
		} else {
			store.prfls[ PRFL_NME ] = PROFILE;
			FORM.stylrs.disabled = !PROFILE.styl;
		}
		chrome.storage.local.set( store );
	} );
} );
