import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Start Here',
      href: getPermalink('/start'),
    },
    {
      text: 'Quit Smoking',
      links: [
        { text: 'How to Quit Smoking', href: getPermalink('/quit-smoking') },
        { text: 'Quit Methods', href: getPermalink('/methods') },
        { text: 'Methods Compared', href: getPermalink('/comparisons') },
        { text: 'Quit Smoking Medications', href: getPermalink('/medications') },
        { text: 'Special Situations', href: getPermalink('/populations') },
        { text: 'Quit Timeline', href: getPermalink('/timeline') },
        { text: 'Quit Tools', href: getPermalink('/tools') },
      ],
    },
    {
      text: 'Withdrawal & Cravings',
      links: [
        { text: 'Nicotine Withdrawal', href: getPermalink('/withdrawal') },
        { text: 'Cravings', href: getPermalink('/cravings') },
        { text: 'Smoking Triggers', href: getPermalink('/triggers') },
        { text: 'Relapse & Recovery', href: getPermalink('/relapse') },
      ],
    },
    {
      text: 'Community',
      links: [
        { text: 'Real Quit Experiences', href: getPermalink('/experiences') },
        { text: 'Popular Questions', href: getPermalink('/questions') },
      ],
    },
    {
      text: 'About',
      links: [
        { text: 'Research Highlights', href: getPermalink('/research') },
        { text: 'Methodology', href: getPermalink('/methodology') },
        { text: 'Medical Disclaimer', href: getPermalink('/disclaimer') },
        { text: 'About Us', href: getPermalink('/about') },
      ],
    },
  ],
  actions: [{ text: 'Start Quitting', href: getPermalink('/start') }],
};

export const footerData = {
  links: [
    {
      title: 'Quit Smoking',
      links: [
        { text: 'Start Here', href: getPermalink('/start') },
        { text: 'How to Quit Smoking', href: getPermalink('/quit-smoking') },
        { text: 'Quit Methods', href: getPermalink('/methods') },
        { text: 'Methods Compared', href: getPermalink('/comparisons') },
        { text: 'Special Situations', href: getPermalink('/populations') },
        { text: 'Quit Timeline', href: getPermalink('/timeline') },
      ],
    },
    {
      title: 'Withdrawal & Cravings',
      links: [
        { text: 'Nicotine Withdrawal', href: getPermalink('/withdrawal') },
        { text: 'Cravings', href: getPermalink('/cravings') },
        { text: 'Smoking Triggers', href: getPermalink('/triggers') },
        { text: 'Relapse & Recovery', href: getPermalink('/relapse') },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'Real Quit Experiences', href: getPermalink('/experiences') },
        { text: 'Popular Questions', href: getPermalink('/questions') },
        { text: 'Quit Tools', href: getPermalink('/tools') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Data & Research Center', href: 'https://data-smokingcessation.pages.dev' },
        { text: 'Research Highlights', href: getPermalink('/research') },
        { text: 'Methodology', href: getPermalink('/methodology') },
        { text: 'Medical Disclaimer', href: getPermalink('/disclaimer') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Methodology', href: getPermalink('/methodology') },
    { text: 'Medical Disclaimer', href: getPermalink('/disclaimer') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [],
  footNote: `
    Quit Smoking Hub is an independent knowledge and experience platform. It does not provide medical advice.
    <span class="w-1.5 h-1.5 rounded-full bg-muted inline-block align-middle mx-1.5"></span>
    Community-reported experiences are de-identified and do not constitute scientific evidence.
    <span class="w-1.5 h-1.5 rounded-full bg-muted inline-block align-middle mx-1.5"></span>
    © 2026 Quit Smoking Hub. All rights reserved.
  `,
};
