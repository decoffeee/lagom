import { home } from "@/lib/site";
import { Icon } from "@/lib/icons";
import { AnysideButton } from "../AnysideButton";

export function Amenities() {
  return (
    <section className="section amenities-sc" id="amenities">
      <div className="container amen-head">
        <h2 className="home-title">{home.amenities.title}</h2>
        <div className="amen-text rich">
          <p>{home.amenities.text}</p>
        </div>
      </div>
      <div className="container amen-grid">
        {home.amenities.items.map((a) => (
          <div className="block amen-cell" key={a.label}>
            <Icon name={a.icon} size={50} />
            <h3 className="amen-label">{a.label}</h3>
          </div>
        ))}
      </div>
      <div className="container cta-ct">
        <div className="block" style={{ alignItems: "center" }}>
          <AnysideButton href="/contact/">{home.cta}</AnysideButton>
        </div>
      </div>
    </section>
  );
}
