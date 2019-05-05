// ==UserScript==
// @name				CRX Downloader
// @namespace			CRX_Downloader
// @id					CRX_Downloader
// @description			Allows downloading .crx'es from Google's Chrome Web Store
// @version				0.1
// @author				KOLANICH
// @copyright			KOLANICH, 2015 (based on http://chrome-extension-downloader.com/how-does-it-work.php and https://github.com/doraemonsk8ers/CRX_Downloader)
// @homepageURL			https://github.com/KOLANICH/CRX_Downloader
// @license				Unlicensed
// @contributionURL		https://github.com/KOLANICH/CRX_Downloader/fork
// @contributionAmount	feel free to fork and contribute
// @include				https://chrome.google.com/webstore/detail/*/*
// @noframes			1
// @optimize			1
// ==/UserScript==

/*This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>*/
"use strict";

const downloadUriTemplate="https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=$VER$&x=id%3D$ID$%26installsource%3Dondemand%26uc";
function getBrowserVersion() {
    return window.navigator.userAgent.match(/Chrome\/([0-9.]+)/)[1];
}
function parseAddonUri(path){
	let a=path.split("/");
    return {download:downloadUriTemplate.replace("$ID$",a[a.length-1]).replace("$VER$",getBrowserVersion()),id:a[a.length-2]};
}
function getFilename(){
	return getAddonName();
}
function getAddonName(){
	return document.getElementsByTagName("H1")[0].textContent
}
function replaceButton(){
	let parsed=parseAddonUri(window.location.pathname);
	let a=document.createElement("A");
	//a.download=parsed.id+".crx";
	a.href=parsed.download;
	a.textContent="Download .CRX";
	a.style = 'display: block; margin-bottom: 1em;';

	let descEl = document.querySelector('div[itemprop="description"]');
	descEl.insertBefore(a, descEl.firstChild);
}
setTimeout(replaceButton,3000);
