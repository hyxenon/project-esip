import { acceptPendingUser } from "@/actions/userManagement";
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
import { useTeacherUserManagementContext } from "@/context/TeacherUserManagementContext";
interface AcceptPendingProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string | null;
  id: string;
}
const AcceptPendingUser = ({
  isOpen,
  setIsOpen,
  name,
  id,
}: AcceptPendingProps) => {
  const { toast } = useToast();

  const handleDeleteUser = async () => {
    const res = await acceptPendingUser(id);

    if (res.success) {
      toast({
        variant: "success",
        title: "Success",
        description: "User request accepted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.error || "Failed to accept user.",
      });
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to accept {name} request?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action can be undone. The user's pending request will be
            removed from your school. This user can now access the website and
            if this is a mistake you can delete them in the user specific tab.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#606C38] hover:bg-[#606C38]"
            onClick={handleDeleteUser}
          >
            Accept Request
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AcceptPendingUser;
