import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import Button from '../../components/ui/Button/Button';
import styles from './AuthPage.module.css';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="register-title">
        <div className={styles.brand}><img src={orenzaLogo} alt="ORENZA" /></div>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Comienza tu recorrido</p>
          <h1 id="register-title" className={styles.title}>Crear cuenta</h1>
          <p className={styles.description}>Regístrate para guardar tus experiencias y reconocer tu propio proceso.</p>
        </header>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <label className={styles.field}>
            <span className={styles.label}>Nombre</span>
            <span className={styles.inputWrap}><UserRound className={styles.inputIcon} size={19} aria-hidden="true" /><input className={styles.input} type="text" placeholder="Tu nombre" autoComplete="name" /></span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Correo electrónico</span>
            <span className={styles.inputWrap}><Mail className={styles.inputIcon} size={19} aria-hidden="true" /><input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" /></span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Contraseña</span>
            <span className={styles.inputWrap}>
              <LockKeyhole className={styles.inputIcon} size={19} aria-hidden="true" />
              <input className={`${styles.input} ${styles.hasToggle}`} type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" minLength={8} autoComplete="new-password" />
              <button type="button" className={styles.passwordButton} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </span>
          </label>
          <Button type="submit" className={styles.submit}>Crear cuenta</Button>
        </form>
        <p className={styles.footer}>¿Ya tienes una cuenta?<Link className={styles.link} to="/login">Iniciar sesión</Link></p>
      </section>
    </main>
  );
}
export default RegisterPage;
