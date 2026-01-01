export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  officialUrl: string;
  image: string;
  marketPrice: number;
  ourPrice: number;
  category: 'report' | 'account' | 'ott';
};

export type ComboTool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tools: string[];
  image: string;
  marketPrice: number;
  ourPrice: number;
};
