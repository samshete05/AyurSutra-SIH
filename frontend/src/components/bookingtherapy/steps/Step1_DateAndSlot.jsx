import React, { useState, useEffect } from "react";
import { Calendar, Clock, Sun, Moon, CheckCircle2, ChevronRight } from "lucide-react";

const Step1_DateAndSlot = ({ bookingData, handleDataUpdate, handleNext, mergedSlots, therapyData, checkSlotAvailability }) => {
  const [selectedDate, setSelectedDate] = useState(bookingData.selectedDate);
  const [selectedSlot, setSelectedSlot] = useState(bookingData.selectedSlot);

  useEffect(() => {
    setSelectedDate(bookingData.selectedDate);
    setSelectedSlot(bookingData.selectedSlot);
  }, [bookingData.selectedDate, bookingData.selectedSlot]);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const dates = generateAvailableDates();

  const slotsArr = [
    {
      id: "morning",
      label: "Morning",
      icon: Sun,
      time: `${mergedSlots.morning.startTime} - ${mergedSlots.morning.endTime}`,
      amount: mergedSlots.morning.tokenAmount ?? therapyData?.price,
      available: selectedDate ? checkSlotAvailability(selectedDate, "morning") : null,
    },
    {
      id: "evening",
      label: "Evening",
      icon: Moon,
      time: `${mergedSlots.evening.startTime} - ${mergedSlots.evening.endTime}`,
      amount: mergedSlots.evening.tokenAmount ?? therapyData?.price,
      available: selectedDate ? checkSlotAvailability(selectedDate, "evening") : null,
    },
  ];

  const continueHandler = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and slot");
      return;
    }
    console.log("this date i selected!!!",selectedDate);
    handleDataUpdate({ selectedDate, selectedSlot });
    handleNext();
  };

  return (
    <div className="space-y-6">
      {/* Therapy Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{therapyData?.name}</h3>
        <p className="text-sm text-gray-600">{therapyData?.summary}</p>
      </div>

      {/* Date Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <Calendar className="w-4 h-4 text-[#1E4B3C]" /> 
          Select Appointment Date
        </label>

        <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
          {dates.map((d, i) => {
            const dateString = d.toISOString().split("T")[0];
            const isSelected = selectedDate === dateString;
            const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = d.getDate();
            const monthName = d.toLocaleDateString("en-US", { month: "short" });
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(dateString)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected 
                    ? "border-[#1E4B3C] bg-[#1E4B3C] text-white" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-xs font-medium">{dayName}</div>
                <div className="text-xl font-bold my-1">{dayNum}</div>
                <div className="text-xs">{monthName}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot Selection */}
      {selectedDate && (
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Clock className="w-4 h-4 text-[#1E4B3C]" /> 
            Select Time Slot
          </label>
          
          <div className="grid gap-3">
            {slotsArr.map((slot) => (
              <button 
                key={slot.id} 
                onClick={() => slot.available && setSelectedSlot(slot.id)} 
                disabled={!slot.available} 
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  !slot.available 
                    ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed" 
                    : selectedSlot === slot.id 
                    ? "border-[#1E4B3C] bg-[#1E4B3C]/5" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <slot.icon className="w-8 h-8 text-[#1E4B3C]" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{slot.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{slot.time}</p>
                  </div>
                  {slot.available ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Full
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={continueHandler}
          disabled={!selectedDate || !selectedSlot}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
            selectedDate && selectedSlot
              ? "bg-[#1E4B3C] hover:bg-[#163A2E] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step1_DateAndSlot;
