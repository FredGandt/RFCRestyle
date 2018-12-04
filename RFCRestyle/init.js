"use strict";
( function( A ) {
	let rstyld = !1;
	const B = chrome,
		 C = B.storage,
		 D = C.local,
		 E = C.sync,
		 F = D.set,
		 G = D.get,
		 H = E.set,
		 I = E.get,
		 J = B.runtime,
		 K = J.sendMessage,
		 L = /^\/(?:id|rfc)\/(rfc(?:[0-9]+)|draft-(?:[a-zA-Z0-9\-]+))(?:\.txt)?$/.exec( location.pathname ),
		 M = "querySelector",
		 N = "style",
		 O = "create",
		 P = "Element",
		 Q = "href",
		 R = "ontent",
		 S = "textC" + R,
		 T = "c" + R,
		 V = "title",
		 W = "Attribute",
		 X = "et" + W,
		 Y = "s" + X,
		 Z = "insertBefore",
		AA = "#404040",
		AB = "Listener",
		AC = "addEvent" + AB,
		AD = "class",
		 U = AD + "List",
		AE = "legend",
		AF = "accesskey",
		AH = "innerHTML",
		AI = "remove",
		AJ = "previous",
		AL = "Sibling",
		AM = "Child",
		AN = "parent",
		AO = AN + P,
		AP = "next" + AL,
		AQ = "append" + AM,
		AT = "cyrillic",
		AU = ( a, b ) => ( b || A )[ M ]( a ),
		AV = ( c, d ) => Object.getOwnPropertyNames( c ).forEach( d ),
		AW = e => {
			e = e.prfls[ e.prfl ];
			if ( !!L ) {
				if ( e.rdrct ) {
					K( { f: "https://tools.ietf.org/html/" + L[ 1 ] } );
				}
			} else if ( e.styl ) {
				let g = "https://fonts.googleapis.com/css?family=" + e.fnt.replace( / /g, "+" ) + ":400,700&amp;subset=" + [ AT, "greek", "latin", "greek," + AT ].join( "-ext," ),
					h = e.fzzy / 10 + "rem ",
					i = e.fzzy / 20 + "rem",
					j = k => A[ O + P ]( k || "button" );
				if ( !~[ "monospace", "Lucida Console", "Consolas", "Courier" ].indexOf( e.fnt ) && !AU( 'link[href="' + g + '"]' ) ) {
					let l = j( "link" );
					l.rel = N + "sheet";
					l.type = "text/css";
					l[ Q ] = g;
					A.head[ AQ ]( l );
				}
				AU( N )[ S ] = ":root{--" + [
					'a:"' + e.fnt + '",monospace!important',
					"b:0 0 " + h + h + e.bodybg,
					"c:" + e.htmlbg,
					"d:" + e.bodybg,
					"e:" + e.slctn,
					"f:" + e.nrml,
					"g:" + e.lnk,
					"h:" + e.vha,
					"i:0 0 " + i + " 0",
					"j:0 0 0 " + i,
					"k:.1rem " + e.ul,
					"l:" + i,
					"m:" + h, "n:" + e.fntsz + "px", "o:" + ( e.lnkwght ? "700" : "400" )
				].join( ";--" ) + "}.whitespace,a.invisible,.grey,.grey a:link,.grey a:visited{" +
					( e.continuous ? "display:none}pre{margin:0" : "color:" + e.lght +
					"}pre{margin:.4rem 0 0 0;border-top:1px dotted " + e.lght ) + "}";
				if ( !rstyld ) {
					let m = j(),
						n = j(),
						o = j( "nav" ),
						p = AU( "#" + AE ),
						q = p[ AO ],
						r = p[ AJ + P + AL ],
						s = A[ M + "All" ]( "pre" ),
						t = ( u, v ) => {
							let w = j( "a" );
							w[ S ] = u;
							w[ Q ] = v;
							o[ AQ ]( w );
						},
						x = y => y.nodeType === 3,
						z = ( aa, ab ) => {
							if ( x( aa ) ) {
								let ac = j( "span" ), ad;
								aa[ S ].split( ab ).forEach( ae => {
									ad = A[ O + "TextNode" ]( ae );
									if ( ab.test( ae ) ) {
										ad = j( "span" );
										ad[ U ].add( "whitespace" );
										ad[ S ] = ae;
									}
									ac[ AQ ]( ad );
								} );
								aa[ AN + "Node" ][ "replace" + AM ]( ac, aa );
							}
						};
					K( { af: !0 } );
					m[ Y ]( AD, r[ "g" + X ]( AD ) );
					m[ V ] = r[ V ];
					q[ AH ] = AU( "script" )[ S ].match( /Colou?r legend[^"]+/ );
					q[ V ] = "";
					q.id = AE;
					q[ AI + W ]( N );
					q[ Y ]( "tabindex", 0 );
					q[ Y ]( AD, p[ "g" + X ]( AD ) );
					q[ AO ][ Z ]( m, q );
					m[ Y ]( AF, "l" );
					m[ S ] = "Color " + AE + " ( alt+L )";
					m[ AQ ]( q );
					n.id = "toc";
					n[ Y ]( AF, "t" );
					n[ AH ] = "<p>Table of " + T + "s ( alt+T )</p>";
					t( "Top", "#" + AE );
					n[ AQ ]( o );
					n[ AC ]( "blur", ag => n[ U ][ AI ]( "open" ) );
					A[ AC ]( "focusin", ah => n[ U ].toggle( "open", ~ah.path.indexOf( n ) ) );
					A.body[ Z ]( n, AU( "." +T ) );
					AV( s, aj => {
						let ak = s[ aj ],
							al = AU( ".selflink", ak ),
							am = ak[ "first" + P + AM ],
							an = am[ AP ];
						if ( al ) {
							t( al[ AO ][ S ], al[ Q ] );
						}
						if ( ak[ U ].contains( "newpage" ) ) {
							if ( x( an ) && an[ S ].length === 1 ) {
								ak[ AI + AM ]( an );
							}
							z( am[ "next" + P + AL ][ AP ], /(^\n+|\n+$)/g );
						}
						z( ak[ "last" + P + AM ][ AJ + AL ], /(\n+$)/ );
					} );
					rstyld = !0;
				}
			} else if ( rstyld ) {
				K( { ao: !0 } );
			}
		},
		AX = ap => ap.toString( 16 ).padStart( 2, 0 ),
		AY = aq => {
			AV( aq, ar => {
				let as = aq[ ar ];
				if ( typeof as === "object" ) {
					aq[ ar ] = "#" + AX( as.r ) + AX( as.g ) + AX( as.b );
				}
			} );
			if ( typeof aq.fzzy !== "number" ) {
				aq.fzzy = 8
			}
			return aq;
		};
	J.connect( { name: "init" } );
	I( au => {
		if ( au.sync ) {
			AW( au );
			F( au );
		} else {
			G( av => {
				AW( av = av.prfl ? av : {
					sync: !1,
					prfl: "Foo",
					prfls: {
						Foo: Object.assign( {
							prfl: "Foo",
							fnt: "Inconsolata",
							htmlbg: AA,
							bodybg: "#e0e0e0",
							slctn: "#c0c0c0",
							nrml: AA,
							lght: "#a0a0a0",
							lnk: "#0040c0",
							vha: "#009123",
							continuous: !0,
							lnkwght: !0,
							rdrct: !1,
							styl: !0,
							ul: "none",
							fntsz: 16,
							fzzy: 8
						}, AY( av ) )
					}
				} );
				F( av );
			} );
		}
		C.onChanged[ "add" + AB ]( ( aw, ax ) => {
			if ( ax === "sync" ) {
				I( ay => {
					if ( ay.sync && !aw.sync ) {
						G( az => AW( az ) );
					}
				} );
			} else {
				if ( aw.sync ) {
					if ( aw.sync.newValue ) {
						G( ba => H( ba ) );
					} else {
						E.clear()'
					}
				} else {
					G( bb => AW( bb ) )
				}
			}
		} );
	} );
} ( document ) );
