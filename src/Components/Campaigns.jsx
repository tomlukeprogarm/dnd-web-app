import { useState } from 'react';

const Campaigns = () => {
  const [folders, setFolders] = useState([
    // Example initial folders
    { id: 1, name: 'Session 1', files: [] },
    { id: 2, name: 'Session 2', files: [] },
  ]);

  const handleFileUpload = (folderId, files) => {
    // Find the folder by its ID
    const updatedFolders = folders.map((folder) => {
      if (folder.id === folderId) {
        // Update the folder by adding the uploaded files
        return { ...folder, files: [...folder.files, ...files] };
      }
      return folder;
    });

    // Update the state with the updated folder structure
    setFolders(updatedFolders);
  };

  const handleFolderCreate = (folderName) => {
    const newFolder = {
      id: folders.length + 1,
      name: folderName,
      files: [],
    };
    setFolders([...folders, newFolder]);
  };

  const handleDeleteCampaign = (id) => {
    const updatedFolders = folders.filter((folder) => folder.id !== id);
    setFolders(updatedFolders);
  };

  return (
    <div>
      <h2>Campaigns</h2>
      <div>
        {/* Component for creating new folders */}
        <button onClick={() => handleFolderCreate('New Folder')}>
          Create Folder
        </button>
      </div>
      <div>
        {/* Display existing folders */}
        {folders.map((folder) => (
          <div key={folder.id}>
            <h3>{folder.name}</h3>
            {/* Component for file upload */}
            <input
              type="file"
              multiple
              onChange={(e) =>
                handleFileUpload(folder.id, Array.from(e.target.files))
              }
            />
            {/* Display files in the folder */}
            <ul>
              {folder.files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            {/* Delete campaign button */}
            <button onClick={() => handleDeleteCampaign(folder.id)}>
              Delete Campaign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
