import { useState } from 'react';

import styles from './SafeImage.module.css';

function SafeImage({ src, fallback, alt = '', className = '', ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className || styles.image}
      onError={() => {
        if (fallback && currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}

export default SafeImage;
