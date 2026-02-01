"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PenSquare,
  Search,
  ArrowLeft,
  Moon,
  Sun,
  FileText,
  BookOpen,
} from "lucide-react";
import BlogCard from "@/components/blog/blog-card";
import { AdminLogin, AdminLogout } from "@/components/blog/admin-login";
import { useAdmin } from "@/lib/admin-auth";
import { BlogPost, getAllBlogs, getAllDrafts, getPublishedBlogs } from "@/lib/blog";

export default function BlogPage() {
  const [publishedBlogs, setPublishedBlogs] = useState<BlogPost[]>([]);
  const [drafts, setDrafts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAdmin, isLoading } = useAdmin();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [isAdmin]);

  const loadBlogs = () => {
    // Only show drafts to admin
    if (isAdmin) {
      setPublishedBlogs(getAllBlogs());
      setDrafts(getAllDrafts());
    } else {
      setPublishedBlogs(getPublishedBlogs());
      setDrafts([]);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Get all unique tags (only from visible blogs)
  const visibleBlogs = isAdmin ? [...publishedBlogs, ...drafts] : publishedBlogs;
  const allTags = Array.from(
    new Set(visibleBlogs.flatMap((blog) => blog.tags))
  );

  // Filter blogs based on search and tag
  const filterBlogs = (blogs: BlogPost[]) => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  };

  const filteredPublished = filterBlogs(publishedBlogs);
  const filteredDrafts = filterBlogs(drafts);

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Blog</h1>
              {isAdmin && (
                <Badge variant="secondary" className="text-xs">
                  Admin
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {isAdmin ? (
                <>
                  <AdminLogout />
                  <Link href="/blog/new">
                    <Button>
                      <PenSquare className="h-4 w-4 mr-2" />
                      Write New
                    </Button>
                  </Link>
                </>
              ) : (
                <AdminLogin onSuccess={loadBlogs} />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Blog Content - Show tabs only for admin */}
        {isAdmin ? (
          <Tabs defaultValue="published" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="published" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Published ({filteredPublished.length})
              </TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2">
                <FileText className="h-4 w-4" />
                Drafts ({filteredDrafts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published">
              {filteredPublished.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No published blogs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start writing your first blog post!
                  </p>
                  <Link href="/blog/new">
                    <Button>
                      <PenSquare className="h-4 w-4 mr-2" />
                      Write New Blog
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPublished.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      showActions={isAdmin}
                      onDelete={loadBlogs}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="drafts">
              {filteredDrafts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No drafts</h3>
                  <p className="text-muted-foreground mb-4">
                    Your saved drafts will appear here.
                  </p>
                  <Link href="/blog/new">
                    <Button>
                      <PenSquare className="h-4 w-4 mr-2" />
                      Start Writing
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDrafts.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      showActions={isAdmin}
                      onDelete={loadBlogs}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          // Non-admin view - just show published blogs
          <>
            {filteredPublished.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for new content!
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPublished.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    showActions={false}
                    onDelete={loadBlogs}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
