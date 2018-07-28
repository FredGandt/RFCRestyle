chrome.extension.onConnect.addListener( port => {
	let os = {};
	const ps = port.sender,
		t = ps.tab,
		pd = ps.id,
		td = t.id,
		mt = /^https\:\/\/(?:www|tools)\.ietf\.org\/(?:id|rfc)\/(?:rfc([0-9]+)|draft\-([a-zA-Z0-9\-]+))(?:\.txt)?$/.exec( t.url ),
		rgb = c => "rgb(" + c.r + "," + c.g + "," + c.b + ")",
		setDef = ( p, v ) => {
			if ( !os.hasOwnProperty( p ) ) {
				os[ p ] = v;
			}
		},
		setCSS = () => {
			const osc = os.continuous,
				bodybgrgb = rgb( os.bodybg ),
				nrmlrgb = rgb( os.nrml ),
				lghtrgb = rgb( os.lght ),
				lnkrgb = rgb( os.lnk ),
				vhargb = rgb( os.vha ),
				ulws = os.ul + " ";
			chrome.tabs.executeScript( td, { code: "document.getElementById('" + ps.id + "').textContent='::selection{background:" + rgb( os.slctn ) + "}html{font-size:" + os.fntsz + "px;text-align:center;background:" + rgb( os.htmlbg ) + ";margin:0}body{display:inline-block;margin:2rem auto;text-align:left;background:" + bodybgrgb + ";padding:1.2rem;font-family:Inconsolata,Consolas,monospace;color:" + nrmlrgb + ";border-radius:.8rem;" + ( os.fzzy ? "box-shadow:0 0 .8rem .8rem " + bodybgrgb : "" ) + "}pre:first-child{padding-top:1rem}pre{" + ( !osc ? "margin:.3rem 0 0 0;border-top:1px dotted " + lghtrgb : "margin:0" ) + ";font-family:Inconsolata,Consolas,monospace}a:link{color:" + lnkrgb + ";text-decoration:none;font-weight:bold;border-bottom:1px " + ulws + lnkrgb + "}a:visited,a:hover,a:active{color:" + vhargb + ";border-bottom:1px " + ulws + vhargb + "}a.invisible{display:block;border:0;text-decoration:none;color:" + bodybgrgb + ";cursor:default}h1,h2,h3,h4,h5,h6{font-size:1rem;max-width:72ch;margin:1.25rem 0 0 0;white-space:pre-line;text-align:center}h1{font-size:2rem;max-width:36ch}h2{font-size:1.5rem;max-width:48ch}h3{font-size:1.2rem;max-width:60ch}.pre{white-space:pre}.header{font-weight:bold}.newpage{page-break-before:always}a.selflink{color:" + nrmlrgb + ";text-decoration:none}@media print{html{background:#fff}body{background:#fff;font-size:10.5pt}pre{border-top:0}a:link,a:visited{text-decoration:none}.noprint{display:none}}@media screen{.grey,.grey a:link,.grey a:visited{" + ( osc ? "display:none" : "color:" + lghtrgb ) + "}.bgwhite{background:#fff}.bgred{background:#f44}.bggrey{background:#666}.bgbrown{background:#840}.bgorange{background:#fa0}.bgyellow{background:#ee0}.bgmagenta{background:#f4f}.bgblue{background:#66f}.bgcyan{background:#4dd}.bggreen{background:#4f4}#legend{position:absolute;top:0;left:0;z-index:1;visibility:hidden;text-align:left;padding:.8rem;font-size:.86rem;border:none;background:" + bodybgrgb + ";border-radius:0 0 .8rem 0;box-shadow:.125rem .25rem 1.25rem .125rem rgba(0,0,0,0.5)}.cplate{font-size:70%;border:1px solid " + nrmlrgb + ";border-radius:.15rem}}#toc{position:fixed;height:0;top:0;right:0;padding:.2rem 1.2rem 1.2rem 1.2rem;font-size:.86rem;font-family:Inconsolata,Consolas,monospace;overflow:hidden;background:" + bodybgrgb + ";border:0;border-radius:0 0 0 .8rem;box-shadow:.125rem .25rem 1.25rem .125rem rgba(0,0,0,0.5);cursor:pointer;text-align:left}#toc p{display:none;margin:.3rem 0}#toc h4{display:inline;margin:0;color:" + nrmlrgb + "}#toc a{border:0}#toc a:before{content:\"• \"}#toc.open{height:calc(100% - 2rem);overflow:auto}#toc.open p{display:block}div[title=\"Click for colour legend.\"]{font-size:1rem;width:72ch;height:1rem!important;cursor:pointer;border-radius:.3rem;box-shadow:.125rem .125rem .3rem 1px rgba(0,0,0,0.3)}button:not(#toc){position:relative;top:-1.25rem;background:transparent;padding:0;border:0;font-family:Inconsolata,Consolas,monospace;font-size:1rem}span.pre.noprint.docinfo.top{position:relative;top:1rem;max-width:72ch;display:block;white-space:pre-wrap;text-align:center}hr.noprint{display:none}small:last-child{white-space:pre-line}" + ( osc ? ".whitespace,a.invisible{display:none}" : "" ) + "';" } );
		};
	chrome.pageAction.show( td );
	chrome.storage.local.get( o => {
		if ( o.hasOwnProperty( "styl" ) ) {
			os = o;
			setDef( "continuous", true );
			setDef( "rdrct", false );
			setDef( "fntsz", 16 );
		} else {
			os = {
				bodybg: {
					r: 224,
					g: 224,
					b: 224
				},
				slctn: {
					r: 192,
					g: 192,
					b: 192
				},
				lght: {
					r: 160,
					g: 160,
					b: 160
				},
				htmlbg: {
					r: 64,
					g: 64,
					b: 64
				},
				nrml: {
					r: 64,
					g: 64,
					b: 64
				},
				lnk: {
					r: 0,
					g: 64,
					b: 192
				},
				vha: {
					r: 0,
					g: 145,
					b: 35
				},
				continuous: true,
				rdrct: false,
				fzzy: true,
				styl: true,
				ul: "none",
				fntsz: 16
			};
			chrome.storage.local.set( os );
		}
		if ( !!mt ) {
			if ( os.rdrct ) {
				chrome.tabs.update( td, { url: "https://tools.ietf.org/html/" + ( mt[ 1 ] ? "rfc" + mt[ 1 ] : "draft-" + mt[ 2 ] ) } );
			}
		} else {
			if ( os.styl ) {
				chrome.tabs.executeScript( td, { code: "(function(){let D=document,h=D.querySelector('head'),p=D.createElement('link'),s=h.querySelector('style');if(s){p.href='https://fonts.googleapis.com/css?family=Inconsolata:400,700';p.rel='stylesheet';p.type='text/css';h.appendChild(p);s.id='" + pd + "';h.appendChild(s)}}());" } );
				setCSS();
				chrome.tabs.executeScript( td, { file: "initJS.js" } );
			}
			chrome.storage.onChanged.addListener( () => {
				chrome.storage.local.get( o => {
					os = o;
					setCSS();
				} );
			} );
		}
	} );
} );