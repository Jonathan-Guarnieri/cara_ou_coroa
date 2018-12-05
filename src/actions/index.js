export function play(choice) {
  const result = ['cara','coroa'][Math.floor(Math.random()*2)];
  return {
    type: 'PLAY',
    choice,
    result,
  }
}
