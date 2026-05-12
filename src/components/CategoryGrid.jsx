import { CATEGORY_COLORS, CATEGORY_ICONS } from '../data/constants';

export default function CategoryGrid({ cats, selected, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {cats.map((name, i) => {
        const isOn = selected === i;
        const color = CATEGORY_COLORS[i];
        const Icon = CATEGORY_ICONS[i];
        return (
          <div key={i} onClick={() => onSelect(i)} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(i)}
            aria-label={name} aria-pressed={isOn}
            className={`text-center py-2 px-0.5 rounded-[10px] cursor-pointer text-[10px]
              transition-all duration-150 border-[1.5px] ${isOn ? 'font-semibold' : 'font-normal'}`}
            style={{ borderColor: isOn ? color : '#E8E0D6', background: isOn ? color + '12' : '#FFFFFF', color: isOn ? color : '#8A7F93' }}>
            <Icon size={18} className="mx-auto mb-0.5" strokeWidth={isOn ? 2.2 : 1.8} />
            {name}
          </div>
        );
      })}
    </div>
  );
}
