// The engi-band: the brand's expressive register.
// Used for the contact CTA section and the footer. Both deliberately
// break out of the content max-width — full-bleed.

function ContactBand({ onContact }) {
  return (
    <section className="engi-band" style={{ padding: "80px var(--gutter)" }}>
      <div
        style={{
          maxWidth: "var(--content-wide)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          alignItems: "center",
          gap: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontSize: 11,
              color: "var(--color-engi-ink-2)",
            }}
          >
            Inquiry
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(26px, 3vw, 36px)",
              lineHeight: 1.3,
              color: "var(--color-engi-ink)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              margin: "14px 0 16px",
            }}
          >
            取材・広告のご依頼
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 14.5,
              lineHeight: 1.85,
              color: "var(--color-engi-ink-2)",
              margin: 0,
              letterSpacing: "0.04em",
              maxWidth: 440,
            }}
          >
            都市と建築をめぐる取材依頼、特集タイアップのご相談、
            広告掲載のお問い合わせはこちらから承ります。
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onContact?.(); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              borderRadius: 999,
              background: "var(--color-engi-ink)",
              color: "var(--color-engi)",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontSize: 13,
              padding: "20px 36px",
              textDecoration: "none",
              boxShadow: "0 24px 48px -24px rgba(31,15,15,0.55)",
              fontWeight: 500,
            }}
          >
            CONTACT <span style={{ fontFamily: "var(--font-serif)" }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

window.ContactBand = ContactBand;
