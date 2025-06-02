import styles from './page.module.css';
import { Logo } from '@components/Logo';
import { VDOTForm } from '@components/VDOTForm';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo />
        <VDOTForm />
      </main>
    </div>
  );
}
