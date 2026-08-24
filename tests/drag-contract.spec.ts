import { describe, expect, it } from 'vitest'
import {
  serializeSessionDrag, SESSION_DRAG_MIME, SESSION_POINTER_DRAG_EVENT,
} from '../src/client/drag-contract.ts'

describe('session drag contract', () => {
  it('uses stable cross-plugin routing identifiers', () => {
    expect(SESSION_DRAG_MIME).toBe('application/x-deepseek-session+json')
    expect(SESSION_POINTER_DRAG_EVENT).toBe('dsh:session-pointer-drag')
  })

  it('serializes identity only with an explicit version', () => {
    expect(JSON.parse(serializeSessionDrag('session-42'))).toEqual({
      version: 1,
      sessionId: 'session-42',
    })
  })
})
