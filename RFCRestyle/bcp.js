"use strict";
const U = "https://tools.ietf.org/html/rfc",
  H = '<a href="' + U + '$2">',
  Q = "querySelector",
  I = "innerHTML",
  R = "replace",
  C = document[ Q ]( ".content" ),
  P = C[ Q ]( "pre" ),
  RE = /\n(Request for Comments: 0*([0-9]+))/g,
  M = C[ I ].match( RE ),
  S = chrome.runtime.sendMessage;
chrome.storage.local.get( s => {
  let z = s.prfl,
    x = !0;
  if ( z ) x = s.prfls[ z ].bcp;
  if ( M.length > 1 ) {
    if ( x ) {
      S( { nt: M.map( u => u[ R ]( RE, U + "$2" ) ) } );
    } else {
      P[ I ] = P[ I ][ R ]( /\]\n/, "\n " + M.map( u => u[ R ]( RE, H + "RFC $2</a>" ) ).join( ", " ) + "]\n" );
    }
  } else if ( x ) {
    S( { nt: [ U + RE.exec( C[ I ] )[ 2 ] ] } );
  } else {
    C[ I ] = C[ I ][ R ]( RE, "\n" + H + "$1</a> " );
  }
} );
C.style.margin = "0 auto";