import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import registerIllustration from '../../assets/illustrations/register-illustration.svg';
import Button from '../../components/ui/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPage.module.css';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requirements = useMemo(() => ({
    length: password.length >= 8,
    letter: /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(password),
    number: /\d/.test(password),
  }), [password]);

  const canSubmit = Boolean(name.trim() && email.trim() && Object.values(requirements).every(Boolean) && accepted);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setError('');

    if (!canSubmit) return;

    setLoading(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate('/estudiante/inicio', { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'No fue posible crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="register-title">
        <div className={styles.brand}><img src={orenzaLogo} alt="ORENZA" /></div>
        <div className={styles.illustration}><img src={registerIllustration} alt="" aria-hidden="true" /></div>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Comienza tu recorrido</p>
          <h1 id="register-title" className={styles.title}>Crear cuenta</h1>
          <p className={styles.description}>Regístrate para guardar tus experiencias y reconocer tu propio proceso.</p>
        </header>

        {submitted && !canSubmit && (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} />
            <span>Completa tu nombre, correo, contraseña y aceptación de las condiciones.</span>
          </div>
        )}

        {error && (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>Nombre</span>
            <span className={styles.inputWrap}>
              <UserRound className={styles.inputIcon} size={19} />
              <input className={styles.input} type="text" placeholder="Tu nombre" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
            </span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Correo electrónico</span>
            <span className={styles.inputWrap}>
              <Mail className={styles.inputIcon} size={19} />
              <input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Contraseña</span>
            <span className={styles.inputWrap}>
              <LockKeyhole className={styles.inputIcon} size={19} />
              <input className={styles.input + ' ' + styles.hasToggle} type={showPassword ? 'text' : 'password'} placeholder="Crea una contraseña segura" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
              <button type="button" className={styles.passwordButton} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <div className={styles.requirements} aria-label="Requisitos de contraseña">
            <p>La contraseña debe tener:</p>
            <span className={requirements.length ? styles.valid : ''}><Check size={14} />Al menos 8 caracteres</span>
            <span className={requirements.letter ? styles.valid : ''}><Check size={14} />Al menos una letra</span>
            <span className={requirements.number ? styles.valid : ''}><Check size={14} />Al menos un número</span>
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} required />
            <span>Acepto el uso responsable de la plataforma y sus condiciones de acceso.</span>
          </label>

          <Button type="submit" className={styles.submit} disabled={loading || !canSubmit}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </Button>
        </form>

        <p className={styles.footer}>¿Ya tienes una cuenta?<Link className={styles.link} to="/login">Iniciar sesión</Link></p>
      </section>
    </main>
  );
}

export default RegisterPage;
