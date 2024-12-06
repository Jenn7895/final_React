import { useContextGlobal, actions } from './utils/ContextGlobal';

const ThemeToggleButton = () => {
  const { state: { theme }, dispatch } = useContextGlobal();

  const toggleTheme = () => {
    dispatch({ type: actions.CHANGE_THEME });
  };

  return (
    <button className="btn-theme" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;

