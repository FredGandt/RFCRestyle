"use strict";

const LPN = location.pathname,
	PRE = document.querySelector( "pre" );

PRE.style.cssText = "width:80ch;margin:0 auto 2em;";
PRE.innerHTML = "<p>" + PRE.textContent.split( /\n{2,}(?!\n\n)+/mg ).join( "</p><p>" ) + "</p>";

const DSE = document.scrollingElement,
	ALL_PS = Array.from( document.querySelectorAll( "p" ) ),
	linkify = () => {
		ALL_PS.filter( p => {
			let pos = p.offsetTop - DSE.scrollTop;
			return !p.dataset.d && pos > 0 && pos < window.innerHeight;
		} ).forEach( p => {
			p.innerHTML = p.textContent.replace( /(?:^| (RFC|BCP))(0*([0-9]+))/g, ( mtch, grp1, grp2, grp3 ) => {
				return ( grp1 ? " " : "" ) + '<a href="https://tools.ietf.org/html/' +
					( grp1 ? grp1.toLowerCase() : ( /bcp-index/.test( LPN ) ? "bcp" : "rfc" ) )
					+ grp3 + '" target="_blank">' + ( grp1 || "" ) + grp2 + '</a>'
			} );
			p.dataset.d = !0;
		} );
	};

linkify();

window.addEventListener( "scroll", linkify );
