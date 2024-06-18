import cakes from "../data/cakes.json";
import { Cake } from "../models/Cake";

export class CakeApi {
  public Cakes: Cake[] = cakes;

  // create a singleton class
  private static instance: CakeApi;
  public static getInstance() {
    if (!CakeApi.instance) {
      CakeApi.instance = new CakeApi();
    }
    return CakeApi.instance;
  }

  // Constructor is private to prevent instantiation
  private constructor() {
    // if there is cakes saved in local storage, use them
    const cakesString = localStorage.getItem("cakes");
    if (cakesString) {
      this.Cakes = JSON.parse(cakesString);
    } else {
      // save the cakes to local storage
      localStorage.setItem("cakes", JSON.stringify(this.Cakes));
    }
  }

  // add cake to the list of cakes
  public async addCake(cake: Cake) {
    this.Cakes = [...this.Cakes, cake];
    // save the cakes to local storage
    localStorage.setItem("cakes", JSON.stringify(this.Cakes));
  }

  // update the cake
  public async updateCake(cake: Cake) {
    this.Cakes = this.Cakes.map((c) => (c.id === cake.id ? cake : c));
    // save the cakes to local storage
    localStorage.setItem("cakes", JSON.stringify(this.Cakes));
  }
}
