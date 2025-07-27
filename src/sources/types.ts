export type BookData = {
  id: string;
  title: string;
  image: string;
  description?: string;
  authors?: string[];
  year?: string;
  printType?: string;
};

export type MyData = {
  label: string;
  data: string;
};
