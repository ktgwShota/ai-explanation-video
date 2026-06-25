import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: 'https://voxq.jp/',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://voxq.jp/about',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://voxq.jp/subscription',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://voxq.jp/subscription/success',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://voxq.jp/contact',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://voxq.jp/privacy',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://voxq.jp/terms',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://voxq.jp/auth/signin',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}