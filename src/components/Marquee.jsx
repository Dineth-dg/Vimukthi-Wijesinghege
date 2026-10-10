const text = ["Homemade", "Fresh", "Colourful", "Delicious", "Cooked with Love", "Tasty"];

export default function Marquee() {
  const row = [...text, ...text];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...row, ...row].map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}