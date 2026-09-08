# opendcl.github.io

GitHub Pages site for the [OpenDCL](https://github.com/opendcl/OpenDCL) project.

## What this site hosts

| Path | Content |
| --- | --- |
| `/` | Project home |
| `/download/` | Studio / Runtime download page |
| `/localization/` | Translator language packs (pre-built + browser build from `main`) |
| `/HelpFiles/` | Online help (ENU, DEU, RUS) |
| `/version/version.txt` | Stable product version (plain text `A.B.C.D`) for AllSamples / update-check GETs |
| `/version/version_dev.txt` | Dev/current product version (plain text `A.B.C.D`) |

Installers are **not** stored in this repository (they are large). Download links point to **GitHub Releases** on [`opendcl/OpenDCL`](https://github.com/opendcl/OpenDCL/releases).

## Updating versions

Keep these **in sync** on every public ship (not private dry-runs):

1. [`assets/versions.js`](assets/versions.js) — `stable` / `current` for the download page and `/go` redirects  
2. [`version/version.txt`](version/version.txt) — same as `stable` (four-part only, no HTML)  
3. [`version/version_dev.txt`](version/version_dev.txt) — same as `current`

**Preferred:** product repo script
[`opendcl/OpenDCL` `scripts/update-site-versions.ps1`](https://github.com/opendcl/OpenDCL/blob/main/scripts/update-site-versions.ps1)
against this clone (`-SiteRoot` or sibling `../opendcl.github.io`).

| Situation | Command |
|-----------|---------|
| Normal public ship (new **dev/current** only) | `update-site-versions.ps1 -DevVersion A.B.C.D` |
| Promote that shipped build to **stable** | `update-site-versions.ps1 -PromoteToStable` |
| Rare exception | `-StableVersion` and/or both flags explicitly |

Also:

- Release asset naming must match:  
  `OpenDCL.Studio.{ENU|DEU|CHS|ESM|FRA|RUS}.{ver}.msi`  
  `OpenDCL.Runtime.{ver}.msi` / `.msm`  
- Release **tag** must be `v{ver}` (example: `v9.3.3.1`)

**Update-check clients** HTTPS-GET the plain-text `version/*.txt` files (Runtime
`UpdateCheck.cpp` and Studio sample `*ODCL:UpdateCheck`). Bodies must be four-part
only; a 404 HTML page must not be treated as a version.

**Short links** `/go?…` (`go/index.html`): JS resolves order-independent tokens and
`location.replace`s to the real target (often a GitHub Release MSI). **Meta refresh
always goes to `/download/` only** — never to a binary URL — so a file download that
leaves the shim page open does not trigger a second download. No-JS users get the
download page. Legacy Runtimes that POST `/version/vercheck.php` are not supported.

## Community

| Need | Where |
| --- | --- |
| Chooser (ask / wishlist / bug) | [Community](https://www.opendcl.com/forum/) (`/forum/`) |
| Ask a question | [Discussions Q&A](https://github.com/opendcl/community/discussions/new?category=q-a) |
| Wishlist | [Discussions Wishlist](https://github.com/opendcl/community/discussions/new?category=wishlist) |
| Report a bug | [OpenDCL Issues](https://github.com/opendcl/OpenDCL/issues/new?template=bug.yml) |
| Historic forum threads (2007–2026) | [Forum archive](https://opendcl.github.io/forum-archive/) (also [www.opendcl.com/forum-archive](https://www.opendcl.com/forum-archive/)) |

The legacy SMF forum has been **decommissioned**. This site serves the [community chooser](https://www.opendcl.com/forum/) and topic/board redirects under `/forum/` (custom domain `www.opendcl.com` points here). `/go?wishlist` opens a new Wishlist post; `/go?bugreport&new` opens a new bug; `/go?forum&post` returns to the chooser.

## Local preview

Open `index.html` in a browser, or serve the folder with any static file server.

## License

Help content and site materials: OpenDCL Consortium. OpenDCL software is GPLv2+.
