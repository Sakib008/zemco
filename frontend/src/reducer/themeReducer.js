export const initialThemeState = {
  theme: typeof window !== 'undefined' && localStorage.getItem('theme')
    ? localStorage.getItem('theme')
    : 'light',
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
      return { ...state, theme: newTheme };
    }
    default:
      return state;
  }
};

export default themeReducer;
