import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Spinner from "../components/ui/spinner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, setUser, setToken } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
        const body = isLogin ? { 
            email: formData.email, password: formData.password 
        } : { 
            name: formData.name, email: formData.email, password: formData.password 
        };

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/${isLogin ? "login" : "signup"}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
    
        console.log(response);
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
        }
    
        console.log(data.student_id);

        setUser(data.student_id);
        setToken(data.access_token);

        setLoading(false);
        navigate("/");
    } catch (err) {
        setError(err.message);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          {isLogin ? "Login to Assignment Manager" : "Create an Account"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
