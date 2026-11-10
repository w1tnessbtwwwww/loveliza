"use client";

import { useState } from "react";

// Детерминированные "случайные" сердечки, чтобы не было рассинхрона SSR/клиента
const HEARTS = Array.from({ length: 28 }, (_, i) => {
  const r = (n) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2) % 1;
  return {
    left: `${Math.round(r(1) * 100)}%`,
    size: `${Math.round(14 + r(2) * 30)}px`,
    duration: `${(9 + r(3) * 12).toFixed(1)}s`,
    delay: `${(-r(4) * 20).toFixed(1)}s`,
    opacity: (0.35 + r(5) * 0.5).toFixed(2),
    char: ["❤", "♥", "💗", "💕", "❤"][i % 5],
  };
});

const NO_TEXTS = ["Нет", "Точно?", "Подумай ещё 🥺", "Ну пожалуйста", "Не-а, не выйдет 😌"];

export default function Page() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState(null);

  const dodge = () => {
    setNoCount((c) => c + 1);
    setNoPos({
      x: Math.round((Math.random() - 0.5) * 180),
      y: Math.round((Math.random() - 0.5) * 90),
    });
  };

  return (
    <main className="scene">
      <div className="hearts" aria-hidden="true">
        {HEARTS.map((h, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: h.left,
              fontSize: h.size,
              animationDuration: h.duration,
              animationDelay: h.delay,
              opacity: h.opacity,
            }}
          >
            {h.char}
          </span>
        ))}
      </div>

      <section className="card">
        {!accepted ? (
          <>
            <div className="seal" aria-hidden="true">💌</div>
            <p className="eyebrow">Приглашение</p>
            <h1 className="title">
              Бусяшик, пойдёшь со мной
              <br />
              <em>на свидание?</em>
            </h1>

            <div className="divider" aria-hidden="true">
              <span />♥<span />
            </div>

            <dl className="details">
              <div>
                <dt>Когда</dt>
                <dd>11 ноября</dd>
              </div>
              <div>
                <dt>Во сколько</dt>
                <dd>после 16:00</dd>
              </div>
            </dl>

            <p className="bouquet">
              <span className="bouquet-icon" aria-hidden="true">💐</span>
              При встрече тебя ждёт красивый букетик!!!
            </p>

            <div className="actions">
              <button className="btn btn-yes" onClick={() => setAccepted(true)}>
                Да, конечно! ❤
              </button>
              <button
                className="btn btn-no"
                onMouseEnter={dodge}
                onClick={dodge}
                style={
                  noPos
                    ? { transform: `translate(${noPos.x}px, ${noPos.y}px)` }
                    : undefined
                }
              >
                {NO_TEXTS[Math.min(noCount, NO_TEXTS.length - 1)]}
              </button>
            </div>
          </>
        ) : (
          <div className="accepted">
            <div className="big-heart" aria-hidden="true">💖</div>
            <h1 className="title">
              <em>Ура!</em>
            </h1>
            <p className="accepted-text">
              Тогда до встречи <b>11 ноября</b> после <b>16:00</b>.
              <br />
              Букет будет тебя ждать!!!! 💐
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
