import React from 'react';

export default function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === 'Escape') {
        callback()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])
}
