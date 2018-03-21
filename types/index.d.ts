interface FrontMatterContent {
  attributes: any;
  body: string;
}

declare var process: {
  env: {
    baseUrl:  string;
    buildLocale: "en" | "ja";
    orderedWorks: string[];
  },
  browser: boolean;
};

type AvailableLocale = "en" | "ja";

declare module "*.md" {
  const content: FrontMatterContent;
  export default content;
}

declare module "*.yaml" {
  const yamlToJsonToObject: any;
  export default yamlToJsonToObject;
}
