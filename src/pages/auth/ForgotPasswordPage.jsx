import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import IdentityVisual from '../../components/visual/IdentityVisual';
import Button from '../../components/ui/Button/Button';
import styles from './AuthPage.module.css';

function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="recovery-title">
        <div className={styles.brand}><img src={orenzaLogo} alt="ORENZA" /></div>
        <IdentityVisual variant="historia" />
        <header className={styles.header}>
          <p className={styles.eyebrow}>Acceso seguro</p>
          <h1 id="recovery-title" className={styles.title}>Recuperar contraseña</h1>
          <p className={styles.description}>Escribe tu correo y te indicaremos cómo continuar con la recuperación.</p>
        </header>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <label className={styles.field}>
            <span className={styles.label}>Correo electrónico</span>
            <span className={styles.inputWrap}><Mail className={styles.inputIcon} size={19} aria-hidden="true" /><input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" /></span>
          </label>
          <Button type="submit" className={styles.submit}><KeyRound size={18} aria-hidden="true" />Continuar</Button>
        </form>
        <p className={styles.footer}><Link className={styles.link} to="/login"><ArrowLeft size={15} style={{display:'inline',verticalAlign:'-2px'}} /> Volver al inicio de sesión</Link></p>
      </section>
    </main>
  );
}
export default ForgotPasswordPage;
