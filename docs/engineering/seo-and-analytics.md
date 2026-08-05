# SEO and analytics

## Search architecture

The project is a static GitHub Pages site. Search-critical content must remain available without user interaction or successful client-side rendering.

- `index.html` provides the primary canonical page, visible product summary, Open Graph metadata, large social image, and JSON-LD graph.
- `library/index.html` is generated from `docs/template-library/assets.json` and contains all 100 asset titles, summaries, types, categories, tags, and crawlable source links in delivered HTML.
- `sitemap.xml` lists canonical site entry points, key guidance, and every asset source URL.
- `robots.txt` points to the sitemap for deployments where the project controls the crawler-policy location.
- `scripts/build_seo.py --check` rejects drift between the manifest and generated SEO files.

Generate the files after an intentional manifest change:

```bash
python3 -S scripts/build_seo.py
python3 -S scripts/build_starter.py
```

## Verification boundary

Generated-file, HTML, browser, link, and accessibility checks establish repository structure and tested browser behaviour. They do not prove that a search engine crawled, indexed, ranked, or displayed a URL or its structured data. [Google describes sitemap submission as a hint rather than a guarantee](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

After publication, verify the canonical homepage, static library index, social image, and sitemap over the live origin. Submit `https://carlashub.github.io/Agents-Workflow-Blueprint/sitemap.xml` through the verified Search Console property and retain the processing result. Use URL Inspection for observed crawl and index state.

The deployed project is hosted below the shared `carlashub.github.io` origin. Crawler policy is normally read from the origin-root `/robots.txt`; the repository cannot prove or control that host-root response from this project path. The project-local file remains useful for a future custom-domain or root deployment, but it is not treated as current indexing proof.

## Google Analytics implementation

This worktree configures public GA4 Web-stream measurement ID `G-PZEC365PCE`. [Google identifies this `G-` value as the identifier connecting a website to a Web data stream](https://support.google.com/analytics/answer/12270356).

`analytics.js` implements a basic, opt-in consent flow on the homepage, generated static catalogue, documentation index, builder, and privacy page:

- Consent Mode v2 defaults `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` to `denied`.
- The external `gtag.js` request is not created before the visitor explicitly allows Analytics.
- Acceptance grants analytics storage only. Advertising storage, advertising user data, advertising personalisation, Google signals, and advertising-personalisation signals remain disabled.
- Rejection is persisted in local storage and keeps the Google script unloaded on later page loads.
- A persistent Analytics settings control lets the visitor reopen the choice. Withdrawal disables further measurement, sends a denied consent update if the tag was already loaded, and removes accessible `_ga` cookies for the host.
- The privacy page identifies the measurement ID, default data categories described by Google, local preference storage, controls, and verification boundaries.

[Google's consent-mode guidance](https://developers.google.com/tag-platform/security/guides/consent) requires a default consent state before measurement commands and an update following user interaction. The implementation is deliberately stricter than advanced consent mode because it does not load the Google script before acceptance.

Browser tests intercept the exact Google tag URL and prove no request before consent, persisted rejection, exact-ID loading after acceptance, consent commands, cookie removal, and later withdrawal. These tests do not prove live collection or legal compliance. After deployment, verify refusal and acceptance on the live origin, confirm the privacy text matches organisational policy, and inspect Realtime without publishing account screenshots or identifiers beyond the public `G-` ID.
