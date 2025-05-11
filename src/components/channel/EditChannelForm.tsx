// EditChannelForm.tsx
import React from 'react';

interface EditChannelFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const EditChannelForm: React.FC<EditChannelFormProps> = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Channel Name"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Channel Description"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        placeholder="Category"
      />
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleInputChange}
        placeholder="Tags"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditChannelForm;
