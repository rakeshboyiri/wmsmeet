import { useState } from "react";
import { Video, ArrowLeft, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const generateMeetingId = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const generate = (len: number) =>
    Array.from({ length: len }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  return `${generate(3)}-${generate(4)}-${generate(3)}`;
};

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const meetingLink = meetingId
    ? `https://wmsmeet.app/meeting/${meetingId}`
    : "";

  const handleCreateMeeting = () => {
    const id = generateMeetingId();
    setMeetingId(id);
    toast.success("Meeting created!");
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinAsHost = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    navigate(`/meeting/${meetingId}`, { state: { name, isHost: true } });
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">WMSMeet</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md card-elevated p-8 animate-slide-up">
          {!meetingId ? (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Create a new meeting
              </h1>
              <p className="text-muted-foreground mb-8">
                Start an instant meeting and invite others to join
              </p>

              <Button
                className="w-full btn-primary h-14 rounded-xl text-base font-semibold"
                onClick={handleCreateMeeting}
              >
                <Video className="mr-2 w-5 h-5" />
                Create Instant Meeting
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Meeting created!
                </h1>
                <p className="text-muted-foreground">
                  Share this link with others to join
                </p>
              </div>

              <div className="space-y-6">
                {/* Meeting Link */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Meeting link</Label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={meetingLink}
                      className="h-12 font-mono text-sm bg-secondary"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 shrink-0"
                      onClick={handleCopyLink}
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name to join"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button
                  className="w-full btn-primary h-12 rounded-xl text-base font-semibold"
                  onClick={handleJoinAsHost}
                >
                  Join as Host
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateMeeting;
