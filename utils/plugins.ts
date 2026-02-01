export interface Plugin {
  id: string;
  name: string;
  description: string;
  url: string; // URL to config.json
  icon?: string;
}

export const PRESET_PLUGINS: Plugin[] = [
  {
    id: "youtube",
    name: "YouTube",
    description: "Easily embed YouTube videos into your documents.",
    url: "https://onlyoffice.github.io/sdkjs-plugins/content/youtube/config.json",
  },
  {
    id: "translator",
    name: "Translator",
    description: "Translate the selected text into other languages with Google Translate.",
    url: "https://onlyoffice.github.io/sdkjs-plugins/content/translator/config.json",
  },
  {
    id: "drawio",
    name: "Draw.io",
    description: "Create diagrams with Draw.io.",
    url: "https://onlyoffice.github.io/sdkjs-plugins/content/drawio/config.json",
  },
  {
    id: "zotero",
    name: "Zotero",
    description: "Create bibliographies with Zotero.",
    url: "https://onlyoffice.github.io/sdkjs-plugins/content/zotero/config.json",
  },
];
