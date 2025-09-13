// FIX: Import React to use hooks like useState, useRef, and useEffect.
import React from 'react';
import { Card, Button, Avatar, Input } from './UI.jsx';
import { PlusIcon, PencilIcon, DocumentIcon, UploadIcon, DownloadIcon, BriefcaseIcon } from './Icons.jsx';

export const EditProfileModal = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = React.useState({ ...user });
    const modalRef = React.useRef();

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
            <div ref={modalRef} className="w-full max-w-2xl">
              <Card className="max-h-[90vh] overflow-y-auto">
                  <form onSubmit={handleSubmit}>
                      <div className="p-6">
                          <div className="flex justify-between items-center mb-6">
                              <h2 id="edit-profile-title" className="text-xl font-semibold text-gray-900">Edit Profile</h2>
                              <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
                          </div>
                          
                          <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                                </div>
                              </div>
                              <div>
                                  <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                                  <Input id="headline" name="headline" value={formData.headline} onChange={handleChange} />
                              </div>
                              <div>
                                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">About</label>
                                  <textarea id="about" name="about" rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2" value={formData.about} onChange={handleChange}></textarea>
                              </div>
                               <div>
                                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                                  <Input id="avatarUrl" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} />
                              </div>
                               <div>
                                  <label htmlFor="bannerUrl" className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                                  <Input id="bannerUrl" name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} />
                              </div>
                          </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                          <Button type="submit">Save Changes</Button>
                      </div>
                  </form>
              </Card>
            </div>
        </div>
    );
};

export const UploadCvModal = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = React.useState({ 
        filename: user.cv?.filename || '',
        url: user.cv?.url || '' 
    });
    const modalRef = React.useRef();
    
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="upload-cv-title">
            <div ref={modalRef} className="w-full max-w-lg">
              <Card>
                  <form onSubmit={handleSubmit}>
                      <div className="p-6">
                          <div className="flex justify-between items-center mb-6">
                              <h2 id="upload-cv-title" className="text-xl font-semibold text-gray-900">Upload CV</h2>
                              <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
                          </div>
                          <div className="space-y-4">
                              <p className="text-sm text-gray-600">Since file uploads are not supported in this demo, please provide a URL to your CV.</p>
                              <div>
                                  <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                                  <Input id="filename" name="filename" placeholder="e.g., YourName_Resume.pdf" value={formData.filename} onChange={handleChange} required />
                              </div>
                              <div>
                                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">CV URL</label>
                                  <Input id="url" name="url" placeholder="https://example.com/resume.pdf" value={formData.url} onChange={handleChange} required />
                              </div>
                          </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                          <Button type="submit">Save</Button>
                      </div>
                  </form>
              </Card>
            </div>
        </div>
    );
};

export const AddCertificateModal = ({ onSave, onClose }) => {
    const [formData, setFormData] = React.useState({ title: '', issuer: '', url: '' });
    const modalRef = React.useRef();

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-cert-title">
            <div ref={modalRef} className="w-full max-w-lg">
              <Card>
                  <form onSubmit={handleSubmit}>
                      <div className="p-6">
                          <div className="flex justify-between items-center mb-6">
                              <h2 id="add-cert-title" className="text-xl font-semibold text-gray-900">Add Certificate</h2>
                              <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
                          </div>
                          <div className="space-y-4">
                              <div>
                                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
                                  <Input id="title" name="title" placeholder="e.g., Advanced React" value={formData.title} onChange={handleChange} required />
                              </div>
                              <div>
                                  <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                                  <Input id="issuer" name="issuer" placeholder="e.g., Coursera" value={formData.issuer} onChange={handleChange} required />
                              </div>
                              <div>
                                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
                                  <Input id="url" name="url" placeholder="https://example.com/certificate" value={formData.url} onChange={handleChange} />
                              </div>
                          </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                          <Button type="submit">Save</Button>
                      </div>
                  </form>
              </Card>
            </div>
        </div>
    );
};

const ProfileHeader = ({ user, currentUser, onEditProfile }) => {
    const isOwnProfile = user.id === currentUser.id;
    return (
      <Card>
          <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${user.bannerUrl})` }}></div>
          <div className="px-6 pb-6">
              <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} size="xl" className="-mt-20 border-8 border-white" />
              <div className="flex justify-between items-start mt-4">
                  <div>
                      <h1 className="text-3xl font-bold text-gray-900">{`${user.firstName} ${user.lastName}`}</h1>
                      <p className="text-lg text-gray-700">{user.headline}</p>
                      <p className="text-md text-gray-500 mt-1">{user.location}</p>
                      <p className="text-sm text-primary font-semibold mt-2">{user.connections} connections</p>
                  </div>
                  <div>
                      {isOwnProfile ? (
                        <Button variant="secondary" onClick={onEditProfile}><PencilIcon className="h-5 w-5 mr-2" /> Edit Profile</Button>
                      ) : (
                        <>
                          <Button><PlusIcon className="h-5 w-5 mr-2" />Connect</Button>
                          <Button as="a" href={`#/messages/${user.id}`} variant="secondary" className="ml-2">Message</Button>
                        </>
                      )}
                  </div>
              </div>
          </div>
      </Card>
    );
};
const ProfileSection = ({ title, children }) => (
      <Card className="mt-6">
          <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
              {children}
          </div>
      </Card>
);
const ExperienceItem = ({ item }) => (
      <div className="flex">
          <div className="flex-shrink-0 mr-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <BriefcaseIcon className="h-6 w-6 text-gray-500" />
              </div>
          </div>
          <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-md text-gray-700">{item.company} &middot; {item.location}</p>
              <p className="text-sm text-gray-500">{item.startDate} - {item.endDate || 'Present'}</p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
      </div>
);
const ProjectItem = ({ item }) => (
    <div className="flex items-start space-x-4">
        {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />}
          <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              {item.link && <a href={item.link} className="text-sm text-primary hover:underline mt-2 inline-block">View Project</a>}
          </div>
      </div>
);
const DocumentsSection = ({ user, isOwnProfile, onUploadCv, onAddCertificate }) => {
    return (
        <ProfileSection title="Documents & Certifications">
            <div className="space-y-6">
                {/* CV Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Curriculum Vitae (CV)</h3>
                    {user.cv ? (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <div className="flex items-center">
                                <DocumentIcon className="h-6 w-6 text-primary mr-3" />
                                <span className="font-medium text-gray-700">{user.cv.filename}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <a href={user.cv.url} download={user.cv.filename} className="inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-secondary text-primary border border-primary hover:bg-blue-100 px-3 py-1 text-sm">
                                    <DownloadIcon className="h-4 w-4 mr-1"/> Download
                                </a>
                                {isOwnProfile && (
                                    <Button variant="ghost" className="px-3 py-1 text-sm" onClick={onUploadCv}>Replace</Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500 mb-2">No CV uploaded.</p>
                            {isOwnProfile && (
                                <Button variant="secondary" onClick={onUploadCv}><UploadIcon className="h-5 w-5 mr-2"/> Upload CV</Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Certificates Section */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                       <h3 className="text-lg font-semibold text-gray-800">Certificates</h3>
                        {isOwnProfile && (
                           <Button variant="ghost" onClick={onAddCertificate}><PlusIcon className="h-5 w-5 mr-1"/> Add Certificate</Button>
                       )}
                    </div>

                    {user.certificates && user.certificates.length > 0 ? (
                         <div className="-mx-6">
                            <ul className="divide-y divide-gray-200">
                                {user.certificates.map(cert => (
                                    <li key={cert.id} className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                             <div className="flex-shrink-0 mr-4">
                                                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                      <DocumentIcon className="h-6 w-6 text-gray-500" />
                                                  </div>
                                              </div>
                                              <div>
                                                  <h4 className="font-semibold text-gray-800">{cert.title}</h4>
                                                  <p className="text-sm text-gray-500">{cert.issuer} - Issued {cert.issueDate}</p>
                                              </div>
                                        </div>
                                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:underline">
                                            View Credential
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No certificates added.</p>
                    )}
                </div>
            </div>
        </ProfileSection>
    );
};

export const ProfilePage = ({ userId, users, currentUser, onEditProfile, onUpdateUser }) => {
    const user = users.find(u => u.id === userId);

    if (!user) {
        return <div className="text-center py-10">User not found.</div>;
    }
    
    const isOwnProfile = currentUser.id === userId;

    return (
        <div className="max-w-4xl mx-auto">
            <ProfileHeader user={user} currentUser={currentUser} onEditProfile={() => onUpdateUser({ isEditModalOpen: true })} />
            
            <ProfileSection title="About">
                <p className="text-gray-700 whitespace-pre-line">{user.about}</p>
            </ProfileSection>

             <ProfileSection title="Experience">
                  <div className="-mx-6">
                      <ul className="divide-y divide-gray-200">
                          {user.experience.map(exp => (
                              <li key={exp.id} className="px-6 py-4">
                                  <ExperienceItem item={exp} />
                              </li>
                          ))}
                      </ul>
                  </div>
              </ProfileSection>

              {user.projects.length > 0 && (
                  <ProfileSection title="Projects">
                       <div className="-mx-6">
                          <ul className="divide-y divide-gray-200">
                              {user.projects.map(proj => (
                                  <li key={proj.id} className="px-6 py-4">
                                      <ProjectItem item={proj} />
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </ProfileSection>
              )}
              
              <DocumentsSection
                user={user}
                isOwnProfile={isOwnProfile}
                onUploadCv={() => onUpdateUser({ isUploadCvModalOpen: true })}
                onAddCertificate={() => onUpdateUser({ isAddCertificateModalOpen: true })}
              />
        </div>
    );
};