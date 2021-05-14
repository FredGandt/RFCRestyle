"use strict";

( function( DOC ) {

	let restyled = false,
		react_to_store_change = true;

	const CHECK_LOCATION = /^\/(?:id|rfc)\/(rfc(?:[0-9]+)|draft-(?:[a-zA-Z0-9\-]+))(?:\.txt)?$/.exec( location.pathname ),
		forEachObjectNames = ( obj, fnc ) => Object.getOwnPropertyNames( obj ).forEach( fnc ),
		querySelect = ( what, how, where ) => ( where || DOC )[ "querySelector" + ( how ? "All" : "" ) ]( what ),
		restyle = store => {
			store = store.prfls[ store.prfl ];
			if ( !!CHECK_LOCATION ) {
				if ( store.rdrct ) {
					chrome.runtime.sendMessage( { "update": "https://tools.ietf.org/html/" + CHECK_LOCATION[ 1 ] } );
				}
			} else if ( store.styl ) {
				let fnt_addr = "https://fonts.googleapis.com/css?family=" + store.fnt.replace( / /g, "+" ) + ":400,700&amp;subset=" + [ "cyrillic", "greek", "latin", "greek,cyrillic" ].join( "-ext," ),
					tenth_of_fzzy = store.fzzy / 10 + "rem ",
					twentieth_of_fzzy = store.fzzy / 20 + "rem";
				if ( !~[ "monospace", "Lucida Console", "Consolas", "Courier" ].indexOf( store.fnt ) && !querySelect( 'link[href="' + fnt_addr + '"]' ) ) {
					let lnk = DOC.createElement( "link" );
					lnk.rel = "stylesheet";
					lnk.type = "text/css";
					lnk.href = fnt_addr;
					DOC.head.appendChild( lnk );
				}
				querySelect( "style" ).textContent = ":root{--" + [
					'a:"' + store.fnt + '",monospace!important',
					"b:0 0 " + tenth_of_fzzy + tenth_of_fzzy + store.bodybg,
					"c:" + store.htmlbg,
					"d:" + store.bodybg,
					"e:" + store.slctn,
					"f:" + store.nrml,
					"g:" + store.lnk,
					"h:" + store.vha,
					"i:0 0 " + twentieth_of_fzzy + " 0",
					"j:0 0 0 " + twentieth_of_fzzy,
					"k:.1rem " + store.ul,
					"l:" + twentieth_of_fzzy,
					"m:" + tenth_of_fzzy,
					"n:" + store.fntsz + "px",
					"o:" + ( store.lnkwght ? "700" : "400" )
				].join( ";--" ) + "}.whitespace,.grey,.grey a:link,.grey a:visited{" +
					( store.continuous ? "display:none}.x{margin-top:1rem}pre{margin:0" : "color:" +
					store.lght + "}pre{margin:.4rem 0 0 0;border-top:1px dotted " + store.lght ) + "}" +
					( store.kto ? "#toc{padding-bottom:.8rem;height:auto}" : "" );
				if ( !restyled ) {
					let legend_btn = DOC.createElement( "button" ),
						toc_btn = DOC.createElement( "button" ),
						nav = DOC.createElement( "nav" ),
						orig_legend = querySelect( "#legend" ),
						orig_legend_par = orig_legend.parentElement,
						orig_legend_prev_sib = orig_legend.previousElementSibling,
						addLinkToNav = ( anchor_txt, addr, is_top ) => {
							let anchor = DOC.createElement( "a" ),
								indent = anchor_txt.match( /^[^ ]+/g )[ 0 ].match( /\./g );
							anchor.textContent = anchor_txt;
							anchor.href = addr;
							if ( !is_top && indent ) {
								anchor.classList.add( "c" + indent.length );
							}
							nav.appendChild( anchor );
						},
						isTextNode = node => node.nodeType === 3,
						encapsulateWhitespace = ( elmnt, reg_ex ) => {
							if ( isTextNode( elmnt ) ) {
								let span = DOC.createElement( "span" ), txt_or_span;
								elmnt.textContent.split( reg_ex ).forEach( chunk_of_txt => {
									txt_or_span = DOC.createTextNode( chunk_of_txt );
									if ( reg_ex.test( chunk_of_txt ) ) {
										txt_or_span = DOC.createElement( "span" );
										txt_or_span.classList.add( "whitespace" );
										txt_or_span.textContent = chunk_of_txt;
									}
									span.appendChild( txt_or_span );
								} );
								elmnt.parentNode.replaceChild( span, elmnt );
							}
						};
					chrome.runtime.sendMessage( { "css": true }, () => {
						legend_btn.setAttribute( "class", orig_legend_prev_sib.getAttribute( "class" ) );
						legend_btn.title = orig_legend_prev_sib.title;
						orig_legend_par.innerHTML = querySelect( "script" ).textContent.match( /Colou?r legend[^"]+/ );
						orig_legend_par.title = "";
						orig_legend_par.id = "legend";
						orig_legend_par.removeAttribute( "style" );
						orig_legend_par.setAttribute( "tabindex", 0 );
						orig_legend_par.setAttribute( "class", orig_legend.getAttribute( "class" ) );
						orig_legend_par.parentElement.insertBefore( legend_btn, orig_legend_par );
						legend_btn.setAttribute( "accesskey", "l" );
						legend_btn.textContent = "Color legend ( alt+L )";
						legend_btn.appendChild( orig_legend_par );
						toc_btn.id = "toc";
						toc_btn.setAttribute( "accesskey", "t" );
						toc_btn.textContent = "Table of contents ( alt+T )";
						addLinkToNav( "Top", "#legend", true );
						toc_btn.appendChild( nav );
						toc_btn.addEventListener( "blur", () => toc_btn.classList.remove( "open" ) );
						DOC.addEventListener( "focusin", evt => toc_btn.classList.toggle( "open", ~evt.path.indexOf( toc_btn ) ) );
						DOC.body.insertBefore( toc_btn, querySelect( ".content" ) );
						querySelect( "pre", true ).forEach( pre => {
							let pre_first_child = pre.firstElementChild,
								pre_second_child = pre_first_child.nextSibling;
							if ( pre.classList.contains( "newpage" ) ) {
								if ( isTextNode( pre_second_child ) && pre_second_child.textContent.length === 1 ) {
									pre.removeChild( pre_second_child );
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
		},
		regulariseHEXVals = num => num.toString( 16 ).padStart( 2, "0" ),
		backwardsCompatibilityOne = store => {
			forEachObjectNames( store, prop => {
				let val = store[ prop ];
				if ( typeof val === "object" ) {
					store[ prop ] = "#" + regulariseHEXVals( val.r ) + regulariseHEXVals( val.g ) + regulariseHEXVals( val.b );
				}
			} );
			if ( typeof store.fzzy !== "number" ) {
				store.fzzy = 8;
			}
			return store;
		},
		setStore = ( what, where ) => {
			react_to_store_change = false;
			( where || chrome.storage.local ).set( what, complete => react_to_store_change = true );
		},
		clearStore = where => {
			react_to_store_change = false;
			where.clear( complete => react_to_store_change = true );
		},
		backwardsCompatibilityTwo = ( store, and_sync ) => {
			if ( store.ul ) {
				clearStore( chrome.storage.local );
				forEachObjectNames( store.prfls, c => store.prfls[ c ] = Object.assign( { bcp: true }, store.prfls[ c ] ) );
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
									fnt: "Inconsolata",
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
