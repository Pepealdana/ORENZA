import styles from './Button.module.css';

function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;