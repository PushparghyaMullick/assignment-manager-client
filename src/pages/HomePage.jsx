import React, { use } from 'react'
import { useState, useEffect } from 'react'
import Button from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import AssignmentList from '../components/AssignmentList';
import Spinner from '../components/ui/spinner';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { user, setUser, setToken } = useAuthStore();
    const [studentName, setStudentName] = useState("");
    const [tab, setTab] = useState("AssignmentStatus.PENDING");
    const [assignments, setAssignments] = useState();
    const [filteredAssignments, setFilteredAssignments] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true);

            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${user}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();

                setAssignments(data.assignments);
                setStudentName(data.name);
                setLoading(false);
            }
            catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchAssignments();
    }, []);

    useEffect(() => {
        if(assignments){
            setFilteredAssignments(assignments.filter((assignment) => assignment.status === tab));
        }
    }, [tab, assignments]);
    
      const handleUpdate = (id) => {
        navigate(`/assignment/${id}`);
      };
    
      const handleDelete = async (id) => {
        setLoading(true);

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${user}/assignments/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong!");
            }

            const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
            setAssignments(updatedAssignments);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
      };
    
      const handleSubmit = async (id) => {
        setLoading(true);

        try{
            await fetch(`${import.meta.env.VITE_API_URL}/students/${user}/assignments/${id}/submit`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const updatedAssignments = assignments.map((assignment) => {
                if(assignment.id === id){
                    return {...assignment, status: "AssignmentStatus.COMPLETED"};
                }
                return assignment;
            });

            setAssignments(updatedAssignments);
            setLoading(false);
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
        }
      };

      const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/auth");
      }

      if(!filteredAssignments || loading){
        return(
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        )
      }
    
      return (
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Welcome, {studentName}</h1>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
                  Logout
              </Button>
          </div>
          <Tabs defaultValue="AssignmentStatus.PENDING" onValueChange={setTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="AssignmentStatus.PENDING">Pending</TabsTrigger>
              <TabsTrigger value="AssignmentStatus.COMPLETED">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
    
          <AssignmentList
            assignments={filteredAssignments}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
    
          <Button 
            className="w-full mt-6"
            onClick={() => navigate("/assignment")}
          >
            Add New Assignment
          </Button>
        </div>
      )
}

export default HomePage