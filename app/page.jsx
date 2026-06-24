import HomeClient from './HomeClient';

export const metadata = {
  title: 'Muhammad Azmi Fatani | Web Developer & Reverse Engineer',
  description:
    'Junior Web Developer & Senior Reverse Engineer specializing in React, Next.js, and low-level systems. Crafting digital experiences with clean code.',
  openGraph: {
    title: 'Muhammad Azmi Fatani | Web Developer & Reverse Engineer',
    description:
      'Junior Web Developer & Senior Reverse Engineer. Crafting digital experiences with clean code.',
    url: 'https://azmiofficial.my.id',
  },
  twitter: {
    title: 'Muhammad Azmi Fatani',
    description:
      'Junior Web Developer & Senior Reverse Engineer.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
