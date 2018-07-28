const W = window,
	D = document;
W.addEventListener( "DOMContentLoaded", () => {
	D.getElementById( "close" ).addEventListener( "click", () => W.close() );
	chrome.storage.local.get( i => {
		const o = D.getElementById( "options" ),
			save = () => {
				chrome.storage.local.set( {
					htmlbg: {
						r: o.htmlbgr.value,
						g: o.htmlbgg.value,
						b: o.htmlbgb.value
					},
					bodybg: {
						r: o.bodybgr.value,
						g: o.bodybgg.value,
						b: o.bodybgb.value
					},
					slctn: {
						r: o.slctnr.value,
						g: o.slctng.value,
						b: o.slctnb.value
					},
					nrml: {
						r: o.nrmlr.value,
						g: o.nrmlg.value,
						b: o.nrmlb.value
					},
					lght: {
						r: o.lghtr.value,
						g: o.lghtg.value,
						b: o.lghtb.value
					},
					lnk: {
						r: o.lnkr.value,
						g: o.lnkg.value,
						b: o.lnkb.value
					},
					vha: {
						r: o.vhar.value,
						g: o.vhag.value,
						b: o.vhab.value
					},
					ul: Array.from( D.querySelectorAll( "#uls input" ) ).find( n => n.checked ).value,
					continuous: o.continuous.checked.valueOf(),
					rdrct: o.rdrct.checked.valueOf(),
					fzzy: o.fzzy.checked.valueOf(),
					styl: o.styl.checked.valueOf(),
					fntsz: o.fntsz.value
				} );
			};
		o.addEventListener( "click", e => {
			let t = e.target,
				tt = t.type;
			if ( tt && tt === "button" ) {
				o.setAttribute( "class", t.parentElement.id );
			}
		} );
		o.addEventListener( "input", save );
		o.addEventListener( "change", save );
		o.continuous.checked = i.continuous;
		o.htmlbgr.value = i.htmlbg.r;
		o.htmlbgg.value = i.htmlbg.g;
		o.htmlbgb.value = i.htmlbg.b;
		o.bodybgr.value = i.bodybg.r;
		o.bodybgg.value = i.bodybg.g;
		o.bodybgb.value = i.bodybg.b;
		o.slctnr.value = i.slctn.r;
		o.slctng.value = i.slctn.g;
		o.slctnb.value = i.slctn.b;
		o.rdrct.checked = i.rdrct;
		o.nrmlr.value = i.nrml.r;
		o.nrmlg.value = i.nrml.g;
		o.nrmlb.value = i.nrml.b;
		o.lghtr.value = i.lght.r;
		o.lghtg.value = i.lght.g;
		o.lghtb.value = i.lght.b;
		o.fntsz.value = i.fntsz;
		o.styl.checked = i.styl;
		o.fzzy.checked = i.fzzy;
		o.lnkr.value = i.lnk.r;
		o.lnkg.value = i.lnk.g;
		o.lnkb.value = i.lnk.b;
		o.vhar.value = i.vha.r;
		o.vhag.value = i.vha.g;
		o.vhab.value = i.vha.b;
		D.getElementById( i.ul ).checked = true;
	} );
} );