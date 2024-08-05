import { Users } from "lucide-react";
import React from "react";

const MenuBar = () => {
  return (
    <div className="p-3 flex items-center justify-between gap-3 bg-white border-e b-rder-e-[#DBDDE1]">
      <p>Go Back</p>
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
