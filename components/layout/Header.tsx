import React from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css'; 

const Header: React.FC = () => {
  const router = useRouter(); 
  
  return (
    <header className="header">
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.link} ${router.pathname === '/' ? styles.active : ''}`}>
          Table
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
