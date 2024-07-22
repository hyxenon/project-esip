import { deleteSchool, statusChange } from "@/actions/schoolManagement";
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
  status: string;
}
const StatusChange = ({
  isOpen,
  setIsOpen,
  schoolId,
  schoolName,
  status,
}: DeleteSchoolButtonProps) => {
  const { toast } = useToast();
  const { dispatch } = useSchoolContext();

  const handleStatusChange = async () => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    const res = await statusChange(schoolId, newStatus);

    if (res.success) {
      dispatch({
        type: "EDIT_SCHOOL",
        payload: { ...res.message, status: newStatus },
      });
      toast({
        variant: "success",
        title: "Status Updated",
        description: `${schoolName} is now ${
          newStatus === "Active" ? "Subscribed" : "Unsubscribed"
        }`,
      });
      setIsOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${res.message}`,
      });
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to{" "}
            {status === "Active" ? "Unsubsribe" : "Subscribe"} {schoolName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {status === "Active" ? (
              <p>
                If you unsubscribe, the school will no longer have access to the
                website.
              </p>
            ) : (
              <p>
                If you subscribe, they will regain access to the site and its
                features.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={
              status === "Active"
                ? "bg-destructive hover:bg-destructive"
                : "bg-green-600 hover:bg-green-600"
            }
            onClick={handleStatusChange}
          >
            {status === "Active" ? "Unsubscribe" : "Subscribe"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusChange;
