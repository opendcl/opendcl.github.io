# opendcl.github.io

GitHub Pages site for the [OpenDCL](https://github.com/opendcl/OpenDCL) project.

## What this site hosts

| Path | Content |
| --- | --- |
| `/` | Project home |
| `/download/` | Studio / Runtime download page |
| `/localization/` | Translator language packs (pre-built + browser build from `main`) |
| `/HelpFiles/` | Online help (ENU, DEU, RUS) |

Installers are **not** stored in this repository (they are large). Download links point to **GitHub Releases** on [`opendcl/OpenDCL`](https://github.com/opendcl/OpenDCL/releases).

## Updating versions

Edit [`assets/versions.js`](assets/versions.js):

- `stable` / `current` version strings  
- Release asset naming must match:  
  `OpenDCL.Studio.{ENU|DEU|CHS|ESM|FRA|RUS}.{ver}.msi`  
  `OpenDCL.Runtime.{ver}.msi` / `.msm`  
- Release **tag** must be `v{ver}` (example: `v9.3.3.1`)

## Community

| Need | Where |
| --- | --- |
| New questions & conversation | [GitHub Discussions](https://github.com/opendcl/community/discussions) |
| Historic forum threads (2007–2026) | [Forum archive](https://opendcl.github.io/forum-archive/) (also [www.opendcl.com/forum-archive](https://www.opendcl.com/forum-archive/)) |

The legacy SMF forum has been **decommissioned**. This site serves the [forum landing](https://www.opendcl.com/forum/) and topic/board redirects under `/forum/` (custom domain `www.opendcl.com` points here).

## Local preview

Open `index.html` in a browser, or serve the folder with any static file server.

## License

Help content and site materials: OpenDCL Consortium. OpenDCL software is GPLv2+.
