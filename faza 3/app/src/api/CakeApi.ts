import cakes from "../data/cakes.json";
import { Cake } from "../models/Cake";

export class CakeApi {
  public static Cakes: Cake[] = cakes;

  // add cake to the list of cakes
  static async addCake(cake: Cake) {
    CakeApi.Cakes = [...CakeApi.Cakes, cake];
  }
}
