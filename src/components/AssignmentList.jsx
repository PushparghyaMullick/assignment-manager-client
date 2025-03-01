import React from "react";
import AssignmentItem from "./AssignmentItem";

const AssignmentList = ({ assignments, onUpdate, onDelete, onSubmit }) => {
  return (
    <div className="space-y-4 mt-4">
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <AssignmentItem
            key={assignment.id}
            assignment={assignment}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onSubmit={onSubmit}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No assignments found.</p>
      )}
    </div>
  );
};

export default AssignmentList;
