# dsh-session-workbench

English | [中文](README.zh.md)

A replacement workspace sidebar for the DeepSeek Harness Web GUI. It keeps the standard Workspace browser and adds deliberate Session organization, export, and deletion controls.

## What it does

- Drag a Session within a Workspace to persist its manual order.
- Drag an idle Session to another Workspace to migrate it as an inherited child while preserving the source until the Host commits the new Session.
- Drag a Session onto a compatible composer to insert a structured Session reference without moving the source.
- Export one Session and its descendants through the Host ZIP endpoint.
- Permanently delete one Session through a guarded confirmation dialog while retaining Archive as the non-destructive action.
- Keep the standard Workspace picker, search, grouping, folding, rename, fork, archive, and Workspace management behavior.

## Install

Install the GitHub release into a Web profile, then restart that profile:

```sh
dsh plugin --profile web add github:Ruthtt/dsh-session-workbench
```

The bundle disables the stock `ui-workspace` row because `sidebar.workspaces` has one owner, then mounts `dsh-session-workbench` in its place.

## Compatibility

Version `0.1.0` is built and tested against DeepSeek Harness `0.1.1-rc.2`. The browser bundle is self-contained and uses only the official npm SDK for types and shared runtime modules.

Permanent deletion and cross-Workspace migration require the Host capabilities `session.delete` and `session.migrate`. They are present in the matching DeepseekHarness deployment dated 2026-08-24. A stock Host without those extensions can load the sidebar, but those two actions report a compatibility error instead of mutating storage.

Session export uses the standard `/api/session.export` route. Drag-to-composer copy requires a composer that listens for the shared `dsh:session-pointer-drag` contract.

## Config

The plugin has no settings. Install it in exactly one bundle layer for a profile; its patch replaces the stock Workspace browser automatically.

## Safety model

Delete is destructive and removes one persisted Session only after explicit confirmation. It does not recursively delete descendants or content-addressed attachment blobs. Migration is accepted only for an idle source Session and archives the source only after the inherited child is durable and attached to the destination Workspace.

The drag payload contains only a version and Session identity. Titles, history, references, and Workspace authority are resolved by the Host rather than trusted from browser drag data.

## Development

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

Install a local checkout for integration testing:

```sh
dsh plugin --profile web add link:/absolute/path/to/dsh-session-workbench
```

## Provenance

The Workspace browser is derived from the MIT-licensed [`@deepseek-ai/dsh-client-ui-workspace`](https://github.com/deepseek-ai/DeepSeek-Harness) package. See [NOTICE](NOTICE) for attribution.

## Known limitations

- The first release targets the `0.1.1-rc.2` client contracts; prerelease SDK contracts may change.
- Cross-Workspace migration creates a new child identity and archives the source rather than changing the source Session's immutable working directory.
- Permanent deletion is per Session and does not recursively delete descendants.

## License

MIT.
