'use client';

import { useState } from 'react';
import { addCommunityMember } from '@/lib/karms-service';
import { communitySchema, type CommunityInput } from '@/lib/schemas';
import { z } from 'zod';

interface CommunityMember extends CommunityInput {
  id: string;
  created_at: string;
}

interface CommunityFormProps {
  onMemberAdded?: (member: CommunityMember) => void;
}

export default function CommunityForm({ onMemberAdded }: CommunityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [optimisticMembers, setOptimisticMembers] = useState<CommunityMember[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const formData = new FormData(e.currentTarget);
    const input = {
      display_name: formData.get('display_name'),
      role: formData.get('role'),
      bio: formData.get('bio'),
      avatar_url: formData.get('avatar_url'),
    };

    // Validate with Zod
    try {
      communitySchema.parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(newErrors);
        return;
      }
    }

    // Optimistic update
    const optimisticMember: CommunityMember = {
      ...(input as CommunityInput),
      id: 'temp-' + Date.now(),
      created_at: new Date().toISOString(),
    };

    setOptimisticMembers((prev) => [optimisticMember, ...prev]);
    onMemberAdded?.(optimisticMember);

    setIsSubmitting(true);

    try {
      const result = await addCommunityMember(input);
      setSuccessMessage('✓ Successfully joined the KARMS community!');
      (e.target as HTMLFormElement).reset();

      // Replace optimistic member with real one
      setOptimisticMembers((prev) =>
        prev.map((m) => (m.id === optimisticMember.id ? result : m))
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to join community';
      setErrors({ submit: errorMessage });

      // Remove optimistic member on error
      setOptimisticMembers((prev) => prev.filter((m) => m.id !== optimisticMember.id));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-dragon-pink">
      <h2 className="text-3xl font-bold text-forest-green mb-2">
        Join the KARMS Community
      </h2>
      <p className="text-forest-green/70 mb-6">
        Kissan Agro Reforms and Management Systems - Connect with fellow farmers and innovators
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display Name */}
        <div>
          <label htmlFor="display_name" className="block text-sm font-semibold text-forest-green mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="display_name"
            name="display_name"
            placeholder="Your name"
            className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none transition-colors"
            disabled={isSubmitting}
          />
          {errors.display_name && (
            <p className="text-red-600 text-sm mt-1">{errors.display_name}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-forest-green mb-2">
            Role *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="e.g., Farmer, Agri-Tech Expert, Researcher"
            className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none transition-colors"
            disabled={isSubmitting}
          />
          {errors.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-semibold text-forest-green mb-2">
            Bio (Optional)
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none transition-colors resize-none"
            disabled={isSubmitting}
          />
          {errors.bio && (
            <p className="text-red-600 text-sm mt-1">{errors.bio}</p>
          )}
        </div>

        {/* Avatar URL */}
        <div>
          <label htmlFor="avatar_url" className="block text-sm font-semibold text-forest-green mb-2">
            Avatar URL (Optional)
          </label>
          <input
            type="url"
            id="avatar_url"
            name="avatar_url"
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none transition-colors"
            disabled={isSubmitting}
          />
          {errors.avatar_url && (
            <p className="text-red-600 text-sm mt-1">{errors.avatar_url}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded">
            <p className="text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
            <p className="text-green-600">{successMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-dragon-pink hover:bg-dragon-pink/90 disabled:bg-dragon-pink/50 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Joining...' : 'Join KARMS Community'}
        </button>
      </form>

      {/* Optimistic Members Preview */}
      {optimisticMembers.length > 0 && (
        <div className="mt-8 pt-8 border-t-2 border-forest-green/20">
          <h3 className="text-sm font-semibold text-forest-green/60 mb-4">
            Recently Joined:
          </h3>
          <div className="space-y-2">
            {optimisticMembers.map((member) => (
              <div key={member.id} className="text-sm text-forest-green/80 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-dragon-pink rounded-full animate-pulse" />
                <span>{member.display_name} - {member.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
