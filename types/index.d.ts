interface FrontMatterContent {
  attributes: any;
  body: string;
  vue: any;
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

declare module "*.jpg" {
  const urlOrBase64: string;
  export default urlOrBase64;
}
