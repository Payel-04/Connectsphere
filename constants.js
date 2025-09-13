export const INITIAL_USERS = [
    {
      id: '1',
      firstName: 'Alexia',
      lastName: 'Grant',
      email: 'alexia.grant@example.com',
      headline: 'Senior Frontend Engineer @ TechCorp',
      location: 'San Francisco, CA',
      avatarUrl: 'https://picsum.photos/seed/user1/200/200',
      bannerUrl: 'https://picsum.photos/seed/banner1/1200/300',
      about: 'Passionate frontend developer with 8+ years of experience building scalable and user-friendly web applications. Specializing in React, TypeScript, and modern web technologies. Always eager to learn and tackle new challenges.',
      connections: 1258,
      experience: [
        { id: 1, title: 'Senior Frontend Engineer', company: 'TechCorp', location: 'San Francisco, CA', startDate: 'Jan 2022', endDate: null, description: 'Leading the development of the main user dashboard using React and TypeScript.' },
        { id: 2, title: 'Frontend Engineer', company: 'Innovate Solutions', location: 'Austin, TX', startDate: 'Jun 2018', endDate: 'Dec 2021', description: 'Developed and maintained components for a large-scale e-commerce platform.' },
      ],
      projects: [
        { id: 1, name: 'Project Phoenix', description: 'A complete redesign of the company\'s flagship product, improving user engagement by 25%.', imageUrl: 'https://picsum.photos/seed/project1/400/300' },
        { id: 2, name: 'Open Source UI Library', description: 'Contributor to a popular open-source component library used by thousands of developers.', link: '#' },
      ],
      cv: {
        filename: 'Alexia_Grant_Resume_2024.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL1Jlc291cmNlcyAyIDAgUgovQ29udGVudHMgNCAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9Qcm9jU2V0IFsvUERGLyBUZXh0XQovRm9udCA8PC9GMSA1IDAgUj4+Pj4KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZSAvUGFnZXMKL0tpZHMgWzEgMCBSIF0KL0NvdW50IDE+PgplbmRvYmoKNCAwIG9iago8PC9MZW5ndGggNTc+PgpzdHJlYW0KQkQKQVQgMC45IFRMCkJULzcxIDgxMyBUZAooQWxleGlhIEdyYW50IFJlc3VtZSkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhPj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFI+PgplbmRvYmoKCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' },
      certificates: [
        { id: 1, title: 'Advanced React Patterns', issuer: 'Frontend Masters', url: '#', issueDate: '2023-08-15' },
        { id: 2, title: 'Certified TypeScript Professional', issuer: 'TypeStrong Academy', url: '#', issueDate: '2022-11-20' }
      ]
    },
    {
      id: '2',
      firstName: 'Ben',
      lastName: 'Carter',
      email: 'ben.carter@example.com',
      headline: 'Product Manager @ Creativio',
      location: 'New York, NY',
      avatarUrl: 'https://picsum.photos/seed/user2/200/200',
      bannerUrl: 'https://picsum.photos/seed/banner2/1200/300',
      about: 'Driving product strategy and vision for innovative SaaS products. I bridge the gap between technical and business worlds to deliver value to customers.',
      connections: 873,
      experience: [
        { id: 1, title: 'Product Manager', company: 'Creativio', location: 'New York, NY', startDate: 'Mar 2020', endDate: null, description: 'Define product roadmap and collaborate with cross-functional teams.' },
      ],
      projects: [
        { id: 1, name: 'Mobile App Launch', description: 'Led the successful launch of our new mobile application, achieving 100k downloads in the first month.', imageUrl: 'https://picsum.photos/seed/project2/400/300' },
      ],
      cv: null,
      certificates: [],
    },
    {
      id: '3',
      firstName: 'Chloe',
      lastName: 'Davis',
      email: 'chloe.davis@example.com',
      headline: 'UX/UI Designer | Freelance',
      location: 'Remote',
      avatarUrl: 'https://picsum.photos/seed/user3/200/200',
      bannerUrl: 'https://picsum.photos/seed/banner3/1200/300',
      about: 'Crafting intuitive and beautiful digital experiences. I specialize in user-centered design, prototyping, and creating design systems.',
      connections: 512,
      experience: [
        { id: 1, title: 'UX/UI Designer', company: 'Freelance', location: 'Remote', startDate: 'Jan 2019', endDate: null, description: 'Working with various clients to design engaging websites and mobile applications.' },
      ],
      projects: [
        { id: 1, name: 'E-commerce Redesign', description: 'Complete UX overhaul for an online retailer, resulting in a 40% increase in conversions.', imageUrl: 'https://picsum.photos/seed/project3/400/300' },
      ],
      cv: null,
      certificates: [],
    },
    {
      id: '4',
      firstName: 'David',
      lastName: 'Miller',
      email: 'david.miller@example.com',
      headline: 'Data Scientist at QuantumLeap',
      location: 'Boston, MA',
      avatarUrl: 'https://picsum.photos/seed/user4/200/200',
      bannerUrl: 'https://picsum.photos/seed/banner4/1200/300',
      about: 'Using data to tell stories and drive business decisions. Expertise in machine learning, statistical analysis, and Python.',
      connections: 720,
      experience: [
        { id: 1, title: 'Data Scientist', company: 'QuantumLeap', location: 'Boston, MA', startDate: 'Feb 2021', endDate: null, description: 'Building predictive models to optimize marketing spend and user retention.' },
      ],
      projects: [],
      cv: null,
      certificates: [],
    }
  ];
  
export const CURRENT_USER_ID = '1';

export const INITIAL_POSTS = [
    {
      id: 1,
      authorId: '2',
      content: 'Excited to share that we just launched our new mobile app at Creativio! It was a huge team effort, and I\'m so proud of what we accomplished. Check it out and let me know your thoughts! #productlaunch #mobileapp #tech',
      timestamp: '2h ago',
      likedBy: ['1', '3', '4'],
      comments: [
        { id: 'c1', authorId: '1', content: 'Congrats Ben! Looks amazing.' },
        { id: 'c2', authorId: '3', content: 'Fantastic work! The UI is so clean.' },
      ],
    },
    {
      id: 2,
      authorId: '3',
      content: 'Just published a new article on my design portfolio about the importance of user feedback in the design process. Link in the comments. #uxdesign #uidesign #designthinking',
      timestamp: '1d ago',
      likedBy: [],
      comments: [],
    },
    {
      id: 3,
      authorId: '1',
      content: 'Just wrapped up a major refactor of our main dashboard at TechCorp. Performance is up by 30%! Big thanks to the team for their hard work. It\'s rewarding to see the impact on user experience. #react #typescript #webdev',
      timestamp: '3d ago',
      likedBy: ['2', '3', '4'],
      comments: [
        { id: 'c3', authorId: '2', content: 'That\'s a huge improvement, nice work Alexia!' }
      ],
    }
];

export const INITIAL_CONVERSATIONS = [
      { id: 'c1', participants: ['1', '2'], lastMessageTimestamp: '2024-05-20T10:05:00Z' },
      { id: 'c2', participants: ['1', '3'], lastMessageTimestamp: '2024-05-19T15:30:00Z' },
];

export const INITIAL_MESSAGES = [
      { id: 'm1', conversationId: 'c1', senderId: '1', content: 'Hey Ben, great job on the mobile app launch!', timestamp: '2024-05-20T10:00:00Z' },
      { id: 'm2', conversationId: 'c1', senderId: '2', content: 'Thanks, Alexia! The team is really proud of it.', timestamp: '2024-05-20T10:02:00Z' },
      { id: 'm3', conversationId: 'c1', senderId: '1', content: 'You should be! Let\'s catch up sometime this week to discuss a potential collaboration.', timestamp: '2024-05-20T10:05:00Z' },
      { id: 'm4', conversationId: 'c2', senderId: '3', content: 'Your article on UX was inspiring! I shared it with my network.', timestamp: '2024-05-19T15:28:00Z' },
      { id: 'm5', conversationId: 'c2', senderId: '1', content: 'That means a lot, Chloe! Thank you so much.', timestamp: '2024-05-19T15:30:00Z' },
];