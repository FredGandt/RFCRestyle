"use strict";
( function( A ) {
	let _r = !1,
		_l = !0;
	const
		 B = "textContent",
		 C = "Element",
		 D = "class",
		 E = "Child",
		 F = "append" + E,
		 G = D + "List",
		 H = "Sibling",
		 I = "Listener",
		 J = chrome,
		 K = J.storage,
		 L = K.sync,
		 M = "match",
		 N = K.local,
		 P = J.runtime,
		 Q = "sendMessage",
		 R = "Attribute",
		 S = "set" + R,
		 T = "parent",
		 U = "forEach",
		 V = "previous",
		 W = "remove",
		 X = "create",
		 Y = "addEvent" + I,
		 Z = "accesskey",
		AA = "insertBefore",
		AB = /^\/(?:id|rfc)\/(rfc(?:[0-9]+)|draft-(?:[a-zA-Z0-9\-]+))(?:\.txt)?$/.exec( location.pathname ),
		BZ = ( a, b ) => Object.getOwnPropertyNames( a )[ U ]( b ),
		BA = ( a, b, c ) => ( c || A )[ "querySelector" + ( b ? "All" : "" ) ]( a ),
		BB = a => {
			a = a.prfls[ a.prfl ];
			if ( !!AB ) {
				if ( a.rdrct ) P[ Q ]( { u: "https://tools.ietf.org/html/" + AB[ 1 ] } );
			} else if ( a.styl ) {
				let b = "https://fonts.googleapis.com/css?family=" + a.fnt.replace( / /g, "+" ) + ":400,700&amp;subset=" + [ "cyrillic", "greek", "latin", "greek,cyrillic" ].join( "-ext," ),
					c = a.fzzy / 10 + "rem ",
					d = a.fzzy / 20 + "rem",
					e = f => A[ X + C ]( f || "button" );
				if ( !~[ "monospace", "Lucida Console", "Consolas", "Courier" ].indexOf( a.fnt ) && !BA( 'link[href="' + b + '"]' ) ) {
					let g = e( "link" );
					g.rel = "stylesheet";
					g.type = "text/css";
					g.href = b;
					A.head[ F ]( g );
				}
				BA( "style" )[ B ] = ":root{--" + [
					'a:"' + a.fnt + '",monospace!important',
					"b:0 0 " + c + c + a.bodybg,
					"c:" + a.htmlbg,
					"d:" + a.bodybg,
					"e:" + a.slctn,
					"f:" + a.nrml,
					"g:" + a.lnk,
					"h:" + a.vha,
					"i:0 0 " + d + " 0",
					"j:0 0 0 " + d,
					"k:.1rem " + a.ul,
					"l:" + d,
					"m:" + c,
					"n:" + a.fntsz + "px",
					"o:" + ( a.lnkwght ? "700" : "400" )
				].join( ";--" ) + "}.whitespace,.grey,.grey a:link,.grey a:visited{" +
					( a.continuous ? "display:none}.x{margin-top:1rem}pre{margin:0" : "color:" +
					a.lght + "}pre{margin:.4rem 0 0 0;border-top:1px dotted " + a.lght ) + "}";
				if ( !_r ) {
					let h = e(),
						i = e(),
						j = e( "nav" ),
						k = BA( "#legend" ),
						l = k[ T + C ],
						m = k[ V + C + H ],
						o = ( p, q, n ) => {
							let r = e( "a" ),
								ac = p[ M ]( /^[^ ]+/g )[ 0 ][ M ]( /\./g );
							r[ B ] = p;
							r.href = q;
							if ( !n && ac ) r[ G ].add( "c" + ac.length );
							j[ F ]( r );
						},
						s = t => t.nodeType === 3,
						u = ( v, w ) => {
							if ( s( v ) ) {
								let x = e( "span" ), y;
								v[ B ].split( w )[ U ]( z => {
									y = A[ X + "TextNode" ]( z );
									if ( w.test( z ) ) {
										y = e( "span" );
										y[ G ].add( "whitespace" );
										y[ B ] = z;
									}
									x[ F ]( y );
								} );
								v[ T + "Node" ][ "replace" + E ]( x, v );
							}
						};
					P[ Q ]( { c: !0 }, () => {
						h[ S ]( D, m[ "get" + R ]( D ) );
						h.title = m.title;
						l.innerHTML = BA( "script" )[ B ][ M ]( /Colou?r legend[^"]+/ );
						l.title = "";
						l.id = "legend";
						l[ W + R ]( "style" );
						l[ S ]( "tabindex", 0 );
						l[ S ]( D, k[ "get" + R ]( D ) );
						l[ T + C ][ AA ]( h, l );
						h[ S ]( Z, "l" );
						h[ B ] = "Color legend ( alt+L )";
						h[ F ]( l );
						i.id = "toc";
						i[ S ]( Z, "t" );
						i[ B ] = "Table of contents ( alt+T )";
						o( "Top", "#legend", 1 );
						i[ F ]( j );
						i[ Y ]( "blur", () => i[ G ][ W ]( "open" ) );
						A[ Y ]( "focusin", aa => i[ G ].toggle( "open", ~aa.path.indexOf( i ) ) );
						A.body[ AA ]( i, BA( ".content" ) );
						BA( "pre", 1 )[ U ]( ab => {
							let ae = ab[ "first" + C + E ],
								af = ae[ "next" + H ];
							if ( ab[ G ].contains( "newpage" ) ) {
								if ( s( af ) && af[ B ].length === 1 ) ab[ W + E ]( af );
								u( ae[ "next" + C + H ][ "next" + H ], /(^\n+|\n+$)/g );
							}
							u( ab[ "last" + C + E ][ V + H ], /(\n+$)/ );
						} );
						BA( "h1,h2,h3,h4,h5,h6", 1 )[ U ]( ag => {
							let ah = ag[ T + C ][ V + H ],
								ai = ah.tagName,
								aj = BA( "a.selflink", 0, ag );
							if ( ( s( ah ) && !/\n\s+$/m.test( ah[ B ] ) ) || ai && ( /^h[1-6]$/.test( ai ) || ( ai === "SPAN" && BA( ".whitespace", 0, ah ) ) ) ) ag[ G ].add( "x" );
							if ( aj ) o( ag[ B ], aj.href );
						} );
					} );
					_r = !0;
				}
			} else if ( _r ) P[ Q ]( { r: !0 } );
		},
		BC = a => a.toString( 16 ).padStart( 2, "0" ),
		BD = a => {
			BZ( a, b => {
				let c = a[ b ];
				if ( typeof c === "object" ) a[ b ] = "#" + BC( c.r ) + BC( c.g ) + BC( c.b );
			} );
			if ( typeof a.fzzy !== "number" ) a.fzzy = 8;
			return a;
		},
		BE = ( a, b ) => {
			_l = !1;
			( b || N ).set( a, c => _l = !0 );
		},
		BY = a => {
			_l = !1;
			a.clear( b => _l = !0 );
		},
		BX = ( a, b ) => {
			if ( a.ul ) {
				BY( N );
				BZ( a.prfls, c => a.prfls[ c ] = Object.assign( { bcp: !0 }, a.prfls[ c ] ) );
				a = {
					sync: a.sync,
					prfl: a.prfl,
					prfls: a.prfls
				}
				if ( b ) {
					BY( L );
					BE( a, L );
				}
			}
			return a;
		},
		BF = a => {
			L.get( b => {
				if ( b.sync ) {
					b = BX( b, !0 );
					BB( b );
					BE( b );
				} else if ( a ) {
					N.get( c => {
						c = BX( c );
						BB( c = c.prfl ? c : {
							sync: !a,
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
									continuous: a,
									lnkwght: a,
									rdrct: !a,
									styl: a,
									bcp: a,
									ul: "none",
									fntsz: 16,
									fzzy: 8
								}, BD( c ) )
							}
						} );
						BE( c );
					} );
				}
			} );
		};
	K.onChanged[ "add" + I ]( ( a, b ) => {
		if ( _l ) {
			if ( b === "sync" ) {
				if ( !a.sync ) BF();
			} else {
				if ( a.sync ) {
					if ( a.sync.newValue ) N.get( c => BE( c, L ) );
					else BY( L );
				} else N.get( d => BB( d ) );
			}
		}
	} );
	P.connect( { name: "i" } );
	BF( !0 );
} ( document ) );