// Mock/local data for the Verve social app. No backend — everything lives in memory
// and resets on refresh. Swap this module out for real API calls when a backend exists.

export const currentUser = {
  id: 'u-me',
  name: 'Olivia Rhye',
  handle: '@oliviarhye',
  avatar: 'https://i.pravatar.cc/150?img=5',
  bio: 'Design lead by day, film photographer by weekend. Based in Lisbon.',
  cover: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80',
  followers: 1284,
  following: 312,
}

export const people = [
  { id: 'u1', name: 'Maya Chen', handle: '@mayachen', avatar: 'https://i.pravatar.cc/150?img=47', bio: 'Product designer, plant parent, matcha enthusiast.' },
  { id: 'u2', name: 'Jon Bell', handle: '@jonbell', avatar: 'https://i.pravatar.cc/150?img=12', bio: 'Building small, useful things. Coffee > sleep.' },
  { id: 'u3', name: 'Lina Park', handle: '@linapark', avatar: 'https://i.pravatar.cc/150?img=32', bio: 'Wandering with a camera. Currently: Lisbon.' },
  { id: 'u4', name: 'Theo Alvarez', handle: '@theoalvarez', avatar: 'https://i.pravatar.cc/150?img=15', bio: 'Runner, home cook, occasional DJ.' },
  { id: 'u5', name: 'Sasha Kim', handle: '@sashakim', avatar: 'https://i.pravatar.cc/150?img=9', bio: 'Illustrator. Draws mostly cats and clouds.' },
]

export const findPerson = (id) => [currentUser, ...people].find((p) => p.id === id)

export const initialStories = [
  { id: 's1', person: people[0], viewed: false, items: [
    { image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80', caption: 'Studio light, finally right.' },
  ] },
  { id: 's2', person: people[1], viewed: false, items: [
    { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', caption: 'Small batch, big flavor.' },
    { image: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=900&q=80', caption: 'Sunday brew day.' },
  ] },
  { id: 's3', person: people[2], viewed: true, items: [
    { image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=900&q=80', caption: 'Lisbon rooftops.' },
  ] },
  { id: 's4', person: people[3], viewed: false, items: [
    { image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=80', caption: 'Long run, longer sunset.' },
  ] },
  { id: 's5', person: people[4], viewed: true, items: [
    { image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80', caption: 'New sketchbook, who dis.' },
  ] },
]

export const initialPosts = [
  {
    id: 'p1', person: people[0], time: '18 min ago',
    text: 'A quiet corner, a fresh page, and enough coffee to make it count.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',
    likes: 248, liked: false,
    comments: [
      { id: 'c1', person: people[1], text: 'This light though 😍' },
    ],
  },
  {
    id: 'p2', person: people[1], time: '2 hrs ago',
    text: 'Weekend light hits different. Found this little piece of blue on my walk.',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85',
    likes: 93, liked: false, comments: [],
  },
  {
    id: 'p7', person: people[1], time: 'Yesterday',
    text: 'A good cup of coffee makes even the smallest project feel possible.',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85',
    likes: 118, liked: false, comments: [],
  },
  {
    id: 'p8', person: people[1], time: '2 days ago',
    text: 'Collected a few textures from the morning walk.',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85',
    likes: 71, liked: false, comments: [],
  },
  {
    id: 'p3', person: people[2], time: '5 hrs ago',
    text: 'Three days in, and Lisbon still finds a new rooftop to show me.',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85',
    likes: 512, liked: true,
    comments: [
      { id: 'c2', person: currentUser, text: 'Take me with you next time' },
      { id: 'c3', person: people[3], text: 'The tiles on that building!!' },
    ],
  },
  {
    id: 'p4', person: people[3], time: 'Yesterday',
    text: 'PR day. Legs are gone but the view was worth it.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85',
    likes: 76, liked: false, comments: [],
  },
  { id: 'p5', person: people[4], time: 'Yesterday', text: 'A few quiet lines before the day gets loud.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead?auto=format&fit=crop&w=1200&q=85', likes: 134, liked: false, comments: [] },
  { id: 'p6', person: people[0], time: 'Yesterday', text: 'Found a corner of the city that feels made for slow afternoons.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85', likes: 187, liked: false, comments: [] }
]

export const initialConversations = [
  {
    id: 'm1', person: people[2], online: true,
    messages: [
      { id: 1, from: 'them', text: 'Hey Olivia, loved your latest post. The light is perfect.', time: '9:14 AM' },
      { id: 2, from: 'me', text: 'Thank you! Golden hour did all the work honestly.', time: '9:20 AM' },
      { id: 3, from: 'them', text: 'Still counts as skill 😄 are you around this weekend?', time: '9:21 AM' },
    ],
  },
  {
    id: 'm2', person: people[0], online: false,
    messages: [
      { id: 1, from: 'them', text: 'Sent you the moodboard, let me know what you think', time: 'Yesterday' },
    ],
  },
  {
    id: 'm3', person: people[1], online: true,
    messages: [
      { id: 1, from: 'me', text: 'That espresso setup looks unreal', time: 'Mon' },
      { id: 2, from: 'them', text: 'Ha, took me three tries to get the shot', time: 'Mon' },
    ],
  },
  {
    id: 'm4', person: people[4], online: false,
    messages: [
      { id: 1, from: 'them', text: 'Following back! Your feed is so calming', time: 'Sun' },
    ],
  },
]

export const initialNotifications = [
  { id: 'n1', type: 'like', person: people[0], text: 'liked your post', time: '12m', read: false },
  { id: 'n2', type: 'follow', person: people[1], text: 'started following you', time: '1h', read: false },
  { id: 'n3', type: 'comment', person: people[2], text: 'mentioned you in a comment', time: '3h', read: false },
  { id: 'n4', type: 'like', person: people[3], text: 'liked your photo', time: '5h', read: true },
  { id: 'n5', type: 'follow', person: people[4], text: 'started following you', time: '1d', read: true },
  { id: 'n6', type: 'comment', person: people[1], text: 'commented: "This is incredible"', time: '2d', read: true },
]

export const categoriesData = {
  All: {
    name: 'All',
    tagline: 'Discover trending moments, stories, and creators across every craft.',
    stats: '24.8k posts · 1.4k creators',
    tags: ['#Trending', '#Visuals', '#Inspiration', '#Community', '#DailyMoments', '#Creators'],
    items: [
      {
        id: 'c-all-1',
        title: 'Golden Hour in the High Hills',
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
        author: people[2],
        likes: 342,
        comments: 18,
        meta: 'Leica M11 · 35mm f/1.4',
        location: 'Swiss Alps',
        caption: 'The way the evening fog rolled over the ridges made the whole valley look painted.',
        tags: ['#Photography', '#Travel', '#Nature']
      },
      {
        id: 'c-all-2',
        title: 'Minimalist Studio Desk',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
        author: people[0],
        likes: 215,
        comments: 12,
        meta: 'Figma · Studio Work',
        location: 'Berlin, Germany',
        caption: 'Clean surfaces, calm minds. Everything in its right place before starting a new sprint.',
        tags: ['#Design', '#Workspace', '#Minimalism']
      },
      {
        id: 'c-all-3',
        title: 'Sunset over Amalfi Clifftops',
        src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80',
        author: people[3],
        likes: 589,
        comments: 31,
        meta: 'Sony A7IV · 24-70mm',
        location: 'Positano, Italy',
        caption: 'The pastel houses catching the last amber rays of the Mediterranean sun.',
        tags: ['#Travel', '#Italy', '#Wanderlust']
      },
      {
        id: 'c-all-4',
        title: 'Generative Color Gradients',
        src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
        author: people[4],
        likes: 198,
        comments: 9,
        meta: 'Digital Canvas · 4K',
        location: 'Kyoto Studio',
        caption: 'Exploring natural flow dynamics in liquid pigments and generative meshes.',
        tags: ['#Art', '#Abstract', '#Digital']
      },
      {
        id: 'c-all-5',
        title: 'Mechanical Audio Setup',
        src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
        author: people[1],
        likes: 412,
        comments: 24,
        meta: 'Custom PCB · Brass Plate',
        location: 'San Francisco, CA',
        caption: 'Hand-lubed linear switches and brass weight. Pure tactile satisfaction.',
        tags: ['#Tech', '#Keyboards', '#Hardware']
      },
      {
        id: 'c-all-6',
        title: '35mm Film Streets of Lisbon',
        src: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=900&q=80',
        author: currentUser,
        likes: 376,
        comments: 22,
        meta: 'Contax T2 · Portra 400',
        location: 'Alfama, Lisbon',
        caption: 'Yellow tram crawling up the cobblestone hills in the morning breeze.',
        tags: ['#Photography', '#Film35mm', '#Lisbon']
      }
    ]
  },
  Photography: {
    name: 'Photography',
    tagline: 'Candid lenses, 35mm film grain, golden hour captures & street aesthetics.',
    stats: '8.4k shots · 420 photographers',
    tags: ['#35mmFilm', '#StreetPhotography', '#Portraits', '#GoldenHour', '#Monochrome', '#Cinematic'],
    items: [
      {
        id: 'c-photo-1',
        title: 'Natural Light Portrait Study',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        author: people[2],
        likes: 640,
        comments: 34,
        meta: 'Fujifilm GFX 100S · 80mm f/1.7',
        location: 'Copenhagen, Denmark',
        caption: 'Soft northern window light on an overcast afternoon.',
        tags: ['#Portraits', '#NaturalLight', '#MediumFormat']
      },
      {
        id: 'c-photo-2',
        title: 'Classic Ride on 35mm',
        src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
        author: currentUser,
        likes: 482,
        comments: 19,
        meta: 'Leica M6 · Kodak Gold 200',
        location: 'Los Angeles, CA',
        caption: 'Sunbaked silver coupe resting under the California palms.',
        tags: ['#Film35mm', '#Vintage', '#Street']
      },
      {
        id: 'c-photo-3',
        title: 'Neon Reflections in the Rain',
        src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
        author: people[0],
        likes: 512,
        comments: 28,
        meta: 'Sony A7R V · 50mm f/1.2 GM',
        location: 'Shinjuku, Tokyo',
        caption: 'Puddles turning night streets into liquid light shows.',
        tags: ['#Tokyo', '#NightPhotography', '#Cinematic']
      },
      {
        id: 'c-photo-4',
        title: 'Coastal Mist & Crashing Waves',
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
        author: people[3],
        likes: 390,
        comments: 15,
        meta: 'Nikon Z8 · 70-200mm f/2.8',
        location: 'Big Sur, CA',
        caption: 'Watching the Pacific swell break into emerald sea foam.',
        tags: ['#Seascape', '#Coastal', '#BigSur']
      },
      {
        id: 'c-photo-5',
        title: 'The Silent Pines in Morning Fog',
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
        author: people[1],
        likes: 310,
        comments: 11,
        meta: 'Hasselblad 500C/M · Portra 160',
        location: 'Black Forest, Germany',
        caption: 'Total silence as the first rays break through the pines.',
        tags: ['#Forest', '#Atmospheric', '#Film']
      },
      {
        id: 'c-photo-6',
        title: 'Dusk Over High Ridge Peaks',
        src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80',
        author: people[2],
        likes: 467,
        comments: 23,
        meta: 'Fujifilm X-T5 · 23mm f/1.4',
        location: 'Dolomites, Italy',
        caption: 'Layered mountain silhouettes turning violet in twilight.',
        tags: ['#Mountains', '#Dolomites', '#Landscape']
      }
    ]
  },
  Design: {
    name: 'Design',
    tagline: 'Minimalist typography, clean layouts, spatial interfaces & architecture.',
    stats: '5.2k designs · 310 designers',
    tags: ['#UIUX', '#Typography', '#Architecture', '#DesignSystems', '#Branding', '#Minimalism'],
    items: [
      {
        id: 'c-des-1',
        title: 'Modern Organic Living Space',
        src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
        author: people[0],
        likes: 540,
        comments: 29,
        meta: 'ArchDaily Feature · Scandinavian',
        location: 'Stockholm, Sweden',
        caption: 'Natural timber, cast concrete, and soft linen creating warm minimalism.',
        tags: ['#InteriorDesign', '#Architecture', '#Minimal']
      },
      {
        id: 'c-des-2',
        title: 'Editorial Typography & Poster Grid',
        src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
        author: people[4],
        likes: 388,
        comments: 16,
        meta: 'Swiss Style · Grid System',
        location: 'Zurich, Switzerland',
        caption: 'Playing with tight kerning, asymmetrical balance, and high contrast.',
        tags: ['#Typography', '#GraphicDesign', '#SwissDesign']
      },
      {
        id: 'c-des-3',
        title: 'Curved Concrete Villa',
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        author: people[1],
        likes: 672,
        comments: 41,
        meta: 'Architectural Digest · Modern',
        location: 'Mallorca, Spain',
        caption: 'Sculptural architecture responding directly to surrounding sea views.',
        tags: ['#Architecture', '#Villa', '#Modernism']
      },
      {
        id: 'c-des-4',
        title: 'Ergonomic Creative Workspace',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
        author: currentUser,
        likes: 295,
        comments: 14,
        meta: 'Studio Tour · Natural Oak',
        location: 'Lisbon, Portugal',
        caption: 'Thoughtfully designed spaces inspire more mindful creative output.',
        tags: ['#Workspace', '#Interior', '#Productivity']
      }
    ]
  },
  Travel: {
    name: 'Travel',
    tagline: 'Scenic vistas, coastal escapes, hidden heritage alleys & wanderlust stories.',
    stats: '9.1k travels · 540 explorers',
    tags: ['#Kyoto', '#Amalfi', '#Alps', '#Roadtrips', '#Wanderlust', '#HiddenGems'],
    items: [
      {
        id: 'c-trav-1',
        title: 'Autumn Paths of Arashiyama',
        src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
        author: people[2],
        likes: 720,
        comments: 48,
        meta: 'Kyoto Heritage · 4K',
        location: 'Kyoto, Japan',
        caption: 'Crimson maple leaves falling onto ancient moss-covered stone lanterns.',
        tags: ['#Japan', '#Kyoto', '#Autumn']
      },
      {
        id: 'c-trav-2',
        title: 'Mirror Reflections on Lake Alpine',
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80',
        author: people[3],
        likes: 615,
        comments: 32,
        meta: 'Glacier Lake · Sunrise',
        location: 'Banff National Park, Canada',
        caption: 'Glassy turquoise water perfectly mirroring the morning alpine sky.',
        tags: ['#Canada', '#Banff', '#Alpine']
      },
      {
        id: 'c-trav-3',
        title: 'The Blue Domes of Oia',
        src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
        author: people[0],
        likes: 540,
        comments: 26,
        meta: 'Aegean Sea · Mediterranean',
        location: 'Santorini, Greece',
        caption: 'Whitewashed terraces carved into volcanic cliffs overlooking the caldera.',
        tags: ['#Greece', '#Santorini', '#Islands']
      },
      {
        id: 'c-trav-4',
        title: 'Thundering Power of Seljalandsfoss',
        src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=900&q=80',
        author: people[1],
        likes: 490,
        comments: 21,
        meta: 'Iceland Ring Road · RAW',
        location: 'South Coast, Iceland',
        caption: 'Standing behind the waterfall mist under the midnight twilight glow.',
        tags: ['#Iceland', '#Waterfalls', '#Adventure']
      }
    ]
  },
  Art: {
    name: 'Art',
    tagline: 'Abstract paintings, digital sculptures, generative shaders & handcrafted ceramics.',
    stats: '4.8k artworks · 280 artists',
    tags: ['#AbstractArt', '#Ceramics', '#DigitalArt', '#Illustrations', '#OilPainting', '#Sculpture'],
    items: [
      {
        id: 'c-art-1',
        title: 'Dynamic Acrylic Chroma Flow',
        src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
        author: people[4],
        likes: 430,
        comments: 22,
        meta: 'Mixed Media on Linen · 120x150cm',
        location: 'Seoul, South Korea',
        caption: 'Layers of translucent cobalt, warm ochre, and pure titanium white.',
        tags: ['#Painting', '#ContemporaryArt', '#Abstract']
      },
      {
        id: 'c-art-2',
        title: 'Handcrafted Ceramic Vessel Study',
        src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
        author: people[0],
        likes: 360,
        comments: 17,
        meta: 'Stoneware Clay · Matte Glaze',
        location: 'Copenhagen Studio',
        caption: 'Wheel-thrown organic silhouette with subtle tactile ridges.',
        tags: ['#Ceramics', '#Craft', '#StudioPottery']
      },
      {
        id: 'c-art-3',
        title: 'Surrealist Dream Sketchbook',
        src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
        author: people[4],
        likes: 512,
        comments: 31,
        meta: 'Gouache & Ink on Paper',
        location: 'Tokyo Studio',
        caption: 'Midnight sketchbook exploration on wandering thoughts and quiet skies.',
        tags: ['#Illustration', '#Sketchbook', '#Gouache']
      },
      {
        id: 'c-art-4',
        title: 'Fluid Watercolor Impression',
        src: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=900&q=80',
        author: people[2],
        likes: 295,
        comments: 13,
        meta: 'Cotton Rag Paper · French Pigments',
        location: 'Paris, France',
        caption: 'Letting water tension and mineral pigments decide the final composition.',
        tags: ['#Watercolor', '#FineArt', '#Abstract']
      }
    ]
  },
  Tech: {
    name: 'Tech',
    tagline: 'Minimalist workstations, custom hardware, next-gen interfaces & creative tooling.',
    stats: '6.7k posts · 380 builders',
    tags: ['#Setups', '#Hardware', '#Developer', '#Keyboards', '#Audiophile', '#FutureUI'],
    items: [
      {
        id: 'c-tech-1',
        title: 'Custom 65% Mechanical Board',
        src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
        author: people[1],
        likes: 680,
        comments: 52,
        meta: 'Gateron Oil Kings · GMK Keycaps',
        location: 'San Francisco, CA',
        caption: 'Clean deep thock with lubed stabilizers and brass internal sound dampening.',
        tags: ['#MechKeyboards', '#CustomBuild', '#Hardware']
      },
      {
        id: 'c-tech-2',
        title: 'Ultrawide Dark Mode Dev Environment',
        src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        author: people[3],
        likes: 530,
        comments: 38,
        meta: 'Neovim · React 19 · Vite',
        location: 'Seattle, WA',
        caption: 'Zero distractions, custom monospace typography, and ultra-low latency workflow.',
        tags: ['#Developer', '#Coding', '#Workspace']
      },
      {
        id: 'c-tech-3',
        title: 'Audiophile Listening Station',
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        author: currentUser,
        likes: 410,
        comments: 25,
        meta: 'Open-Back Planar Magnetic · Tube Amp',
        location: 'Lisbon Studio',
        caption: 'Warm analog tubes powering acoustic lossless soundscapes for deep focus sessions.',
        tags: ['#Audiophile', '#Headphones', '#Sound']
      },
      {
        id: 'c-tech-4',
        title: 'Minimalist Engineering Desk',
        src: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
        author: people[0],
        likes: 375,
        comments: 19,
        meta: 'Custom Monitor Arm · Studio Display',
        location: 'Berlin, Germany',
        caption: 'Hidden cable routing and warm monitor backlighting for late night coding.',
        tags: ['#DeskSetup', '#CleanSetup', '#MinimalTech']
      }
    ]
  }
}

export const exploreImages = categoriesData.All.items.map((i) => i.src)
