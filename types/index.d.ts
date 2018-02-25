interface FrontMatterContent {
  attributes: any;
  body: string;
}

type AvailableLocale = "en" | "ja";

declare module "*.md" {
  const content: FrontMatterContent;
  export default content;
}

declare module "*.yaml" {
  const yamlToJsonToObject: any;
  export default yamlToJsonToObject;
}
