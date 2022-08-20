// JavaScript Document

// Override 
var os_appStates = { 
	theme: 1
};

var theme; 
if ( (typeof os_appStates !== 'undefined' && os_appStates.theme == 0) || window.location.search.search(/[?&]theme=0(?:$|&)/) !== -1) {
	theme = 0;
	// Dark theme
	document.documentElement.style.setProperty('--background_default', '#111111');
	document.documentElement.style.setProperty('--text_default', '#fefefe');
	document.documentElement.style.setProperty('--text_subtitle', '#666666;');
	document.documentElement.style.setProperty('--text_placeholder', '#222222');
	document.documentElement.style.setProperty('--design_seporator', '#222222');
	document.documentElement.style.setProperty('--design_button', '#777777');
	document.documentElement.style.setProperty('--design_cover', 'rgba(0,0,0,0.5)');
	document.documentElement.style.setProperty('--shadow_cell', 'rgba(100,100,100,0.1)');
	document.documentElement.style.setProperty('--shadow_button', 'rgba(80,80,80,0.3)');
	document.documentElement.style.setProperty('--fadeout_cover_0', 'rgba(17,17,17,0.0)');
	document.documentElement.style.setProperty('--fadeout_cover_1', 'rgba(17,17,17,1.0)');

} else {
	theme = 1;
	// Light theme
	document.documentElement.style.setProperty('--background_default', '#FFE1D4');								   
	document.documentElement.style.setProperty('--text_default', '#483D8B');
	document.documentElement.style.setProperty('--text_subtitle', '#5D669D');
	document.documentElement.style.setProperty('--text_placeholder', '#FFA07A');
	document.documentElement.style.setProperty('--design_seporator', '#c4c4c5');
	document.documentElement.style.setProperty('--design_button', '#777777');
	document.documentElement.style.setProperty('--design_cover', 'rgba(0,0,0,0.3)');
	document.documentElement.style.setProperty('--shadow_cell', 'rgba(120,120,120,0.1)');
	document.documentElement.style.setProperty('--shadow_button', 'rgba(120,120,120,0.8)');
	document.documentElement.style.setProperty('--fadeout_cover_0', 'rgba(254,254,254,0.0)');
	document.documentElement.style.setProperty('--fadeout_cover_1', 'rgba(254,254,254,1.0)');
}
if(window.location.search.search(/[?&]theme=0(?:$|&)/)!== -1){
	console.log('w theme a');
}
if(window.location.search.search(/[?&]theme=1(?:$|&)/)!== -1){
	console.log('w theme b');
}