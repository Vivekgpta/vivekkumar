import web1 from "@/assets/work-web1.jpg";
import web2 from "@/assets/work-web2.jpg";
import web3 from "@/assets/work-web3.jpg";
import mag1 from "@/assets/work-mag1.jpg";
import mag2 from "@/assets/work-mag2.jpg";
import sketch1 from "@/assets/work-sketch1.jpg";
import sketch2 from "@/assets/work-sketch2.jpg";

export type WorkCategory = "Websites" | "Magazines" | "Sketches";

export interface Work {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  image: string;
}

export const works: Work[] = [
  {
    id: "saas-platform",
    title: "SaaS Landing Platform",
    description: "Modern landing page for a productivity SaaS startup, built for conversion.",
    category: "Websites",
    image: web1,
  },
  {
    id: "restaurant-site",
    title: "Restaurant Experience",
    description: "Immersive website for a local fine-dining restaurant with online reservations.",
    category: "Websites",
    image: web2,
  },
  {
    id: "boutique-store",
    title: "Boutique E-commerce",
    description: "Elegant store experience for a fashion boutique with curated collections.",
    category: "Websites",
    image: web3,
  },
  {
    id: "birthday-magazine",
    title: "Birthday Memory Magazine",
    description: "A custom 24-page keepsake magazine designed as a birthday surprise.",
    category: "Magazines",
    image: mag1,
  },
  {
    id: "college-magazine",
    title: "College Annual Magazine",
    description: "Editorial layout designed for a college fest with vibrant typography.",
    category: "Magazines",
    image: mag2,
  },
  {
    id: "portrait-male",
    title: "Hyper-Realistic Portrait",
    description: "Hand-drawn pencil portrait with detailed shading and depth.",
    category: "Sketches",
    image: sketch1,
  },
  {
    id: "portrait-child",
    title: "Childhood Portrait",
    description: "A delicate graphite portrait commissioned as a family gift.",
    category: "Sketches",
    image: sketch2,
  },
];
