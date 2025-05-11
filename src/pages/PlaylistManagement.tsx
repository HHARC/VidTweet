import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, MoreVertical, Play, Lock, Globe } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { API_BASE_URL } from '../utils/api';
import axios from 'axios';

interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  isPrivate: boolean;
  createdAt: string;
}

const PlaylistManagement: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPrivate: false,
  });

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Fetch playlists on component mount
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userId = 'userId'; // Replace with actual user ID or from context
        const response = await axios.get(`${API_BASE_URL}/playlists/user/${userId}`);
        setPlaylists(response.data.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const startEditing = (playlist: Playlist) => {
    setIsEditing(playlist.id);
    setFormData({
      title: playlist.title,
      description: playlist.description,
      isPrivate: playlist.isPrivate,
    });
    setShowDropdown(null);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      isPrivate: false,
    });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/playlists/`, formData);
      setPlaylists((prev) => [response.data.data, ...prev]);
      setIsCreating(false);
      setFormData({
        title: '',
        description: '',
        isPrivate: false,
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${API_BASE_URL}/playlists/${isEditing}`, formData);
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === isEditing
            ? { ...playlist, ...response.data.data }
            : playlist
        )
      );
      setIsEditing(null);
      setFormData({
        title: '',
        description: '',
        isPrivate: false,
      });
    } catch (error) {
      console.error('Error editing playlist:', error);
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/playlists/${id}`);
      setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
      setShowDropdown(null);
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-text-primary">Your Playlists</h1>
          <p className="text-text-secondary">Manage your video collections</p>
        </div>

        <Button
          variant="primary"
          className="mt-4 sm:mt-0"
          onClick={() => {
            setIsCreating(true);
            setIsEditing(null);
          }}
        >
          <PlusCircle size={18} className="mr-2" />
          Create Playlist
        </Button>
      </div>

      {(isCreating || isEditing) && (
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-6 text-xl font-bold text-text-primary">
            {isCreating ? 'Create New Playlist' : 'Edit Playlist'}
          </h3>

          <form onSubmit={isCreating ? handleCreateSubmit : handleEditSubmit} className="space-y-4">
            <Input
              label="Playlist Name"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter a name for your playlist"
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-text-primary">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="input"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a description for your playlist"
              />
            </div>

            <div className="flex items-center">
              <input
                id="isPrivate"
                name="isPrivate"
                type="checkbox"
                checked={formData.isPrivate}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
              />
              <label htmlFor="isPrivate" className="ml-2 block text-sm text-text-primary">
                Make this playlist private
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                {isCreating ? 'Create Playlist' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="card group overflow-hidden">
            <div className="relative">
              <Link to={`/playlist/${playlist.id}`}>
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="aspect-video w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="rounded-full bg-white bg-opacity-80 p-3 text-orange opacity-0 transition-opacity duration-300 hover:bg-opacity-100 group-hover:opacity-100">
                    <Play size={24} />
                  </button>
                </div>

                <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs font-medium text-white">
                  {playlist.videoCount} {playlist.videoCount === 1 ? 'video' : 'videos'}
                </div>
              </Link>

              <div className="absolute right-2 top-2">
                <div className="relative">
                  <button
                    className="rounded-full bg-black bg-opacity-70 p-2 text-white hover:bg-opacity-80"
                    onClick={() => toggleDropdown(playlist.id)}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {showDropdown === playlist.id && (
                    <div className="absolute right-0 top-8 z-10 w-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => startEditing(playlist)}
                      >
                        <Edit size={16} className="mr-2" />
                        Edit playlist
                      </button>

                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete playlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Link to={`/playlist/${playlist.id}`} className="block">
                    <h3 className="mb-1 font-medium text-text-primary hover:text-orange">
                      {playlist.title}
                    </h3>
                  </Link>

                  <div className="flex items-center text-xs text-text-secondary">
                    <span>Created {playlist.createdAt}</span>
                    <span className="mx-1">•</span>
                    {playlist.isPrivate ? (
                      <span className="flex items-center">
                        <Lock size={12} className="mr-1" />
                        Private
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Globe size={12} className="mr-1" />
                        Public
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {playlist.description && (
                <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                  {playlist.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PlaylistManagement;
