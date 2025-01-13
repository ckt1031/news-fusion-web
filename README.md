# News Fusion Web

## Immersive Translate

We have integrated the Immersive Translate to enable splitted translation of the content.

SDK is automatically loaded and initialized when the page is loaded.

If you have separately installed it's extension, you can use apply the configuration in developer settings.

```json
[
  {
    "matches": "news.tsun1031.xyz",
    "selectors": [
      "div[id^='content']"
    ],
    "excludeSelectors": [
      "header",
      "footer",
      "nav",
      ".non-content-class"
    ],
    "translationClasses": [
      "py-1",
      "text-gray-700",
      "dark:text-gray-400"
    ]
  }
]
```