/* ═══ Interactive demos — shared by index.html and projects.html ═══
   Every block is guarded, so each page only activates what it contains. */

/* ── Work timeline: tap/click to pin an entry open (hover handles desktop) ── */
(function () {
  document.querySelectorAll('.entry__head').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var entry = btn.closest('.entry');
      var open = entry.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();

/* ── Fina: mini tabbed replica of the real app.
      Transactions = the real statement-upload flow (Claude parses PDFs/
      screenshots/CSVs in the actual app); Dashboard/Goals/Net worth are
      static views mirroring the app's donut, arc gauge, and line chart. ── */
(function () {
  document.querySelectorAll('[data-fina]').forEach(function (root) {
    /* tab switching */
    var tabs  = root.querySelectorAll('[data-fina-tabs] span');
    var panes = root.querySelectorAll('[data-fina-pane]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.toggle('on', t === tab); });
        panes.forEach(function (p) { p.classList.toggle('on', p.dataset.finaPane === tab.dataset.pane); });
      });
    });

    /* statement upload (sample data; categories & split % match the real app) */
    var runBtn  = root.querySelector('.fina-demo__run');
    var rows    = root.querySelector('[data-fina-rows]');
    var savedEl = root.querySelector('[data-fina-saved]');
    if (!runBtn || !rows) return;

    var txns = [
      { name: "TRADER JOE'S #221", amt: '−$84.20', cat: 'Groceries',       color: 'sage',    tag: 'split 50%' },
      { name: 'SHELL OIL 57442',   amt: '−$52.10', cat: 'Transport & gas', color: 'slate',   tag: 'split 50%' },
      { name: 'SWEETGREEN LA',     amt: '−$16.75', cat: 'Dining out',      color: 'rose',    tag: '' },
      { name: 'NETFLIX.COM',       amt: '−$15.49', cat: 'Subscriptions',   color: 'caramel', tag: '' }
    ];
    var STEP = 480;

    runBtn.addEventListener('click', function () {
      runBtn.disabled = true;
      runBtn.textContent = 'Parsing…';
      if (savedEl) savedEl.classList.remove('show');
      rows.innerHTML = '';

      txns.forEach(function (t, i) {
        setTimeout(function () {
          var row = document.createElement('div');
          row.className = 'fina-row';
          row.innerHTML =
            '<span class="fina-row__name">' + t.name + '</span>' +
            '<span class="fina-cat">✦ …</span>' +
            '<span class="fina-row__amt">' + t.amt + '</span>';
          rows.appendChild(row);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { row.classList.add('in'); });
          });
          setTimeout(function () {
            var chip = row.querySelector('.fina-cat');
            chip.classList.add('fina-cat--' + t.color);
            chip.textContent = '✦ ' + t.cat + (t.tag ? ' · ' + t.tag : '');
          }, 420);
        }, i * STEP);
      });

      setTimeout(function () {
        if (savedEl) savedEl.classList.add('show');
        runBtn.disabled = false;
        runBtn.textContent = 'Run it again';
      }, txns.length * STEP + 600);
    });
  });
})();

/* ── Blackjack: Hi-Lo mini drill ── */
(function () {
  var cardEl = document.getElementById('bjCard');
  var rankEl = document.getElementById('bjRank');
  var suitEl = document.getElementById('bjSuit');
  var feedEl = document.getElementById('bjFeedback');
  if (!cardEl) return;

  var ranks  = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  var suits  = ['♣','♠','♥','♦'];
  var values = { '2':1,'3':1,'4':1,'5':1,'6':1,'7':0,'8':0,'9':0,'10':-1,'J':-1,'Q':-1,'K':-1,'A':-1 };
  var current = null;
  var streak = 0;
  var best = 0;

  function deal() {
    cardEl.classList.add('dealing');
    setTimeout(function () {
      var rank = ranks[Math.floor(Math.random() * ranks.length)];
      var suit = suits[Math.floor(Math.random() * suits.length)];
      current = rank;
      rankEl.textContent = rank;
      suitEl.textContent = suit;
      cardEl.classList.toggle('bj-card--red', suit === '♥' || suit === '♦');
      cardEl.classList.remove('dealing');
    }, 180);
  }

  document.querySelectorAll('.bj-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!current) return;
      var guess   = parseInt(btn.dataset.v, 10);
      var correct = values[current];
      if (guess === correct) {
        streak++;
        best = Math.max(best, streak);
        feedEl.classList.remove('bj-feedback--wrong');
        feedEl.innerHTML = 'Streak: <strong>' + streak + '</strong>' + (best > 2 ? ' · best ' + best : '');
      } else {
        feedEl.classList.add('bj-feedback--wrong');
        feedEl.innerHTML = current + ' is worth ' + (correct > 0 ? '+1' : correct) + '. Streak reset.';
        streak = 0;
      }
      deal();
    });
  });

  deal();
})();

/* ── Tarot: draw a card ── */
(function () {
  var btn = document.getElementById('tarotBtn');
  var out = document.getElementById('tarotResult');
  if (!btn || !out) return;

  var cards = [
    ['The Fool', 'a bold new beginning. Or a very bad idea. Time will tell.'],
    ['The Magician', 'you already have everything you need. Yes, even for that.'],
    ['The Tower', 'sudden upheaval ahead. Maybe don’t deploy on Friday.'],
    ['The Star', 'hope, renewal, and hydration. Drink some water.'],
    ['The Hermit', 'wisdom comes from solitude. Cancel your plans guilt-free.'],
    ['Wheel of Fortune', 'change is coming. The wheel spins for everyone eventually.'],
    ['The Sun', 'joy and success. Go outside and confirm the sun exists.'],
    ['The Moon', 'things aren’t what they seem. Re-read that email before replying.'],
    ['Strength', 'quiet persistence beats brute force. Keep going.'],
    ['The Empress', 'abundance ahead. Treat yourself accordingly.'],
    ['Justice', 'what you put out comes back. Return your shopping cart.'],
    ['The Chariot', 'momentum is yours. Merge with confidence.']
  ];

  btn.addEventListener('click', function () {
    var pick = cards[Math.floor(Math.random() * cards.length)];
    out.classList.remove('revealing');
    void out.offsetWidth;
    out.classList.add('revealing');
    var fortune = pick[1].charAt(0).toUpperCase() + pick[1].slice(1);
    out.innerHTML = '<strong>' + pick[0] + '</strong>' + fortune;
  });
})();
