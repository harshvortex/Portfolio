import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

/**
 * Fetches blog posts from the DEV.to API.
 * Filters posts to include only those with a cover image and randomizes the order.
 */
async function getBlogs() {
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 }, // Cache the data for 1 hour (optional, for ISR)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog data");
    }

    const data = await response.json();

    // Filter posts with a cover image and shuffle the array
    return data
      .filter((post) => post.cover_image)
      .sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return []; // Return an empty array in case of failure
  }
}

/**
 * Home Page Component
 */
export default async function Home() {
  const blogs = await getBlogs();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </>
  );
}
