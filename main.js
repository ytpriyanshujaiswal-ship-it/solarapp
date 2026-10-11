/* Pushpendra Power Solar – small vanilla JS (no frameworks) */
(function () {
  var WA = "919696979334";

  // current year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // mobile menu
  var btn = document.getElementById("menuBtn");
  var menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  // scroll reveal
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("show"); });
  }

  // savings estimator
  var bill = document.getElementById("bill");
  if (bill) {
    var slider = document.getElementById("billRange");
    var rate = document.getElementById("rate");
    var UNITS_PER_KW = 120; // ~4 units/day per kW
    var SQFT_PER_KW = 90;
    var fmt = function (n) { return Math.round(n).toLocaleString("en-IN"); };
    var $ = function (id) { return document.getElementById(id); };

    var calc = function () {
      var b = Number(bill.value) || 0;
      var t = Number(rate.value) || 0;
      var box = $("resultBox");
      var empty = $("resultEmpty");
      if (b <= 0 || t <= 0) {
        box.classList.add("hidden");
        empty.classList.remove("hidden");
        return;
      }
      empty.classList.add("hidden");
      box.classList.remove("hidden");
      var units = b / t;
      var kw = Math.max(1, Math.round((units / UNITS_PER_KW) * 2) / 2);
      var gen = kw * UNITS_PER_KW;
      var saving = Math.min(gen, units) * t;
      $("rKw").textContent = kw + " kW";
      $("rUnits").textContent = "~" + fmt(units);
      $("rGen").textContent = "~" + fmt(gen);
      $("rSave").textContent = "~₹" + fmt(saving);
      $("rArea").textContent = "~" + fmt(kw * SQFT_PER_KW) + " sq ft";
      $("rYear").textContent = "~₹" + fmt(saving * 12);
      var msg = "Namaste, mera monthly bill ₹" + b + " hai. Estimate ~" + kw + " kW aaya. Mujhe solar quotation chahiye.";
      $("rWa").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
    };

    bill.addEventListener("input", function () {
      if (slider) slider.value = bill.value;
      calc();
    });
    if (slider) {
      slider.addEventListener("input", function () {
        bill.value = slider.value;
        calc();
      });
    }
    rate.addEventListener("input", calc);
    calc();
  }

  // enquiry form -> WhatsApp
  var form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var err = document.getElementById("formError");
      if (!/^[0-9]{10}$/.test(v("phone"))) {
        err.classList.remove("hidden");
        return;
      }
      err.classList.add("hidden");
      var text =
        "Namaste Pushpendra Power Solar,\n" +
        "Name: " + v("name") + "\n" +
        "Mobile: " + v("phone") + "\n" +
        "System: " + v("system") + "\n" +
        "Monthly bill: " + (v("billInput") || "Not shared") + "\n" +
        "Area / details: " + (v("message") || "Not shared") + "\n" +
        "Mujhe solar quotation chahiye.";
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }
})();
