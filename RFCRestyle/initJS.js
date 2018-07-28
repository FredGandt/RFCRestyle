( function() {
	const D = document,
		txt = n => n.nodeType === 3,
		cE = e => D.createElement( e || "button" ),
		togToc = () => toc.classList.toggle( "open" ),
		hug = ( tn, ptrn ) => {
			if ( txt( tn ) ) {
				let spn = cE( "span" ), nde;
				tn.textContent.split( ptrn ).forEach( n => {
					nde = D.createTextNode( n );
					if ( ptrn.test( n ) ) {
						nde = cE( "span" );
						nde.classList.add( "whitespace" );
						nde.textContent = n;
					}
					spn.appendChild( nde );
				} );
				tn.parentNode.replaceChild( spn, tn );
			}
		},
		pres = D.querySelectorAll( "pre" ),
		ds = D.querySelectorAll( "div" ),
		ds0 = ds[ 0 ],
		ds1 = ds[ 1 ],
		leg = cE(),
		toc = cE();
	let p = cE( "h4" ),
		pge, fec, fns, sl, a;
	leg.appendChild( ds[ 2 ] );
	leg.setAttribute( "onblur", "hideElem('legend')" );
	leg.setAttribute( "onfocus", "showElem('legend')" );
	ds0.setAttribute( "style", "margin-bottom:1.25rem;" );
	D.getElementById( "legend" ).removeAttribute( "style" );
	ds0.insertBefore( ds[ 3 ], ds1 );
	ds0.insertBefore( leg, ds1 );
	ds0.removeChild( ds1 );
	toc.id = "toc";
	D.body.appendChild( toc );
	toc.classList.add( "noprint" );
	p.textContent = "Table of Contents [T]";
	toc.appendChild( p );
	p = cE( "p" );
	a = cE( "a" );
	a.href = "#legend";
	a.textContent = "Top";
	toc.appendChild( p );
	p.appendChild( a );
	toc.addEventListener( "click", togToc );
	window.addEventListener( "keypress", evt => {
		if ( evt.key === "t" ) {
			togToc();
		}
	} );
	Object.getOwnPropertyNames( pres ).forEach( pre => {
		pge = pres[ pre ];
		sl = pge.querySelector( ".selflink" );
		if ( sl ) {
			p = cE( "p" );
			a = cE( "a" );
			a.href = sl.href;
			a.textContent = sl.parentElement.textContent;
			toc.appendChild( p );
			p.appendChild( a );
		}
		fec = pge.firstElementChild;
		fns = fec.nextSibling;
		if ( pge.classList.contains( "newpage" ) ) {
			if ( txt( fns ) && fns.textContent.length === 1 ) {
				pge.removeChild( fns );
			}
			hug( fec.nextElementSibling.nextSibling, /(^\n+|\n+$)/g );
		}
		hug( pge.lastElementChild.previousSibling, /(\n+$)/ );
	} );
} () );