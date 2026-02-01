"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Edit,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  Film,
  Code,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { BlogPost, saveBlog, generateSlug, calculateReadingTime } from "@/lib/blog";
import Link from "next/link";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Dynamic import for the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface BlogEditorProps {
  initialBlog: BlogPost;
  onSave?: (blog: BlogPost) => void;
}

export default function BlogEditor({ initialBlog, onSave }: BlogEditorProps) {
  const [blog, setBlog] = useState<BlogPost>(initialBlog);
  const [tagInput, setTagInput] = useState("");
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const updateBlog = useCallback((updates: Partial<BlogPost>) => {
    setBlog((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleTitleChange = (title: string) => {
    updateBlog({
      title,
      slug: generateSlug(title),
    });
  };

  const handleContentChange = (content: string | undefined) => {
    if (content !== undefined) {
      updateBlog({
        content,
        readingTime: calculateReadingTime(content),
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !blog.tags.includes(tagInput.trim())) {
      updateBlog({
        tags: [...blog.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    updateBlog({
      tags: blog.tags.filter((t) => t !== tag),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async (status: "draft" | "published") => {
    setIsSaving(true);
    try {
      const savedBlog = saveBlog({ ...blog, status });
      setBlog(savedBlog);
      setSaveMessage(status === "published" ? "Published!" : "Draft saved!");
      setTimeout(() => setSaveMessage(""), 3000);
      onSave?.(savedBlog);
    } catch {
      setSaveMessage("Error saving");
    }
    setIsSaving(false);
  };

  // Insert media helpers
  const insertAtCursor = (text: string) => {
    handleContentChange(blog.content + "\n" + text);
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const alt = prompt("Enter image description (alt text):") || "Image";
      insertAtCursor(`![${alt}](${url})`);
    }
  };

  const insertVideo = () => {
    const url = prompt("Enter video URL (YouTube, Vimeo, or direct URL):");
    if (url) {
      // Support for YouTube, Vimeo, and direct video URLs
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("youtu.be")
          ? url.split("/").pop()
          : new URL(url).searchParams.get("v");
        insertAtCursor(
          `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
        );
      } else if (url.includes("vimeo.com")) {
        const videoId = url.split("/").pop();
        insertAtCursor(
          `<iframe width="100%" height="400" src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen></iframe>`
        );
      } else {
        insertAtCursor(
          `<video width="100%" controls>\n  <source src="${url}" type="video/mp4">\n  Your browser does not support the video tag.\n</video>`
        );
      }
    }
  };

  const insertCodeBlock = () => {
    const language = prompt("Enter programming language (e.g., javascript, python, tsx):");
    if (language) {
      insertAtCursor(`\n\`\`\`${language}\n// Your code here\n\`\`\`\n`);
    }
  };

  const insertGif = () => {
    const url = prompt("Enter GIF URL:");
    if (url) {
      const alt = prompt("Enter GIF description:") || "GIF";
      insertAtCursor(`![${alt}](${url})`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/blog">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold truncate">
                {blog.title || "Untitled Blog"}
              </h1>
              {saveMessage && (
                <Badge variant="secondary" className="animate-pulse">
                  {saveMessage}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                size="sm"
                onClick={() => handleSave("published")}
                disabled={isSaving || !blog.title || !blog.content}
              >
                <Upload className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Meta info section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter blog title..."
                  value={blog.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  placeholder="url-slug"
                  value={blog.slug}
                  onChange={(e) => updateBlog({ slug: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  placeholder="Brief description of your blog post..."
                  value={blog.excerpt}
                  onChange={(e) => updateBlog({ excerpt: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  placeholder="https://example.com/image.jpg"
                  value={blog.coverImage || ""}
                  onChange={(e) => updateBlog({ coverImage: e.target.value })}
                />
                {blog.coverImage && (
                  <div className="mt-2 relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.coverImage}
                      alt="Cover preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="max-w-xs"
                  />
                  <Button variant="outline" size="icon" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Reading time: ~{blog.readingTime} min
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Insert Toolbar */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={insertImage}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Image
          </Button>
          <Button variant="outline" size="sm" onClick={insertGif}>
            <ImageIcon className="h-4 w-4 mr-2" />
            GIF
          </Button>
          <Button variant="outline" size="sm" onClick={insertVideo}>
            <Film className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button variant="outline" size="sm" onClick={insertCodeBlock}>
            <Code className="h-4 w-4 mr-2" />
            Code Block
          </Button>
        </div>

        {/* Editor with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit" className="gap-2">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="split" className="gap-2 hidden md:flex">
              <Edit className="h-4 w-4" />
              <span>/</span>
              <Eye className="h-4 w-4" />
              <span className="hidden lg:inline">Split</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <div data-color-mode="auto" className="w-full">
              <MDEditor
                value={blog.content}
                onChange={handleContentChange}
                height={600}
                preview="edit"
                className="!bg-background"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div data-color-mode="auto" className="w-full">
              <MDEditor
                value={blog.content}
                onChange={handleContentChange}
                height={600}
                preview="preview"
                hideToolbar
                className="!bg-background"
              />
            </div>
          </TabsContent>

          <TabsContent value="split" className="mt-0">
            <div data-color-mode="auto" className="w-full">
              <MDEditor
                value={blog.content}
                onChange={handleContentChange}
                height={600}
                preview="live"
                className="!bg-background"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
