import type { SiteContent } from "@/core/domain/entities/site-content";
import { Photo } from "../ui/Photo";

export function StoryIntro({ story }: { story: SiteContent["story"] }) {
  return (
    <section className="bg-navy-950 pt-20">
      <div className="grid min-h-[80vh] lg:grid-cols-2">
        <div className="relative min-h-[50vh]">
          <Photo slot={story.image} priority sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className="flex items-center bg-navy-900 px-6 py-16 sm:px-12 lg:px-16">
          <div className="max-w-lg">
            <h1 className="text-3xl font-light leading-tight text-white sm:text-4xl">
              {story.heading}
            </h1>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-white/75 sm:text-base">
              {story.paragraphs.map((p, index) => (
                <div key={p}>
                    <p>{p}</p>
                    {index === 3 && (
                      <ul className="mt-4 list-disc space-y-1 pl-5">
                        {story.principles.map((principle) => (
                          <li key={principle}>{principle}</li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
