import { useState } from 'react';
import './styles/campaigns.css';

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

  const handleEditFolderName = (id, newName) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === id) {
        return { ...folder, name: newName };
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  return (
    <div className="campaigns-container">
      <h2>Campaigns</h2>
      <button className='camp-folder' onClick={() => handleFolderCreate('New Folder')}>
          Create Folder
        </button>
      <div>
        {/* Display existing folders */}
        {folders.map((folder) => (
          <div className="folder-container" key={folder.id}>
            <h3>{folder.name}</h3>
            {/* Edit folder name */}
            <input
              type="text"
              value={folder.name}
              onChange={(e) => handleEditFolderName(folder.id, e.target.value)}
            />
             {/* Component for creating new folders */}
       
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