"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogEditor from "@/components/blog/blog-editor";
import { getBlogById, BlogPost } from "@/lib/blog";
import { useAdmin } from "@/lib/admin-auth";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    const id = params.id as string;
    const existingBlog = getBlogById(id);
    
    if (existingBlog) {
      setBlog(existingBlog);
    } else if (isAdmin) {
      // Blog not found, redirect to blog list
      router.push("/blog");
    }
    setLoading(false);
  }, [params.id, router, authLoading, isAdmin]);

  const handleSave = (savedBlog: BlogPost) => {
    if (savedBlog.status === "published") {
      router.push(`/blog/${savedBlog.slug}`);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <ShieldAlert className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground text-center">
          You need to be logged in as admin to edit blog posts.
        </p>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return <BlogEditor initialBlog={blog} onSave={handleSave} />;
}
