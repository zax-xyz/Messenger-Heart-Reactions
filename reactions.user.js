// ==UserScript==
// @name         Messenger Heart Reactions
// @namespace    https://github.com/zaxutic/
// @version      0.1
// @description  Use different heart reactions on Facebook Messenger
// @author       Michael Vo
// @match        https://www.messenger.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const heartEyes = '😍';
  const heart = '❤';
  const growingHeart = '💗';

  const heartEyesEncoded = encodeURIComponent(heartEyes);
  const heartEncoded = encodeURIComponent(heart);
  const growingHeartEncoded = encodeURIComponent(growingHeart);

  const promptText = `Emoji to use for reaction:
1: ${heartEyes} (smiling face with heart-eyes),
2: ${heart} (red heart),
3: ${growingHeart} (growing heart)`;

  const oldOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function() {
    const query = arguments[1];

    // Catch when the user is reacting with the heart emoji
    if (query.includes('ADD_REACTION') && query.includes(heartEncoded)) {
      // Get replacement reaction
      const new_reaction = Number.parseInt(prompt(promptText, '2'));

      // We don't need to do anything for 2 because it's just the same reaction
      if (1 === new_reaction) {
        arguments[1] = query.replace(heartEncoded, heartEyesEncoded);
      } else if (3 === new_reaction) {
        arguments[1] = query.replace(heartEncoded, growingHeartEncoded);
      }
    }

    // Send through the modified request
    oldOpen.apply(this, arguments);
  }
})();
