import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/adminContext";
import { FaUserMd, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate();
  const {
    getDashboardData,
    atoken,
    cancelAppointment,
    getAppointments,
    appointments,
    dashBoardData,
  } = useContext(AdminContext);

  // Fetch dashboard and appointments data when token is available
  useEffect(() => {
    getDashboardData();
    getAppointments();
  }, [atoken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4 cursor-pointer" onClick={()=>navigate("/doctor-list")}>
          <FaUserMd className="text-blue-600 text-2xl" />
          <div>
            <h3 className="text-xl font-semibold">
              {dashBoardData?.doctors || 0}
            </h3>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4 cursor-pointer" onClick={()=>navigate("/appointment")}>
          <FaCalendarAlt className="text-purple-600 text-2xl" />
          <div>
            <h3 className="text-xl font-semibold">
              {appointments.length || 0}
            </h3>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <FaUsers className="text-green-600 text-2xl" />
          <div>
            <h3 className="text-xl font-semibold">
              {dashBoardData?.users || 0}
            </h3>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Latest Appointment
        </h2>

        <div className="space-y-4">
          {appointments.length > 0 &&
            appointments
              .slice(0, 5).reverse()
              .map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={appointment?.docData?.image || "/default-doctor.png"}
                      alt="doctor"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {appointment?.docData?.name || "Unknown"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Booking on{" "}
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                        , {appointment?.slotTime}
                      </p>
                    </div>
                  </div>
                  { !appointment.isCompleted ? <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <MdCancel className="text-xl" />
                  </button> : <span className="text-green-600 font-semibold">Booked</span>}
                </div>
              ))}

          {/* If there are no appointments */}
          {appointments?.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No appointments found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
