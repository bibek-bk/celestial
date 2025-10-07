import React, { useRef, useState } from 'react';
import { X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { useCreatePostFlow } from '@/features/posts/hooks/useCreatePostFlow';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreview: React.FC<{ preview: string; onRemove: () => void }> = ({ preview, onRemove }) => {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
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

const ImageUploader: React.FC<{ onImageSelect: (file: File) => void; disabled?: boolean }> = ({ onImageSelect, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) onImageSelect(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) onImageSelect(e.target.files[0]);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" disabled={disabled} />
      <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
      <p className="text-gray-600 font-medium mb-1">Drag and drop your photo here</p>
      <p className="text-sm text-gray-500">or click to browse</p>
    </div>
  );
};

const ProgressBar: React.FC<{ progress: number; stage: 'uploading' | 'creating' | 'complete' }> = ({ progress, stage }) => {
  const stageText = { uploading: 'Uploading image...', creating: 'Creating post...', complete: 'Complete!' };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{stageText[stage]}</span>
        <span className="text-gray-600 font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className="bg-blue-500 h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
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
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Create new post</h2>
          {!isPending && (
            <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {!selectedImage ? (
              <ImageUploader onImageSelect={handleImageSelect} disabled={isPending} />
            ) : (
              <ImagePreview preview={imagePreview} onRemove={handleImageRemove} />
            )}

            {selectedImage && (
              <div>
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
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
                <div className="text-right text-sm text-gray-500 mt-1">{caption.length}/2200</div>
              </div>
            )}

            {isPending && (
              <ProgressBar progress={uploadProgress.progress} stage={uploadProgress.stage} />
            )}

            {isSuccess && (
              <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                <Check size={20} />
                <span className="font-medium">Post created successfully!</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                <p className="font-medium">Failed to create post</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

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

export default CreatePostModal;


