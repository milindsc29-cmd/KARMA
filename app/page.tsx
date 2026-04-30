import Hero from '@/components/Hero';
import MissionSection from '@/components/MissionSection';
import TimelineSection from '@/components/TimelineSection';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-cream">
      <Hero />
      <MissionSection />
      <TimelineSection />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
