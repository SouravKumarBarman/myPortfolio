import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
  status: 'draft' | 'published';
  readingTime: number;
}

export interface BlogDraft extends Omit<BlogPost, 'publishedAt' | 'status'> {
  status: 'draft';
}

// Calculate reading time based on content (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Create a new empty blog post
export function createNewBlogPost(): BlogPost {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: [],
    createdAt: now,
    updatedAt: now,
    status: 'draft',
    readingTime: 0,
  };
}

// Local storage key for blogs
const BLOGS_STORAGE_KEY = 'portfolio_blogs';
const DRAFTS_STORAGE_KEY = 'portfolio_blog_drafts';

// Get all blogs from local storage
export function getAllBlogs(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  const blogs = localStorage.getItem(BLOGS_STORAGE_KEY);
  return blogs ? JSON.parse(blogs) : [];
}

// Get all drafts from local storage
export function getAllDrafts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  const drafts = localStorage.getItem(DRAFTS_STORAGE_KEY);
  return drafts ? JSON.parse(drafts) : [];
}

// Get published blogs only
export function getPublishedBlogs(): BlogPost[] {
  return getAllBlogs().filter(blog => blog.status === 'published');
}

// Get a single blog by slug
export function getBlogBySlug(slug: string): BlogPost | undefined {
  const allBlogs = [...getAllBlogs(), ...getAllDrafts()];
  return allBlogs.find(blog => blog.slug === slug);
}

// Get a single blog by ID
export function getBlogById(id: string): BlogPost | undefined {
  const allBlogs = [...getAllBlogs(), ...getAllDrafts()];
  return allBlogs.find(blog => blog.id === id);
}

// Save blog to local storage
export function saveBlog(blog: BlogPost): BlogPost {
  const now = new Date().toISOString();
  const updatedBlog = {
    ...blog,
    updatedAt: now,
    slug: blog.slug || generateSlug(blog.title),
    readingTime: calculateReadingTime(blog.content),
  };

  if (blog.status === 'published') {
    // Move from drafts to published
    const drafts = getAllDrafts().filter(d => d.id !== blog.id);
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));

    const blogs = getAllBlogs();
    const existingIndex = blogs.findIndex(b => b.id === blog.id);
    
    if (existingIndex >= 0) {
      blogs[existingIndex] = { ...updatedBlog, publishedAt: updatedBlog.publishedAt || now };
    } else {
      blogs.push({ ...updatedBlog, publishedAt: now });
    }
    
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
  } else {
    // Save as draft
    const drafts = getAllDrafts();
    const existingIndex = drafts.findIndex(d => d.id === blog.id);
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = updatedBlog;
    } else {
      drafts.push(updatedBlog);
    }
    
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  }

  return updatedBlog;
}

// Delete a blog
export function deleteBlog(id: string): void {
  const blogs = getAllBlogs().filter(b => b.id !== id);
  const drafts = getAllDrafts().filter(d => d.id !== id);
  
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
  localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
