export default function beamAngleTextColour(beam: number) {
  let percent = 0;

  if (beam < 29) percent = 100;
  else if (beam > 49) percent = 0;
  else {
    percent = Math.floor(100 - (100 / 21) * (beam - 29));
  }
  return `hsla(0, 0%, ${percent}%, 1)`;
}
