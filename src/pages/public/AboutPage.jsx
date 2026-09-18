import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, Route, Sparkles } from 'lucide-react';

import orenzaLogo from '../../assets/orenza_logo.png';
import styles from './AboutPage.module.css';
import inicioIllustration from '../../assets/illustrations/inicio.svg';

function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.back} to="/"><ArrowLeft size={17} /> Volver</Link>
        <img src={orenzaLogo} alt="ORENZA" />
        <p>Una herramienta digital de acompañamiento socioemocional.</p>
      </header>

      <div className={styles.heroVisual}><img src={inicioIllustration} alt="" aria-hidden="true" /></div>

      <section className={styles.intro}>
        <p className={styles.eyebrow}>Conocer ORENZA</p>
        <h1>Un espacio para conocerte mejor</h1>
        <p>
          ORENZA propone una experiencia centrada en el autoconocimiento, el desarrollo socioemocional, el acompañamiento y el crecimiento personal.
        </p>
      </section>

      <section className={styles.grid}>
        <article><span><Heart /></span><h2>¿Qué es?</h2><p>Una herramienta digital de acompañamiento socioemocional orientada al desarrollo personal de los estudiantes.</p></article>
        <article><span><Sparkles /></span><h2>¿Para qué sirve?</h2><p>Para favorecer el autoconocimiento y fortalecer competencias socioemocionales.</p></article>
        <article><span><BookOpen /></span><h2>¿Cómo funciona?</h2><p>A través de actividades, recursos y espacios de reflexión para reconocer emociones y capacidades.</p></article>
        <article><span><Route /></span><h2>Tu proceso</h2><p>El recorrido se construye progresivamente y cada estudiante puede decidir dónde continuar.</p></article>
      </section>

      <div className={styles.footer}><Link className={styles.cta} to="/registro">Comenzar mi recorrido</Link></div>
    </main>
  );
}
export default AboutPage;
