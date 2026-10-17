/**
 * Shared music state so the loader and the header toggle agree.
 *
 * - `request(on)` is the loader's "enter with / without music" choice. It is called
 *   synchronously inside the button's click so the audio element may start playing
 *   (browsers only allow audible playback from within a user gesture).
 * - `playing` is published by the toggle that owns the <audio> element.
 */
export type SoundSnapshot = { playing: boolean };

const snapshot: SoundSnapshot = { playing: false };
const listeners = new Set<(s: SoundSnapshot) => void>();

let requestHandler: ((on: boolean) => void) | null = null;
let pendingRequest: boolean | null = null;

export const soundState = {
  get: () => snapshot,

  set(patch: Partial<SoundSnapshot>) {
    Object.assign(snapshot, patch);
    listeners.forEach((fn) => fn(snapshot));
  },

  subscribe(fn: (s: SoundSnapshot) => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  /** The visitor's choice on the loader screen. */
  request(on: boolean) {
    if (requestHandler) requestHandler(on);
    else pendingRequest = on;
  },

  /** Registered by the audio owner; a choice made before it mounted is delivered at once. */
  onRequest(fn: (on: boolean) => void) {
    requestHandler = fn;
    if (pendingRequest !== null) {
      const on = pendingRequest;
      pendingRequest = null;
      fn(on);
    }
    return () => {
      if (requestHandler === fn) requestHandler = null;
    };
  },
};
