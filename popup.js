
"use strict";

const FORM = document.querySelector( "form" ),

	createElement = ( tag_or_text, is_option ) => {
		let elmnt = document.createElement( is_option ? "option" : tag_or_text );
		if ( is_option ) {
			elmnt.textContent = tag_or_text;
		}
		return elmnt;
	},

	writeForm = store => {
		let prfl = store.prfls[ store.prfl ],
			optn_val, optn_elmnt;
		FORM.stylrs.disabled = !prfl.styl;
		FORM.sync.checked = store.sync;
		Object.getOwnPropertyNames( prfl ).forEach( optn_name => {
			optn_elmnt = FORM[ optn_name ];
			if ( optn_elmnt ) {
				optn_val = prfl[ optn_name ];
				optn_elmnt[ typeof optn_val === "boolean" ? "checked" : "value" ] = optn_val;
			}
		} );
	};

chrome.runtime.connect( { name: "popup" } );

[ [ "none", "solid", "dashed", "dotted" ], [ "Foo", "Bar", "Baz", "Qux", "Quux" ] ].forEach( ( arrs, ndx ) => {
	arrs.forEach( str => {
		let optn_name = ndx ? "prfl" : "ul",
			lbl = createElement( "label" ),
			npt = createElement( "input" );
		npt.value = str;
		npt.type = "radio";
		npt.name = optn_name;
		lbl.appendChild( document.createTextNode( str ) );
		lbl.appendChild( npt );
		FORM[ optn_name + "s" ].appendChild( lbl );
	} );
} );

document.querySelector( "input" ).addEventListener( "click", () => self.close() );

chrome.storage.local.get( store => {
	writeForm( store );
	FORM.addEventListener( "input", evt => {
		let profile = {};
		// build profile object of options
		FORM.querySelectorAll( 'input:not([name="sync"]):not([type="radio"]),input[type="radio"]:checked' ).forEach( npt => {
			profile[ npt.name ] = ~[ "color", "radio" ].indexOf( npt.type ) ? npt.value : npt.type === "range" ? npt.valueAsNumber : npt.checked;
		} );
		store.sync = FORM.sync.checked;
		let prfl_name = profile.prfl;
		store.prfl = prfl_name;
		if ( evt.target.name === "prfl" ) {
			if ( !store.prfls[ prfl_name ] ) {
				return;
			}
			writeForm( store );
		} else {
			store.prfls[ prfl_name ] = profile;
			FORM.stylrs.disabled = !profile.styl;
		}
		chrome.storage.local.set( store );
	} );
} );
