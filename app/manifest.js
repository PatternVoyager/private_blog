export default function manifest() {
  return {
    name: 'AzmiFatani - Muhammad Azmi Fatani',
    short_name: 'AzmiFatani',
    description:
      'Personal portfolio of Muhammad Azmi Fatani — Junior Web Developer & Senior Reverse Engineer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059862',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '256x256',
        type: 'image/x-icon',
      },
    ],
  };
}
