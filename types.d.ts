interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  images?: string[];
  category: string;
}
interface IProperty {
  name: string;
  value: string;
}
interface ICategory {
  _id?: string;
  name: string;
  parentName?: string;
  properties?: IProperty[];
}

interface IParams {
  id: string;
}
