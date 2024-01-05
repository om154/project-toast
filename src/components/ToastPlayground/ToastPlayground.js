import React from 'react';
import Button from '../Button';
import { ToastContext, TOAST_VARIANT_OPTIONS } from '../ToastProvider'

import styles from './ToastPlayground.module.css';

const defaultVariant = TOAST_VARIANT_OPTIONS[0]

function ToastPlayground() {
  const { showToast } = React.useContext(ToastContext)
  const [variant, setVariant] = React.useState(defaultVariant)
  const [message, setMessage] = React.useState('')

  const textAreaRef = React.useRef()

  const handleFormSubmit = (event) => {
    event.preventDefault();
    showToast(variant, message)
    setMessage('')
    setVariant(defaultVariant)
    textAreaRef.current.focus();
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form className={styles.controlsWrapper} onSubmit={handleFormSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textAreaRef}
              id="message"
              className={styles.messageInput}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {TOAST_VARIANT_OPTIONS.map(option => (
              <label htmlFor={`variant-${option}`} key={option}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={variant === option}
                  onChange={e => setVariant(e.target.value)}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
