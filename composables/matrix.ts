import { onMounted, onUnmounted } from 'vue';

export const useMatrixText = () => {
  const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#&*<>|=+-';
  const activeAnimations = new Map<HTMLElement, number>();
  let observer: IntersectionObserver | null = null;

  const getRandomChar = (isSpace: boolean) => {
    if (isSpace) return ' ';
    return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
  };

  const animateElement = (element: HTMLElement) => {
    const originalText = element.getAttribute('data-original-text') || element.textContent || '';
    const duration = 1000; // Fixed 2 second duration
    const frameInterval = 1000 / 24; // 24 fps
    const totalFrames = Math.floor(duration / frameInterval);
    let currentFrame = 0;

    if (activeAnimations.has(element)) {
      window.clearTimeout(activeAnimations.get(element));
      activeAnimations.delete(element);
    }

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

      // Ensure animation runs for full duration by scaling solve rate
      const progressRatio = currentFrame / totalFrames;
      const shouldSolveAny = progressRatio > 0.7; // Start solving after 70% of animation
      
      // Create current text with mix of solved and scrambled characters
      let newText = textMap.map(charInfo => {
        if (charInfo.isSolved || charInfo.isSpace) {
          return charInfo.char;
        }
        return getRandomChar(charInfo.isSpace);
      }).join('');

      // Only start solving characters in the last 30% of the animation
      if (shouldSolveAny) {
        const remainingFrames = totalFrames - currentFrame;
        const unsolvedChars = textMap.filter(char => !char.isSolved && !char.isSpace);
        const solveRate = Math.ceil(unsolvedChars.length / remainingFrames);

        let solvedThisFrame = 0;
        textMap.forEach(charInfo => {
          if (!charInfo.isSolved && !charInfo.isSpace && solvedThisFrame < solveRate) {
            if (Math.random() < 0.3) { // Randomize solving to make it look more natural
              charInfo.isSolved = true;
              solvedThisFrame++;
            }
          }
        });
      }

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

    currentFrame = 0;
    animate();
  };

  const cleanup = () => {
    activeAnimations.forEach((timerId, element) => {
      window.clearTimeout(timerId);
      const originalText = element.getAttribute('data-original-text');
      if (originalText !== null) {
        element.textContent = originalText;
      }
    });
    activeAnimations.clear();

    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

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

    document.querySelectorAll('.mono-text').forEach(el => {
      if (!el.hasAttribute('data-original-text')) {
        el.setAttribute('data-original-text', el.textContent || '');
      }
      observer?.observe(el);
    });
  });

  onUnmounted(cleanup);

  return {
    cleanup
  };
};