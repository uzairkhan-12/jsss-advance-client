/* eslint-disable @typescript-eslint/no-explicit-any */
export const THEME = {
  PRIMARY: 'primary',
  BLUE_SHADES: 'blue_shades',
  GREEN_SHADES: 'green_shades',
  DARK: 'dark',
};

export const COLOR_SCHEMES = {
  [THEME.PRIMARY]: {
    header: 'bg-primary-dark',
    cardStyles: 'border border-gray-200 bg-white',
    background: 'bg-white',
  },
  [THEME.BLUE_SHADES]: {
    header: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    cardStyles: 'border border-gray-200 bg-white',
    background: 'bg-white',
  },
  [THEME.GREEN_SHADES]: {
    header: 'bg-gradient-to-r from-cyan-500 to-green-500',
    cardStyles: 'border border-gray-200 bg-white',
    background: 'bg-white',
  },
  [THEME.DARK]: {
    header: 'bg-stone-500',
    cardStyles: 'border border-gray-800 bg-stone-500 text-white',
    background: 'bg-black',
  },
};

export const getDefaultTheme = () => COLOR_SCHEMES[THEME.PRIMARY];

export const getThemeColor = (storeTheme: any, element: string) => {
  const theme: any = COLOR_SCHEMES[storeTheme] || getDefaultTheme();
  return theme[element];
};

export const getUserStoreTheme = (store_theme: string | null) => {
  return store_theme || THEME.PRIMARY;
};
