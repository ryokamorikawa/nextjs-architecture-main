'use client';

import { useTranslation } from 'common/libs/i18n/client';
import { BsFillCursorFill } from 'react-icons/bs';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lng: any;
  target: string;
  onChangeTarget: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent | React.FormEvent) => void;
}

const SearchBar = ({ lng, target, onChangeTarget, onClick }: Props) => {
  const { t } = useTranslation(lng);
  return (
    <div className="relative z-10 m-auto flex w-full max-w-[500px] items-center justify-between pt-4 text-white">
      <form
        onSubmit={onClick}
        className="m-auto flex w-full items-center justify-between rounded-2xl border border-gray-300 bg-transparent p-3 text-white"
      >
        <div>
          <input
            type="text"
            pattern="^[a-zA-Z]*$"
            value={target}
            onChange={onChangeTarget}
            className="border-none bg-transparent text-2xl text-white focus:outline-none"
            placeholder={t('weather.serch-bar-placeholder')}
            aria-label="search-bar"
          />
        </div>
        <button
          className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-300"
          onClick={onClick}
        >
          <BsFillCursorFill size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
