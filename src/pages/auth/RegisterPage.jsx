import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import Button from '../../components/ui/Button/Button';
import styles from './AuthPage.module.css';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);

  const requirements = useMemo(() => ({
    length: password.length >= 8,
    letter: /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(password),
    number: /\d/.test(password),
  }), [password]);

  const canSubmit = Object.values(requirements).every(Boolean) && accepted;

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
          <label className={styles.field}><span className={styles.label}>Nombre</span><span className={styles.inputWrap}><UserRound className={styles.inputIcon} size={19} /><input className={styles.input} type="text" placeholder="Tu nombre" autoComplete="name" required /></span></label>
          <label className={styles.field}><span className={styles.label}>Correo electrónico</span><span className={styles.inputWrap}><Mail className={styles.inputIcon} size={19} /><input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" autoComplete="email" required /></span></label>
          <label className={styles.field}><span className={styles.label}>Contraseña</span><span className={styles.inputWrap}><LockKeyhole className={styles.inputIcon} size={19} /><input className={styles.input + ' ' + styles.hasToggle} type={showPassword ? 'text' : 'password'} placeholder="Crea una contraseña segura" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required /><button type="button" className={styles.passwordButton} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
          <div className={styles.requirements} aria-label="Requisitos de contraseña">
            <p>La contraseña debe tener:</p>
            <span className={requirements.length ? styles.valid : ''}><Check size={14} />Al menos 8 caracteres</span>
            <span className={requirements.letter ? styles.valid : ''}><Check size={14} />Al menos una letra</span>
            <span className={requirements.number ? styles.valid : ''}><Check size={14} />Al menos un número</span>
          </div>
          <label className={styles.checkbox}><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} required /><span>Acepto el uso responsable de la plataforma y sus condiciones de acceso.</span></label>
          <Button type="submit" className={styles.submit} disabled={!canSubmit}>Crear cuenta</Button>
        </form>
        <p className={styles.footer}>¿Ya tienes una cuenta?<Link className={styles.link} to="/login">Iniciar sesión</Link></p>
      </section>
    </main>
  );
}
export default RegisterPage;