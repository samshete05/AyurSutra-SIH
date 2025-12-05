// components/TherapyList.jsx
import React, { useState } from "react";
import BookingTherapyAppointment from "./BookingTherapyAppointment";
import TherapyCard from "./TherapyCard";

const TherapyList = ({ therapies, centerData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  const handleBookSession = (therapyData) => {
    console.log("Opening modal for therapy:", therapyData.therapyName);
    
    // Transform therapy data for the modal
    const modalTherapyData = {
      id: therapyData._id,
      name: therapyData.therapyName,
      category: therapyData.category,
      description: therapyData.description,
      price: therapyData.price,
      image: therapyData.TherapyImg,
      duration: therapyData.duration,
      maxPatientsPerDay: therapyData.maxPatientsPerDay,
      therapists: [
        { id: "t1", name: "Dr. Sharma", specialization: "Ayurveda" }
      ],
      slots: {
        morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
        evening: ["04:00 PM", "05:00 PM", "06:00 PM"]
      }
    };
    
    setSelectedTherapy(modalTherapyData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTherapy(null);
  };

  // Ensure centerData has slots
  const centerDataWithSlots = {
    ...centerData,
    slots: centerData?.slots || {
      morning: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
      evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"]
    }
  };

  return (
    <div className="p-4">
      {/* Test button - Remove after testing */}
      <button 
        onClick={() => {
          console.log("Test button clicked");
          setSelectedTherapy({
            id: "test",
            name: "Test Therapy",
            price: 1000,
            duration: 60
          });
          setIsModalOpen(true);
        }}
        className="px-4 py-2 mb-4 bg-red-500 text-white rounded-lg"
      >
        TEST: Click to see if modal opens
      </button>

      {/* Therapy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapies.map((therapy) => (
          <TherapyCard
            key={therapy._id}
            {...therapy}
            onBook={handleBookSession}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTherapy && (
        <BookingTherapyAppointment
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          centerData={centerDataWithSlots}
          therapyData={selectedTherapy}
        />
      )}
    </div>
  );
};

export default TherapyList;