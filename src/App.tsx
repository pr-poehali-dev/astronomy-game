import { useState } from 'react';
import GamePage from '@/pages/GamePage';
import LearnPage from '@/pages/LearnPage';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'game' | 'learn';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="stars-bg" />
      <div className="relative z-10">
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
        {activeTab === 'game' && <GamePage />}
        {activeTab === 'learn' && <LearnPage />}
      </div>

      {activeTab !== 'home' && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-md safe-bottom">
          <div className="flex items-center justify-around max-w-md mx-auto px-2 py-2">
            <button
              onClick={() => setActiveTab('home')}
              className="flex flex-col items-center gap-1 flex-1 py-2 rounded transition-colors text-muted-foreground hover:text-foreground active:scale-95"
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-golos">Главная</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`flex flex-col items-center gap-1 flex-1 py-2 rounded transition-colors active:scale-95 ${
                activeTab === 'game' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Gamepad2" size={24} />
              <span className="text-xs font-golos">Игра</span>
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex flex-col items-center gap-1 flex-1 py-2 rounded transition-colors active:scale-95 ${
                activeTab === 'learn' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BookOpen" size={24} />
              <span className="text-xs font-golos">Обучение</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="relative mb-12 opacity-0-init animate-fade-in">
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center planet-spin">
          <div className="absolute w-48 h-48 rounded-full border border-primary/15 orbit-ring" />
          <div className="absolute w-60 h-60 rounded-full border border-accent/10" style={{ animation: 'orbit-rotate 35s linear infinite' }} />
          <span className="text-5xl select-none">🪐</span>
        </div>
      </div>

      <div className="text-center mb-4 opacity-0-init animate-fade-in-up delay-200">
        <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-tight mb-2">
          Космо<span className="text-primary">Знаток</span>
        </h1>
        <div className="geo-line w-32 mx-auto my-4" />
        <p className="font-golos text-muted-foreground text-xs tracking-widest uppercase">
          Астрономия · Игра · Исследование
        </p>
      </div>

      <p className="font-golos text-center text-muted-foreground max-w-xs mb-12 leading-relaxed text-sm opacity-0-init animate-fade-in-up delay-300">
        Проверь знания о планетах и звёздах или изучи интерактивный справочник вселенной
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs opacity-0-init animate-fade-in-up delay-400">
        <button
          onClick={() => onNavigate('game')}
          className="btn-glow group w-full py-4 px-6 border border-primary/40 bg-primary/5 rounded text-foreground font-golos font-medium flex items-center gap-3 transition-all hover:bg-primary/10 hover:border-primary/60"
        >
          <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
            <Icon name="Gamepad2" size={15} className="text-primary" />
          </div>
          <div className="text-left">
            <div className="text-foreground text-sm">Игра</div>
            <div className="text-xs text-muted-foreground font-normal">Угадай планету или звезду</div>
          </div>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
        </button>

        <button
          onClick={() => onNavigate('learn')}
          className="btn-glow-accent group w-full py-4 px-6 border border-accent/30 bg-accent/5 rounded text-foreground font-golos font-medium flex items-center gap-3 transition-all hover:bg-accent/10 hover:border-accent/50"
        >
          <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center group-hover:border-accent transition-colors shrink-0">
            <Icon name="BookOpen" size={15} className="text-accent" />
          </div>
          <div className="text-left">
            <div className="text-foreground text-sm">Обучение</div>
            <div className="text-xs text-muted-foreground font-normal">Справочник объектов вселенной</div>
          </div>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
        </button>
      </div>

      <div className="mt-16 flex items-center gap-6 opacity-0-init animate-fade-in delay-600">
        <div className="flex flex-col items-center gap-1">
          <span className="font-cormorant text-2xl text-primary font-light">8</span>
          <span className="text-xs text-muted-foreground font-golos">планет</span>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-cormorant text-2xl text-accent font-light">10+</span>
          <span className="text-xs text-muted-foreground font-golos">звёзд</span>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-cormorant text-2xl text-primary font-light">∞</span>
          <span className="text-xs text-muted-foreground font-golos">вопросов</span>
        </div>
      </div>
    </div>
  );
}