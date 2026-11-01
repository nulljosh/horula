// Hero wall: Horula, live. World clocks read the real time in each city (Intl), a timer runs down on its ring,
// a stopwatch counts laps. One tick a second; under reduced motion the hands still keep time, nothing else moves.
(function () {
  var wall = document.getElementById('cwall'); if (!wall) return;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var n = innerWidth <= 560 ? 5 : innerWidth <= 900 ? 6 : 9;
  var NS = 'http://www.w3.org/2000/svg';
  var CITIES = [['Vancouver', 'America/Vancouver'], ['Tokyo', 'Asia/Tokyo'], ['London', 'Europe/London'], ['New York', 'America/New_York'],
                ['Sydney', 'Australia/Sydney'], ['Paris', 'Europe/Paris'], ['Dubai', 'Asia/Dubai']];
  var el = function (t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  var sv = function (t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; };
  var pad = function (v) { return (v < 10 ? '0' : '') + v; };
  var here = -new Date().getTimezoneOffset();
  function parts(tz) {
    var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23', timeZoneName: 'longOffset' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var m = /GMT([+-])(\d\d):?(\d\d)?/.exec(p.timeZoneName || ''), off = m ? (m[1] === '-' ? -1 : 1) * (+m[2] * 60 + +(m[3] || 0)) : 0;
    return { h: +p.hour, m: +p.minute, s: +p.second, diff: (off - here) / 60 };
  }
  function face(svg) {
    svg.setAttribute('viewBox', '0 0 132 132'); svg.appendChild(sv('circle', { class: 'face', cx: 66, cy: 66, r: 62 }));
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; svg.appendChild(sv('line', { class: 'tick', x1: 66 + Math.sin(a) * 52, y1: 66 - Math.cos(a) * 52, x2: 66 + Math.sin(a) * 58, y2: 66 - Math.cos(a) * 58 })); }
    var h = svg.appendChild(sv('line', { class: 'h', x1: 66, y1: 66, x2: 66, y2: 34 })), m = svg.appendChild(sv('line', { class: 'm', x1: 66, y1: 66, x2: 66, y2: 20 })),
        s = svg.appendChild(sv('line', { class: 's', x1: 66, y1: 74, x2: 66, y2: 16 })); svg.appendChild(sv('circle', { class: 'hub', cx: 66, cy: 66, r: 4 }));
    return function (hh, mm, ss) { h.setAttribute('transform', 'rotate(' + ((hh % 12) * 30 + mm / 2) + ' 66 66)'); m.setAttribute('transform', 'rotate(' + (mm * 6 + ss / 10) + ' 66 66)'); s.setAttribute('transform', 'rotate(' + ss * 6 + ' 66 66)'); };
  }
  function card() { var a = wall.appendChild(el('div', 'ck')), t = a.appendChild(el('div', 'ck-txt')); return { a: a, k: t.appendChild(el('div', 'ck-k')), big: t.appendChild(el('div', 'ck-big')), sub: t.appendChild(el('div', 'ck-sub')), svg: a.appendChild(sv('svg', {})) }; }
  var tickers = [], ci = 0;
  for (var i = 0; i < n; i++) {
    var c = card();
    if (i === 4 || i === 7) { // timer: a ring that runs down, then starts again
      (function (c, total, name) {
        c.svg.setAttribute('viewBox', '0 0 132 132'); c.svg.appendChild(sv('circle', { class: 'ring-bg', cx: 66, cy: 66, r: 54 }));
        var ring = c.svg.appendChild(sv('circle', { class: 'ring', cx: 66, cy: 66, r: 54 })), L = 2 * Math.PI * 54, left = total - 37;
        ring.setAttribute('stroke-dasharray', L); c.k.textContent = 'Timer'; c.sub.textContent = name;
        tickers.push(function () { if (!still) left = left <= 0 ? total : left - 1; c.big.textContent = Math.floor(left / 60) + ':' + pad(left % 60); ring.setAttribute('stroke-dashoffset', L * (1 - left / total)); });
      })(c, i === 4 ? 540 : 300, i === 4 ? 'Pasta' : 'Tea');
    } else if (i === 8) { // stopwatch with laps
      (function (c) {
        var f = face(c.svg), t = 83, laps = 2; c.k.textContent = 'Stopwatch';
        tickers.push(function () { if (!still) { t++; if (t % 30 === 0) laps++; } c.big.textContent = pad(Math.floor(t / 60)) + ':' + pad(t % 60); c.sub.textContent = 'Lap ' + laps; f(0, Math.floor(t / 60), t % 60); });
      })(c);
    } else {
      (function (c, city) {
        var f = face(c.svg); c.k.textContent = city[0];
        tickers.push(function () {
          var p = parts(city[1]), d = p.diff; f(p.h, p.m, p.s); c.big.textContent = p.h + ':' + pad(p.m);
          c.a.classList.toggle('night', p.h < 6 || p.h >= 20);
          c.sub.textContent = d === 0 ? 'Same time as you' : (d > 0 ? '+' : '') + (Math.round(d * 10) / 10) + (Math.abs(d) === 1 ? ' hour' : ' hours');
        });
      })(c, CITIES[ci++ % CITIES.length]);
    }
  }
  var run = function () { tickers.forEach(function (f) { f(); }); };
  run(); setInterval(run, 1000);
})();

// Hero parallax: the wall drifts at 0.45, the copy lifts at 0.2 and fades. Off under reduced motion.
(function () {
  var bg = document.querySelector('.hero-bg'), copy = document.querySelector('.hero-copy');
  if (!bg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var t = 0;
  addEventListener('scroll', function () {
    if (t) return;
    t = requestAnimationFrame(function () {
      t = 0; var y = scrollY, h = innerHeight; if (y > h * 1.2) return;
      bg.style.setProperty('--py', (y * .45) + 'px');
      copy.style.transform = 'translate3d(0,' + (y * .2) + 'px,0)'; copy.style.opacity = Math.max(0, 1 - y / (h * .7));
    });
  }, { passive: true });
})();
