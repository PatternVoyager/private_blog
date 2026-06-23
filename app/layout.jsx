import Link from 'next/link';
import './globals.css';

export default function RootLayout ({children}) {
    return (
        <html lang="en">
            <body>
                <div className="navbar">
                    <nav>
                        <ul>
                            <li><Link href="/">home</Link></li>
                            <li><Link href="/about_me">about me</Link></li>
                            <li><Link href="/articles">articles</Link></li>
                            <li><Link href="/portfolio">portfolio</Link></li>
                        </ul>
                    </nav>
                </div>
                <main>{children}</main>
            </body>
        </html>
    )
}
