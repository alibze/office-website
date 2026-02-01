import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EditorServer } from "@/utils/editor/server";
import {
  Language,
  Locale,
  LocaleExtend,
  standardizeLocale,
} from "@ziziyi/utils";
import { type OfficeTheme } from "@/utils/editor/types";
import { type Plugin } from "@/utils/plugins";

/**
 * Resolves the language setting to an actual locale code.
 * If the language is set to "auto", it detects the browser's preferred language.
 */
function resolveLanguage(language: Language): Locale {
  if (language === LocaleExtend.Auto) {
    const browserLang =
      typeof navigator !== "undefined"
        ? navigator.language || (navigator as any).userLanguage
        : "en";
    return standardizeLocale(browserLang || "en");
  }
  return language as Locale;
}

interface AppState {
  // Document State
  server: EditorServer;

  // Settings State
  language: Language;
  theme: OfficeTheme;

  // Plugin State
  customPlugins: Plugin[];
  enabledPluginIds: string[];

  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (theme: OfficeTheme) => void;

  // Plugin Actions
  addCustomPlugin: (plugin: Plugin) => void;
  removeCustomPlugin: (id: string) => void;
  togglePlugin: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Document Initial State
      server: new EditorServer(),

      // Settings Initial State
      language: LocaleExtend.Auto,
      theme: "theme-white",

      // Plugin Initial State
      customPlugins: [],
      enabledPluginIds: [],

      // Settings Actions
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme: theme }),

      // Plugin Actions
      addCustomPlugin: (plugin) =>
        set((state) => ({
          customPlugins: [...state.customPlugins, plugin],
          enabledPluginIds: [...state.enabledPluginIds, plugin.id],
        })),
      removeCustomPlugin: (id) =>
        set((state) => ({
          customPlugins: state.customPlugins.filter((p) => p.id !== id),
          enabledPluginIds: state.enabledPluginIds.filter((pid) => pid !== id),
        })),
      togglePlugin: (id) =>
        set((state) => {
          const isEnabled = state.enabledPluginIds.includes(id);
          return {
            enabledPluginIds: isEnabled
              ? state.enabledPluginIds.filter((pid) => pid !== id)
              : [...state.enabledPluginIds, id],
          };
        }),
    }),
    {
      name: "office-state",
      // Only persist settings, skip server instance
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        customPlugins: state.customPlugins,
        enabledPluginIds: state.enabledPluginIds,
      }),
    },
  ),
);

/**
 * Hook to get the resolved language (reactive).
 * When language setting is "auto", returns the detected browser language.
 * Re-renders automatically when language setting changes.
 */
export function useResolvedLanguage(): Locale {
  return useAppStore((state) => resolveLanguage(state.language));
}
