interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

interface ICategory {
  _id: string;
  name: string;
}
