import type { Metadata } from "next";
import { reviews } from "@/lib/reviews";
import { breadcrumbs, webPage } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { HeroDeco } from "@/components/home/HeroDeco";
import { AnysideButton } from "@/components/AnysideButton";
import { ReviewGrid, Stars } from "@/components/reviews/ReviewGrid";

export const metadata: Metadata = {
  title: "Reviews",
  description: reviews.metaDescription,
  alternates: { canonical: "/reviews/" },
  openGraph: { url: "/reviews/", title: "Reviews • Lagom", description: reviews.metaDescription },
};

export default function ReviewsPage() {
  return (
    <div className="body-div">
      <PageHero title={reviews.title} text={reviews.intro} className="reviews-hero">
        <HeroDeco parts={["light"]} />
        <div className="container rv-summary exp-intro-anim flicker">
          <div className="rv-score">{reviews.rating}</div>
          <div className="block rv-score-info">
            <Stars className="rv-stars--lg" />
            <div className="rv-score-label">
              out of 5 · {reviews.count} {reviews.source}
            </div>
            <a href={reviews.googleUrl} target="_blank" rel="noopener noreferrer" className="exp-link rv-google">
              Read them all on Google
            </a>
          </div>
        </div>
      </PageHero>

      <section className="section rv-sc">
        {/* the stool from the home hero waits at the foot of the reviews */}
        <HeroDeco parts={["chair"]} />
        <div className="container">
          <ReviewGrid items={reviews.items} source={reviews.source} />
        </div>
        <div className="container cta-ct rv-cta">
          <div className="block" style={{ alignItems: "center" }}>
            <AnysideButton href="/book/">Book Now</AnysideButton>
          </div>
        </div>
      </section>

      <JsonLd data={[webPage("WebPage", "Reviews • Lagom", "/reviews/", reviews.metaDescription), breadcrumbs([{ name: "Reviews", path: "/reviews/" }])]} />
    </div>
  );
}
