export const useMatrixText = () => {
    // Characters to use in the scramble effect - only using characters of similar width
    // Note: We keep only monospace-friendly characters and preserve space
    const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>[]{}|=+-';
    
    // Get a random character from the matrixChars string
    const getRandomChar = (isSpace: boolean) => {
      if (isSpace) return ' '; // Preserve spaces
      return matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    };
  
    // Function to start the animation for a single element
    const animateElement = (element: HTMLElement) => {
      const originalText = element.textContent || '';
      const duration = 800;
      const frameInterval = 1000 / 24; // 24 fps
      const totalFrames = Math.floor(duration / frameInterval);
      let currentFrame = 0;
      let animationTimer: number | null = null;
  
      // Create array of indices that haven't been "solved" yet
      // We'll track which positions are spaces separately
      const textMap = Array.from(originalText).map(char => ({
        char,
        isSpace: char === ' ',
        isSolved: false
      }));
  
      const animate = () => {
        if (currentFrame >= totalFrames) {
          element.textContent = originalText;
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
          animationTimer = window.setTimeout(animate, frameInterval);
        } else {
          element.textContent = originalText;
        }
      };
  
      // Clear any existing animation before starting a new one
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
  
      // Reset animation state
      currentFrame = 0;
      animate();
    };
  
    // Setup intersection observer and apply animation
    onMounted(() => {
      // Add monospace font style to ensure consistent character width
    
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target instanceof HTMLElement) {
            if (entry.isIntersecting) {
              animateElement(entry.target);
            } else {
              const originalText = entry.target.getAttribute('data-original-text');
              if (originalText !== null) {
                entry.target.textContent = originalText;
              }
            }
          }
        });
      }, {
        threshold: 0.5
      });
  
      // Observe all elements with mono-text class
      document.querySelectorAll('.mono-text').forEach(el => {
        el.setAttribute('data-original-text', el.textContent || '');
        observer.observe(el);
      });
    });
  };