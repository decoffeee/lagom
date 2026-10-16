import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AnysideButton } from "@/components/AnysideButton";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="body-div">
      <PageHero title="lost" text="The page you are looking for does not exist. Let's take you home.">
        <div className="container cta-ct" style={{ paddingBottom: 150 }}>
          <div className="block" style={{ alignItems: "center" }}>
            <AnysideButton href="/">Back home</AnysideButton>
          </div>
        </div>
      </PageHero>
    </div>
  );
}
