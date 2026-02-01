"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Moon,
  Sun,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BlogContent from "@/components/blog/blog-content";
import { useAdmin } from "@/lib/admin-auth";
import { BlogPost, getBlogBySlug, formatDate, getPublishedBlogs } from "@/lib/blog";
import { Loader2 } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isAdmin } = useAdmin();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const slug = params.slug as string;
    const existingBlog = getBlogBySlug(slug);

    // Only show draft blogs to admin
    if (existingBlog) {
      if (existingBlog.status === 'draft' && !isAdmin) {
        setBlog(null);
      } else {
        setBlog(existingBlog);
      }
    }
    setLoading(false);
  }, [params.slug, isAdmin]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this blog: ${blog?.title}`);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <p className="text-muted-foreground dark:text-gray-400">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/blog">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/blog">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Back to Blog
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy Link"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareOnTwitter}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Share on Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareOnLinkedIn}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    Share on LinkedIn
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {isAdmin && (
                <Link href={`/blog/edit/${blog.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readingTime} min read</span>
              </div>
              {blog.status === "draft" && (
                <>
                  <span>•</span>
                  <Badge variant="secondary">Draft</Badge>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {blog.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          <Separator className="mb-8" />

          {/* Blog Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <BlogContent content={blog.content} />
          </div>

          <Separator className="my-8" />

          {/* Footer */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all posts
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button variant="ghost" size="icon" onClick={shareOnTwitter}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={shareOnLinkedIn}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </footer>
        </motion.article>
      </main>
    </div>
  );
}
