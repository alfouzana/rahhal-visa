import "./style.css";

const WHATSAPP = "966562664999";

const countries = [
  { flag: "🇪🇺", name: "شنغن (أوروبا)", note: "فرنسا، إيطاليا، إسبانيا، ألمانيا وغيرها", img: "photo-1502602898657-3e91760cbb34", docs: ["جواز ساري ٦ أشهر", "صور شخصية", "كشف حساب بنكي", "حجز طيران وفندق", "تأمين سفر"] },
  { flag: "🇬🇧", name: "بريطانيا", note: "لندن، مانشستر، إدنبرة", img: "photo-1513635269975-59663e0ac1ad", docs: ["جواز ساري", "تعريف بالراتب", "كشف حساب بنكي", "تفاصيل الرحلة"] },
  { flag: "🇺🇸", name: "أمريكا", note: "فيزا سياحية مع حجز موعد المقابلة", img: "photo-1485871981521-5b1fd3805eee", docs: ["جواز ساري", "صورة بمقاس السفارة", "نموذج DS-160", "موعد المقابلة"] },
  { flag: "🇨🇦", name: "كندا", note: "تورنتو، فانكوفر، مونتريال", img: "photo-1503614472-8c93d56e92ce", docs: ["جواز ساري", "كشف حساب بنكي", "تعريف بالراتب", "خطة الرحلة"] },
  { flag: "🇯🇵", name: "اليابان", note: "طوكيو، كيوتو، أوساكا", img: "photo-1540959733332-eab4deabeeaf", docs: ["جواز ساري", "صورة شخصية", "برنامج الرحلة", "حجز فندق"] },
  { flag: "🇦🇺", name: "أستراليا", note: "سيدني، ملبورن، غولد كوست", img: "photo-1506973035872-a4ec16b8e8d9", docs: ["جواز ساري", "كشف حساب بنكي", "تأمين سفر", "تفاصيل الرحلة"] },
];

const grid = document.querySelector("[data-countries]");
const select = document.querySelector("[data-country-select]");

countries.forEach((c) => {
  const card = document.createElement("div");
  card.className = "overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md";
  card.innerHTML = `
    <div class="h-40 overflow-hidden"><img src="https://images.unsplash.com/${c.img}?auto=format&fit=crop&w=800&q=60" alt="${c.name}" class="h-full w-full object-cover" loading="lazy" /></div>
    <div class="p-6">
      <h3 class="text-xl font-bold">${c.flag} ${c.name}</h3>
      <p class="mt-1 text-sm text-slate-500">${c.note}</p>
      <p class="mt-4 text-sm font-bold">المتطلبات الأساسية:</p>
      <ul class="mt-2 flex flex-wrap gap-2">${c.docs.map((d) => `<li class="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">${d}</li>`).join("")}</ul>
      <a href="#apply" data-pick="${c.name}" class="mt-5 block rounded-xl border border-brand py-2 text-center font-bold text-brand hover:bg-brand hover:text-white">قدّم على ${c.name}</a>
    </div>`;
  grid.appendChild(card);
  select.insertAdjacentHTML("beforeend", `<option>${c.name}</option>`);
});
select.insertAdjacentHTML("beforeend", `<option>دولة أخرى</option>`);

document.addEventListener("click", (e) => {
  const pick = e.target.closest("[data-pick]");
  if (pick) select.value = pick.dataset.pick;
});

document.querySelector("[data-apply]").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `السلام عليكم، أبي أقدّم على فيزا سياحية\nالاسم: ${f.get("name")}\nالدولة: ${f.get("country")}\nعدد المسافرين: ${f.get("travelers")}\nموعد السفر: ${f.get("date") || "غير محدد"}\n${f.get("notes") ? "ملاحظات: " + f.get("notes") : ""}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
});

const btn = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");
btn?.addEventListener("click", () => { menu?.classList.toggle("hidden"); menu?.classList.toggle("flex"); });
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { if (window.innerWidth < 768) { menu.classList.add("hidden"); menu.classList.remove("flex"); } }));

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
