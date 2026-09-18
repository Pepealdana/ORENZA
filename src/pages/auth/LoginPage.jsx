import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import Button from '../../components/ui/Button/Button';
import styles from './AuthPage.module.css';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.brand}><img src={orenzaLogo} alt="ORENZA" /></div>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Tu espacio personal</p>
          <h1 id="login-title" className={styles.title}>Iniciar sesión</h1>
          <p className={styles.description}>Continúa tu recorrido de autoconocimiento y desarrollo socioemocional.</p>
        </header>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <label className={styles.field}>
            <span className={styles.label}>Correo electrónico</span>
            <span className={styles.inputWrap}>
              <Mail className={styles.inputIcon} size={19} aria-hidden="true" />
              <input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" />
            </span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Contraseña</span>
            <span className={styles.inputWrap}>
              <LockKeyhole className={styles.inputIcon} size={19} aria-hidden="true" />
              <input className={`${styles.input} ${styles.hasToggle}`} type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" autoComplete="current-password" />
              <button type="button" className={styles.passwordButton} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          <div className={styles.options}><Link className={styles.link} to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link></div>
          <Button type="submit" className={styles.submit}>Ingresar</Button>
        </form>
        <p className={styles.footer}>¿Aún no tienes una cuenta?<Link className={styles.link} to="/registro">Crear cuenta</Link></p>
      </section>
    </main>
  );
}
export default LoginPage;
