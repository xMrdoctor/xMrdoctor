import { AboutMe } from "@/components/sections/about-me";
import { Skills } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { GitHubActivity } from "@/components/sections/github-activity"; // Import the new component


export default async function Home() { // Make the component async
  // ProjectsSection is already async and fetches its own data.
  // GitHubActivity is also async and fetches its own data.

  return (
    <>
      {/* Hero Section - Can be part of AboutMe or a separate component */}
      {/* For now, AboutMe serves as the initial introductory section */}
      <AboutMe />
      <Skills />
      {/* @ts-expect-error Server Component */}
      <ProjectsSection />
      {/* @ts-expect-error Server Component */}
      <GitHubActivity />
      <Experience />
      <Contact />
    </>
  );
}
