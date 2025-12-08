// HealthBlogsFeature.jsx
import React from "react";

const blogs = [
  {
    id: 1,
    title: "How Ayurveda Boosts Metabolism Naturally",
    description:
      "Learn how Ayurvedic principles help balance metabolism for sustainable, healthy weight management.",
    image:
      "https://krishnaayurved.com/cdn/shop/files/How-Ayurveda-Boosts-Metabolism-Naturally-for-Healthy-Weight-Loss-600x325.jpg?v=1763535694",
  },
  {
    id: 2,
    title: "Daily Panchakarma Self‑Care Rituals",
    description:
      "Simple daily detox and self‑care practices inspired by Panchakarma to keep your body light and energetic.",
    image:
      "https://krishnaayurved.com/cdn/shop/files/How-to-Detox-Lungs-After-Smoking-Ayurvedic-Remedies-600x325.jpg?v=1763535676",
  },
  {
    id: 3,
    title: "Foods That Support Gut Healing",
    description:
      "Discover sattvic, gut‑friendly foods that support better digestion, immunity, and overall wellbeing.",
    image:
      "https://images.pexels.com/photos/5946086/pexels-photo-5946086.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const HealthBlogsFeature = () => {
  return (
    <section className="w-full bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <a href="https://blogs.ayursutra.online/" target="_blank" rel="noopener noreferrer">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
              Read health blogs from our experts
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Stay updated with Ayurveda‑based guidance on lifestyle, diet, and
              Panchakarma therapies. New articles are added regularly.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-4 py-1.5 text-xs font-semibold hover:bg-slate-800"
          >
            View all blogs
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                  {blog.description}
                </p>
                <button
                  type="button"
                  className="mt-3 text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center"
                >
                  Read blog
                  <span className="ml-1 text-[10px]">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        </a>
      </div>
    </section>
  );
};

export default HealthBlogsFeature;
