import { ArrowUpRight, Check, ChevronRight, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroReveal, Reveal } from "@/components/animations/reveal";
import { GoogleMapsEmbed } from "@next/third-parties/google";

const services = [
  {
    title: "Interior Detailing",
    duration: "3 hours",
    description:
      "A deep cabin restoration service covering seats, carpets, dashboard, panels, vents, trims, and high-touch areas for a cleaner, fresher interior.",
  },
  {
    title: "Exterior Detailing",
    duration: "3 hours",
    description:
      "A focused exterior treatment that cleans, decontaminates, enhances, and refines the vehicle’s outer surfaces for a sharper finish.",
  },
  {
    title: "Complete Detailing",
    duration: "7 hours",
    description:
      "A full interior and exterior detailing session designed for vehicles that need complete care, surface refinement, and a refreshed overall appearance.",
  },
  {
    title: "Premium Wash",
    duration: "1 hour 30 minutes",
    description:
      "A careful premium wash for regular maintenance, using safer cleaning methods to remove dust, road grime, and surface dirt without rushing the process.",
  },
  {
    title: "Compound & Paint Correction",
    duration: "2 hours",
    description:
      "Targets dullness, oxidation, swirl marks, haze, and light paint defects to restore clarity, depth, and a glossier finish.",
  },
  {
    title: "Waxes",
    duration: "Depends on wax type",
    description:
      "Protective wax options including carnauba wax, ceramic wax, graphene wax, and hybrid wax for added gloss, slickness, and surface protection.",
    details: [
      "Carnauba wax: 1–2 weeks life",
      "Ceramic wax: 2–6 months life",
      "Graphene wax: 3–8 months life",
      "Hybrid wax: 4–6 months life",
    ],
  },
  {
    title: "Spray Coating",
    duration: "Depends on coating type",
    description:
      "Spray coating options for customers who want enhanced gloss, hydrophobic behavior, and additional surface protection.",
    details: [
      "Ceramic spray coating",
      "Graphene spray coating",
      "Hybrid spray coating",
    ],
  },
  {
    title: "Rust Removal & Chrome Polish",
    duration: "1 hour",
    description:
      "A combined treatment for removing visible rust buildup and polishing chrome surfaces to bring back a cleaner, brighter appearance.",
  },
];

const process = [
  "Inspect the vehicle condition",
  "Prepare and deep clean the surfaces",
  "Correct paint defects where needed",
  "Enhance gloss and finish quality",
  "Protect the surface for lasting results",
];

const packages = [
  {
    name: "Refresh",
    description:
      "A clean maintenance detail for vehicles that need a sharper, fresher appearance without heavy correction work.",
    items: [
      "Exterior wash",
      "Interior refresh",
      "Basic surface cleaning",
      "Final inspection",
    ],
  },
  {
    name: "Restore",
    description:
      "A deeper detailing session for cars or bikes that need interior care, exterior improvement, and renewed gloss.",
    items: [
      "Interior detailing",
      "Exterior detailing",
      "Paint enhancement",
      "Wax or protective finish",
    ],
  },
  {
    name: "Protect",
    description:
      "For customers who want paint refinement, long-term protection, and a premium finish with ceramic coating options.",
    items: [
      "Paint correction",
      "Ceramic coating",
      "Gloss enhancement",
      "Protection-focused finish",
    ],
  },
];

type Testimonial = {
  name: string;
  rating: number;
  review: string;
};

export const testimonialRowOne: Testimonial[] = [
  {
    name: "Hassan Tariq",
    rating: 5,
    review:
      "I recently got my Changan Oshan X7 detailed at Buff in Township Lahore, and the experience was outstanding from start to finish. The team brought the car back to a showroom-like condition with excellent shine, interior cleanliness, and attention to detail.",
  },
  {
    name: "Musa Salman",
    rating: 5,
    review:
      "My bike had a lot of rust and the shine was completely gone. It was looking old and dull from every angle, but The Buff transformed it beautifully.",
  },
  {
    name: "Baaz.C",
    rating: 5,
    review:
      "Just got my bike detailed from The Buff. These guys definitely know their stuff. My experience was absolutely amazing, and they paid great attention to detail.",
  },
  {
    name: "Tahir Ilyas",
    rating: 5,
    review:
      "It was a wonderful experience with The Buff team. Special thanks to Mr. Ahmad Tahir and his professional team for cleaning my car’s interior and exterior excellently with great attention to detail.",
  },
  {
    name: "Stephen Phillips",
    rating: 5,
    review:
      "Everything at The Buff is professional and straightforward. Nothing comes as a surprise except the quality of the work, which is exceptional. My car was gleaming and looked better than ever.",
  },
  {
    name: "Usman Ashraf",
    rating: 5,
    review:
      "I recently took my motorcycle to The Buff and had an awesome experience with Ahmed. He was professional and courteous from the moment I walked in.",
  },
  {
    name: "Muhammad Ali Khalid",
    rating: 5,
    review:
      "Got my bike detailed at The Buff. Awesome service, great talk, and quality time spent. Recommended.",
  },
  {
    name: "Muhammad Atif",
    rating: 5,
    review:
      "I heard about The Buff’s work, and now I have experienced it. Fully professional work with high-quality products. Highly recommended.",
  },
  {
    name: "Murtaza Hassan",
    rating: 5,
    review:
      "Took my black Honda City to Buff and I'm blown away. The detailing team worked their magic, transforming my car to a showroom shine. The gloss is incredible.",
  },
  {
    name: "Sheharyar Tariq",
    rating: 5,
    review:
      "I recently went in for car detailing and compounding, and I’m really impressed with the quality of work. The car looks fantastic, and the attention to detail was clear.",
  },
  {
    name: "Feasy",
    rating: 5,
    review:
      "Would have given 6 stars if I had the option. Very professional and friendly. The work is next level, precisely done, and handled with care.",
  },
  {
    name: "Abdul Hadi Mahmood",
    rating: 5,
    review:
      "I recently had my bike detailed at The Buff, and I couldn't be happier with the results. The attention to detail, quality of service, and professionalism were outstanding.",
  },
  {
    name: "Hassan Shahid",
    rating: 5,
    review:
      "Been here for the third time for my car detailing. Amazing work and long-lasting extra shine. Fantastic work done again. Thank you, The Buff.",
  },
  {
    name: "Huzaifa",
    rating: 5,
    review:
      "I'm in love with the work of Ahmad bhai. A highly professional and humble person with good expertise. In love with the results for my bike.",
  },
  {
    name: "Obaid Sheikh",
    rating: 5,
    review:
      "I got my car detailed at The Buff. I couldn't believe the transformation. The car looks just like new, and after the ceramic coating wax, the shine is superb.",
  },
  {
    name: "Abdullah Wahid",
    rating: 5,
    review:
      "Excellent job at competitive rates. Quality renowned products like Meguiars and Turtle were used. Thank you, The Buff.",
  },
  {
    name: "Rashid Pervez Mughal",
    rating: 5,
    review:
      "Excellent experience with the premium detailing package of The Buff. Seeing is believing. Totally loving my car transformation.",
  },
  {
    name: "Dr. Moazzam Iqbal",
    rating: 5,
    review:
      "The Buff has an extremely dedicated, professional, and honest team committed to providing car detailing services beyond excellence with attention to minute details.",
  },
  {
    name: "Hamdan Raza",
    rating: 5,
    review:
      "I took my Benelli 302s for detailing, and they made my bike look brand new. Highly professional work done by Ahmed. Would highly recommend this place.",
  },
  {
    name: "Sohail Waheed",
    rating: 5,
    review:
      "It has been a wonderful experience overall. Results are immaculate. Reasonable price and satisfaction guaranteed.",
  },
  {
    name: "Hassan Abbas Bhatti",
    rating: 5,
    review:
      "Excellent eye for minor details and knowledge of what actually needs to be done.",
  },
  {
    name: "Saad Abbasi",
    rating: 5,
    review:
      "Once again, hats off to The Buff. I went there for my niece’s car and got it totally changed into something that looked like it was out of a showroom.",
  },
  {
    name: "Rohail Minhas",
    rating: 5,
    review: "Great experience. Great service.",
  },
  {
    name: "Muhmmad Kamran Idrees",
    rating: 5,
    review:
      "Mr. Ahmed did an outstanding job on my car’s detailing. Every inch was cleaned to perfection, and it is clear that he cares about delivering high-quality service.",
  },
  {
    name: "Zaeem Yaqoob",
    rating: 5,
    review:
      "The Buff buffed up the shine to reveal what lay beneath. Spectacular job. Thank you.",
  },
  {
    name: "Zafar Iftikhar",
    rating: 5,
    review:
      "Highly recommend getting your vehicle detailed by experienced professionals. The service level is amazing. 10/10.",
  },
  {
    name: "Hamza Malik",
    rating: 5,
    review:
      "Got my car detailed for the first time after purchasing it from the showroom. The results brought out the car in a better form than how I got it from the showroom.",
  },
  {
    name: "Ronin Productions",
    rating: 5,
    review:
      "A flawless experience. The effort and dedication put into the detailing sessions is something I cannot find anywhere else. Quality products produce quality results.",
  },
  {
    name: "Muhammad Imran",
    rating: 5,
    review:
      "Mr. Ahmad has detailed my two bikes, twice actually. He works on every inch of your bike or car. Worth every penny spent on detailing.",
  },
  {
    name: "Kashan Hussain",
    rating: 5,
    review: "Great products and very professional service.",
  },
  {
    name: "Sufyan Elahi",
    rating: 5,
    review:
      "Ahmad is very passionate about vehicles and detailing. Would highly recommend.",
  },
  {
    name: "Adeel Ahmad",
    rating: 5,
    review:
      "Top detailer undisputed. The Buff super rocks. Best customer service with consultancy. Bravo.",
  },
  {
    name: "Faisal Shahzad",
    rating: 5,
    review: "I had a good experience with The Buff. Great work, Ahmed.",
  },
  {
    name: "Fahad Anees",
    rating: 5,
    review: "Good work brother. Alhamdulillah, satisfied with your work.",
  },
  {
    name: "DREAM HOUSE CONSTRUCTION",
    rating: 5,
    review: "Amazing experience. MashAllah. Very impressive. Great work.",
  },
  {
    name: "Majid Niazi",
    rating: 5,
    review: "Very impressive. Excellent work. MashAllah.",
  },
  {
    name: "Abdul Sttar",
    rating: 5,
    review: "Lovely work. Completely satisfied. Thanks.",
  },
];

export const testimonialRowTwo: Testimonial[] = [
  {
    name: "Uswah Aftab",
    rating: 5,
    review: "Brilliant work. Job well done.",
  },
  {
    name: "Muhammad Tahir",
    rating: 5,
    review: "Perfect detailing with great service.",
  },
  {
    name: "Muhammad Hamza",
    rating: 5,
    review: "They provide very excellent services.",
  },
  {
    name: "Malik Saim",
    rating: 5,
    review: "Stunning results. Highly recommend.",
  },
  {
    name: "Moiz Farhan",
    rating: 5,
    review: "Amazing work and highly recommended.",
  },
  {
    name: "Waqar Khan",
    rating: 5,
    review: "Done a great work.",
  },
  {
    name: "Sultan Mahmood",
    rating: 5,
    review: "Excellent service with excellent experience.",
  },
  {
    name: "Hamid Rasheed",
    rating: 5,
    review: "Excellent detailing experience.",
  },
  {
    name: "Wajid Ali",
    rating: 5,
    review: "A wonderful experience with professional services.",
  },
  {
    name: "Umair Manzoor",
    rating: 5,
    review: "Outstanding services and quality of work.",
  },
  {
    name: "Nauman Majeed",
    rating: 5,
    review: "Best services in town.",
  },
  {
    name: "M Tufail",
    rating: 5,
    review: "Very excellent service.",
  },
  {
    name: "Umair Ali",
    rating: 5,
    review: "Outstanding services and quality of work.",
  },
  {
    name: "Muhammad Ibrahim",
    rating: 5,
    review:
      "Satisfied. Ahmad bhai did a great job with detailing. Super professional and courteous from the moment I walked in.",
  },
  {
    name: "Mudassir Hussain",
    rating: 5,
    review:
      "I recently had my car detailed at The Buff and chose their premium package, which included ceramic coating. It was a great experience from start to finish.",
  },
  {
    name: "Ayyaz Maken",
    rating: 5,
    review: "Excellent service.",
  },
  {
    name: "Abdul Rehman Akram",
    rating: 5,
    review:
      "Recently visited The Buff. Ahmad bhai is a great person. This place is perfect for detailing, with reasonable pricing and professional work.",
  },
  {
    name: "Waleed Anjum",
    rating: 5,
    review:
      "Ahmed Bhai, my Suzuki 150 is about to be detailed again. I like the way you work with your heart. You're a rock star.",
  },
  {
    name: "Athar Ali",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Labeeb Rehman",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Pakpattan Rent A Car",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Aayan Basit",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Muhammad Qasim",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "SHAHRYAR Khan",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Saisioad Khan",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Mian Danish",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Mian Hamza",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Mohsin Abid",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Zain Ch",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Omar Latif",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Moazam Abid",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Hashim Tahir",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Ehtesham Ahmed",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Asad T",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Rizwan Kazmi",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
  {
    name: "Innocent Dreams",
    rating: 5,
    review: "5-star Google rating for The Buff.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden pt-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/14615262/pexels-photo-14615262.jpeg?cs=srgb&dl=pexels-dextarvision-14615262.jpg&fm=jpg"
            alt="Professional car detailing and paint polishing at The Buff"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.58),rgba(11,11,11,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.35)_100%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center justify-center px-5 pb-16 md:px-8">
          <div className="max-w-4xl text-center">
            <HeroReveal
              delay={0.05}
              className="mb-8 inline-flex items-center border-l border-[#C1121F] pl-4 text-sm uppercase tracking-[0.28em] text-zinc-300"
            >
              Premium Car & Motorcycle Detailing
            </HeroReveal>

            <HeroReveal delay={0.12}>
              <h1 className="text-4xl font-medium leading-[1.02] tracking-[-0.06em] text-[#F5F2EC] md:text-6xl lg:text-7xl">
                Driven by passion.
                <br />
                Perfected by precision.
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
                The Buff restores, protects, and enhances cars and motorcycles
                through precision detailing, paint correction, ceramic coating,
                and interior care performed with professional techniques and
                premium products.
              </p>
            </HeroReveal>

            <HeroReveal
              delay={0.28}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                Book Appointment
                <ChevronRight className="h-4 w-4" />
              </Link>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F5F2EC] transition hover:border-white/50 hover:bg-white/5"
              >
                View Services
              </a>
            </HeroReveal>

            <HeroReveal
              delay={0.36}
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 border-y border-white/10 py-6 text-center sm:grid-cols-3"
            >
              <div>
                <p className="text-2xl font-medium text-[#F5F2EC]">5+</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Years of experience
                </p>
              </div>

              <div className="sm:border-x sm:border-white/10 sm:px-6">
                <p className="text-2xl font-medium text-[#F5F2EC]">73</p>
                <p className="mt-1 text-sm text-zinc-400">Google reviews</p>
              </div>

              <div>
                <p className="text-2xl font-medium text-[#F5F2EC]">
                  Cars & bikes
                </p>
                <p className="mt-1 text-sm text-zinc-400">Detailed with care</p>
              </div>
            </HeroReveal>
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="border-y border-white/10">
        <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
            About The Buff
          </p>

          <p className="max-w-4xl text-2xl font-light leading-[1.45] tracking-[-0.03em] text-zinc-300 md:text-4xl">
            The Buff is built around one idea: every vehicle deserves careful,
            honest, and precise attention. From daily drivers to motorcycles and
            premium cars, each detail is handled with the goal of restoring
            beauty, protecting value, and delivering a finish customers can feel
            proud of.
          </p>
        </Reveal>
      </section>

      {/* Services */}
      <section
        id="services"
        className="cv-auto mx-auto max-w-7xl px-5 py-24 md:px-8"
      >
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Services
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tighter md:text-6xl">
              Detailing services built around your vehicle&apos;s condition.
            </h2>
          </div>

          <p className="max-w-md leading-7 text-zinc-400">
            From premium washes and full detailing sessions to paint correction,
            wax protection, spray coatings, and chrome care, each service is
            selected based on the vehicle&apos;s condition and the finish you
            want to achieve.
          </p>
        </Reveal>

        <Reveal className="grid border-t border-white/10 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group border-b border-white/10 py-8 md:p-8 ${
                index % 2 === 0 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-4 text-sm text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    {service.title}
                  </h3>

                  <p className="mt-3 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
                    {service.duration}
                  </p>

                  <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                    {service.description}
                  </p>

                  {"details" in service && service.details ? (
                    <ul className="mt-5 space-y-2">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex gap-2 text-sm leading-6 text-zinc-500"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C1121F]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <ArrowUpRight className="mt-2 h-5 w-5 text-zinc-600 transition group-hover:text-[#C1121F]" />
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Process */}
      <section id="process" className="cv-auto bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Process
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-tighter md:text-6xl">
              Every detail follows a deliberate process.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-2xl text-xl leading-8 text-zinc-700">
              Great detailing is not rushed. Every vehicle is inspected,
              cleaned, corrected, enhanced, and protected through a careful
              sequence designed to bring out a lasting finish.
            </p>

            <div className="mt-12 border-t border-black/10">
              {process.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-black/10 py-6"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-zinc-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-xl font-medium tracking-[-0.03em]">
                      {item}
                    </p>
                  </div>

                  <Check className="h-5 w-5 text-[#C1121F]" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Packages */}
      <section
        id="packages"
        className="cv-auto mx-auto max-w-7xl px-5 py-24 md:px-8"
      >
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
            Packages
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-tighter md:text-6xl">
            Choose the level of care your vehicle needs.
          </h2>
        </Reveal>

        <Reveal className="grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`rounded-[1.75rem] border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-[#F5F2EC] bg-white text-black"
                  : "border-white/10 bg-[#111]"
              }`}
            >
              <p
                className={`text-sm ${
                  index === 1 ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
                {pkg.name}
              </h3>

              <p
                className={`mt-4 leading-7 ${
                  index === 1 ? "text-zinc-700" : "text-zinc-400"
                }`}
              >
                {pkg.description}
              </p>

              <div className="mt-8 space-y-4">
                {pkg.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check
                      className={`h-4 w-4 ${
                        index === 1 ? "text-[#C1121F]" : "text-zinc-500"
                      }`}
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/booking"
                className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                  index === 1
                    ? "bg-black text-white hover:bg-[#C1121F]"
                    : "border border-white/15 text-white hover:border-white/40"
                }`}
              >
                Get Quote
              </Link>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Gallery Placeholder */}
      <section className="cv-auto mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <Reveal className="relative grid gap-5 md:grid-cols-3">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg md:col-span-2">
            <Image
              src="/portfolio-img-1.webp"
              alt="Portfolio image 1"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 66vw, 100vw"
            />
          </div>

          <div className="grid gap-5">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <Image
                src="/portfolio-img-2.webp"
                alt="Portfolio image 2"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <Image
                src="/portfolio-img-3.webp"
                alt="Portfolio image 3"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Before & After
            </p>

            <p className="mt-3 max-w-xl text-zinc-400">
              See the difference through real transformations — restored paint,
              cleaner interiors, sharper reflections, motorcycle details, and
              protective finishes that speak for themselves.
            </p>
          </div>

          <a
            href="https://www.instagram.com/thebuff.detailing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#F5F2EC]"
          >
            View Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="cv-auto overflow-hidden border-y border-white/10 bg-[#0B0B0B] py-24"
      >
        <Reveal className="mx-auto mb-14 flex max-w-7xl flex-col justify-between gap-6 px-5 md:px-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Google Reviews
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tighter md:text-6xl">
              Shining vehicles. Satisfied customers.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-lg leading-8 text-zinc-400">
              The Buff has earned the trust of car and motorcycle owners through
              consistent craftsmanship, honest advice, premium products, and
              results that customers continue to recommend.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-[#C1121F] text-[#C1121F]"
                  />
                ))}
              </div>

              <span className="text-sm font-medium text-[#F5F2EC]">
                73 Google Reviews
              </span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
          <TestimonialsMarqueeRow
            testimonials={testimonialRowOne}
            direction="left"
          />
          <TestimonialsMarqueeRow
            testimonials={testimonialRowTwo}
            direction="right"
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="cv-auto bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Experience The Buff
            </p>

            <h2 className="mt-4 max-w-3xl text-5xl font-medium leading-[1.03] tracking-[-0.06em] md:text-7xl">
              Let your ride become the next transformation.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-700">
              Whether you want to restore gloss, protect your paint, refresh the
              interior, or detail your motorcycle, book an appointment and let
              The Buff recommend the right treatment for your vehicle.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:03214012924"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C1121F]"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <a
                href="https://wa.me/923004196069"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/15 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:border-black/40"
              >
                WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-[2rem] border border-black/10 p-7"
          >
            <div className="border-b border-black/10 pb-6">
              <p className="text-sm text-zinc-500">Phone</p>
              <p className="mt-2 text-2xl font-medium">321 401 2924</p>
              <p className="mt-1 text-2xl font-medium">300 419 6069</p>
            </div>

            <div className="border-b border-black/10 py-6">
              <p className="text-sm text-zinc-500">Social</p>
              <p className="mt-2 text-lg font-medium">
                Facebook:{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=100087778666789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  The Buff
                </a>
              </p>
              <p className="mt-1 text-lg font-medium">
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/thebuff.detailing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  thebuff.detailing
                </a>
              </p>
              <p className="mt-1 text-lg font-medium">
                Threads:{" "}
                <a
                  href="https://www.threads.com/@thebuff.detailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  @thebuff.detailing
                </a>
              </p>
            </div>

            <div className="pt-6">
              <p className="text-sm text-zinc-500">Location</p>

              <div className="mt-3 overflow-hidden rounded-[1.25rem]">
                <GoogleMapsEmbed
                  apiKey={"AIzaSyC7HG3kfdM-_5F-Q6Wq2XyVw0SqLENMB1I"}
                  height={400}
                  width="100%"
                  mode="place"
                  center="31.458721883844095, 74.31537104394437"
                  q="The BUFF"
                  zoom="15"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 The Buff. Detailing & Beyond.</p>
          <p>Driven by passion. Perfected by precision.</p>
        </div>
      </footer>
    </main>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="w-[320px] shrink-0 rounded-[1.5rem] border border-white/10 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#151515] sm:w-[380px]">
      <div className="mb-5 flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-[#C1121F] text-[#C1121F]" />
        ))}
      </div>

      <p className="min-h-[120px] text-base leading-7 text-zinc-300">
        “{testimonial.review}”
      </p>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="font-medium text-[#F5F2EC]">{testimonial.name}</p>
        <p className="mt-1 text-sm text-zinc-500">Google Review</p>
      </div>
    </article>
  );
}

function TestimonialsMarqueeRow({
  testimonials,
  direction = "left",
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
}) {
  const animationClass =
    direction === "left"
      ? "animate-[marquee-left_200s_linear_infinite]"
      : "animate-[marquee-right_200s_linear_infinite]";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-linear-to-r from-[#0B0B0B] to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-linear-to-l from-[#0B0B0B] to-transparent md:block" />

      <div className={`flex w-max gap-5 ${animationClass} hover:paused`}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}
