import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Portfolio',
  description:
    'Explore projects built by Muhammad Azmi Fatani — web applications, tools, and reverse engineering projects.',
  openGraph: {
    title: 'Portfolio | Muhammad Azmi Fatani',
    description:
      'Explore projects built by Muhammad Azmi Fatani — web applications, tools, and reverse engineering.',
    url: 'https://azmiofficial.my.id/portfolio',
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
