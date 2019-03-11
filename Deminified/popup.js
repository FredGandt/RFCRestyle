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
		FORM.sync.checked = store.sync;
		let prfl = store.prfls[ store.prfl ];
		FORM.stylrs.disabled = !prfl.styl;
		Object.getOwnPropertyNames( prfl ).forEach( optn_name => {
			let optn_val = prfl[ optn_name ];
			FORM[ optn_name ][ typeof optn_val === "boolean" ? "checked" : "value" ] = optn_val;
		} );
	};

chrome.runtime.connect( { name: "popup" } );

[ "System default", "Lucida Console", "Consolas", "Courier",
	[ "Inconsolata",
		"Cousine",
		"Nanum Gothic Coding",
		"Source Code Pro",
		"Anonymous Pro",
		"Overpass Mono",
		"IBM Plex Mono",
		"Roboto Mono",
		"Ubuntu Mono",
		"Space Mono",
		"Fira Mono"
	]
].forEach( ( fnt_or_arr_of_fnts, ndx ) => {
	let opt_grp;
	if ( Array.isArray( fnt_or_arr_of_fnts ) ) {
		opt_grp = createElement( "optgroup" );
		opt_grp.label = "Google Fonts";
		fnt_or_arr_of_fnts.forEach( fnt_name => opt_grp.appendChild( createElement( fnt_name, true ) ) );
	} else {
		opt_grp = createElement( fnt_or_arr_of_fnts, true );
		opt_grp.value = ndx ? fnt_or_arr_of_fnts : "monospace";
	}
	FORM.fnt.appendChild( opt_grp );
} );

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
		let profile = { fnt: FORM.fnt.value };
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