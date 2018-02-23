declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.yaml" {
  const yamlToJsonToObject: any;
  export default yamlToJsonToObject;
}
