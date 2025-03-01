import { format, differenceInDays } from "date-fns";
import { Clock, Link } from "lucide-react";
import Button from "./ui/button";
import { Card } from "./ui/card";

const getDueDateStyle = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  if (due < now) return "text-red-500 font-semibold"; // Overdue
  if (differenceInDays(due, now) <= 3) return "text-orange-500 font-semibold"; // Due in ≤ 3 days
  return "text-green-500 font-medium"; // Safe deadline
};

const AssignmentItem = ({ assignment, onUpdate, onDelete, onSubmit }) => {
  return (
    <Card className="p-4 mb-4 shadow-lg rounded-lg border">
      <h3 className="text-lg font-semibold">{assignment.name}</h3>

      {/* Problem Statement Link */}
      <a
        href={assignment.problem_statement}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 flex items-center gap-1 mt-2 hover:underline"
      >
        <Link size={16} /> Problem Statement
      </a>

      {/* Submission Link */}
      <a
        href={assignment.submission_link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 flex items-center gap-1 mt-1 hover:underline"
      >
        <Link size={16} /> Submission Link
      </a>

      {/* Due Date with Color-Coding */}
      {assignment.status === "AssignmentStatus.PENDING" && (
        <div className="flex items-center mt-2">
            <Clock size={16} className="text-gray-500 mr-2" />
            <span className={getDueDateStyle(assignment.due_date_time)}>
            {format(new Date(assignment.due_date_time), "MMMM d, yyyy - h:mm a")}
            </span>
        </div>
      )}

      {/* Action Buttons */}
      {assignment.status === "AssignmentStatus.PENDING" && (
        <div className="flex gap-2 mt-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md" onClick={() => onUpdate(assignment.id)}>
            Update
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md" onClick={() => onDelete(assignment.id)}>
            Delete
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md" onClick={() => onSubmit(assignment.id)}>
            Submit
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AssignmentItem;
