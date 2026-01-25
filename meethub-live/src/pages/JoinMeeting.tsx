import { useState } from "react";
import { Video, ArrowLeft, User, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JoinMeeting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [errors, setErrors] = useState<{ name?: string; link?: string }>({});

  const validateMeetingLink = (link: string) => {
    // Accept meeting IDs like "abc-defg-hij" or full URLs
    const idPattern = /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
    const urlPattern = /wmsmeet\.app\/meeting\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
    return idPattern.test(link) || urlPattern.test(link);
  };

  const handleJoin = () => {
    const newErrors: { name?: string; link?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!meetingLink.trim()) {
      newErrors.link = "Please enter a meeting link or ID";
    } else if (!validateMeetingLink(meetingLink.trim())) {
      newErrors.link = "Invalid meeting link format";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Extract meeting ID from link or use as-is
      const meetingId = meetingLink.includes("/")
        ? meetingLink.split("/").pop()
        : meetingLink;
      
      toast.success("Joining meeting...");
      navigate(`/meeting/${meetingId}`, { state: { name, isHost: false } });
    }
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
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Join a meeting
          </h1>
          <p className="text-muted-foreground mb-8">
            Enter your details to join an existing meeting
          </p>

          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Your name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`pl-10 h-12 ${errors.name ? "border-destructive" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Meeting Link Input */}
            <div className="space-y-2">
              <Label htmlFor="link" className="text-sm font-medium">
                Meeting link or ID
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="link"
                  type="text"
                  placeholder="abc-defg-hij"
                  value={meetingLink}
                  onChange={(e) => {
                    setMeetingLink(e.target.value);
                    if (errors.link) setErrors({ ...errors, link: undefined });
                  }}
                  className={`pl-10 h-12 font-mono ${errors.link ? "border-destructive" : ""}`}
                />
              </div>
              {errors.link && (
                <p className="text-sm text-destructive">{errors.link}</p>
              )}
            </div>

            <Button
              className="w-full btn-primary h-12 rounded-xl text-base font-semibold"
              onClick={handleJoin}
            >
              Join Meeting
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinMeeting;
