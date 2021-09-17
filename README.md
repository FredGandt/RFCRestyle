# RFCRestyle
An open source Chrome extension, first published on the Chrome Web Store in early 2013, that restyles ietf.org RFC documents for reading comfort.

## Current issue:
I am aware that the IETF have a poorly configured server and visiting RFCs at `http` rather than `https` may result in a 404 instead of redirecting to the secure page. Since this extension only acts on a selection of secure pages, this failure of the IETF to configure their server correctly (sensibly) throws a spanner in the works. If the situation continues and doesn't look like it'll be fixed, I'll try and showhorn a fix into the extension (a redirect from insecure 404s or something maybe).

## Installation:
Via the Chrome Web Store at [chrome.google.com/webstore/detail/rfcrestyle/](https://chrome.google.com/webstore/detail/rfcrestyle/babdjpjkdmdppnlgjlpgiknmbdblmdbd)

### Alternatively:
* Copy all the files from [the master](https://github.com/FredGandt/RFCRestyle) directory and use them as you like. For a purely functional set of files for personal use, you can exclude this "readme" and the license. I think you'll need to keep the license if you intend passing the code along in some form; I'm no lawyer.
  * Chrome extensions may be loaded in an unpacked form from local files when "developer mode" is enabled in chrome://extensions/.
  * As I understand it (I haven't really studied the subject in great detail); Chrome extensions [may be added to some other browsers](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension) with little to no alteration.

## Change-Log (latest first):
* August 27, 2021 - Version 3.5.1
  * Minor fix of ToC indent rendering

* May 27, 2021 - Version 3.5.0
  * Since the IETF occasionally makes changes to the structure and delivery of their documents, which usually temporarily breaks this extension leaving me with a big debugging project I can live without, I have:
  	* Scrapped minification (as it's a lot of extra work to maintain)
  	* Scrapped handing of BCPs
  	* Scrapped handing of drafts
  	* Scrapped linkifying RFC and BCP index pages
  	* Scrapped selection from a choice of monospace fonts (due to content-security-policy changes, Google Web Fonts can no longer be loaded, and I can't be bothered to find a workaround)

* May 13, 2021 - Version 3.0.5
  * Rushed alterations after the IETF changed the HTML RFC addresses, document structure and who know what else

* April 4, 2021 - Version 3.0.3
  * Fixes for failure of index.js to linkify RFC and BCP indexes onscroll

* March 15, 2021 - Version 3.0.2
  * Minor update to init.css to apply contained overscroll-behavior to the Table of Contents (ToC)

* December 7, 2020 - Version 3.0.1
  * Minor update to popup.css to fix layout

* August 29, 2020 - Version 3.0.0
  * Added the option to keep the Table of Contents open all the time per user request made on the Chrome Web Store
  * Slightly increased the ToC's clearance aside the body content
  * Jumped to v3 from v2.3 to fix versioning error

* July 24, 2019 - Version 2.30
  * Removed "tabs" permission statement in manifest

* February 25, 2019 - Version 2.21
  * Applied what may turn out to be a temporary fix after an update to Chrome changed its handling of "get" and "set" function calls on local storage areas
  * This may be a short lived version as another minor error has also recently appeared. This error doesn't affect functionality but I'd like to quell it when I find a way

* December 27, 2018 - Version 2.2
  * Minor layout improvement of ToC
  * Fixed inability to navigate to pages within docs from index when "continuous" is checked

* December 17, 2018 - Version 2.1.1
  * Fixed a multitude of errors regarding storage and backwards compatibility of settings
  * Changed the creation of links in indexes to be done dynamically on scroll
  * Slightly altered the layout of the options popup

* December 15, 2018 - Version 2.1
  * Added optional (on by default because they're clones of "real" RFCs better viewed in their native form) auto redirects of BCP[0-9]+ docs to the respective RFC(s)
  * Added hyperlinking of references to RFCs and BCPs in their indexes. RFC index has > 14k links so chugs a bit. If people complain, I'll make it optional or dynamic to compensate

* December 11, 2018 - Version 2.0.8
  * Fixed heading margins so they display correctly whether "continuous" is selected or not. Unfortunately this required JavaScript intervention as CSS couldn't quite manage it alone

* December 10, 2018 - Version 2.0.7
  * Fixed more problems with the ToC, improved its layout a little with indention to match each links descendancy and cleaned up some other code while doing that
  * Almost added a "Minimised scrollbars" option but Chrome gets it wrong until the tab is refreshed or navigated. If I can find a workaround, I'll add the option later
  * Unless I notice something else I've done wrong or receive inducing feedback, this should be the last update for a while :)

* December 9, 2018 - Version 2.0.6
  * Fixed Chrome sync issues and removed a little inefficiency along the way

* December 6, 2018 - Version 2.0.5
  * Fixed Table of Contents (ToC) links

* December 6, 2018 - Version 2.0.4
  * Fixed the accidental removal of an important space character during manual minification

* December 6, 2018 - Version 2.0.3
  * Altered the processing order to cure the unsightly flash of the temporarily unstyled ToC on long pages; now much smoother loading
  * Improved the minification a bit.
  * Fixed a couple of minor errors.

* December 5, 2018 - Version 2.0.2
  * A couple of little tweaks to the page CSS to fix an unusual but potential conflict of browser behaviours; to wrap or not to wrap - that is the question.

* December 4, 2018 - Version 2.0.1 - NOTE
  * After the last update went live, I checked to ensure it was functioning correctly and was surprised by severe display errors caused by corrupted CSS ...
  * Fixed in v2.1.1

* December 4, 2018 - Version 2.0.1
  * Realised a small error when rewriting the above notes for this version and made the change; moved a tooltip in the popup

* December 4, 2018 - Version 2.0 \o/
  * This is a big update with many changes/improvements;
  * Much better optimization; the background page is no longer persistently active - reducing system resource usage (although, on a per session basis, if the popup is used, background.js remains activated (to be fixed))
  * Addition of the ability to store multiple unique profiles (e.g. a dark one for night time might be nice)
  * Added the option to sync the settings across all instances of Chrome the user is logged in to
  * Changed the way colors are set, from RGB sliders to HTML5 color inputs that utilise Chrome's native color-picker UI
  * Made it possible to select from a list of monospace fonts
  * Made efforts to improve the accessibility of the ToC and Legend
  * Managed to keep the overall size of the extension from bloating badly with all the additional options by the hard won application of extreme minification
  * As far as I can tell, this should be a smooth transition, with no user actually noticing any change in functionality unless they open the popup. As always, I check for support requests every day

* July 25, 2018 - Version 1.2.3.1
  * Added a few CSS rules to fix the width of an element at the top of all RFCs, that on some can be wider than the rest of the text, unwelcomely pushing the whole page body of center

* July 22, 2018 - Version 1.2.3.0
  * A few minor improvements to the code while working to create an unminified package to publish somewhere for open-source use

* August 18, 2017 - Version 1.2.2.0
  * Bug fix; thanks to user feedback via the "support" tab on the Chrome Web Store listing :)

* May 6, 2017 - Version 1.2.1.5
  * Fixed inability to disable auto redirect from TXT to HTML docs

* April 30, 2017 - Version 1.2.1.0
  * Updated icons, fixed an encoding issue to allow more efficient execution and thereby reduced the extension weight a bit more

* April 28, 2017 - Version 1.2.0.2
  * Corrected URL matching to included edge cases
  * Discovered another type of document and will add functionality to handle it sometime later

* April 27, 2017 - Version 1.2.0.1
  * Added optional automatic redirection from plain text RFCs and Drafts to their HTML versions
  * Further minified and optimised all the code and markup to improve performance and reduce "weight"
  * Now only works with secure connections (all ietf.org RFCs and Drafts are forced secure now)

* April 23, 2017 - Version 1.1.0.2
  * A little minification, added and corrected some logic

* April 23, 2017 - Version 1.1.0.0
  * Added setting to toggle between the default multi-page layout, and a continuous layout with reduced whitespace and no visible page headers or footers

* April 21, 2017 - Version 1.0.5.0
  * Tiny accessibility fix

* April 20, 2017 - Version 1.0.4.5
  * Fixed several issues caused by resizing the font

* April 19, 2017 - Version 1.0.4.0
  * Added ability to change the overall font size for the RFCs, and have various UI elements alter their size to match. Size adjusted by slider

* April 16, 2016 - Version 1.0.3.1
  * Changed "offline_enabled" (in the manifest) to "false" as this is a contentious issue, and removed documentation disclaimer about the contention

* June 28, 2015 - Version 1.0.3.0
  * A few changes to the CSS to compensate for changes made to the markup. Please let me know if you see anything unpleasant

* March 9, 2015 - Version 1.0.2.7
  * Minor CSS improvements

* July 29, 2014 - Version 1.0.2.6
  * A change in the way Chrome handles "change" events triggered by "range" type inputs (the sliders) broke the desired behaviour, so I've added an "input" listener
  * I'm considering a more major update to include a user request and generally improve the code, but it seems to be working okay at the minute

* April 18, 2014 - Version 1.0.2.0
  * Fixed insecure request for Inconsolata support from Google Web Fonts. Previously requested via "http://". Now requested via "https://" as it should always have been :/

* February 26, 2014 - Version 1.0.1.1
  * Very minor change to CSS (styling) of the TOC (table of contents) heading.

* June 8, 2013 - Version 1.0.1.0
  * By request, changed URL matching to include drafts; previously only acted on *://tools.ietf.org/html/rfc*; now acts on (example) ...html/draft* AND ...html/rfc*
