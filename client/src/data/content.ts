import sponsorRurka from "../assets/sponsor-rurka.png";
import sponsorBhindi from "../assets/sponsor-bhindi.png";
import sponsorSkyview from "../assets/sponsor-skyview.png";
import sponsorNewSmile from "../assets/sponsor-newsmile.png";
import sponsorNewIndia from "../assets/sponsor-newindia.png";

import eventGarba from "../assets/event-garba.png";
import featuredFlyer from "../assets/featured-flyer.png";

import galleryDarba from "../assets/gallery-darba.jpg";
import galleryDandaya from "../assets/gallery-dandaya.png";

import highlight1 from "../assets/highlight-1.jpg";
import highlight2 from "../assets/highlight-2.jpg";

import blogGarbaNight from "../assets/blog-garba-night.jpg";
import blogCommunity from "../assets/blog-community.jpg";
import blogHeritage from "../assets/blog-heritage.jpg";

import photo1 from "../assets/20241005_131451.jpg";
import photo2 from "../assets/20241005_172232.jpg";
import photo3 from "../assets/20241005_195142.jpg";

export interface Sponsor {
  id: number;
  images: string;
  link: string;
}

export interface EventRow {
  id: number;
  title: string;
  date?: string;
  venue?: string;
  decription?: string;
  time?: string;
  ticketlink?: string;
  Image: string;
}

export interface FeaturedEventRow {
  id: number;
  title: string;
  date: string;
  venue: string;
  decription: string;
  link: string;
  Image: string;
  createdAt?: string;
}

export interface GalleryEventRow {
  id: number;
  title: string;
  date: string;
  image: string;
  drivelink: string;
  createdAt?: string;
}

export interface GalleryImageRow {
  id: number;
  images: string;
  event: string;
}

export interface HighlightRow {
  id: number;
  image: string;
  createdAt?: string;
}

export interface PhotostackRow {
  id: number;
  image: string;
}

export interface BlogRow {
  id: number;
  title: string;
  date: string;
  author: string;
  content: unknown;
  minidescription: string;
  topics?: string;
  image: string;
  createdAt?: string;
}

export const sponsors: Sponsor[] = [
  { id: 1, images: sponsorRurka, link: "https://www.rurkahomes.com/" },
  { id: 2, images: sponsorBhindi, link: "https://www.bhindi.com/" },
  { id: 3, images: sponsorSkyview, link: "https://skyviewaviation.com/" },
  { id: 4, images: sponsorNewSmile, link: "https://www.newsmileortho.com/" },
  { id: 5, images: sponsorNewIndia, link: "https://www.newindiabazar.com/" },
];

export const events: EventRow[] = [
  {
    id: 3,
    title: "Garba",
    date: "2026-10-17",
    venue: "Mountain House",
    decription:
      "Join us for an unforgettable night of Garba and Dandiya Raas. Spin, clap, and celebrate the nine nights of Navratri with live dhol, traditional food stalls, and the whole community dressed in their festive best. All ages welcome — first-timers will pick up the steps in no time.",
    time: "7:00 PM",
    ticketlink: "https://www.example.com/tickets",
    Image: eventGarba,
  },
];

export const featuredEvents: FeaturedEventRow[] = [
  {
    id: 1,
    title: "Garba",
    date: "2026-10-17 6:00 PM",
    venue: "Mountain House High School Stadium",
    decription:
      "Our flagship Navratri celebration returns! An evening of color, rhythm, and tradition under the stadium lights — featuring a live garba circle, a dandiya showcase, and a community feast. Bring your family, bring your energy, and let's dance the night away.",
    link: "https://www.example.com/garba",
    Image: featuredFlyer,
    createdAt: "2026-01-15 12:00:00",
  },
];

export const galleryEvents: GalleryEventRow[] = [
  {
    id: 1,
    title: "Darba",
    date: "2025-09-12",
    image: galleryDarba,
    drivelink:
      "https://drive.google.com/drive/folders/19o2zu8ArmZ9m86ZJoBxh1zuJDiryWLXK",
    createdAt: "2025-09-12 01:17:49",
  },
  {
    id: 2,
    title: "Dandaya",
    date: "2025-09-05",
    image: galleryDandaya,
    drivelink: "https://drive.google.com/",
    createdAt: "2025-09-05 01:28:07",
  },
];

export const galleryImages: GalleryImageRow[] = [
  { id: 1, images: photo1, event: "Darba" },
  { id: 2, images: photo3, event: "Darba" },
  { id: 3, images: highlight1, event: "Darba" },
  { id: 4, images: photo2, event: "Dandaya" },
  { id: 5, images: blogGarbaNight, event: "Dandaya" },
];

export const oldHighlights: HighlightRow[] = [
  { id: 1, image: highlight1, createdAt: "2025-09-06 01:44:11" },
  { id: 2, image: highlight2, createdAt: "2025-09-06 01:44:13" },
];

export const photostack: PhotostackRow[] = [
  { id: 1, image: photo3 },
  { id: 2, image: photo1 },
  { id: 3, image: photo2 },
  { id: 4, image: highlight1 },
  { id: 5, image: blogGarbaNight },
];

const doc = (content: unknown[]) => ({ type: "doc", content });
const h = (level: number, text: string) => ({
  type: "heading",
  attrs: { level },
  content: [{ type: "text", text }],
});
const p = (text: string) => ({
  type: "paragraph",
  content: [{ type: "text", text }],
});
const ul = (items: string[]) => ({
  type: "bulletList",
  content: items.map((text) => ({
    type: "listItem",
    content: [{ type: "paragraph", content: [{ type: "text", text }] }],
  })),
});

export const blogs: BlogRow[] = [
  {
    id: 1,
    title: "Navratri Nights: The Heartbeat of Our Community",
    date: "October 4, 2025",
    author: "Priya Mehta",
    minidescription:
      "Nine nights, one giant garba circle, and a community that never stops dancing. Here's what makes our Navratri the highlight of the year.",
    topics: "Festivals, Garba, Community",
    image: blogGarbaNight,
    createdAt: "2025-10-04 18:00:00",
    content: doc([
      h(1, "Navratri Nights: The Heartbeat of Our Community"),
      p(
        "When the dhol starts and the first circle forms, something magical happens. Strangers become neighbors, neighbors become family, and for nine nights the whole community moves to the same beat."
      ),
      h(2, "More Than a Dance"),
      p(
        "Garba and Dandiya Raas are more than choreography — they are a living thread connecting us to generations who danced these same steps in Gujarat. Every spin tells a story, and every clap keeps that story alive for the next generation."
      ),
      h(2, "What to Expect This Year"),
      ul([
        "A massive open garba circle for all skill levels — beginners welcome!",
        "Live dhol and traditional music throughout the evening",
        "Authentic Gujarati food stalls and chai",
        "A dandiya showcase from our youth dance group",
      ]),
      p(
        "Whether you've been dancing your whole life or you're tying on a chaniya choli for the first time, there's a place for you in the circle. We'll see you under the lights."
      ),
    ]),
  },
  {
    id: 2,
    title: "Passing Down the Diya: Why Cultural Roots Matter",
    date: "November 1, 2025",
    author: "Anand Desai",
    minidescription:
      "How a small lamp, a few recipes, and a lot of love help our youth stay connected to where they come from.",
    topics: "Heritage, Youth, Diwali",
    image: blogHeritage,
    createdAt: "2025-11-01 10:00:00",
    content: doc([
      h(1, "Passing Down the Diya: Why Cultural Roots Matter"),
      p(
        "Ask any of our kids what Diwali means and you'll get a dozen answers: sweets, fireworks, new clothes, family. But underneath all of it is something quieter — a sense of belonging that doesn't fade when you grow up far from your grandparents' village."
      ),
      h(2, "The Bridge Between Generations"),
      p(
        "Our cultural programs exist to build that bridge. Language classes, cooking afternoons, dance rehearsals, and storytelling nights all do the same thing: they hand the diya from one generation to the next."
      ),
      h(2, "Ways Your Family Can Stay Connected"),
      ul([
        "Bring the kids to our monthly youth cultural workshops",
        "Volunteer to share a recipe, a story, or a skill",
        "Celebrate the festivals together — even the small ones",
        "Encourage your children to learn a few words of Gujarati at home",
      ]),
      p(
        "Culture isn't preserved in a museum. It's preserved at the dinner table, in the dance circle, and in the small moments we choose to share. Let's keep that light burning together."
      ),
    ]),
  },
  {
    id: 3,
    title: "From Seva to Celebration: A Year of Giving Back",
    date: "December 20, 2025",
    author: "Reena Patel",
    minidescription:
      "A look back at the food drives, fundraisers, and volunteer hours that defined our community this year.",
    topics: "Seva, Community, Volunteering",
    image: blogCommunity,
    createdAt: "2025-12-20 09:00:00",
    content: doc([
      h(1, "From Seva to Celebration: A Year of Giving Back"),
      p(
        "Seva — selfless service — is woven into everything we do. This year, our community turned that value into real, measurable impact, and we couldn't be prouder of what we accomplished together."
      ),
      h(2, "The Year in Numbers"),
      ul([
        "Over 1,200 volunteer hours logged across our programs",
        "Three community food drives supporting local families",
        "A youth mentorship cohort connecting students with professionals",
        "Funds raised for cultural education and scholarships",
      ]),
      h(2, "Why It Matters"),
      p(
        "Every event we host — every garba night, every festival, every fundraiser — is powered by people who show up for one another. Service and celebration aren't separate things here; they're two sides of the same community."
      ),
      p(
        "Thank you to every volunteer, sponsor, and family who made this year possible. Here's to doing even more in the year ahead."
      ),
    ]),
  },
];
