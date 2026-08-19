import styles from './ProgressBar.module.css';

function ProgressBar({
  value = 0,
  label,
  showValue = true,
}) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.wrapper}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && (
            <span className={styles.label}>
              {label}
            </span>
          )}

          {showValue && (
            <span className={styles.value}>
              {progress}%
            </span>
          )}
        </div>
      )}

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={label || 'Progreso'}
      >
        <div
          className={styles.fill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;