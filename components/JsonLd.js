const SITE_URL = 'https://azmiofficial.my.id';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Azmi Fatani',
    url: SITE_URL,
    jobTitle: 'Junior Web Developer & Senior Reverse Engineer',
    knowsAbout: ['Web Development', 'Reverse Engineering', 'React', 'Next.js', 'Cybersecurity'],
    sameAs: [
      'https://github.com/azmifatani',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AzmiFatani',
    url: SITE_URL,
    description: 'Personal portfolio of Muhammad Azmi Fatani — Junior Web Developer & Senior Reverse Engineer.',
    author: {
      '@type': 'Person',
      name: 'Muhammad Azmi Fatani',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
