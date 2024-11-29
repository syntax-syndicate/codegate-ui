export type Prompt = {
  id: string;
  text: string;
  date: string;
  tags: string[];
  packages: string[];
  conversations?: { q: string; a: string }[];
};
