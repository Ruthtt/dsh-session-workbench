//#region src/index.ts
/**
* Session workbench plugin, node half. The empty apply exists
* so the plugin appears in the host cordis.yml / Loader (load and lifecycle
* follow the host; the browser half ships via exports["./client"], discovered
* through the package.json dsh.client declaration).
*/
/** Stable Cordis plugin name. */
const name = "session-workbench";
/** Host plugin body - session mutations stay owned by the Harness host. */
function apply() {}
//#endregion
export { apply, name };
