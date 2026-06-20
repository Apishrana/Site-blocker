# SiteBlocker

SiteBlocker is a simple Chrome extension to block websites, with ability to block all the time or between a selected time range.

## Project Structure

```text
.
├── background.js
├── manifest.json
├── popup.css
├── popup.html
├── popup.js
└── README.md
```

## How It Works

1. The popup saves blocked sites to `chrome.storage.sync`.
2. If the tab URL contains a blocked site value, the tab is closed.

NOTE: the site detection works on `.includes` so if you block word `you`, every url with the word `you` will be blocked

## Installation

1. Open Chrome and go to [`chrome://extensions`](chrome://extensions).
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select this project folder.

## Permissions

This extension uses:

- `tabs`
- `storage`
- `<all_urls>`

## Author

Created by [ApishRana](https://github.com/ApishRana)
