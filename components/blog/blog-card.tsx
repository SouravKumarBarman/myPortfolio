"use client";

import { BlogPost, formatDate, deleteBlog } from "@/lib/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogCardProps {
  blog: BlogPost;
  showActions?: boolean;
  onDelete?: () => void;
}

export default function BlogCard({ blog, showActions = false, onDelete }: BlogCardProps) {
  const handleDelete = () => {
    deleteBlog(blog.id);
    onDelete?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/blog/${blog.slug}`}>
          {blog.coverImage && (
            <div className="relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              {blog.status === "draft" && (
                <Badge className="absolute top-2 right-2" variant="secondary">
                  Draft
                </Badge>
              )}
            </div>
          )}
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-400 mb-2">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              <span className="mx-1">•</span>
              <Clock className="h-3 w-3" />
              <span>{blog.readingTime} min read</span>
            </div>
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{blog.title}</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
              {blog.excerpt || blog.content.slice(0, 100)}...
            </p>
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {blog.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {blog.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{blog.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Link>
        
        {showActions && (
          <div className="flex items-center gap-2 px-4 pb-4">
            <Link href={`/blog/edit/${blog.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{blog.title}&quot;? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
