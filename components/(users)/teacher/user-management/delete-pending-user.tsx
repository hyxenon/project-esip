import { deletePendingUser } from "@/actions/userManagement";
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

interface DeleteUserButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string | null;
  id: string;
}
const DeletePendingUser = ({
  isOpen,
  setIsOpen,
  name,
  id,
}: DeleteUserButtonProps) => {
  const { toast } = useToast();

  const handleDeleteUser = async () => {
    const res = await deletePendingUser(id);

    if (res.success) {
      toast({
        variant: "success",
        title: "Removed",
        description: "User request removed.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.error || "Failed to delete user.",
      });
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to remove {name} request?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The user's pending request will be
            removed from your school. If this is a mistake, they can register
            again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            onClick={handleDeleteUser}
          >
            Remove request
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePendingUser;
