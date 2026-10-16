import type Lenis from "lenis";

let instance: Lenis | undefined;

export const setLenis = (lenis: Lenis | undefined) => {
  instance = lenis;
};
export const getLenis = () => instance;

export function lockScroll(lock: boolean) {
  if (lock) {
    instance?.stop();
    document.documentElement.classList.add("is-locked");
  } else {
    instance?.start();
    document.documentElement.classList.remove("is-locked");
  }
}
