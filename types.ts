
export interface ManzaiLine {
  role: 'ボケ' | 'ツッコミ';
  text: string;
}

export interface ManzaiScript {
  title: string;
  lines: ManzaiLine[];
}
