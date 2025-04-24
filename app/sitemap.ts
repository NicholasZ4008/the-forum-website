import { MetadataRoute } from "next";

/**
 * This function would get all events from your database or API
 * Replace with your actual data fetching logic when implemented
 */
async function getAllEvents() {
  // Placeholder - replace with actual event fetching when available
  return [];
}

/**
 * This function would get all event categories
 * Replace with your actual data fetching logic when implemented
 */
async function getAllEventCategories() {
  // Placeholder - replace with actual category fetching when available
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from your layout.tsx
  const baseUrl = "https://theforumuniversity.com";
  
  // Default static pages
  const defaultPages = [
    {
      url: baseUrl,
      lastModified: new Date("2025-04-23"), // Using the date from your layout.tsx
      changeFrequency: "daily" as const,
      priority: 1
    },
    // Future pages - commented out until they're implemented
    // {
    //   url: `${baseUrl}/events`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly" as const,
    //   priority: 0.9
    // },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly" as const,
    //   priority: 0.8
    // },
    // {
    //   url: `${baseUrl}/gallery`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly" as const, 
    //   priority: 0.8
    // },
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly" as const,
    //   priority: 0.7
    // },
    // {
    //   url: `${baseUrl}/subscribe`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly" as const,
    //   priority: 0.7
    // }
  ];

  // These would be your dynamic pages when implemented
  const eventSlugs = await getAllEvents(); 
  const categorySlugs = await getAllEventCategories();

  // Combine all pages for the final sitemap
  const sitemap = [
    ...defaultPages,
    ...eventSlugs.map((event: any) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: event.modified_at || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...categorySlugs.map((category: any) => ({
      url: `${baseUrl}/events/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];

  return sitemap;
}