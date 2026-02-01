"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PenSquare,
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

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold">Blog</h1>
              {isAdmin && (
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  Admin
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
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
                    <Button className="sm:px-4 px-2">
                      <PenSquare className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Write New</span>
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
        {/* Blog Content - Show tabs only for admin */}
        {isAdmin ? (
          <Tabs defaultValue="published" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="published" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Published ({publishedBlogs.length})
              </TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2">
                <FileText className="h-4 w-4" />
                Drafts ({drafts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published">
              {publishedBlogs.length === 0 ? (
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
                <div className="flex flex-col gap-3 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {publishedBlogs.map((blog) => (
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
              {drafts.length === 0 ? (
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
                <div className="flex flex-col gap-3 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {drafts.map((blog) => (
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
            {publishedBlogs.length === 0 ? (
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
              <div className="flex flex-col gap-3 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publishedBlogs.map((blog) => (
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
