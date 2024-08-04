import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };
  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="w-[120px] h-full border-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="viewer" className="">
          Can View
        </SelectItem>
        <SelectItem value="editor" className="">
          Can Edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
