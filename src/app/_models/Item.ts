export interface Item {
  timeCode: string;
  resource: string;
  subject: string;
  responsible: string;
  type: string;
  status: 'available' | 'removed';
}
