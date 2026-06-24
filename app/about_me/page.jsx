import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Me',
  description:
    'Learn about Muhammad Azmi Fatani — his skills, journey, and passion for web development and reverse engineering.',
  openGraph: {
    title: 'About Me | Muhammad Azmi Fatani',
    description:
      'Learn about Muhammad Azmi Fatani — his skills, journey, and passion for web development and reverse engineering.',
    url: 'https://azmiofficial.my.id/about_me',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
