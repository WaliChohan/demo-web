const tickerItems = [
  'BAJWA ESTATE',
  'BESPOKE ARCHITECTURE',
  '3 MARLA TO 1 KANAL RESIDENCES',
  'PRIME LANDMARKS',
  'EXCLUSIVE DEVELOPMENTS',
];

export default function InfiniteTicker() {
  return (
    <div className="ticker-shell border-y border-white/10 bg-brand-card/40 py-5" aria-label={tickerItems.join(' — ')}>
      <span className="sr-only">{tickerItems.join(' — ')}</span>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {tickerItems.map((item) => (
              <span className="ticker-item" key={item}>
                {item}
                <span className="ticker-separator">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
