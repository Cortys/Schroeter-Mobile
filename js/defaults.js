/************************************************************************************
This file contains all important flexible data, for the construction of the app!
Try to only edit this file and not the real source code, if changes are necessary.
************************************************************************************/
var defaults = {
	defaultPage:"home", //the page that is opened, when no hash is given (the default page)
	defaultLang:"de", //the default language of the page, when no language is given
	languages:["de", "en"], //all the supported languages
	menuReg:/MENU\:\s(.*)/, //the RegEx that looks for the menu-area in loaded pages and transfers it into the real #subNav
	logoAction: function() { //the action to run, when the logo is touched
		linkLoad("home", "absolute");
	},
	pageFade:200, //the duration of the fading effect, when pages change
	bgDict: { //some pages may have the same or a random bg, note those specials here
		borkholzhausen:"verlauf.jpg",
		international:"verlauf.jpg",
		mp:"verlauf.jpg",
		fach:"verlauf.jpg",
		smokeacademy:"verlauf.jpg",
		info:"verlauf.jpg",
		soft:"verlauf.jpg"
	},
	scriptDict: { //some pages may have the same js-file, note those here
		borkholzhausen:"wheels",
		international:"wheels"
	},
	cssDict: { //some pages may have the same css-file, note those here
		borkholzhausen:"wheels",
		international:"wheels"
	},
	scriptLanguages:{}, //some pages may have different js-files for each language, note those here
	cssLanguages: { unternehmen:1 }, //some pages may have different css-files for each language, note those here
	meetingCount:9, //the number of meetingpoint-magazines
	fachCount:5, //the number of "fachberichte"-pdf files
	products: { //the products and the number of slideshow images for each one
		"Thermic":4,
		"Conti":3,
		"Fish":4,
		"Arctic":4,
		"Clima":6,
		"Smok":4,
		"Semi":6,
		"Bake":3,
		"Cleen":4
	},
	productSubs: { //some products have sub-pages (pdfs)
		"Thermic":["HR", "KA/KK", "PA"],
		"Clima":["AT", "KR", "NR"]
	},
	productLangs: ["DE", "EN", "RU", "ES"] //the supported languages for the product information
};
$.each(defaults["products"], function(i,v) {
	defaults.bgDict["pr"+i] = "empty.jpg";
	defaults.cssDict["pr"+i] = "pr";
	defaults.scriptDict["pr"+i] = "pr";
});