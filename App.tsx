import React, { useMemo } from 'react';
import { EXAM_EVENTS } from './constants';
import { CountdownDisplay } from './components/CountdownDisplay';
import { EventTimeline } from './components/EventTimeline';
import { AiCoach } from './components/AiCoach';
import { GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const now = new Date();

  // 1. Find the main exam event
  const mainExam = EXAM_EVENTS.find(e => e.isMainExam);

  // 2. Find the "Next Upcoming Important Date"
  // Filter events where the end date (or start date) hasn't passed yet
  const nextEvent = useMemo(() => {
    return EXAM_EVENTS.find(e => {
      const target = e.endDate || e.startDate;
      // We add 24 hours to end date to include the day itself effectively
      const endOfDay = new Date(target);
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay > now;
    });
  }, [now]); // Re-calculate if day changes (though component mounts/unmounts handle updates mostly)

  if (!mainExam) return <div>Configuration Error: Main Exam missing</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header / Hero */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
                115 會考倒數
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                2026 Junior High School Comprehensive Assessment
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
             <div className="text-sm font-bold text-slate-600">保持專注，堅持到底</div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-8">
        
        {/* Top Section: Countdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Exam Countdown (Always visible) */}
            <CountdownDisplay 
                targetDate={mainExam.startDate}
                title="距離國中會考"
                subtitle={mainExam.note}
                isHighlight={true}
            />

            {/* Next Immediate Event Countdown */}
            {nextEvent && nextEvent.id !== mainExam.id ? (
                <CountdownDisplay 
                    targetDate={nextEvent.startDate}
                    title={`距離 ${nextEvent.title}`}
                    subtitle={nextEvent.note}
                    isHighlight={false}
                />
            ) : (
                // If the next event IS the exam, or all over, show a generic completion or Study Coach here directly
                <AiCoach />
            )}
        </div>

        {/* If both countdowns showed, show AI coach below them. If AI coach took the slot above, don't repeat. */}
        {nextEvent && nextEvent.id !== mainExam.id && (
            <AiCoach />
        )}

        {/* Schedule Timeline */}
        <EventTimeline events={EXAM_EVENTS} />

        {/* Footer Info */}
        <footer className="text-center text-slate-400 text-sm py-8">
            <p>資料來源：教育部國教署及全國試務會 (以官方最新公告為準)</p>
            <p className="mt-2 opacity-60">加油，未來的你正在等你。</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
