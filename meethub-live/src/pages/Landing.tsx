import { Video, Users, Shield, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">WMSMeet</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight animate-fade-in">
            Simple. Fast.
            <br />
            <span className="text-primary">Secure Meetings.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up">
            Connect with your team instantly. No downloads, no hassle.
            Just seamless audio meetings that work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Button
              size="lg"
              className="btn-primary rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/create")}
            >
              Start a Meeting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-semibold border-2 hover:bg-secondary transition-all"
              onClick={() => navigate("/join")}
            >
              <LinkIcon className="mr-2 w-5 h-5" />
              Join with a Link
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Video className="w-6 h-6" />}
            title="Instant Meetings"
            description="Start or join a meeting in seconds. No account required for participants."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Team Collaboration"
            description="Share your screen and collaborate in real-time with your team."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Secure & Private"
            description="Enterprise-grade security with encrypted connections for all meetings."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Video className="w-4 h-4" />
              <span className="text-sm font-medium">WMSMeet</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="card-elevated p-8 text-center hover:shadow-lg transition-shadow">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
