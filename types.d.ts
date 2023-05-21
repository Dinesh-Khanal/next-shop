interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  images?: string[];
  category: string;
}

interface ICategory {
  _id?: string;
  name: string;
}

interface IParams {
  id: string;
}
