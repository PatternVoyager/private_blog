import ArticlesClient from './ArticlesClient';

export const metadata = {
  title: 'Articles',
  description:
    'Read articles about web development, reverse engineering, and programming by Muhammad Azmi Fatani.',
  openGraph: {
    title: 'Articles | Muhammad Azmi Fatani',
    description:
      'Read articles about web development, reverse engineering, and programming.',
    url: 'https://azmiofficial.my.id/articles',
  },
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
