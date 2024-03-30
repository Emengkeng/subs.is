import { format, isToday } from 'date-fns';

export const formatDate = (date: string): string => {
  if (!date) return '';
  if (isToday(new Date(date))) {
    return 'Today';
  }
  return format(new Date(date), 'dd MMM yyyy');
};

export const isWithInSevenDays = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const diffTime = Math.abs(date.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};
