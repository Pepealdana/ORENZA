import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle2, KeyRound, Mail } from 'lucide-react';
import orenzaLogo from '../../assets/orenza_logo.png';
import IdentityVisual from '../../components/visual/IdentityVisual';
import Button from '../../components/ui/Button/Button';
import { api } from '../../services/api';
import styles from './AuthPage.module.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const requestReset = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Escribe el correo de tu cuenta.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.requestPasswordReset({ email: email.trim() });
      setMessage(data.message);
      if (data.demoToken) setToken(data.demoToken);
      setRequested(true);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible solicitar la recuperación.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!token.trim()) {
      setError('Ingresa el código de recuperación.');
      return;
    }

    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmation) {
      setError('La confirmación no coincide con la nueva contraseña.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.resetPassword({
        token: token.trim(),
        newPassword,
      });
      setMessage(data.message);
      setToken('');
      setNewPassword('');
      setConfirmation('');
      setRequested(false);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible actualizar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="recovery-title">
        <div className={styles.brand}><img src={orenzaLogo} alt="ORENZA" /></div>
        <IdentityVisual variant="historia" />
        <header className={styles.header}>
          <p className={styles.eyebrow}>Acceso seguro</p>
          <h1 id="recovery-title" className={styles.title}>Recuperar contraseña</h1>
          <p className={styles.description}>
            {requested
              ? 'Usa el código de recuperación para crear una nueva contraseña.'
              : 'Solicita un código para recuperar el acceso a tu cuenta.'}
          </p>
        </header>

        {error && <div className={styles.alert} role="alert"><AlertCircle size={18} /><span>{error}</span></div>}
        {message && <div className={styles.success} role="status"><CheckCircle2 size={18} /><span>{message}</span></div>}

        {!requested ? (
          <form className={styles.form} onSubmit={requestReset} noValidate>
            <label className={styles.field}>
              <span className={styles.label}>Correo electrónico</span>
              <span className={styles.inputWrap}>
                <Mail className={styles.inputIcon} size={19} />
                <input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </span>
            </label>
            <Button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Solicitando…' : 'Solicitar recuperación'}
            </Button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={resetPassword} noValidate>
            <label className={styles.field}>
              <span className={styles.label}>Código de recuperación</span>
              <span className={styles.inputWrap}>
                <KeyRound className={styles.inputIcon} size={19} />
                <input className={styles.input} type="text" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="one-time-code" required />
              </span>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Nueva contraseña</span>
              <span className={styles.inputWrap}>
                <KeyRound className={styles.inputIcon} size={19} />
                <input className={styles.input} type="password" placeholder="Mínimo 8 caracteres" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" required minLength={8} />
              </span>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Confirmar contraseña</span>
              <span className={styles.inputWrap}>
                <KeyRound className={styles.inputIcon} size={19} />
                <input className={styles.input} type="password" placeholder="Repite la nueva contraseña" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" required minLength={8} />
              </span>
            </label>

            <Button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Actualizando…' : 'Restablecer contraseña'}
            </Button>
          </form>
        )}

        <p className={styles.footer}><Link className={styles.link} to="/login"><ArrowLeft size={15} style={{display:'inline',verticalAlign:'-2px'}} /> Volver al inicio de sesión</Link></p>
      </section>
    </main>
  );
}

export default ForgotPasswordPage;
