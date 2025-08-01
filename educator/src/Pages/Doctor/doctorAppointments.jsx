import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/doctorContext";
import { FaTimesCircle,FaCheckCircle } from "react-icons/fa";

const DoctorAppointments = () => {
  const { getAppointments, appointments, dtoken, cancelAppointment ,markCompleted} =
    useContext(DoctorContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

      {/* Desktop & Tablet View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="text-left bg-gray-100 text-gray-600 uppercase">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Fees</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={
                        appointment?.userData?.image ||
                        "https://via.placeholder.com/40"
                      }
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />
                    {appointment?.userData?.name || "Unknown"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    , {appointment?.slotTime}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    {appointment.payment ? " Online" : "Cash"}
                  </td>
                  <td className="py-3 px-4">₹{appointment?.amount || 0}</td>
                  <td className="py-3 px-4 flex items-center gap-4">
                { !appointment.isCompleted &&<button
                  className="text-red-500 hover:text-red-700 text-xl"
                  onClick={() => cancelAppointment(appointment._id)}
                >
                  <FaTimesCircle />
                </button>}
                    {/* Completed button */}
                    { !appointment.isCompleted &&<button
                      className="text-green-600 hover:text-green-800 text-xl"
                      onClick={() => markCompleted(appointment._id)}
                      title="Completed"
                    >
                      <FaCheckCircle />
                    </button>}
                    { appointment.isCompleted && <span className="text-green-600 font-semibold">Booked</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {appointments?.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className="bg-white rounded shadow p-4 text-sm"
            >
              {/* Top row */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 font-medium">#{index + 1}</span>
                <span className="text-gray-800 font-semibold">
                  {appointment?.userData?.name || "Unknown"}
                </span>
              </div>
              <div className="text-gray-500 mb-2">
                {new Date(appointment.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                , {appointment?.slotTime}
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <div>
                  <p className="font-medium text-gray-700">
                    Payment :-  {appointment.payment ? " Online" : "Cash"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ₹{appointment?.amount || 0}
                  </p>
                </div>
                { !appointment.isCompleted &&<button
                  className="text-red-500 hover:text-red-700 text-xl"
                  onClick={() => cancelAppointment(appointment._id)}
                >
                  <FaTimesCircle />
                </button>}
                    {/* Completed button */}
                    { !appointment.isCompleted &&<button
                      className="text-green-600 hover:text-green-800 text-xl"
                      onClick={() => markCompleted(appointment._id)}
                      title="Completed"
                    >
                      <FaCheckCircle />
                    </button>}
                    { appointment.isCompleted && <span className="text-green-600 font-semibold">Booked</span>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-6">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
