import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
} from 'lucide-react';

import { useState } from 'react';

import styles from './EmotionalCheckIn.module.css';

const moods = [
  {
    id: 'very-good',
    label: 'Muy bien',
    emoji: '😊',
  },
  {
    id: 'good',
    label: 'Bien',
    emoji: '🙂',
  },
  {
    id: 'neutral',
    label: 'Normal',
    emoji: '😐',
  },
  {
    id: 'not-good',
    label: 'No muy bien',
    emoji: '😕',
  },
  {
    id: 'bad',
    label: 'Mal',
    emoji: '😔',
  },
];

const emotions = [
  {
    id: 'alegria',
    label: 'Alegría',
    emoji: '😊',
  },
  {
    id: 'tranquilidad',
    label: 'Tranquilidad',
    emoji: '😌',
  },
  {
    id: 'motivacion',
    label: 'Motivación',
    emoji: '✨',
  },
  {
    id: 'preocupacion',
    label: 'Preocupación',
    emoji: '😟',
  },
  {
    id: 'frustracion',
    label: 'Frustración',
    emoji: '😤',
  },
  {
    id: 'tristeza',
    label: 'Tristeza',
    emoji: '😔',
  },
  {
    id: 'enojo',
    label: 'Enojo',
    emoji: '😠',
  },
  {
    id: 'cansancio',
    label: 'Cansancio',
    emoji: '😴',
  },
];

function EmotionalCheckIn({
  onSave,
  completed,
  todayCheckIn,
}) {
  const [step, setStep] = useState(
    completed ? 4 : 1
  );

  const [selectedMood, setSelectedMood] =
    useState(null);

  const [selectedEmotion, setSelectedEmotion] =
    useState(null);

  const [note, setNote] = useState('');

  /*
   * Busca la información completa de la emoción
   * registrada hoy para poder mostrar su emoji
   * y nombre correctamente.
   */
  const emotionData = todayCheckIn
    ? emotions.find(
        (emotion) =>
          emotion.id === todayCheckIn.emotion
      )
    : null;

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setStep(2);
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setStep(3);
  };

  const handleSubmit = () => {
    if (!selectedMood || !selectedEmotion) {
      return;
    }

    onSave({
      mood: selectedMood,
      emotion: selectedEmotion,
      note,
    });

    setStep(4);
  };

  const handleRestart = () => {
    setStep(1);
    setSelectedMood(null);
    setSelectedEmotion(null);
    setNote('');
  };

  /*
   * Pantalla mostrada cuando el estudiante
   * ya realizó su registro del día.
   */
  if (step === 4) {
    return (
      <section className={styles.card}>
        <div className={styles.completed}>

          <div className={styles.completedIcon}>
            <Check size={28} />
          </div>

          <p className={styles.eyebrow}>
            Hoy ya te escuchaste
          </p>

          <h2>
            Este momento también cuenta.
          </h2>

          {emotionData && (
            <div className={styles.todayEmotion}>
              <span className={styles.todayEmoji}>
                {emotionData.emoji}
              </span>

              <span>
                {emotionData.label}
              </span>
            </div>
          )}

          <p className={styles.description}>
            Reconocer cómo te sientes es una forma de
            conocerte mejor.
          </p>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleRestart}
          >
            Registrar otro momento
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className={styles.card}>

      {/* ========================================
          ENCABEZADO
          ======================================== */}

      <div className={styles.header}>

        <div className={styles.headerIcon}>
          <Heart size={20} />
        </div>

        <div>
          <p className={styles.eyebrow}>
            Un momento para ti
          </p>

          <h2>
            ¿Cómo estás hoy?
          </h2>
        </div>

      </div>


      {/* ========================================
          PASO 1
          ESTADO GENERAL
          ======================================== */}

      {step === 1 && (
        <>
          <p className={styles.description}>
            No hay respuestas buenas o malas. Elige lo que
            mejor represente cómo te sientes ahora.
          </p>

          <div className={styles.moods}>

            {moods.map((mood) => (
              <button
                key={mood.id}
                type="button"
                className={styles.mood}
                onClick={() =>
                  handleMoodSelect(mood)
                }
              >
                <span
                  className={styles.emoji}
                  aria-hidden="true"
                >
                  {mood.emoji}
                </span>

                <span className={styles.label}>
                  {mood.label}
                </span>
              </button>
            ))}

          </div>
        </>
      )}


      {/* ========================================
          PASO 2
          EMOCIÓN
          ======================================== */}

      {step === 2 && (
        <>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => setStep(1)}
          >
            <ArrowLeft size={17} />
            Cambiar respuesta
          </button>

          <p className={styles.description}>
            Has elegido{' '}
            <strong>
              {selectedMood.label.toLowerCase()}
            </strong>.
          </p>

          <h3 className={styles.question}>
            ¿Qué emoción se parece más a lo que sientes?
          </h3>

          <div className={styles.emotions}>

            {emotions.map((emotion) => (
              <button
                key={emotion.id}
                type="button"
                className={styles.emotion}
                onClick={() =>
                  handleEmotionSelect(emotion)
                }
              >
                <span
                  className={styles.emoji}
                  aria-hidden="true"
                >
                  {emotion.emoji}
                </span>

                <span className={styles.label}>
                  {emotion.label}
                </span>
              </button>
            ))}

          </div>
        </>
      )}


      {/* ========================================
          PASO 3
          REFLEXIÓN OPCIONAL
          ======================================== */}

      {step === 3 && (
        <>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => setStep(2)}
          >
            <ArrowLeft size={17} />
            Cambiar emoción
          </button>

          <div className={styles.selectionSummary}>

            <span>
              {selectedMood.emoji}
            </span>

            <span>
              {selectedMood.label}
            </span>

            <span className={styles.separator}>
              ·
            </span>

            <span>
              {selectedEmotion.emoji}
            </span>

            <span>
              {selectedEmotion.label}
            </span>

          </div>

          <h3 className={styles.question}>
            ¿Quieres contar un poco más?
          </h3>

          <p className={styles.description}>
            Puedes escribir algo sobre lo que estás viviendo
            o simplemente continuar. No tienes que explicar
            nada si no quieres.
          </p>

          <textarea
            className={styles.textarea}
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Escribe algo si quieres..."
            rows={4}
            maxLength={500}
          />

          <div className={styles.footer}>

            <span className={styles.optional}>
              Opcional
            </span>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleSubmit}
            >
              Guardar
              <ArrowRight size={18} />
            </button>

          </div>
        </>
      )}

    </section>
  );
}

export default EmotionalCheckIn;