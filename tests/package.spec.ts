import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const manifest = JSON.parse(readFileSync('package.json', 'utf8')) as {
  name: string
  dsh: { engines: { dsh: string }; bundle: { patch: string }; client: { platform: string } }
}

describe('published bundle', () => {
  it('declares the DSH bundle and browser client faces', () => {
    expect(manifest.name).toBe('dsh-session-workbench')
    expect(manifest.dsh.engines.dsh).toBe('>=0.1.1-rc.2')
    expect(manifest.dsh.bundle.patch).toBe('./cordis.patch.yml')
    expect(manifest.dsh.client.platform).toBe('web')
  })

  it('replaces the single-owner stock workspace row', () => {
    const patch = readFileSync('cordis.patch.yml', 'utf8')
    expect(patch).toContain('- id: ui-workspace')
    expect(patch).toContain('disabled: true')
    expect(patch).toContain('- id: ui-session-workbench')
    expect(patch).toContain('name: dsh-session-workbench')
  })

  it('ships a client artifact registered under the package name', () => {
    const client = readFileSync('lib/client.js', 'utf8')
    expect(client.startsWith('window.__ModuleLoader__.load({ id: "dsh-session-workbench"')).toBe(true)
    expect(client).not.toMatch(/[A-Za-z]:[\\/](?:Users|home)[\\/]/u)
  })
})
