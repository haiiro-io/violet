export default class Work {
  public name: string;
  public title: string;
  public year: number;
  public owner: string;
  public colors: string[];
  public description: string;
  public body: string;

  constructor (attributes: {
    name: string,
    title: string,
    year: number,
    owner: string,
    colors: string[],
    description: string,
    body: string
  }) {
    Object.assign(this, attributes);
  }
}
