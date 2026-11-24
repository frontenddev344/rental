/* Shared: dress data, header/footer, language switch, helpers */
(function () {
  'use strict';
  var W = window;
  var lang = 'en';
  try { lang = localStorage.getItem('lm_lang') || 'en'; } catch (e) {}

  var REMOTE = function (id, w) { return 'https://images.unsplash.com/photo-' + id + '?fm=jpg&q=70&w=' + (w || 900) + '&auto=format&fit=crop'; };

  W.OCC = {
    wedding: { en: 'Wedding guest', ar: 'ضيفة زفاف' },
    gala: { en: 'Evening gala', ar: 'حفل سهرة' },
    engagement: { en: 'Engagement', ar: 'خطوبة' },
    graduation: { en: 'Graduation', ar: 'تخرج' }
  };
  W.COLORS = {
    black: { en: 'Black', ar: 'أسود', hex: '#16120F' },
    red: { en: 'Red', ar: 'أحمر', hex: '#A5192B' },
    ivory: { en: 'Ivory', ar: 'عاجي', hex: '#EFE6D6' },
    blue: { en: 'Blue', ar: 'أزرق', hex: '#2F4C8C' },
    green: { en: 'Emerald', ar: 'زمردي', hex: '#12604A' },
    maroon: { en: 'Maroon', ar: 'عنابي', hex: '#5A1A2C' },
    lavender: { en: 'Lavender', ar: 'لافندر', hex: '#A99BC9' }
  };
  W.DRESSES = [
    { n: 1, id: '1568251188392-ae32f898cb3b', en: 'Noir Column Gown', ar: 'فستان أسود انسيابي', occ: 'gala', color: 'black', rent: 240, buy: 2200, sizes: ['S', 'M', 'L'], isNew: true, fabric: { en: 'Crepe with a structured bodice', ar: 'كريب بصدر مبطّن' } },
    { n: 2, id: '1721182420935-29bfb69dd26c', en: 'Crimson Evening Dress', ar: 'فستان سهرة قرمزي', occ: 'gala', color: 'red', rent: 220, buy: 1900, sizes: ['XS', 'S'], isNew: true, fabric: { en: 'Satin, floor length', ar: 'ساتان بطول الأرض' } },
    { n: 3, id: '1610048616025-11a3dcc9fd0b', en: 'Ivory Floral Midi', ar: 'فستان عاجي مزهر', occ: 'wedding', color: 'ivory', rent: 150, buy: 980, sizes: ['M', 'L'], fabric: { en: 'Printed cotton blend, midi', ar: 'قطن مطبوع بطول ميدي' } },
    { n: 4, id: '1765871421283-5ceacbe7cd15', en: 'Sapphire Shimmer Gown', ar: 'فستان ياقوتي لامع', occ: 'gala', color: 'blue', rent: 260, buy: 2400, sizes: ['XS', 'S', 'M'], fabric: { en: 'Shimmer tulle over lining', ar: 'تول لامع بطانة داخلية' } },
    { n: 5, id: '1765871424529-14c515b1f4f5', en: 'Emerald Sequin Dress', ar: 'فستان زمردي مرصّع', occ: 'engagement', color: 'green', rent: 200, buy: 1600, sizes: ['S', 'M'], fabric: { en: 'Hand sewn sequins', ar: 'ترتر مخيّط يدوياً' } },
    { n: 6, id: '1568252542512-9fe8fe9c87bb', en: 'Maroon Velvet Dress', ar: 'فستان مخمل عنابي', occ: 'engagement', color: 'maroon', rent: 180, buy: 1350, sizes: ['S', 'M', 'L'], fabric: { en: 'Stretch velvet', ar: 'مخمل مطاطي' } },
    { n: 7, id: '1790502041724-aaa5ebf0bb6e', en: 'Lavender Pleated Maxi', ar: 'فستان بليسيه لافندر', occ: 'wedding', color: 'lavender', rent: 170, buy: 1250, sizes: ['S', 'M'], fabric: { en: 'Pleated chiffon, strapless', ar: 'شيفون مبليس بدون أكتاف' } },
    { n: 8, id: '1617258856138-402b60da4e2a', en: 'Cobalt Floral Dress', ar: 'فستان كوبالت مزهر', occ: 'graduation', color: 'blue', rent: 110, buy: 640, sizes: ['M', 'L', 'XL'], fabric: { en: 'Light viscose', ar: 'فيسكوز خفيف' } }
  ];
  W.ZONES = [
    { id: 'z1', en: 'Zone 1, city centre', ar: 'المنطقة 1، وسط المدينة', fee: 25 },
    { id: 'z2', en: 'Zone 2, inner suburbs', ar: 'المنطقة 2، الضواحي القريبة', fee: 40 },
    { id: 'z3', en: 'Zone 3, outer districts', ar: 'المنطقة 3، الأحياء البعيدة', fee: 60 }
  ];
  W.STATUS = {
    requested: { en: 'Request received', ar: 'تم استلام الطلب', cls: 'mute' },
    confirmed: { en: 'Owner confirmed', ar: 'أكدت المالكة', cls: 'info' },
    pending: { en: 'Pending Pickup', ar: 'بانتظار الاستلام', cls: 'warn' },
    picked: { en: 'Picked Up', ar: 'تم الاستلام', cls: 'info' },
    way: { en: 'On the Way', ar: 'في الطريق', cls: 'info' },
    delivered: { en: 'Delivered', ar: 'تم التوصيل', cls: 'ok' },
    retsched: { en: 'Return Scheduled', ar: 'تمت جدولة الإرجاع', cls: 'warn' },
    returned: { en: 'Returned to Owner', ar: 'أُعيد إلى المالكة', cls: 'ok' }
  };
  W.DRIVERS = ['Faisal', 'Omar', 'Khaled', 'Yusuf'];

  W.getLang = function () { return lang; };
  W.tr = function (o) { return (lang === 'ar' && o.ar) ? o.ar : o.en; };
  W.money = function (n) { var s = Number(n).toLocaleString('en-US'); return lang === 'ar' ? s + ' ر.س' : 'SAR ' + s; };
  W.pill = function (k) { var s = W.STATUS[k]; return '<span class="pill ' + s.cls + '">' + W.tr(s) + '</span>'; };
  W.dressById = function (n) { return W.DRESSES.filter(function (d) { return d.n === Number(n); })[0] || W.DRESSES[0]; };
  W.dressImg = function (d, w, extra) {
    return '<img loading="lazy" src="images/dress-' + d.n + '.jpg" data-remote="' + REMOTE(d.id, w) + '" alt="' + W.tr(d) + '"' + (extra || '') + '>';
  };
  W.iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  W.bookedSet = function (n) {
    var s = {}, t = new Date(); t.setHours(0, 0, 0, 0);
    for (var k = 0; k < 4; k++) {
      var off = ((n * 7 + k * 19) % 80) + 3, len = 2 + ((n + k) % 3);
      for (var i = 0; i < len; i++) { var d = new Date(t); d.setDate(d.getDate() + off + i); s[W.iso(d)] = 1; }
    }
    return s;
  };
  W.card = function (d, i) {
    var t = {
      en: { day: '/ day', buy: 'Buy', sizes: 'Sizes', n: 'New' }, ar: { day: '/ اليوم', buy: 'شراء', sizes: 'المقاسات', n: 'جديد' }
    }[lang];
    return '<article class="card"><div class="ph">' + W.dressImg(d, 700) +
      '<span class="tag">' + (d.isNew ? t.n : W.tr(W.OCC[d.occ])) + '</span>' +
      '<button class="fav" aria-label="Save" onclick="this.classList.toggle(\'on\');this.textContent=this.classList.contains(\'on\')?\'♥\':\'♡\'">♡</button></div>' +
      '<div class="info"><small>' + W.tr(W.OCC[d.occ]) + '</small><h3>' + W.tr(d) + '</h3>' +
      '<div class="price"><b>' + W.money(d.rent) + '</b><span class="sub">' + t.day + '</span><span class="sub">' + t.buy + ' ' + W.money(d.buy) + '</span></div>' +
      '<div class="sizes">' + t.sizes + ': ' + d.sizes.join(', ') + '</div></div>' +
      '<a class="cover" href="product.html?id=' + d.n + '" aria-label="' + W.tr(d) + '"></a></article>';
  };
  W.toast = function (m) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = m; t.classList.add('show'); clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 2800);
  };
  W.store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  W.param = function (k, def) { var v = new URLSearchParams(location.search).get(k); return v === null ? def : v; };
  W.initTabs = function () {
    var btns = [].slice.call(document.querySelectorAll('[data-tab]'));
    var panes = [].slice.call(document.querySelectorAll('[data-pane]'));
    function show(n) {
      btns.forEach(function (b) { b.classList.toggle('on', b.dataset.tab === n); });
      panes.forEach(function (p) { p.hidden = p.dataset.pane !== n; });
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.tab); window.scrollTo({ top: 0 }); }); });
    var h = location.hash.slice(1);
    show(btns.some(function (b) { return b.dataset.tab === h; }) ? h : btns[0].dataset.tab);
    W.showTab = show;
  };

  /* header and footer */
  var NAV = [
    ['shop.html', { en: 'Shop', ar: 'تسوّقي' }, 'shop'],
    ['how-it-works.html', { en: 'How it works', ar: 'كيف نعمل' }, 'how'],
    ['list-your-dress.html', { en: 'List your dress', ar: 'اعرضي فستانك' }, 'list'],
    ['track.html', { en: 'Track order', ar: 'تتبع الطلب' }, 'track'],
    ['contact.html', { en: 'Contact', ar: 'تواصلي معنا' }, 'contact']
  ];
  function chrome() {
    var page = document.body.dataset.page || '';
    var top = document.getElementById('chrome-top');
    var foot = document.getElementById('chrome-foot');
    var T = function (en, ar) { return lang === 'ar' ? ar : en; };
    if (top) {
      top.innerHTML =
        '<div class="topbar">' + T('Complimentary concierge delivery and pickup on every order', 'توصيل واستلام مجاني بخدمة كونسيرج مع كل طلب') + '</div>' +
        '<header><div class="wrap nav"><a href="index.html" class="logo" aria-label="Maison Lumière"><span class="logo-mark">L</span><span>LUMIÈRE<small>MAISON</small></span></a>' +
        '<nav class="links" id="links" aria-label="Main">' +
        NAV.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page" style="color:var(--gold-d)"' : '') + '>' + W.tr(n[1]) + '</a>'; }).join('') +
        '</nav><div class="actions"><button class="lang" id="lang" aria-label="Language">' + T('العربية', 'English') + '</button>' +
        '<a href="login.html" class="signin">' + T('Sign in', 'تسجيل الدخول') + '</a>' +
        '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button></div></div></header>';
      document.getElementById('lang').onclick = function () { lang = lang === 'en' ? 'ar' : 'en'; try { localStorage.setItem('lm_lang', lang); } catch (e) {} apply(); };
      document.getElementById('burger').onclick = function () { document.getElementById('links').classList.toggle('open'); };
    }
    if (foot) {
      foot.innerHTML =
        '<footer id="footer"><div class="wrap"><div class="fgrid"><div><a href="index.html" class="logo" style="color:#fff;margin-bottom:1rem"><span class="logo-mark">L</span><span>LUMIÈRE</span></a>' +
        '<p style="max-width:32ch">' + T('A premium marketplace to rent and buy dresses, managed end to end.', 'سوق راقٍ لتأجير وشراء الفساتين تُدار بالكامل من البداية للنهاية.') + '</p></div>' +
        '<div><h4>' + T('Shop', 'تسوّقي') + '</h4><ul><li><a href="shop.html?mode=rent">' + T('Rent', 'إيجار') + '</a></li><li><a href="shop.html?mode=buy">' + T('Buy', 'شراء') + '</a></li><li><a href="shop.html">' + T('All dresses', 'كل الفساتين') + '</a></li></ul></div>' +
        '<div><h4>' + T('Company', 'الشركة') + '</h4><ul><li><a href="how-it-works.html">' + T('How it works', 'كيف نعمل') + '</a></li><li><a href="list-your-dress.html">' + T('List your dress', 'اعرضي فستانك') + '</a></li><li><a href="how-it-works.html#faq">' + T('FAQ', 'الأسئلة الشائعة') + '</a></li></ul></div>' +
        '<div><h4>' + T('Account', 'الحساب') + '</h4><ul><li><a href="login.html">' + T('Sign in', 'تسجيل الدخول') + '</a></li><li><a href="customer.html">' + T('Customer dashboard', 'لوحة العميلة') + '</a></li><li><a href="owner.html">' + T('Owner dashboard', 'لوحة المالكة') + '</a></li><li><a href="driver.html">' + T('Driver app', 'تطبيق السائق') + '</a></li><li><a href="admin.html">' + T('Admin', 'الإدارة') + '</a></li></ul></div></div>' +
        '<div class="fbot"><span>© 2026 Maison Lumière. ' + T('All rights reserved.', 'جميع الحقوق محفوظة.') + '</span><span>EN / عربي</span></div></div></footer>' +
        '<a href="contact.html" class="wa" aria-label="WhatsApp"><svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2c1.8 1 3.7 1.5 5.6 1.5 7 0 12.6-5.6 12.6-12.5S23 3 16 3zm0 22.9c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.4 1.2 1.2-4.3-.3-.4c-1-1.6-1.5-3.400-1.5-5.300C5.600 9.800 10.300 5.200 16 5.200s10.400 4.600 10.400 10.300S21.700 25.900 16 25.900zm5.700-7.700c-.3-.2-1.800-.9-2.100-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100c-.3-.2-1.300-.5-2.500-1.500-.9-.8-1.500-1.800-1.700-2.100-.2-.3 0-.5.100-.6l.5-.5c.1-.2.200-.3.300-.5s0-.4 0-.5-.7-1.700-1-2.300c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400s-1 1-1 2.400 1 2.800 1.200 3c.1.200 2 3.100 4.900 4.300 2.900 1.200 2.900.8 3.400.8.500-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400 0-.1-.3-.2-.6-.4z"/></svg></a>';
    }
  }
  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    chrome();
    [].forEach.call(document.querySelectorAll('[data-ar]'), function (e) {
      if (e.dataset.en === undefined) e.dataset.en = e.innerHTML;
      e.innerHTML = lang === 'ar' ? e.dataset.ar : e.dataset.en;
    });
    [].forEach.call(document.querySelectorAll('[data-ar-ph]'), function (e) {
      if (e.dataset.enPh === undefined) e.dataset.enPh = e.placeholder;
      e.placeholder = lang === 'ar' ? e.dataset.arPh : e.dataset.enPh;
    });
    if (W.onLang) W.onLang();
  }
  W.applyLang = apply;

  /* local photo first, then the online one, then hide */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    if (t.dataset.remote && !t.dataset.tried) { t.dataset.tried = 1; t.src = t.dataset.remote; } else { t.style.opacity = 0; }
  }, true);

  apply();
})();
