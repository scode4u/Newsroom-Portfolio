import React from 'react';
import BroadcastBar  from './components/BroadcastBar';
import MastheadHeader from './components/MastheadHeader';
import StockTicker   from './components/StockTicker';
import BreakingBanner from './components/BreakingBanner';
import HeroSection   from './sections/HeroSection';
import SkillsMarket  from './sections/SkillsMarket';
import ExperienceArchive from './sections/ExperienceArchive';
import ProjectsBreaking  from './sections/ProjectsBreaking';
import JourneyTimeline   from './sections/JourneyTimeline';
import AchievementsDesk  from './sections/AchievementsDesk';
import ContactNewsroom   from './sections/ContactNewsroom';
import FooterBroadcast   from './sections/FooterBroadcast';

export default function App() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <BroadcastBar />
      <MastheadHeader />
      <StockTicker />
      <BreakingBanner />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <HeroSection />
        <hr className="section-rule" style={{ margin: '32px 0' }} />
        <SkillsMarket />
        <hr className="section-rule" style={{ margin: '32px 0' }} />
        <ProjectsBreaking />
        <hr className="section-rule" style={{ margin: '32px 0' }} />
        <JourneyTimeline />
        <hr className="section-rule" style={{ margin: '32px 0' }} />
        <ExperienceArchive />
        <hr className="section-rule" style={{ margin: '32px 0' }} />
        <AchievementsDesk />
        <hr className="section-rule" style={{ margin: '32px 0' }} />
        <ContactNewsroom />
      </main>
      <FooterBroadcast />
    </div>
  );
}
