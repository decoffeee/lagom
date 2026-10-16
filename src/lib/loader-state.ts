/**
 * Tiny pub/sub so page animations wait for the site loader on a hard load,
 * and run immediately on client-side navigations.
 */
let done = false;
const subs = new Set<() => void>();

export const loaderState = {
  isDone: () => done,
  markDone() {
    if (done) return;
    done = true;
    subs.forEach((fn) => fn());
    subs.clear();
  },
  onDone(fn: () => void) {
    if (done) {
      fn();
      return () => {};
    }
    subs.add(fn);
    return () => {
      subs.delete(fn);
    };
  },
};
