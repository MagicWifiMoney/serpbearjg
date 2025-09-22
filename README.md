![SerpBear](https://i.imgur.com/0S2zIH3.png)

# SerpBear

![Codacy Badge](https://app.codacy.com/project/badge/Grade/7e7a0030c3f84c6fb56a3ce6273fbc1d) ![GitHub](https://img.shields.io/github/license/towfiqi/serpbear) ![GitHub package.json version](https://img.shields.io/github/package-json/v/towfiqi/serpbear) ![Docker Pulls](https://img.shields.io/docker/pulls/towfiqi/serpbear) [![StandWithPalestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/StandWithPalestine.svg)](https://www.youtube.com/watch?v=bjtDsd0g468&rco=1)

#### [Documentation](https://docs.serpbear.com/) | [Changelog](https://github.com/towfiqi/serpbear/blob/main/CHANGELOG.md) | [Docker Image](https://hub.docker.com/r/towfiqi/serpbear)

SerpBear is an Open Source Search Engine Position Tracking and Keyword Research App. It allows you to track your website's keyword positions in Google and get notified of their position change.

![Easy to Use Search Engine Rank Tracker](https://serpbear.b-cdn.net/serpbear_readme_v2.gif)

#### Features

- **Unlimited Keywords:** Add unlimited domains and unlimited keywords to track their SERP.
- **Email Notification:** Get notified of your keyword position changes daily/weekly/monthly through email.
- **SERP API:** SerpBear comes with built-in API that you can use for your marketing & data reporting tools.
- **Keyword Research:** Ability to research keywords and auto-generate keyword ideas from your tracked website's content by integrating your Google Ads test account.
- **Google Search Console Integration:** Get the actual visit count, impressions & more for each keyword. Cached data refreshes automatically once per cron day based on the configured timezone, can be manually refreshed from settings, and falls back to global credentials when domain-level credentials aren't configured. Dashboards now automatically refetch when switching between domains thanks to slug-keyed queries, ensuring the Search Console view and insight reports stay aligned with the active property.
- **Mobile App:** Add the PWA app to your mobile for a better mobile experience.
- **Zero Cost to RUN:** Run the App on mogenius.com or Fly.io for free.
- **Robust Error Handling:** Improved input validation, safer JSON parsing, and a shared error-serialization helper that keeps scraper and refresh logs consistent.
- **Defensive Google Ads Parsing:** Keyword idea fetches pre-initialize response buffers so error logs retain the upstream text even when parsing fails.
- **Canonical Domain Settings Fetch:** The domain settings modal now loads decrypted Search Console credentials by requesting `/api/domain` with the tracked site's canonical host, so credential fields update as soon as the modal opens.
- **Resilient Settings API:** `/api/settings` now tolerates missing runtime configuration and still returns version metadata when available.
- **Defaulted Configuration:** Settings API responses merge persisted values with safe defaults so required fields like scraper selection and notifications never disappear.
- **Reliable Sessions:** Configurable login durations now persist correctly and logging out clears authentication cookies immediately.
- **API Hardening:** Notification email endpoint now enforces authentication for both UI and API key access.
- **Safer Integrations:** Google Ads refresh-token retrieval handles incomplete error payloads and Search Console storage differentiates hyphenated and dotted domains.
- **Stable Search Console Emails:** Email summaries gracefully skip Search Console stats when cached data is unavailable, keeping Docker builds and cron runs healthy.
- **Automated Security Scans:** GitHub CodeQL now reviews every push, pull request, and weekly schedule for vulnerabilities across the JavaScript/TypeScript codebase.
- **Simplified Footer:** The in-app changelog drawer has been removed; the footer now only shows the installed version without fetching GitHub releases on load.
- **Consistent Layout Gutters:** A shared clamp-based body padding now aligns the TopBar back button and domain dashboards across breakpoints while widening the large content containers.

### Requirements

- **Node.js 18.18 or newer:** The upgraded Google authentication SDK now depends on `gaxios@7` and `node-fetch@3`, eliminating the Node.js 22 `fetch()` deprecation warning while remaining compatible with active LTS releases (18.x, 20.x, and 22.x).
- **SQLite tooling:** Sequelize now talks to SQLite through a bundled `better-sqlite3` compatibility layer. Most environments can install the prebuilt binaries automatically with `npm install`, but if the download falls back to building from source you will need Python 3, `make`, and a C++ compiler (`build-essential` on Debian/Ubuntu or the Xcode command line tools on macOS).

### Continuous Integration

Every pull request and all pushes to the `main` and `dev` branches run through a GitHub Actions workflow defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). The pipeline installs dependencies with `npm ci`, executes both JavaScript and CSS linting, runs the Jest test suite via `npm run test:ci`, and builds the production bundle. The workflow also provisions a minimal `.env.local` file so environment validation passes and restores a cache for `.next/cache` to speed up subsequent builds.

All workflows now run inside concurrency groups with `cancel-in-progress: true`, so a fresh push or pull request update automatically stops any in-flight CI or Docker image builds before starting the latest run.

#### Screenshot capture configuration

- **`SCREENSHOT_API` is now mandatory:** Set this environment variable to the API key provided by your screenshot vendor (for example [ScreenshotOne](https://screenshotone.com/)). The server refuses to load settings or queue screenshot jobs when the key is missing, returning 500-series API responses that explain the misconfiguration. Add the key to `.env.local`, your Docker secrets, or your deployment platform before launching the app.

#### How it Works

The App uses third party website scrapers like ScrapingAnt, ScrapingRobot, SearchApi, SerpApi, HasData or Your given Proxy ips to scrape google search results to see if your domain appears in the search result for the given keyword.

The Keyword Research and keyword generation feature works by integrating your Google Ads test accounts into SerpBear. You can also view the added keyword's monthly search volume data once you [integrate Google Ads](https://docs.serpbear.com/miscellaneous/integrate-google-ads).

When you [integrate Google Search Console](https://docs.serpbear.com/miscellaneous/integrate-google-search-console), the app shows actual search visits for each tracked keywords. You can also discover new keywords, and find the most performing keywords, countries, pages.you will be able to view the actual visits count from Google Search for the tracked keywords.
You can also manually refresh Search Console data anytime from the Settings page.

#### Getting Started

- **Step 1:** Deploy & Run the App.
- **Step 2:** Access your App and Login.
- **Step 3:** Add your First domain.
- **Step 4:** Get a free API key from ScrapingRobot or select a paid provider (see below) . Skip if you want to use Proxy ips.
- **Step 5:** Setup the Scraping API/Proxy from the App's Settings interface.
- **Step 6:** Add your keywords and start tracking.
- **Step 7:** Optional. From the Settings panel, setup SMTP details to get notified of your keywords positions through email. You can use ElasticEmail and Sendpulse SMTP services that are free.

#### Cron scheduling configuration

SerpBear relies on cron jobs to run scrapes, retries, and notification emails. You can customise their cadence without editing
code by adjusting the following environment variables:

- `CRON_TIMEZONE` (default `America/New_York`) — IANA timezone used for all cron jobs.
- `CRON_MAIN_SCHEDULE` (default `0 0 0 * * *`) — Cron expression used for the main scraping jobs and scheduled Google Search
  Console refreshes.
- `CRON_FAILED_SCHEDULE` (default `0 0 */1 * * *`) — Cron expression used for retrying failed scrapes.
- `CRON_EMAIL_SCHEDULE` (default `0 0 6 * * *`) — Cron expression used for the daily notification email job.

Update these variables in your `.env`/`.env.local` files or Docker environment to control when background tasks run.
Cron expressions are automatically normalized at runtime, so surrounding quotes and stray whitespace are stripped before jobs are scheduled.

> **Tip:** Cron expressions and timezone values loaded from `.env` files or Docker configuration are normalised automatically, so wrapping the schedules in quotes or leaving stray whitespace will not break the background jobs.

### Database migrations

Local and self-hosted installs can apply schema changes with the bundled npm scripts:

- `npm run db:migrate` — applies the latest migrations to the production SQLite database.
- `npm run db:revert` — rolls back the most recent migration.

The project now ships `sequelize-cli` as a production dependency, so the migration scripts work out of the box without manually installing the CLI or adding it globally.

Migrations now conform to Umzug v3’s object signature, which means the Docker entrypoint and `/api/dbmigrate` endpoint can run them directly. The legacy `sequelize-cli` workflow still works because each migration normalises its parameters before calling the query interface. On a brand-new database, start the app once (or run a short script that calls `sequelize.sync()`) before invoking the migration scripts so the base `domain` and `keyword` tables exist.

### SQLite driver upgrade

- **Why:** The legacy `sqlite3` native module depended on deprecated `node-gyp` glue. The project now ships a lightweight wrapper around `better-sqlite3`, which bundles modern tooling and offers prebuilt binaries for current Node.js releases.
- **What to do after pulling:** Run `npm install` (or `npm ci` in CI) so the new dependency and its lockfile updates are applied. If your environment lacks the prerequisites for native compilation, install Python 3 and a C/C++ toolchain before retrying the install.
- **Verifying the upgrade:** Run `npm run db:migrate` locally to confirm Sequelize can still open the database, and rerun your Docker/CI builds to ensure no scripts depend on `node-gyp` anymore.
- **API parity:** Trailing `undefined` arguments are still discarded before executing statements, while explicit `null` bindings are forwarded to the driver so calls such as `db.run('... = ?', null, cb)` match the native `sqlite3` behaviour.

#### Docker Compose deployment

The bundled `docker-compose.yml` runs the published `vontainment/v-serpbear` image with sensible defaults, persistent storage, and the environment variables listed above. Override the values in that file (or via `.env`) to match your credentials, and adjust the published port if `3030` clashes with another service on your host.

#### Container runtime behaviour

The Docker image now bakes the production build output produced by `npm run build` directly into `/app` and relies on the standalone Next.js server bundle. At runtime the container:

- sets `NODE_ENV=production` and runs as the unprivileged `nextjs` user,
- runs pending database migrations before launching the API,
- starts the cron worker in the background from the entrypoint,
- ships a pruned `node_modules/` directory with only production dependencies so cron jobs and migrations can `require()` their helpers,
- omits build-time manifests such as `package.json` and `package-lock.json` to reduce attack surface and shrink the final layer,
- exposes port `3000` by default while still persisting `/app/data` for SQLite storage.
- reports container health by explicitly loading Node's built-in `http` module before probing `http://localhost:3000/api/domains`, keeping the runtime health check compatible with stricter execution environments.
- retains server-side `console.*` logging so API traffic, scraper activity, and error diagnostics surface in container logs; set `NEXT_REMOVE_CONSOLE=true` if you need to strip non-error output for bespoke deployments.

If you need to seed or snapshot the SQLite database before running the container, populate the `data/` directory locally—those files are now copied into the runtime image without being deleted during the build.

#### SerpBear Integrates with popular SERP scraping services

If you don't want to use proxies, you can use third party Scraping services to scrape Google Search results.

| Service           | Cost          | SERP Lookup    | API |
| ----------------- | ------------- | -------------- | --- |
| scrapingrobot.com | Free          | 5000/mo        | Yes |
| serply.io         | $49/mo        | 5000/mo        | Yes |
| serpapi.com       | From $50/mo   | From 5,000/mo  | Yes |
| spaceserp.com     | $59/lifetime  | 15,000/mo      | Yes |
| SearchApi.io      | From $40/mo   | From 10,000/mo | Yes |
| valueserp.com     | Pay As You Go | $2.50/1000 req | No  |
| serper.dev        | Pay As You Go | $1.00/1000 req | No  |
| hasdata.com       | From $29/mo   | From 10,000/mo | Yes |

The Scraping Robot integration now explicitly sends both Google locale parameters—`hl` for language and `gl` for geographic targeting—so the returned SERP data matches the country configured for each keyword.

**Tech Stack**

- Next.js for Frontend & Backend.
- SQLite (via `better-sqlite3`) for Database.

### Development Practices

- Run `nvm use` (after installing [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)) to load the Node.js version pinned in `.nvmrc` (`20.18.0`) before installing dependencies so local tooling matches CI and Docker builds.
- Group external dependencies before relative paths and keep imports alphabetized in test files to satisfy lint requirements.
- Keep API response typings in sync with their JSON payloads; keyword and settings routes now expose an optional `details` string for richer error diagnostics and the TypeScript definitions mirror that contract.

### Linting & Formatting

- Run `npm run lint` before committing. ESLint 9's native flat configuration (`eslint.config.mjs`) layers Next.js core web vitals, React, accessibility, and import presets, and the run fails if any custom rules are violated.
- Use `npm run lint -- --fix` to auto-fix issues where possible; re-run the command to confirm the codebase is clean.
- Continue running `npm run lint:css` for Stylelint checks when you update global CSS.
- Editors should respect the root `.editorconfig` (two-space indentation, UTF-8, LF endings, and final newlines) to match repository formatting; JSON, YAML, and other structured data continue to use two spaces as well.
- Stylelint is now bundled locally; run `npm install` after pulling so `npm run lint:css` remains available. The dependency graph resolves without `--legacy-peer-deps`.
- The ESLint flat config now ignores the `.next` build output so running `npm run build` before `npm run lint` no longer floods the linter with errors from generated chunks.

### Testing

- `npm test` runs the unit and integration suites in Node's default worker mode.
- The sqlite dialect suite now includes a regression test verifying the mocked `better-sqlite3` driver preserves single `?` placeholder bindings end-to-end.
- Use `npm run test:cv -- --runInBand` to generate coverage serially, which avoids intermittent jsdom worker crashes during long-running suites.
- API settings integration tests now explicitly remove `SCREENSHOT_API` when simulating misconfigurations so failures surface even if local shells export the key.
- Migration error handling coverage requires Umzug migrations without `.js` extensions, matching how the runtime loader resolves extensionless module specifiers.
