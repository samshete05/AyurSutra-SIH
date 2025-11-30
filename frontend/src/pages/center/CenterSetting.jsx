import React from "react";

const CenterSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
          Center Settings
        </h1>
        <p className="text-sm text-slate-500">
          Configure preferences for your Panchakarma center.
        </p>
      </div>

      {/* Notification preferences */}
      <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Notifications
        </h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Appointment reminders (email)</span>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Appointment reminders (SMS)</span>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Daily revenue summary</span>
            <input type="checkbox" className="h-4 w-4" />
          </label>
        </div>
      </div>

      {/* Therapy defaults */}
      <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Panchakarma Defaults
        </h2>
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">
              Default follow‑up days
            </label>
            <input
              type="number"
              defaultValue={7}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">
              Max sessions per day (per therapist)
            </label>
            <input
              type="number"
              defaultValue={6}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200"
            />
          </div>
        </div>
      </div>

      {/* Save button – currently just UI */}
      <div className="flex justify-end">
        <button className="rounded-full bg-[#1E4B3C] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CenterSettingsPage;
