import { useTheme } from '@contexts/ThemeContext';

import './SettingsModule.scss';

const SettingsModule = () => {
  const { theme, accent, setTheme, setAccent } = useTheme();

  return (
    <div className="settings">
      {/* Настройки темы (на мобильных идёт первым) */}
      <div className="settings__card settings__card_theme">
        <h2 className="settings__title">Тема</h2>
        <select
          className="settings__select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
        >
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
        </select>

        <h2 className="settings__title">Акцентный цвет</h2>
        <select
          className="settings__select"
          value={accent}
          onChange={(e) => setAccent(e.target.value as any)}
        >
          <option value="blue">Синий</option>
          <option value="green">Зелёный</option>
          <option value="red">Красный</option>
          <option value="purple">Фиолетовый</option>
        </select>
      </div>

      {/* О приложении */}
      <div className="settings__card settings__card_info">
        <h2 className="settings__title">О приложении</h2>
        <p className="settings__app-name">Lunar Rhytm</p>
        <p className="settings__app-version">v. 1.0.0</p>
        <p className="settings__copyright">© StoneTronix, 2025 г.</p>
        <p className="settings__note">Подготовлено для курсовой работы</p>
      </div>
    </div>
  );
};

export default SettingsModule;
