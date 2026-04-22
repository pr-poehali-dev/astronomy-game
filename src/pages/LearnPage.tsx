import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Category = 'all' | 'planet' | 'star' | 'object';

interface AstroEntry {
  id: string;
  name: string;
  emoji: string;
  type: 'planet' | 'star' | 'object';
  shortDesc: string;
  facts: string[];
  diameter?: string;
  distance?: string;
  temp?: string;
  extra?: string;
  extraLabel?: string;
}

const ENTRIES: AstroEntry[] = [
  {
    id: 'mercury',
    name: 'Меркурий',
    emoji: '⚫',
    type: 'planet',
    shortDesc: 'Самая маленькая и быстрая планета',
    facts: [
      'Год длится всего 88 земных суток',
      'Нет атмосферы — нет защиты от метеоритов',
      'Поверхность покрыта кратерами',
      'Видимость с Земли только на рассвете и закате',
    ],
    diameter: '4 879 км',
    distance: '77 млн км',
    temp: 'от −180 до +430°C',
  },
  {
    id: 'venus',
    name: 'Венера',
    emoji: '🟡',
    type: 'planet',
    shortDesc: 'Самая горячая планета Солнечной системы',
    facts: [
      'Температура поверхности +465°C — горячее Меркурия',
      'Плотная атмосфера из CO₂ — парниковый эффект',
      'Вращается в обратную сторону относительно большинства планет',
      'Сутки длиннее года: 243 против 225 земных дней',
    ],
    diameter: '12 104 км',
    distance: '41 млн км',
    temp: '+465°C',
  },
  {
    id: 'earth',
    name: 'Земля',
    emoji: '🌍',
    type: 'planet',
    shortDesc: 'Наш дом — единственная известная планета с жизнью',
    facts: [
      'Покрыта водой на 71% поверхности',
      'Магнитное поле защищает от солнечного ветра',
      'Единственная планета с тектоникой плит',
      'Возраст — около 4,5 миллиарда лет',
    ],
    diameter: '12 742 км',
    distance: '150 млн км',
    temp: 'от −88 до +58°C',
  },
  {
    id: 'mars',
    name: 'Марс',
    emoji: '🔴',
    type: 'planet',
    shortDesc: 'Красная планета — кандидат на колонизацию',
    facts: [
      'Гора Олимп — самый высокий вулкан в Солнечной системе (27 км)',
      'Два маленьких спутника: Фобос и Деймос',
      'Тонкая атмосфера из CO₂',
      'На поверхности найдены следы древних рек',
    ],
    diameter: '6 779 км',
    distance: '225 млн км',
    temp: 'от −125 до +20°C',
  },
  {
    id: 'jupiter',
    name: 'Юпитер',
    emoji: '🟠',
    type: 'planet',
    shortDesc: 'Газовый гигант — больше всех остальных планет вместе',
    facts: [
      'Большое Красное Пятно — ураган, идущий более 350 лет',
      '95 известных спутников, включая Европу с подлёдным океаном',
      'Мог бы стать звездой, если бы был в 80 раз тяжелее',
      'Магнитное поле в 20 000 раз сильнее земного',
    ],
    diameter: '139 820 км',
    distance: '779 млн км',
    temp: '−108°C (облака)',
    extra: '95 спутников',
    extraLabel: 'Спутников',
  },
  {
    id: 'saturn',
    name: 'Сатурн',
    emoji: '🪐',
    type: 'planet',
    shortDesc: 'Планета с кольцами изо льда и пыли',
    facts: [
      'Кольца состоят из льда, камней и пыли',
      'Единственная планета легче воды по средней плотности',
      '146 известных спутников, крупнейший — Титан',
      'Титан имеет атмосферу и озёра из жидкого метана',
    ],
    diameter: '116 460 км',
    distance: '1,43 млрд км',
    temp: '−140°C',
    extra: '146 спутников',
    extraLabel: 'Спутников',
  },
  {
    id: 'uranus',
    name: 'Уран',
    emoji: '🔵',
    type: 'planet',
    shortDesc: 'Ледяной гигант, вращающийся на боку',
    facts: [
      'Ось вращения наклонена на 98° — катится по орбите',
      'Самая холодная атмосфера среди планет (−224°C)',
      'Имеет 13 известных колец',
      'Вращается в обратном направлении, как Венера',
    ],
    diameter: '50 724 км',
    distance: '2,87 млрд км',
    temp: '−224°C',
  },
  {
    id: 'neptune',
    name: 'Нептун',
    emoji: '💙',
    type: 'planet',
    shortDesc: 'Самая дальняя планета с ураганными ветрами',
    facts: [
      'Ветры достигают 2 100 км/ч — сильнейшие в Солнечной системе',
      'Открыт в 1846 году — сначала математически, потом в телескоп',
      'Один год длится 165 земных лет',
      'Крупнейший спутник Тритон вращается в обратную сторону',
    ],
    diameter: '49 244 км',
    distance: '4,5 млрд км',
    temp: '−214°C',
  },
  {
    id: 'sun',
    name: 'Солнце',
    emoji: '☀️',
    type: 'star',
    shortDesc: 'Наша звезда — центр Солнечной системы',
    facts: [
      'Содержит 99,86% всей массы Солнечной системы',
      'Температура поверхности — около 5 500°C',
      'Ядро раскалено до 15 млн°C',
      'Каждую секунду превращает 600 млн тонн водорода в гелий',
    ],
    diameter: '1 392 700 км',
    distance: '0 км (центр системы)',
    temp: '5 500°C (поверхность)',
  },
  {
    id: 'sirius',
    name: 'Сириус',
    emoji: '✨',
    type: 'star',
    shortDesc: 'Ярчайшая звезда ночного неба',
    facts: [
      'В 25 раз ярче Солнца',
      'В 1,7 раза больше Солнца и в 2 раза тяжелее',
      'Находится в 8,6 световых лет от Земли',
      'Сириус А + Сириус Б — двойная система',
    ],
    diameter: '2 379 000 км',
    distance: '8,6 св. лет',
    temp: '9 940°C',
  },
  {
    id: 'betelgeuse',
    name: 'Бетельгейзе',
    emoji: '🔶',
    type: 'star',
    shortDesc: 'Красный сверхгигант на краю жизни',
    facts: [
      'Один из крупнейших известных красных сверхгигантов',
      'В 700 раз больше Солнца по диаметру',
      'Скоро (в астрономическом смысле) взорвётся как сверхновая',
      'Расположен в созвездии Ориона',
    ],
    diameter: '≈ 1 млрд км',
    distance: '700 св. лет',
    temp: '3 500°C',
  },
  {
    id: 'moon',
    name: 'Луна',
    emoji: '🌕',
    type: 'object',
    shortDesc: 'Единственный естественный спутник Земли',
    facts: [
      'Стабилизирует ось вращения Земли',
      'Удаляется от Земли на 3,8 см каждый год',
      'Приливы и отливы — результат притяжения Луны',
      'Люди ходили по Луне 12 раз (1969–1972)',
    ],
    diameter: '3 474 км',
    distance: '384 400 км',
    temp: 'от −173 до +127°C',
  },
  {
    id: 'black_hole',
    name: 'Чёрная дыра',
    emoji: '⭕',
    type: 'object',
    shortDesc: 'Объект с гравитацией, из которого не вырвется даже свет',
    facts: [
      'Граница без возврата называется горизонтом событий',
      'В центре Млечного Пути — сверхмассивная чёрная дыра Sgr A*',
      'Время рядом с ней течёт медленнее (замедление времени)',
      'Первое фото получено в 2019 году',
    ],
    diameter: 'от нескольких км',
    distance: '26 000 св. лет (Sgr A*)',
    temp: 'почти 0 К (излучение Хокинга)',
  },
];

const TYPE_LABELS: Record<string, string> = {
  all: 'Все',
  planet: 'Планеты',
  star: 'Звёзды',
  object: 'Объекты',
};

export default function LearnPage() {
  const [category, setCategory] = useState<Category>('all');
  const [selected, setSelected] = useState<AstroEntry | null>(null);

  const filtered = category === 'all' ? ENTRIES : ENTRIES.filter(e => e.type === category);

  if (selected) {
    return <DetailView entry={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Шапка */}
        <div className="mb-6 opacity-0-init animate-fade-in">
          <h2 className="font-cormorant text-2xl font-light">Справочник</h2>
          <p className="text-xs text-muted-foreground font-golos">Объекты вселенной</p>
        </div>

        {/* Фильтр */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 opacity-0-init animate-fade-in delay-100">
          {(['all', 'planet', 'star', 'object'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded text-xs font-golos whitespace-nowrap transition-all border ${
                category === cat
                  ? 'bg-primary/15 border-primary/50 text-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {TYPE_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Список объектов */}
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((entry, i) => (
            <button
              key={entry.id}
              onClick={() => setSelected(entry)}
              className={`card-cosmos rounded-lg p-4 flex items-center gap-4 text-left w-full opacity-0-init animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="text-3xl select-none w-10 text-center shrink-0">{entry.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-golos font-medium text-foreground text-sm">{entry.name}</div>
                <div className="font-golos text-xs text-muted-foreground mt-0.5 truncate">{entry.shortDesc}</div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded border font-golos ${
                  entry.type === 'planet' ? 'border-primary/30 text-primary/70' :
                  entry.type === 'star' ? 'border-accent/30 text-accent/70' :
                  'border-border text-muted-foreground'
                }`}>
                  {entry.type === 'planet' ? 'планета' : entry.type === 'star' ? 'звезда' : 'объект'}
                </span>
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailView({ entry, onBack }: { entry: AstroEntry; onBack: () => void }) {
  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Назад */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-golos text-sm opacity-0-init animate-fade-in"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад к справочнику
        </button>

        {/* Герой */}
        <div className="text-center mb-8 opacity-0-init animate-fade-in-up delay-100">
          <div className="text-8xl mb-4 planet-spin inline-block select-none">{entry.emoji}</div>
          <h1 className="font-cormorant text-4xl font-light mb-2">{entry.name}</h1>
          <div className="geo-line w-24 mx-auto my-3" />
          <p className="font-golos text-sm text-muted-foreground">{entry.shortDesc}</p>
        </div>

        {/* Характеристики */}
        <div className="grid grid-cols-3 gap-3 mb-6 opacity-0-init animate-fade-in-up delay-200">
          {entry.diameter && (
            <div className="card-cosmos rounded p-3 text-center">
              <div className="text-xs text-muted-foreground font-golos mb-1">Диаметр</div>
              <div className="text-xs font-golos text-foreground font-medium leading-tight">{entry.diameter}</div>
            </div>
          )}
          {entry.distance && (
            <div className="card-cosmos rounded p-3 text-center">
              <div className="text-xs text-muted-foreground font-golos mb-1">Расстояние</div>
              <div className="text-xs font-golos text-foreground font-medium leading-tight">{entry.distance}</div>
            </div>
          )}
          {entry.temp && (
            <div className="card-cosmos rounded p-3 text-center">
              <div className="text-xs text-muted-foreground font-golos mb-1">Температура</div>
              <div className="text-xs font-golos text-foreground font-medium leading-tight">{entry.temp}</div>
            </div>
          )}
        </div>

        {/* Факты */}
        <div className="card-cosmos rounded-lg p-5 opacity-0-init animate-fade-in-up delay-300">
          <h3 className="font-cormorant text-lg font-light mb-4 flex items-center gap-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            Интересные факты
          </h3>
          <ul className="space-y-3">
            {entry.facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-3 font-golos text-sm">
                <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
