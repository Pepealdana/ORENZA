import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Sparkles, UserRound } from 'lucide-react';

import orenzaLogo from '../../assets/orenza_hor.png';
import inicioIllustration from '../../assets/illustrations/inicio.svg';
import styles from './SplashPage.module.css';

function SplashPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.brand}>
          <img src={orenzaLogo} alt="ORENZA" />
        </div>
        <div className={styles.heroVisual}><img src={inicioIllustration} alt="" aria-hidden="true" /></div>
        <p className={styles.eyebrow}>Acompañamiento socioemocional</p>
        <h1>Conócete. Explora. Crece.</h1>
        <p className={styles.description}>
          Un espacio digital para reconocer lo que sientes, fortalecer tus competencias y acompañar tu proceso personal.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/login">Iniciar sesión <ArrowRight size={18} /></Link>
          <Link className={styles.secondary} to="/registro">Crear cuenta</Link>
        </div>
        <Link className={styles.about} to="/conocer-orenza">Conocer ORENZA</Link>
      </section>

      <section className={styles.features} aria-label="Qué encontrarás en ORENZA">
        <article><span><HeartHandshake size={21} /></span><strong>Un espacio seguro</strong><p>Reflexiona desde tu propia experiencia.</p></article>
        <article><span><Sparkles size={21} /></span><strong>Experiencias para explorar</strong><p>Actividades y recursos para tu desarrollo.</p></article>
        <article><span><UserRound size={21} /></span><strong>Tu proceso, a tu ritmo</strong><p>Reconoce tus avances sin compararte.</p></article>
      </section>
    </main>
  );
}

export default SplashPage;
