import { deleteUser } from "@/actions/userManagement";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSchoolContext } from "@/context/SchoolContext";
import { useTeacherUserManagementContext } from "@/context/TeacherUserManagementContext";
import { useUserManagementContext } from "@/context/UserManagementContext";
import { useSession } from "next-auth/react";

interface DeleteUserButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string | null;
  id: string;
}
const DeleteUserButton = ({
  isOpen,
  setIsOpen,
  name,
  id,
}: DeleteUserButtonProps) => {
  const { toast } = useToast();
  const { dispatch } = useUserManagementContext();
  const { dispatch: teacherDispatch } = useTeacherUserManagementContext();
  const { data: session } = useSession();

  const handleDeleteUser = async () => {
    const response = await deleteUser(id);

    if (response.success) {
      toast({
        variant: "success",
        title: "Success",
        description: "User deleted successfully.",
      });

      if (session?.user?.role === "ADMIN") {
        dispatch({ type: "DELETE_USER", payload: id });
      } else if (session?.user?.role === "TEACHER") {
        teacherDispatch({ type: "DELETE_USER", payload: id });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Failed to delete user.",
      });
    }

    setIsOpen(false); // Close the dialog
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            onClick={handleDeleteUser}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;
