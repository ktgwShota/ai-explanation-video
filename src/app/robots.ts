import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/', // クロールされたくないパスがあれば指定
    },
    sitemap: 'https://voxq.jp/sitemap.xml',
  }
}