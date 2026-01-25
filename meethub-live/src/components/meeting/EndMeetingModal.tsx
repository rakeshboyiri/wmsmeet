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

interface EndMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EndMeetingModal = ({
  isOpen,
  onClose,
  onConfirm,
}: EndMeetingModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-meeting-surface border-meeting-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            End meeting for everyone?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This will disconnect all participants from the meeting. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-meeting-surface-hover border-meeting-border text-white hover:bg-meeting-border hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            End Meeting
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
