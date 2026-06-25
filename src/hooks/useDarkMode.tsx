// import { useState, useEffect, useCallback, useLayoutEffect } from "react";

// const THEME_COLOR = 'SITE_NAME_THEME_COLOR';
// type Theme = 'dark' | 'light';

// export function useThemeColor(): [boolean, () => void] {
//   // 初期値は undefined にして、CSRで決定する（SSR中は描画しない or fallback）
//   const [isDarkTheme, setIsDarkTheme] = useState<boolean | undefined>(undefined);

//   // クライアントでテーマを初期化
//   useLayoutEffect(() => {
//     try {
//       const storedTheme = window.localStorage.getItem(THEME_COLOR) as Theme | null;
//       if (storedTheme === 'dark') {
//         setIsDarkTheme(true);
//       } else if (storedTheme === 'light') {
//         setIsDarkTheme(false);
//       } else {
//         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         setIsDarkTheme(prefersDark);
//       }
//     } catch {
//       setIsDarkTheme(true); // エラー時は fallback として dark
//     }
//   }, []);

//   const toggleThemeColor = useCallback(() => {
//     setIsDarkTheme((prev) => !prev);
//   }, []);

//   // テーマのクラスとlocalStorage反映
//   useEffect(() => {
//     if (typeof isDarkTheme !== 'boolean') return;

//     const root = window.document.documentElement;
//     if (isDarkTheme) {
//       root.classList.add('dark');
//       root.classList.remove('light');
//     } else {
//       root.classList.add('light');
//       root.classList.remove('dark');
//     }
//     try {
//       window.localStorage.setItem(THEME_COLOR, isDarkTheme ? 'dark' : 'light');
//     } catch {
//       // do nothing
//     }
//   }, [isDarkTheme]);

//   return [isDarkTheme ?? true, toggleThemeColor]; // fallback: true（dark）
// }
