"use strict";

( function( DOC ) {
	let react_to_store_change = true,
		restyled = false;

	const regulariseHEXVals = num => num.toString( 16 ).padStart( 2, "0" ),

		querySelect = ( what, how, where ) => ( where || DOC )[ `querySelector${ how ? "All" : "" }` ]( what ),

		clearStore = where => {
			react_to_store_change = false;
			where.clear( complete => react_to_store_change = true );
		},

		setStore = ( what, where ) => {
			react_to_store_change = false;
			( where || chrome.storage.local ).set( what, complete => react_to_store_change = true );
		},

		backwardsCompatibilityOne = store => {
			let val;
			Object.getOwnPropertyNames( store ).forEach( prop => {
				val = store[ prop ];
				if ( typeof val === "object" ) {
					store[ prop ] = `#${regulariseHEXVals( val.r )}${regulariseHEXVals( val.g )}${regulariseHEXVals( val.b )}`;
				}
			} );
			if ( typeof store.fzzy !== "number" ) {
				store.fzzy = 8;
			}
			return store;
		},

		backwardsCompatibilityTwo = ( store, and_sync ) => {
			if ( store.ul ) {
				clearStore( chrome.storage.local );
				Object.getOwnPropertyNames( store.prfls ).forEach( c => store.prfls[ c ] = Object.assign( { bcp: true }, store.prfls[ c ] ) );
				store = {
					sync: store.sync,
					prfl: store.prfl,
					prfls: store.prfls
				}
				if ( and_sync ) {
					clearStore( chrome.storage.sync );
					setStore( store, chrome.storage.sync );
				}
			}
			return store;
		},

		restyle = store => {
			store = store.prfls[ store.prfl ];

			const RFC_EDITOR = /rfc-editor\.org$/.test( location.hostname ),
				RE = new RegExp( `^\/rfc\/(rfc(?:[0-9]+))(?:\\.txt)${RFC_EDITOR ? "" : "?"}$` ),
				CHECK_LOCATION = RE.exec( location.pathname );

			if ( !!CHECK_LOCATION ) {
				if ( store.rdrct ) {
					chrome.runtime.sendMessage( { "update": `https://datatracker.ietf.org/doc/html/${CHECK_LOCATION[ 1 ]}` } );
				}
			} else if ( !RFC_EDITOR ) {
				if ( store.styl ) {
					const TWENTIETH_OF_FZZY = `${store.fzzy / 20}rem`,
						TENTH_OF_FZZY = `${store.fzzy / 10}rem `;

					querySelect( "style" ).textContent = `:root{--b:0 0 ${TENTH_OF_FZZY}${TENTH_OF_FZZY}${store.bodybg};--c:${store.htmlbg};--d:${store.bodybg};--e:${store.slctn};--f:${store.nrml};--g:${store.lnk};--h:${store.vha};--i:0 0 ${TWENTIETH_OF_FZZY} 0;--j:0 0 0 ${TWENTIETH_OF_FZZY};--k:.1rem ${store.ul};--l:${TWENTIETH_OF_FZZY};--m:${TENTH_OF_FZZY};--n:${store.fntsz}px;--o:${store.lnkwght ? "700" : "400"}}.whitespace,.grey,.grey a:link,.grey a:visited{${store.continuous ? "display:none}.x{margin-top:1rem}pre{margin:0" : "color:" + store.lght + "}pre{margin:.4rem 0 0 0;border-top:1px dotted " + store.lght}}${store.kto ? "#toc{padding-bottom:.8rem;height:auto}" : ""}`;

					if ( !restyled ) {
						const LEGEND_BTN = DOC.createElement( "button" ),
							TOC_BTN = DOC.createElement( "button" ),
							NAV = DOC.createElement( "nav" ),
							ORIG_LEGEND = querySelect( "#legend" ),
							ORIG_LEGEND_PAR = ORIG_LEGEND.parentElement,
							ORIG_LEGEND_PREV_SIB = ORIG_LEGEND.previousElementSibling,

							isTextNode = node => node.nodeType === 3,

							addLinkToNav = ( anchor_txt, addr, is_top ) => {
								const ANCHOR = DOC.createElement( "a" ),
									INDENT = anchor_txt.match( /^[0-9\.]+/g );
									ANCHOR.textContent = anchor_txt;
									ANCHOR.href = addr;
								if ( !is_top && INDENT ) {
									ANCHOR.style.marginLeft = `${INDENT[ 0 ].match( /[0-9]+/g ).length}ch`;
								}
								NAV.append( ANCHOR );
							},

							encapsulateWhitespace = ( elmnt, reg_ex ) => {
								if ( isTextNode( elmnt ) ) {
									const SPAN = DOC.createElement( "span" );
									let txt_or_span;
									elmnt.textContent.split( reg_ex ).forEach( chunk_of_txt => {
										if ( reg_ex.test( chunk_of_txt ) ) {
											txt_or_span = DOC.createElement( "span" );
											txt_or_span.classList.add( "whitespace" );
											txt_or_span.textContent = chunk_of_txt;
										} else {
											txt_or_span = DOC.createTextNode( chunk_of_txt );
										}
										SPAN.append( txt_or_span );
									} );
									elmnt.parentNode.replaceChild( SPAN, elmnt );
								}
							};

						chrome.runtime.sendMessage( { "css": true }, () => {
							LEGEND_BTN.setAttribute( "class", ORIG_LEGEND_PREV_SIB.getAttribute( "class" ) );
							LEGEND_BTN.title = ORIG_LEGEND_PREV_SIB.title;
							ORIG_LEGEND_PAR.innerHTML = querySelect( "script:not([type],[src])" )?.textContent.replace( /\\+/g, "" ).match( /C[^']+/ )[ 0 ];
							ORIG_LEGEND_PAR.title = "";
							ORIG_LEGEND_PAR.id = "legend";
							ORIG_LEGEND_PAR.removeAttribute( "style" );
							ORIG_LEGEND_PAR.setAttribute( "tabindex", 0 );
							ORIG_LEGEND_PAR.setAttribute( "class", ORIG_LEGEND.getAttribute( "class" ) );
							ORIG_LEGEND_PAR.before( LEGEND_BTN );
							LEGEND_BTN.setAttribute( "accesskey", "l" );
							LEGEND_BTN.textContent = "Color legend ( alt+L )";
							LEGEND_BTN.append( ORIG_LEGEND_PAR );
							TOC_BTN.id = "toc";
							TOC_BTN.setAttribute( "accesskey", "t" );
							TOC_BTN.textContent = "Table of contents ( alt+T )";
							addLinkToNav( "Top", "#legend", true );
							TOC_BTN.append( NAV );
							TOC_BTN.addEventListener( "blur", () => TOC_BTN.classList.remove( "open" ) );
							DOC.addEventListener( "focusin", evt => TOC_BTN.classList.toggle( "open", ~evt.path.indexOf( TOC_BTN ) ) );
							querySelect( ".content" ).before( TOC_BTN );

							let pre_first_child, pre_second_child;
							querySelect( "pre", true ).forEach( pre => {
								pre_first_child = pre.firstElementChild;
								pre_second_child = pre_first_child.nextSibling;
								if ( pre.classList.contains( "newpage" ) ) {
									if ( isTextNode( pre_second_child ) && pre_second_child.textContent.length === 1 ) {
										pre_second_child.remove();
									}
									encapsulateWhitespace( pre_first_child.nextElementSibling.nextSibling, /(^\n+|\n+$)/g );
								}
								encapsulateWhitespace( pre.lastElementChild.previousSibling, /(\n+$)/ );
							} );

							querySelect( ".h1,.h2,.h3,.h4,.h5,.h6", true ).forEach( heading => {
								let selflink = querySelect( "a.selflink", false, heading );
								if ( selflink ) {
									addLinkToNav( heading.textContent, selflink.href );
								}
							} );

						} );
						restyled = true;
					}
				} else if ( restyled ) {
					chrome.runtime.sendMessage( { arbitrary_prop_name: true } );
				}
			}
		},

		initRestyling = init => {
			chrome.storage.sync.get( sync_store => {
				if ( sync_store.sync ) {
					sync_store = backwardsCompatibilityTwo( sync_store, true );
					restyle( sync_store );
					setStore( sync_store );
				} else if ( init ) {
					chrome.storage.local.get( local_store => {
						local_store = backwardsCompatibilityTwo( local_store );
						restyle( local_store = local_store.prfl ? local_store : {
							sync: false,
							prfl: "Foo",
							prfls: {
								Foo: Object.assign( {
									prfl: "Foo",
									htmlbg: "#404040",
									bodybg: "#e0e0e0",
									slctn: "#c0c0c0",
									nrml: "#404040",
									lght: "#a0a0a0",
									lnk: "#0040c0",
									vha: "#009123",
									continuous: true,
									lnkwght: true,
									rdrct: false,
									styl: true,
									kto: false,
									bcp: true,
									ul: "none",
									fntsz: 16,
									fzzy: 8
								}, backwardsCompatibilityOne( local_store ) )
							}
						} );
						setStore( local_store );
					} );
				}
			} );
		};

	chrome.storage.onChanged.addListener( ( store, where ) => {
		if ( react_to_store_change ) {
			if ( where === "sync" ) {
				if ( !store.sync ) {
					initRestyling();
				}
			} else {
				if ( store.sync ) {
					if ( store.sync.newValue ) {
						chrome.storage.local.get( local_store => setStore( local_store, chrome.storage.sync ) );
					} else {
						clearStore( chrome.storage.sync );
					}
				} else {
					chrome.storage.local.get( local_store => restyle( local_store ) );
				}
			}
		}
	} );

	chrome.runtime.connect( { name: "init" } );

	initRestyling( true );

} ( document ) );
