import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import useAuthStore from "../store/useAuthStore";
import Spinner from "../components/ui/spinner";

const AddAssignment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    problem_statement: "",
    submission_link: "",
    due_date_time: "",
  });
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${user}/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
        }

        navigate("/");
    } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
    }
  };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Add New Assignment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Assignment Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter assignment name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Problem Statement</label>
          <input
            type="url"
            name="problem_statement"
            placeholder="Enter problem statement link"
            value={formData.problem_statement}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Submission Link</label>
          <input
            type="url"
            name="submission_link"
            placeholder="Enter submission link"
            value={formData.submission_link}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Due Date & Time</label>
          <input
            type="datetime-local"
            name="due_date_time"
            value={formData.due_date_time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button type="submit" className="w-full mt-4">Add Assignment</Button>
      </form>
    </div>
  );
};

export default AddAssignment;
