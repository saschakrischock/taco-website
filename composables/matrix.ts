import { onMounted, onUnmounted } from 'vue';

export const useMatrixText = () => {
  // Characters to use in the scramble effect - only using characters of similar width
  const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>[]{}|=+-';
  
  // Store active animations to clean them up
  const activeAnimations = new Map<HTMLElement, number>();
  let observer: IntersectionObserver | null = null;

  // Get a random character from the matrixChars string
  const getRandomChar = (isSpace: boolean) => {
    if (isSpace) return ' '; // Preserve spaces
    return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
  };

  // Function to start the animation for a single element
  const animateElement = (element: HTMLElement) => {
    const originalText = element.getAttribute('data-original-text') || element.textContent || '';
    const duration = 800;
    const frameInterval = 1000 / 24; // 24 fps
    const totalFrames = Math.floor(duration / frameInterval);
    let currentFrame = 0;

    // Clear any existing animation before starting a new one
    if (activeAnimations.has(element)) {
      window.clearTimeout(activeAnimations.get(element));
      activeAnimations.delete(element);
    }

    // Create array of indices that haven't been "solved" yet
    const textMap = Array.from(originalText).map(char => ({
      char,
      isSpace: char === ' ',
      isSolved: false
    }));

    const animate = () => {
      if (currentFrame >= totalFrames) {
        element.textContent = originalText;
        activeAnimations.delete(element);
        return;
      }

      // Calculate how many characters should be "solved" by this frame
      const unsolved = textMap.filter(char => !char.isSolved && !char.isSpace).length;
      const solveRate = Math.ceil(unsolved / (totalFrames - currentFrame));

      // Create current text with mix of solved and scrambled characters
      let newText = textMap.map(charInfo => {
        if (charInfo.isSolved || charInfo.isSpace) {
          return charInfo.char;
        }
        return getRandomChar(charInfo.isSpace);
      }).join('');

      // Solve some characters permanently
      let solvedThisFrame = 0;
      textMap.forEach(charInfo => {
        if (!charInfo.isSolved && !charInfo.isSpace && solvedThisFrame < solveRate) {
          if (Math.random() < (solveRate / unsolved)) {
            charInfo.isSolved = true;
            solvedThisFrame++;
          }
        }
      });

      element.textContent = newText;
      currentFrame++;

      if (currentFrame < totalFrames) {
        const timerId = window.setTimeout(animate, frameInterval);
        activeAnimations.set(element, timerId);
      } else {
        element.textContent = originalText;
        activeAnimations.delete(element);
      }
    };

    // Start animation
    currentFrame = 0;
    animate();
  };

  // Cleanup function to stop all animations and disconnect observer
  const cleanup = () => {
    // Clear all active animations
    activeAnimations.forEach((timerId, element) => {
      window.clearTimeout(timerId);
      const originalText = element.getAttribute('data-original-text');
      if (originalText !== null) {
        element.textContent = originalText;
      }
    });
    activeAnimations.clear();

    // Disconnect observer
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  // Setup intersection observer and apply animation
  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target instanceof HTMLElement) {
          if (entry.isIntersecting) {
            animateElement(entry.target);
          } else {
            const originalText = entry.target.getAttribute('data-original-text');
            if (originalText !== null) {
              entry.target.textContent = originalText;
              // Clear any ongoing animation
              if (activeAnimations.has(entry.target)) {
                window.clearTimeout(activeAnimations.get(entry.target));
                activeAnimations.delete(entry.target);
              }
            }
          }
        }
      });
    }, {
      threshold: 0.5
    });

    // Observe all elements with mono-text class
    document.querySelectorAll('.mono-text').forEach(el => {
      if (!el.hasAttribute('data-original-text')) {
        el.setAttribute('data-original-text', el.textContent || '');
      }
      observer?.observe(el);
    });
  });

  // Cleanup on component unmount
  onUnmounted(cleanup);

  return {
    cleanup // Export cleanup function in case manual cleanup is needed
  };
};