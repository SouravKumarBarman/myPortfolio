"use client";

import { BlogPost, formatDate, deleteBlog } from "@/lib/blog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Edit, Trash2, Eye } from "lucide-react";
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
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
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
        
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            <span className="mx-1">•</span>
            <Clock className="h-3 w-3" />
            <span>{blog.readingTime} min read</span>
          </div>
          <Link href={`/blog/${blog.slug}`} className="hover:underline">
            <h3 className="text-xl font-semibold line-clamp-2">{blog.title}</h3>
          </Link>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">
            {blog.excerpt || blog.content.slice(0, 150)}...
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-4 border-t">
          <div className="flex flex-wrap gap-1 w-full">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full">
            <Link href={`/blog/${blog.slug}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Read More
              </Button>
            </Link>
            
            {showActions && (
              <>
                <Link href={`/blog/edit/${blog.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
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
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
