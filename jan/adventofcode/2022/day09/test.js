const grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  let characterPosition = [0, 0];
  
  const moveCharacter = direction => {
    switch(direction) {
      case 'left':
        characterPosition[0] -= 1;
        break;
      case 'right':
        characterPosition[0] += 1;
        break;
      case 'up':
        characterPosition[1] -= 1;
        break;
      case 'down':
        characterPosition[1] += 1;
        break;
    }
  }
  
  document.addEventListener('keydown', event => {
    switch(event.key) {
      case 'ArrowLeft':
        moveCharacter('left');
        break;
      case 'ArrowRight':
        moveCharacter('right');
        break;
      case 'ArrowUp':
        moveCharacter('up');
        break;
      case 'ArrowDown':
        moveCharacter('down');
        break;
    }
  });
  
  