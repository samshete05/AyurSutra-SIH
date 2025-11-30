// EcommerceFeatureSection.jsx
import React from "react";

const products = [
  {
    id: 1,
    name: "Tridosha Herbal Churna",
    type: "Digestive blend",
    price: "₹349",
    tag: "Bestseller",
    image:
      "https://m.media-amazon.com/images/I/51Y2FoIzHGL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "Ashwagandha Tablets",
    type: "Stress & sleep support",
    price: "₹499",
    tag: "Daily use",
    image:
      "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/article_thumbnails/BigBead/ashwagandha_benefits_bigbead/1800x1200_ashwagandha_benefits_bigbead.jpg",
  },
  {
    id: 3,
    name: "Triphala Capsules",
    type: "Detox & gut care",
    price: "₹399",
    tag: "Classic",
    image:
      "https://m.media-amazon.com/images/I/61-mWAjWa4L.jpg",
  },
  {
    id: 4,
    name: "Neem & Turmeric Blend",
    type: "Skin & immunity",
    price: "₹299",
    tag: "New",
    image:
      "https://static.toiimg.com/thumb/msid-77890023,width-1280,height-720,imgsize-55912,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  },
  {
    id: 5,
    name: "Herbal Kadha Mix",
    type: "Respiratory support",
    price: "₹259",
    tag: "Seasonal",
    image:
      "https://static.toiimg.com/thumb/imgsize-531796,msid-72021733/72021733.jpg?width=500&resizemode=4",
  },
  {
    id: 6,
    name: "Medicated Ayurvedic Oil",
    type: "Joint & muscle care",
    price: "₹549",
    tag: "Therapy grade",
    image:
      "https://blog.kamaayurveda.in/wp-content/uploads/2019/10/KAMA_August2019_BlogHeader_10-Best-Hair-Growth-Oils-Recommended-By-Ayurveda_1050X600px-1.jpg",
  },
  
];

const EcommerceFeatureSection = () => {
  return (
    <section className="w-full bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-[1.4fr,2fr] items-start">
        {/* Left: copy and USPs */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Ayurveda ecommerce
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-snug">
            Central Ayurvedic store delivering trusted products across India
          </h2>
          <p className="text-sm text-slate-600">
            Patients can order authentic Panchakarma and Ayurvedic products
            directly from our central fulfillment hub, with doorstep delivery to
            any PIN code in India. Products are the same as used inside our
            therapy centers for continuity of care.[web:420]
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <FeatureChip
              title="Pan‑India delivery"
              text="Serviceable to 25k+ PIN codes"
            />
            <FeatureChip
              title="Central inventory"
              text="Single, quality‑controlled warehouse"
            />
            <FeatureChip
              title="Doctor‑curated"
              text="Formulations approved by our panel"
            />
            <FeatureChip
              title="Integrated with EMR"
              text="Prescribed items auto‑added to cart"
            />
          </div>

          <button
            type="button"
            className="mt-2 inline-flex items-center rounded-full bg-[#1E4B3C] px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
          >
            Explore Ayurvedic store
            <span className="ml-1 text-[10px]">→</span>
          </button>
        </div>

        {/* Right: product gallery grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-100">
                  {product.tag}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <p className="text-xs text-slate-500">{product.type}</p>
                <h3 className="mt-1 text-sm font-semibold text-slate-900 line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">
                    {product.price}
                  </span>
                  <span className="text-[10px] text-amber-600">
                    In stock · Ships in 24–48 hrs
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  View product
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureChip = ({ title, text }) => (
  <div className="rounded-xl bg-white border border-slate-200 px-3 py-2 shadow-sm">
    <p className="text-[11px] font-semibold text-slate-900">{title}</p>
    <p className="mt-0.5 text-[11px] text-slate-600">{text}</p>
  </div>
);

export default EcommerceFeatureSection;
