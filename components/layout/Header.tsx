import React from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router'; // Import useRouter hook
import styles from '@/styles/Header.module.css'; 

const Header: React.FC = () => {
  const router = useRouter(); // Get the current route
  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.link} ${router.pathname === '/' ? styles.active : ''}`}>
          Home
        </Link>
        <Link href="/convert" className={`${styles.link} ${router.pathname === '/convert' ? styles.active : ''}`}>
          Convert
        </Link>
        <Link href="/chart" className={`${styles.link} ${router.pathname === '/chart' ? styles.active : ''}`}>
          Chart
        </Link>
      </nav>
    </header>
  );
};

export default Header;
