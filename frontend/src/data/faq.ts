export interface FaqItem {
  question: string;
  answer: string;
}

// On exporte une fonction qui prend le traducteur `t` en argument
export const getFaqData = (t: any): FaqItem[] => [
  {
    question: t('items.0.question'),
    answer: t('items.0.answer'),
  },
  {
    question: t('items.1.question'),
    answer: t('items.1.answer'),
  },
  {
    question: t('items.2.question'),
    answer: t('items.2.answer'),
  },
];