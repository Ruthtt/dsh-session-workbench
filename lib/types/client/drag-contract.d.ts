/** Versioned native DataTransfer type for a sidebar Session drag. */
export declare const SESSION_DRAG_MIME = "application/x-deepseek-session+json";
/** Window event used by the pointer-driven sidebar drag path. */
export declare const SESSION_POINTER_DRAG_EVENT = "dsh:session-pointer-drag";
/** Pointer drag state shared by sidebar sources and compatible drop targets. */
export interface SessionPointerDragDetail {
    phase: 'move' | 'drop' | 'cancel';
    sessionId: string;
    clientX: number;
    clientY: number;
}
/** Identity-only routing hint carried by a sidebar Session drag. */
export interface SessionDragPayload {
    version: 1;
    sessionId: string;
}
/** Serialize one Session drag payload without carrying mutable metadata. */
export declare function serializeSessionDrag(sessionId: string): string;
//# sourceMappingURL=drag-contract.d.ts.map