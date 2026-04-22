import { useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

interface AstroObject {
  id: string;
  name: string;
  emoji: string;
  type: 'planet' | 'star' | 'object';
  hint: string;
  color: string;
}

const OBJECTS: AstroObject[] = [
  { id: 'mercury', name: 'Меркурий', emoji: '⚫', type: 'planet', hint: 'Ближайшая к Солнцу планета. Перепады температур от −180°C до +430°C.', color: '#9ca3af' },
  { id: 'venus', name: 'Венера', emoji: '🟡', type: 'planet', hint: 'Самая горячая планета Солнечной системы. Вращается в обратную сторону.', color: '#fbbf24' },
  { id: 'earth', name: 'Земля', emoji: '🌍', type: 'planet', hint: 'Единственная известная планета с жизнью. Покрыта водой на 71%.', color: '#3b82f6' },
  { id: 'mars', name: 'Марс', emoji: '🔴', type: 'planet', hint: 'Красная планета. Здесь находится самый высокий вулкан — Олимп (27 км).', color: '#ef4444' },
  { id: 'jupiter', name: 'Юпитер', emoji: '🟠', type: 'planet', hint: 'Самая большая планета. Большое Красное Пятно — шторм, идущий 350 лет.', color: '#f97316' },
  { id: 'saturn', name: 'Сатурн', emoji: '🪐', type: 'planet', hint: 'Знаменит кольцами изо льда и пыли. Легче воды по плотности.', color: '#d97706' },
  { id: 'uranus', name: 'Уран', emoji: '🔵', type: 'planet', hint: 'Вращается на боку — ось наклонена на 98°. Самая холодная атмосфера.', color: '#06b6d4' },
  { id: 'neptune', name: 'Нептун', emoji: '💙', type: 'planet', hint: 'Ветра до 2100 км/ч. Обнаружен математически до наблюдения в телескоп.', color: '#3b82f6' },
  { id: 'sun', name: 'Солнце', emoji: '☀️', type: 'star', hint: 'Наша звезда. Занимает 99,86% массы Солнечной системы.', color: '#fbbf24' },
  { id: 'sirius', name: 'Сириус', emoji: '✨', type: 'star', hint: 'Самая яркая звезда ночного неба. В 1,7 раза больше Солнца.', color: '#bfdbfe' },
  { id: 'betelgeuse', name: 'Бетельгейзе', emoji: '🔶', type: 'star', hint: 'Красный сверхгигант в созвездии Ориона. Скоро станет сверхновой.', color: '#f97316' },
  { id: 'moon', name: 'Луна', emoji: '🌕', type: 'object', hint: 'Единственный естественный спутник Земли. Удаляется на 3,8 см в год.', color: '#d1d5db' },
  { id: 'black_hole', name: 'Чёрная дыра', emoji: '⭕', type: 'object', hint: 'Объект с такой гравитацией, что даже свет не может вырваться.', color: '#6b7280' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getOptions(correct: AstroObject, all: AstroObject[]): AstroObject[] {
  const others = shuffleArray(all.filter(o => o.id !== correct.id)).slice(0, 3);
  return shuffleArray([correct, ...others]);
}

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [gameObjects] = useState(() => shuffleArray(OBJECTS));
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = gameObjects[currentIndex % gameObjects.length];
  const options = useCallback(() => getOptions(current, OBJECTS), [current])();

  const handleAnswer = (id: string) => {
    if (selected) return;
    setSelected(id);
    setTotal(t => t + 1);
    if (id === current.id) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setShowHint(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowHint(false);
    setCurrentIndex(i => i + 1);
  };

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-8 opacity-0-init animate-fade-in">
          <div>
            <h2 className="font-cormorant text-2xl font-light">Игра</h2>
            <p className="text-xs text-muted-foreground font-golos">Угадай объект по описанию</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-golos">
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-accent">
                <Icon name="Flame" size={14} />
                <span>{streak}</span>
              </div>
            )}
            <div className="text-right">
              <div className="text-foreground font-medium">{score}/{total}</div>
              <div className="text-muted-foreground">{accuracy}%</div>
            </div>
          </div>
        </div>

        {/* Прогресс */}
        <div className="h-px bg-border mb-8 rounded-full overflow-hidden opacity-0-init animate-fade-in delay-100">
          <div
            className="progress-cosmos h-full"
            style={{ width: `${accuracy}%` }}
          />
        </div>

        {/* Вопрос */}
        <div
          key={currentIndex}
          className="card-cosmos rounded-lg p-8 mb-6 text-center opacity-0-init animate-scale-in"
        >
          <div className="text-7xl mb-4 animate-pulse-slow select-none">{current.emoji}</div>
          <p className="font-golos text-sm text-muted-foreground leading-relaxed">
            {current.hint}
          </p>
          <div className="mt-4 inline-block px-2 py-1 rounded border border-border text-xs font-golos text-muted-foreground">
            {current.type === 'planet' ? '🪐 Планета' : current.type === 'star' ? '⭐ Звезда' : '🌌 Объект'}
          </div>
        </div>

        {/* Варианты ответов */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {options.map((opt, i) => {
            const isCorrect = opt.id === current.id;
            const isSelected = selected === opt.id;
            const showResult = selected !== null;

            let cls = 'card-cosmos rounded p-4 text-center font-golos text-sm font-medium transition-all cursor-pointer ';
            if (showResult) {
              if (isCorrect) cls += 'answer-correct ';
              else if (isSelected) cls += 'answer-wrong ';
              cls += 'cursor-default ';
            } else {
              cls += 'hover:border-primary/50 hover:bg-primary/5 ';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                className={`${cls} opacity-0-init animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
                disabled={!!selected}
              >
                <span className="text-xl mb-1 block select-none">{opt.emoji}</span>
                <span className="text-foreground">{opt.name}</span>
                {showResult && isCorrect && (
                  <Icon name="Check" size={14} className="text-green-400 mx-auto mt-1" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <Icon name="X" size={14} className="text-red-400 mx-auto mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Результат и кнопка далее */}
        {selected && (
          <div className="opacity-0-init animate-fade-in-up">
            <div className={`rounded p-4 mb-4 text-sm font-golos ${
              selected === current.id
                ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-300'
            }`}>
              {selected === current.id
                ? `Верно! Это ${current.name}.`
                : `Неверно. Это был${current.type === 'planet' ? 'а' : ''} ${current.name}.`
              }
            </div>

            <button
              onClick={nextQuestion}
              className="btn-glow w-full py-3 bg-primary/10 border border-primary/40 rounded font-golos text-sm text-primary font-medium hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
            >
              Следующий вопрос
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
