import { Cafe } from '../sections/Cafe';
import { Deliveroo } from '../sections/Deliveroo';
import { FindUs } from '../sections/FindUs';
import { Hero } from '../sections/Hero';
import { Picker } from '../sections/Picker';
import { Reviews } from '../sections/Reviews';
import { Sourdough } from '../sections/Sourdough';
import { Tots } from '../sections/Tots';

export function Home() {
  return (
    <>
      <Hero />
      <Picker />
      <Sourdough />
      <Tots />
      <Cafe />
      <Reviews />
      <Deliveroo />
      <FindUs />
    </>
  );
}
