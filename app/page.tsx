import Hero from '@/components/Hero';
import MissionSection from '@/components/MissionSection';
import TimelineSection from '@/components/TimelineSection';
import WaitlistForm from '@/components/WaitlistForm';
import CommunityForm from '@/components/CommunityForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-cream">
      <Hero />
      <MissionSection />
      <TimelineSection />
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-3xl mx-auto">
          <CommunityForm />
        </div>
      </div>
      <WaitlistForm />
      <Footer />
    </main>
  );
}
