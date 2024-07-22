import { deleteSchool } from "@/actions/schoolManagement";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSchoolContext } from "@/context/SchoolContext";

interface DeleteSchoolButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  schoolId: string;
  schoolName: string;
}
const DeleteSchoolButton = ({
  isOpen,
  setIsOpen,
  schoolId,
  schoolName,
}: DeleteSchoolButtonProps) => {
  const { toast } = useToast();
  const { dispatch } = useSchoolContext();

  const handleDeleteSchool = async () => {
    try {
      const res = await deleteSchool(schoolId);
      if (res.success) {
        dispatch({ type: "DELETE_SCHOOL", payload: schoolId });
        toast({
          variant: "success",
          title: "School Deleted Successfully",
          description: `${schoolName} deleted successfully.`,
        });
        setIsOpen(false);
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${err.message}`,
      });
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete {schoolName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            school account and remove this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            onClick={handleDeleteSchool}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSchoolButton;
