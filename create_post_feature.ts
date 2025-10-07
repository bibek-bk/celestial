// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Post {
  id: string;
  user_id: string;
  caption: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface CreatePostPayload {
  user_id: string;
  caption: string;
  image_url: string;
}

interface UploadProgress {
  progress: number;
  stage: 'uploading' | 'creating' | 'complete';
}

// ============================================================================
// API LAYER - Pure Supabase Queries
// ============================================================================

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

export const postsApi = {
  // Upload image to Supabase Storage
  uploadImage: async (file: File, userId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  },

  // Create post in database
  createPost: async (payload: CreatePostPayload): Promise<Post> => {
    const { data, error } = await supabase
      .from('posts')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete image from storage (for cleanup on error)
  deleteImage: async (imageUrl: string): Promise<void> => {
    const path = imageUrl.split('/post-images/')[1];
    if (path) {
      await supabase.storage.from('post-images').remove([path]);
    }
  },
};

// ============================================================================
// SERVICES LAYER - React Query Wrappers (Reusable)
// ============================================================================

import { useMutation, useQueryClient } from '@tanstack/react-query';

// Service: Upload image mutation
export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) =>
      postsApi.uploadImage(file, userId),
  });
};

// Service: Create post mutation
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsApi.createPost(payload),
    onSuccess: (newPost) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-posts', newPost.user_id] });
    },
  });
};

// Service: Delete image mutation (for cleanup)
export const useDeleteImageMutation = () => {
  return useMutation({
    mutationFn: (imageUrl: string) => postsApi.deleteImage(imageUrl),
  });
};

// ============================================================================
// FEATURE HOOKS - Business Logic & Orchestration
// ============================================================================

import { useState } from 'react';

// Feature Hook: Orchestrates the entire create post flow
export const useCreatePostFlow = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    stage: 'uploading',
  });
  const [error, setError] = useState<string | null>(null);

  // Use service layer
  const uploadImageMutation = useUploadImageMutation();
  const createPostMutation = useCreatePostMutation();
  const deleteImageMutation = useDeleteImageMutation();

  // Get current user
  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    return user;
  };

  // Handle image selection
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError(null);
    
    // Create preview
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  // Remove selected image
  const handleImageRemove = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview('');
    setError(null);
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!selectedImage) {
      setError('Please select an image');
      return false;
    }
    if (caption.length > 2200) {
      setError('Caption is too long (max 2200 characters)');
      return false;
    }
    return true;
  };

  // Main submit handler - orchestrates the flow
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setError(null);
    let uploadedImageUrl: string | null = null;

    try {
      const user = await getCurrentUser();

      // Step 1: Upload image
      setUploadProgress({ progress: 0, stage: 'uploading' });
      uploadedImageUrl = await uploadImageMutation.mutateAsync({
        file: selectedImage!,
        userId: user.id,
      });
      setUploadProgress({ progress: 60, stage: 'uploading' });

      // Step 2: Create post
      setUploadProgress({ progress: 80, stage: 'creating' });
      await createPostMutation.mutateAsync({
        user_id: user.id,
        caption: caption.trim(),
        image_url: uploadedImageUrl,
      });

      // Success
      setUploadProgress({ progress: 100, stage: 'complete' });
      return true;

    } catch (err) {
      // Cleanup: delete uploaded image if post creation failed
      if (uploadedImageUrl) {
        await deleteImageMutation.mutateAsync(uploadedImageUrl);
      }

      setError(err instanceof Error ? err.message : 'Failed to create post');
      setUploadProgress({ progress: 0, stage: 'uploading' });
      return false;
    }
  };

  // Reset form
  const resetForm = () => {
    handleImageRemove();
    setCaption('');
    setUploadProgress({ progress: 0, stage: 'uploading' });
    setError(null);
  };

  const isPending = uploadImageMutation.isPending || createPostMutation.isPending;
  const isSuccess = createPostMutation.isSuccess;

  return {
    // State
    selectedImage,
    imagePreview,
    caption,
    uploadProgress,
    error,
    isPending,
    isSuccess,

    // Actions
    setCaption,
    handleImageSelect,
    handleImageRemove,
    handleSubmit,
    resetForm,

    // Computed
    canSubmit: !!selectedImage && !isPending,
  };
};

// ============================================================================
// REDUX SLICE (Optional - for global state management)
// ============================================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  posts: Post[];
  isCreating: boolean;
}

const initialState: PostsState = {
  posts: [],
  isCreating: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
  },
});

export const { addPost, setIsCreating } = postsSlice.actions;
export default postsSlice.reducer;

// ============================================================================
// COMPONENTS
// ============================================================================

import React, { useRef } from 'react';
import { X, Image as ImageIcon, Loader2, Check } from 'lucide-react';

// ----------------------------------------------------------------------------
// ImagePreview Component
// ----------------------------------------------------------------------------

interface ImagePreviewProps {
  preview: string;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ preview, onRemove }) => {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full object-cover"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
        type="button"
      >
        <X size={18} />
      </button>
    </div>
  );
};

// ----------------------------------------------------------------------------
// ImageUploader Component
// ----------------------------------------------------------------------------

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
      <p className="text-gray-600 font-medium mb-1">
        Drag and drop your photo here
      </p>
      <p className="text-sm text-gray-500">or click to browse</p>
    </div>
  );
};

// ----------------------------------------------------------------------------
// ProgressBar Component
// ----------------------------------------------------------------------------

interface ProgressBarProps {
  progress: number;
  stage: UploadProgress['stage'];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, stage }) => {
  const stageText = {
    uploading: 'Uploading image...',
    creating: 'Creating post...',
    complete: 'Complete!',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{stageText[stage]}</span>
        <span className="text-gray-600 font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// CreatePostModal Component - Uses Feature Hook
// ----------------------------------------------------------------------------

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Use the feature hook (business logic layer)
  const {
    selectedImage,
    imagePreview,
    caption,
    uploadProgress,
    error,
    isPending,
    isSuccess,
    canSubmit,
    setCaption,
    handleImageSelect,
    handleImageRemove,
    handleSubmit,
    resetForm,
  } = useCreatePostFlow();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  const handleClose = () => {
    if (isPending) return;
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Create new post</h2>
          {!isPending && (
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Image Selection/Preview */}
            {!selectedImage ? (
              <ImageUploader
                onImageSelect={handleImageSelect}
                disabled={isPending}
              />
            ) : (
              <ImagePreview
                preview={imagePreview}
                onRemove={handleImageRemove}
              />
            )}

            {/* Caption Input */}
            {selectedImage && (
              <div>
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Caption
                </label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  maxLength={2200}
                  disabled={isPending}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {caption.length}/2200
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isPending && (
              <ProgressBar
                progress={uploadProgress.progress}
                stage={uploadProgress.stage}
              />
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                <Check size={20} />
                <span className="font-medium">Post created successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                <p className="font-medium">Failed to create post</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Creating...</span>
                  </>
                ) : (
                  'Share'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// Usage Example Component
// ----------------------------------------------------------------------------

export const CreatePostButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Create Post
      </button>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};