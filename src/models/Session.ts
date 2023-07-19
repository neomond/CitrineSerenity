import {Category} from './Category';

export interface Session {
  _id: string;
  title: string;
  categories: Category[];
  duration: string;
  imageUrl: string;
}