import Image from 'next/image';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="VDOT Utils Logo"
      width={120}
      height={120}
      className={styles.logo}
      priority
    />
  );
} 