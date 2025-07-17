import axios from "axios";
import React, { useContext, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { AdminContext } from "../../Context/adminContext";

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fees, setFees] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const { atoken } = useContext(AdminContext);

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    if (!docImage) return toast.warning("Please select doctor image!");

    const formData = new FormData();
    formData.append("image", docImage);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("speciality", speciality);
    formData.append("fees", fees);
    formData.append("about", about);
    formData.append("degree", degree);
    formData.append("address", JSON.stringify({ line1: address }));
    formData.append("date", Date.now());

    for (let [key, value] of formData.entries()) {
      console.log(`${key} :`, value);
    }

    const response = await axios.post(
      "https://dabs-backend.onrender.com/addDoctor",
      formData,
      {
        headers: {
          atoken,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if(response.data.Messege==="Enter strong password"){
      toast.warning("Enter strong password");
    }
    if(response.data.Messege==="doctor added successfully"){
    toast.success("Doctor added successfully!"); 
    setDocImage(false);
    setAbout("");
    setName("");
    setEmail("");
    setDegree("");
    setExperience("");
    setSpeciality("");
    setPassword("");
    setAddress("");
    setFees("");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <form
      className="px-4 sm:px-8 md:px-10 py-5 w-full"
      onSubmit={submitHandler}
    >
      <p className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4">
        Add Doctor
      </p>

      <div className="py-6 px-5 sm:px-8 bg-gray-100 shadow-lg rounded border w-full max-w-5xl mx-auto max-h-[95vh] overflow-y-auto">
        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="doc-img">
            {docImage ? (
              <img
                src={URL.createObjectURL(docImage)}
                alt=""
                className="text-gray-600 cursor-pointer rounded-full bg-gray-300 p-2 w-12"
              />
            ) : (
              <MdCloudUpload
                className="text-gray-600 cursor-pointer rounded-full bg-gray-300 p-2"
                size={50}
              />
            )}
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImage(e.target.files[0])}
          />
          <p className="text-gray-600 font-medium text-sm">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {/* Doctor Name */}
          <div className="flex flex-col gap-1">
            <p>Doctor Name</p>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="px-3 py-2 border outline-indigo-400 rounded"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Doctor Email */}
          <div className="flex flex-col gap-1">
            <p>Doctor Email</p>
            <input
              type="email"
              placeholder="Your Email"
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Doctor Password */}
          <div className="flex flex-col gap-1">
            <p>Doctor Password</p>
            <input
              type="password"
              placeholder="Your Password"
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-1">
            <p>Experience</p>
            <select
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={`${i} Year`}>
                  {i} Year
                </option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div className="flex flex-col gap-1">
            <p>Fees</p>
            <input
              type="number"
              placeholder="Your Fees"
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setFees(e.target.value)}
              value={fees}
            />
          </div>

          {/* Speciality */}
          <div className="flex flex-col gap-1">
            <p>Speciality</p>
            <select
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
            >
              <option value="None">None</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="General physician">General physician</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-1">
            <p>Education</p>
            <input
              type="text"
              placeholder="Your Education"
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <p>Address</p>
            <input
              type="text"
              placeholder="Your Address"
              required
              className="px-3 py-2 border rounded outline-indigo-400"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-6">
          <p className="mb-1">About me</p>
          <textarea
            placeholder="Write about yourself"
            rows={4}
            required
            className="w-full px-3 py-2 border rounded outline-indigo-400"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-700 px-10 py-3 text-white rounded-full hover:bg-blue-800 transition duration-300"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
