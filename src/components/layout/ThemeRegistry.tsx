'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { ThemeProvider, createTheme, Theme, CssBaseline } from '@mui/material';
import { setCookie, getCookie } from '@/utils/cookies';

// ----------------------------------------------------------------------
//  1. 型定義とコンテキストの作成
// ----------------------------------------------------------------------
type Mode = 'light' | 'dark';

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: Mode;
};

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

// ----------------------------------------------------------------------
//  2. コンテキストを利用するためのカスタムフック
// ----------------------------------------------------------------------
export const useColorMode = () => useContext(ColorModeContext);


// ----------------------------------------------------------------------
//  3. テーマを提供するためのメインコンポーネント
// ----------------------------------------------------------------------
export const ThemeRegistry = ({
  children,
  initialMode = 'light',
}: {
  children: React.ReactNode;
  initialMode?: Mode;
}) => {
  const [mode, setMode] = useState<Mode>(initialMode);

  // HTMLのclassNameを更新するためのuseEffect
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      setCookie('theme', next);
      return next;
    });
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode,
      mode,
    }),
    [mode]
  );

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#212121' : '#ffffff',
          },
        },
        components: {
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: mode === 'dark' ? '#4b5563' : '#e2e8f0',
              },
            },
          },
          MuiAppBar: {
            defaultProps: {
              color: 'transparent',
            },
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#212121' : '#ffffff',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};