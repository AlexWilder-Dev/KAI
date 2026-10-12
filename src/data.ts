export const VENUE = {
  name: 'KAI',
  street: "4 St Martin's Square",
  city: 'Leicester',
  postcode: 'LE1 5DF',
  area: 'The Lanes',
  phone: '0116 262 1400',
  phoneHref: 'tel:+441162621400',
  email: 'eat@kai.kitchen',
  instagram: 'https://www.instagram.com/eat.kai/',
  handle: '@eat.kai',
  hashtag: '#KaiPancakes',
  hashtagUrl: 'https://www.instagram.com/explore/tags/kaipancakes/',
  deliveroo: 'https://deliveroo.co.uk/menu/leicester/leicester-city-centre/kai-lei',
  directions:
    'https://www.google.com/maps/search/?api=1&query=KAI+Leicester&query_place_id=ChIJhSxQX3Jhd0gRd57OFB2Qbng',
};

export const LINES = {
  about: 'All-day brunch in Leicester. The best American pancakes served with organic coffee & tea.',
  signOff: 'Eat Well',
};

export const RATINGS = {
  google: { score: '4.4', count: 922 },
  deliveroo: { score: '4.7', count: 211 },
};

export const REVIEWS = [
  {
    quote: 'KAI is seriously one of the best places to eat in Leicester.',
    who: 'Adriane Kingh',
    source: 'from kai.kitchen',
  },
  { quote: 'KAI is my absolute favourite brunch spot in the entire of Leicester!', who: 'Google review', source: '' },
  { quote: 'Portion sizes are hearty and the staff are soooo attentive and kind.', who: 'Google review', source: '' },
];

export type Dish = {
  id: string;
  name: string;
  desc?: string;
  price: number;
  vegan?: boolean;
  img?: string;
  /** width / height of the photo crop */
  aspect?: number;
  toppings?: string[];
};

export const SWEET: Dish[] = [
  {
    id: 'strawberry',
    name: 'Strawberries & hazelnut chocolate',
    desc: 'Strawberries & hazelnut chocolate sauce',
    price: 11.5,
    img: 'strawberry-choc',
    aspect: 4 / 3,
    toppings: ['Strawberries', 'Hazelnut chocolate sauce'],
  },
  {
    id: 'pb-banana',
    name: 'Peanut butter & banana',
    price: 11.5,
    img: 'pb-banana',
    aspect: 4 / 3,
    toppings: ['Peanut butter', 'Banana'],
  },
  {
    id: 'biscoff',
    name: 'Biscoff',
    desc: 'Biscoff spread, crumb and biscuit',
    price: 12,
    img: 'biscoff',
    aspect: 4 / 3,
    toppings: ['Biscoff spread', 'Crumb', 'Biscuit'],
  },
  {
    id: 'greek-yogurt',
    name: 'Greek yogurt & granola',
    desc: 'Greek yogurt, granola, strawberries, cinnamon, maple syrup',
    price: 12.5,
    img: 'greek-yogurt',
    aspect: 4 / 3,
    toppings: ['Greek yogurt', 'Granola', 'Strawberries', 'Cinnamon', 'Maple syrup'],
  },
];

export const SAVOURY: Dish[] = [
  {
    id: 'bacon-maple',
    name: 'Streaky bacon & maple',
    desc: 'Streaky smoked bacon & maple syrup',
    price: 12,
    img: 'bacon-maple',
    aspect: 4 / 3,
    toppings: ['Streaky smoked bacon', 'Maple syrup'],
  },
  {
    id: 'red-leicester',
    name: 'Red Leicester, bacon & onion',
    desc: 'Red Leicester cheese, bacon, onion & maple syrup',
    price: 13,
    img: 'red-leicester',
    aspect: 360 / 190,
    toppings: ['Red Leicester', 'Bacon', 'Onion', 'Maple syrup'],
  },
  {
    id: 'breakfast-stack',
    name: 'The Breakfast Stack',
    desc: 'Sausage with melted Red Leicester between three pancakes, two potato roasties, maple syrup, fried egg, chives',
    price: 14,
    img: 'breakfast-stack',
    aspect: 4 / 3,
    toppings: ['Sausage', 'Red Leicester', 'Roasties', 'Fried egg', 'Chives', 'Maple syrup'],
  },
  {
    id: 'salmon-avo',
    name: 'Smoked salmon & avocado',
    desc: 'Smoked salmon, smashed avocado, lemon crème fraîche, olive oil, micro cress',
    price: 13,
    img: 'salmon-avo',
    aspect: 4 / 3,
    toppings: ['Smoked salmon', 'Smashed avocado', 'Lemon crème fraîche', 'Olive oil', 'Micro cress'],
  },
];

export const BRUNCH: Dish[] = [
  { id: 'royale', name: 'Royale', desc: 'Smoked salmon, eggs, homemade hollandaise', price: 13 },
  { id: 'benedict', name: 'Eggs Benedict', desc: 'Streaky smoked bacon, eggs, homemade hollandaise', price: 12 },
  { id: 'florentine', name: 'Florentine', desc: 'Spinach, eggs, homemade hollandaise', price: 11.5 },
  { id: 'avo-poached', name: 'Smashed avocado with poached eggs', desc: 'Chilli, coriander, lime', price: 12.25 },
  { id: 'avo-tofu', name: 'Smashed avocado with scrambled sriracha tofu', price: 12.25 },
  { id: 'avo', name: 'Smashed avocado on sourdough', desc: 'Lime, chilli, coriander', price: 10.75 },
  {
    id: 'vegan-benedict',
    name: 'Vegan Benedict',
    desc: 'Plant sausages, no-egg omelette, cashew hollandaise, micro cress, seeds',
    price: 12.5,
    vegan: true,
  },
];

export const TOTS_PRICE = 6;
export const TOTS: Dish[] = [
  {
    id: 'tater',
    name: 'Tater Tots',
    desc: 'Red Leicester and Cheddar, sriracha, spring onion',
    price: 6,
    img: 'tater-tots',
  },
  { id: 'tarty', name: 'Tarty Tots', desc: 'Red Leicester, bacon, caramelised red onion', price: 6, img: 'tarty-tots' },
  { id: 'mac', name: 'Bacon mac & cheese tots', price: 6 },
];

export const SIDES: Dish[] = [
  { id: 'halloumi', name: 'Grilled halloumi', price: 4 },
  { id: 'side-avo', name: 'Smashed avocado', price: 4 },
  { id: 'side-tofu', name: 'Sriracha tofu', price: 4 },
  { id: 'side-scrambled', name: 'Scrambled eggs', price: 4.5 },
  { id: 'side-bacon', name: 'Smoked streaky bacon', price: 4.5 },
  { id: 'side-salmon', name: 'Smoked salmon', price: 4.5 },
  { id: 'side-poached', name: 'Poached egg', price: 2 },
  { id: 'side-strawberries', name: 'Strawberries', price: 2 },
  { id: 'side-banana', name: 'Banana', price: 2 },
  { id: 'side-maple', name: 'Maple syrup', price: 2 },
  { id: 'side-choc', name: 'Chocolate sauce', price: 2 },
  { id: 'side-hazel', name: 'Hazelnut chocolate sauce', price: 2 },
  { id: 'side-biscoff', name: 'Biscoff spread', price: 2 },
];

export const SOFT_DRINKS = {
  price: 2.5,
  items: ['Coca-Cola', 'Diet Coke', 'San Pellegrino Blood Orange', 'San Pellegrino Lemon', 'Sparkling or still water'],
};
export const LEMONADE: Dish = { id: 'lemonade', name: 'Franklin raspberry lemonade', price: 3 };

/** Served, but no prices in our data: names only. */
export const OTHER_DRINKS = [
  'Organic coffee',
  'Organic tea',
  'Mocha',
  'Hot chocolate',
  'Iced matcha',
  'Juices',
  'Breakfast cocktails, including a Bloody Mary',
];

export const price = (n: number) => `£${n.toFixed(2)}`;

export const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}.jpg`;
export const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;
