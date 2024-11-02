import { Users } from "lucide-react";

type MenuBarProps = {
  onUserMenuClick: () => void;
};

const MenuBar = ({ onUserMenuClick }: MenuBarProps) => {
  return (
    <div className="p-3 flex items-center justify-between gap-3 bg-white border-e b-rder-e-[#DBDDE1]">
      <div></div>

      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
