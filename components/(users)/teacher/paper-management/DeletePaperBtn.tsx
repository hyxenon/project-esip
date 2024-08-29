import { deletePaper } from "@/actions/paperManagement.action";

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

interface DeletePaperButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string | null;
  id: string;
}
const DeletePaperBtn = ({
  isOpen,
  setIsOpen,
  name,
  id,
}: DeletePaperButtonProps) => {
  const { toast } = useToast();

  const handleDeletePaper = async () => {
    const res = await deletePaper(id);

    if (res) {
      toast({
        variant: "success",
        title: "Success",
        description: "Paper deleted successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete paper.",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete{" "}
            <span className="font-bold text-red-500">{name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Research Paper and remove this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            onClick={handleDeletePaper}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePaperBtn;
