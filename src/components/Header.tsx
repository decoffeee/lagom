"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";
import { nav, roomHref, rooms, site } from "@/lib/site";
import { SwapTitle } from "./SwapTitle";
import { InfiniteTitle } from "./InfiniteTitle";
import { ContactInfo } from "./ContactInfo";
import { Pill } from "./Pill";
import { SoundToggle } from "./SoundToggle";
import logo from "@/images/logo.png";

/** Fixed header (difference blend) + full-screen off-canvas menu. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();
  const offcanvas = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const accContent = useRef<HTMLDivElement>(null);

  // Build the open/close timeline once (NextBricks "Off Canvas" click timeline).
  useLayoutEffect(() => {
    const root = offcanvas.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const t = gsap.timeline({
        paused: true,
        onReverseComplete: () => gsap.set(root, { display: "none" }),
      });
      t.fromTo(
        root,
        { y: "-100vh", height: "0vh", borderBottomLeftRadius: 200, borderBottomRightRadius: 200 },
        { y: 0, height: "100vh", borderBottomLeftRadius: 0, borderBottomRightRadius: 0, duration: 0.7, ease: "expo.out", immediateRender: false },
        0,
      )
        .fromTo(".menu-title", { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05, immediateRender: false }, 0.15)
        .fromTo([".oc-contact", ".oc-copy"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "none", immediateRender: false }, 0.15)
        .fromTo(".oc-images", { autoAlpha: 0, y: 150, scale: 1.2 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", immediateRender: false }, 0.15);
      tl.current = t;
    }, root);
    return () => {
      ctx.revert();
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      lockScroll(true);
      // display is not tweenable: switch it on before playing, off again on reverse complete
      gsap.set(offcanvas.current, { display: "flex" });
      t.play();
    } else {
      t.reverse();
      lockScroll(false);
    }
  }, [open]);

  // The "Lagom Airbnb" title only shows over the hero; it fades out once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close when a menu link is followed (event delegation keeps this out of effects).
  const onMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a[href]")) setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleAcc = useCallback(() => {
    const el = accContent.current;
    if (!el) return;
    const next = !accOpen;
    setAccOpen(next);
    if (next) {
      el.classList.add("is-open");
      gsap.fromTo(el, { height: 0 }, { height: "auto", duration: 0.4, ease: "power2.out", clearProps: "height" });
    } else {
      gsap.to(el, { height: 0, duration: 0.3, ease: "power2.in", onComplete: () => { el.classList.remove("is-open"); gsap.set(el, { clearProps: "height" }); } });
    }
  }, [accOpen]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <section ref={offcanvas} className="offcanvas" aria-hidden={!open} id="site-menu" onClick={onMenuClick}>
        <div className="container offcanvas-ct">
          <div className="block oc-menu">
            <div className="block oc-menu-list">
              <nav aria-label="Main menu" className="block">
                <div className="oc-item">
                  <SwapTitle className="menu-title" text={nav.primary[0].label} href={nav.primary[0].href} aria-current={isCurrent("/") ? "page" : undefined} />
                </div>
                <div className="oc-accordion">
                  <div className="oc-acc-title" role="button" tabIndex={0} aria-expanded={accOpen} aria-controls="menu-stay" onClick={toggleAcc} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggleAcc())}>
                    <h3 className="swap-title menu-title">
                      <span className="swap-anchor">
                        <span className="swap-wrap">
                          <span className="swap-span" data-after={nav.rooms.label}>
                            {nav.rooms.label}
                          </span>
                        </span>
                      </span>
                    </h3>
                  </div>
                  <div ref={accContent} className="oc-acc-content" id="menu-stay" role="region">
                    <div className="oc-acc-row">
                      {rooms.map((r) => (
                        <Pill key={r.slug} label={r.label} italic={r.italic} image={r.images.hero} href={roomHref(r)} className="oc-pill" />
                      ))}
                    </div>
                  </div>
                </div>
                {nav.primary.slice(1).map((item) => (
                  <div className="oc-item" key={item.href}>
                    <SwapTitle className="menu-title" text={item.label} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} />
                  </div>
                ))}
              </nav>
            </div>
            <div className="oc-copy">{site.copyright}</div>
          </div>
          <div className="block oc-images">
            <InfiniteTitle images={["bathroom", "living", "kitchen", "lounge", "living-portrait"]} />
          </div>
          <div className="block oc-contact">
            <ContactInfo className="oc-contact-info" />
            <div className="block oc-big-wrap">
              <div className="oc-big">{site.mark}</div>
            </div>
            <div className="block oc-links">
              {nav.secondary.map((item) => (
                <SwapTitle key={item.href} text={item.label} href={item.href} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <header id="site-header">
        <div className="section header">
          <div className="container header-ct">
            <div className="hd-menu">
              <SoundToggle />
              <div className="burger">
                <button
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="site-menu"
                  className={`hamburger hamburger--squeeze ${open ? "is-open" : ""}`.trim()}
                  onClick={() => setOpen((v) => !v)}
                  data-cursor-stick=""
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Logo + title sit in their own non-blended layer so they keep the real brand colours;
            the bar above is difference-blended. It comes last so it paints
            on top and the logo stays clickable. */}
        <div className="section header header--logo">
          <div className="container header-ct">
            <Link href="/" className="hd-logo magnetic" aria-label={`${site.name} — home`} data-cursor-stick="">
              <Image src={logo} alt="" className="hd-logo-img" sizes="64px" priority />
            </Link>
            <div className={`hd-title ${atTop ? "" : "is-hidden"}`.trim()} aria-hidden={!atTop}>
              Lagom Airbnb
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
