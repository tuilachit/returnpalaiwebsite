export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  title: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}