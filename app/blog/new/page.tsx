"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BlogEditor from "@/components/blog/blog-editor";
import { createNewBlogPost, BlogPost } from "@/lib/blog";
import { useAdmin } from "@/lib/admin-auth";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const { isAdmin, isLoading } = useAdmin();
  const newBlog = createNewBlogPost();

  useEffect(() => {
    // Redirect non-admins after loading
    if (!isLoading && !isAdmin) {
      // Don't auto-redirect, show access denied instead
    }
  }, [isAdmin, isLoading, router]);

  const handleSave = (blog: BlogPost) => {
    if (blog.status === "published") {
      router.push(`/blog/${blog.slug}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 dark:bg-gray-900 dark:text-white">
        <ShieldAlert className="h-16 w-16 text-muted-foreground dark:text-gray-400" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground text-center dark:text-gray-400">
          You need to be logged in as admin to create blog posts.
        </p>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return <BlogEditor initialBlog={newBlog} onSave={handleSave} />;
}
