
export class Product {

   _id:string;
  productImage: string;
  productTitle: string;
  productPrice: number;
  category:string;
  description: string;


  constructor(title: string, price: number, description: string, image: string, category: string, _id: string) {
    this._id = _id;
    this.productTitle = title;
    this.productPrice = price;
    this.description = description;
    this.productImage = image;
    this.category = category;
  }

}
