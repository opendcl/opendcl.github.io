// OpenDCL download versions for GitHub Pages.
// Update these when publishing a new GitHub Release on opendcl/OpenDCL.
// Release assets must be named: OpenDCL.Studio.{LANG}.{ver}.msi, OpenDCL.Runtime.{ver}.msi|.msm
window.OPENDCL_VERSIONS = {
  stable: "9.1.5.2",
  current: "9.3.3.1",
  // GitHub Releases download base (tag = v{version})
  releaseDownloadBase: "https://github.com/opendcl/OpenDCL/releases/download",
  // Source / project links
  sourceRepo: "https://github.com/opendcl/OpenDCL",
  forum: "https://www.opendcl.com/forum/",
  // Optional archive while older builds remain only on SourceForge
  sourceForgeFiles: "https://sourceforge.net/projects/opendcl/files/"
};

window.opendclReleaseUrl = function (filename, version) {
  var base = window.OPENDCL_VERSIONS.releaseDownloadBase;
  return base + "/v" + version + "/" + filename;
};

window.opendclStudioUrl = function (lang, version) {
  return window.opendclReleaseUrl(
    "OpenDCL.Studio." + lang.toUpperCase() + "." + version + ".msi",
    version
  );
};

window.opendclRuntimeUrl = function (version, msm) {
  var ext = msm ? "msm" : "msi";
  return window.opendclReleaseUrl(
    "OpenDCL.Runtime." + version + "." + ext,
    version
  );
};
