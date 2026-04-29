function Wordmark({ inverse = false, size = "md" }) {
  const sizes = { sm: 16, md: 22, lg: 32, xl: 48 };
  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.22em",
        fontSize: sizes[size],
        color: inverse ? "var(--color-engi-ink)" : "var(--color-accent)",
        fontWeight: 400,
        whiteSpace: "nowrap",
      }}
    >
      DIG &amp; BUILD
    </div>
  );
}

window.Wordmark = Wordmark;
