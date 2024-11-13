import createCache from '@emotion/cache';

// Create a cache for Emotion
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
