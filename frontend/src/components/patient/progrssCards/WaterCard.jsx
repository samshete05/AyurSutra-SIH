import React, { useState } from "react";

const themeColor = "#1e4b3c";

function WaterCard({ data, refresh }) {
  const [glasses, setGlasses] = useState(data?.glasses || 0);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateWater", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ glasses }),
      });

      const result = await res.json();
      console.log(result);

      refresh(); // reload page data
    } catch (err) {
      console.error("Water update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between">
        <h3 className="font-semibold">Drink Water</h3>
        {data?.completed ? (
          <span className="text-green-600 font-semibold text-sm">Completed</span>
        ) : (
          <span className="text-gray-500 text-sm">Pending</span>
        )}
      </div>

      <p className="text-gray-600 text-sm mt-1">
        Goal: {data?.target} glasses
      </p>

      <div className="flex items-center mt-3 gap-3">
        <button
          className="px-3 py-1 rounded-lg text-white"
          style={{ backgroundColor: themeColor }}
          onClick={() => glasses > 0 && setGlasses(glasses - 1)}
        >
          -
        </button>

        <span className="font-bold text-lg">{glasses}</span>

        <button
          className="px-3 py-1 rounded-lg text-white"
          style={{ backgroundColor: themeColor }}
          onClick={() => setGlasses(glasses + 1)}
        >
          +
        </button>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="ml-auto px-5 py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: themeColor }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default WaterCard;
