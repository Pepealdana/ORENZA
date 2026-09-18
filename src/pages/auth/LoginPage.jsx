import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import IdentityVisual from '../../components/visual/IdentityVisual';
import Button from '../../components/ui/Button/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPage.module.css';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const valid = Boolean(email.trim() && password.length >= 8);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setError('');

    if (!valid) return;

    setLoading(true);

    try {
      const user = await login({ email: email.trim(), password });
      const destinationByRole = {
        student: '/estudiante/inicio',
        counselor: '/orientador',
        admin: '/administrador',
        teacher: '/',
      };
      const destination = location.state?.from?.pathname || destinationByRole[user.role] || '/';
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'No fue posible iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.brand}><img src={orenzaLogo} alt="ORENZA" /></div>
        <IdentityVisual variant="historia" />
        <header className={styles.header}>
          <p className={styles.eyebrow}>Tu espacio personal</p>
          <h1 id="login-title" className={styles.title}>Iniciar sesión</h1>
          <p className={styles.description}>Continúa tu recorrido de autoconocimiento y desarrollo socioemocional.</p>
        </header>

        {submitted && !valid && (
          <div className={styles.alert} role="alert">
            <AlertCircle size={18} />
            <span>Revisa tu correo y asegúrate de que la contraseña tenga al menos 8 caracteres.</span>
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
            <span className={styles.label}>Correo electrónico</span>
            <span className={styles.inputWrap}>
              <Mail className={styles.inputIcon} size={19} />
              <input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required aria-invalid={submitted && !email.trim()} />
            </span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Contraseña</span>
            <span className={styles.inputWrap}>
              <LockKeyhole className={styles.inputIcon} size={19} />
              <input className={styles.input + ' ' + styles.hasToggle} type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required minLength={8} aria-invalid={submitted && password.length < 8} />
              <button type="button" className={styles.passwordButton} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <div className={styles.options}>
            <Link className={styles.link} to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
          </div>

          <Button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </Button>
        </form>

        <p className={styles.footer}>¿Aún no tienes una cuenta?<Link className={styles.link} to="/registro">Crear cuenta</Link></p>
      </section>
    </main>
  );
}

export default LoginPage;
