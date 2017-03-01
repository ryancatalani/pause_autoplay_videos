// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// chrome.browserAction.onClicked.addListener(function(tab) {
chrome.tabs.onUpdated.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Pausing videos on' + tab.url + '!');
  chrome.tabs.executeScript(null, {file: "pausevideo.js"});
});
