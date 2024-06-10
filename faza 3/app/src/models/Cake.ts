export class CakeComment {
  rating: number;
  text: string;
  username: string;

  constructor(rating: number, text: string, username: string) {
    this.username = username;
    this.rating = rating;
    this.text = text;
  }
}

export class Cake {
  id: number;
  type: string;
  name: string;
  picture: string;
  description: string;
  price: number;
  composition: string;
  comments: CakeComment[];

  constructor(
    id: number,
    type: string,
    name: string,
    picture: string,
    description: string,
    price: number,
    composition: string,
    comments: CakeComment[]
  ) {
    this.type = type;
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.description = description;
    this.price = price;
    this.composition = composition;
    this.comments = comments;
  }
}
