import { Logo } from '@components/Logo';
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo />
        <h1>About Me & This Project</h1>
        
        <section>
          <h2>My Running Journey</h2>
          <p>
            As a passionate amateur runner, I&apos;ve experienced firsthand the challenges of balancing training, nutrition, and life commitments. 
            Running isn&apos;t just a hobby for me—it&apos;s a lifestyle that requires careful planning and dedication.
          </p>
        </section>

        <section>
          <h2>Why This Website Exists</h2>
          <p>
            This platform was born from my own need for better training organization and optimization. 
            It&apos;s a collection of tools and resources that I&apos;ve developed to make my running journey more efficient and enjoyable.
          </p>
          <p>
            Whether you&apos;re training for your first 5K or preparing for a marathon, these tools are designed to help you:
          </p>
          <ol>
            <li>Calculate optimal training paces based on your current fitness level</li>
            <li>Plan your weekly training schedule effectively</li>
            <li>Track your progress and adjust your training accordingly</li>
            <li>Balance training with proper nutrition and recovery</li>
          </ol>
        </section>

        <section>
          <h2>My Mission</h2>
          <p>
            My goal is to share these tools with fellow runners who, like me, are constantly seeking ways to improve their training 
            while maintaining a balanced lifestyle. I believe that with the right tools and knowledge, every runner can achieve their 
            goals more efficiently and enjoyably.
          </p>
        </section>
      </main>
    </div>
  );
}
