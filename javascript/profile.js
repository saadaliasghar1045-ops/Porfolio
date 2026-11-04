/* ==========================================================================
   PROFILE DATA  -  the ONE file you edit to change the site's content.
   Add a tool, a skill, a project or a journey chapter by copying a line.
   See README.md for step-by-step instructions.
   ========================================================================== */
window.PORTFOLIO = {
  /* ---------- About you ---------- */
  profile: {
    name: 'Saad Ali Asghar', // <-- put your real name here
    email: '', // <-- e.g. 'you@example.com' (enables the contact form)
    github: 'https://github.com/saadaliasghar1045-ops',
    linkedin: 'https://www.linkedin.com/in/saad-ali-asghar/',
    social: [
      { label: 'GitHub', href: 'https://github.com/saadaliasghar1045-ops', icon: 'i-github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saad-ali-asghar/', icon: 'i-linkedin' },
    ],
    rotatingWords: ['Deep Learning', 'Machine Learning', 'Reinforcement Learning', 'Feature Engineering', 'FastAPI'],
  },

  /* ---------- 1. Academic skills ----------
     group: 'core' (big cards) | 'data' (data-craft steps) | 'delivery' (wide card)
     icon : name from the ICONS list in javascript/skills.js                     */
  academic: [
    { title: 'Machine Learning', group: 'core', icon: 'chart', text: 'Regression, trees, boosting and the habits that make models generalise.' },
    { title: 'Reinforcement Learning', group: 'core', icon: 'loop', text: 'Agents, rewards and policies: learning by trying, failing and improving.' },
    { title: 'Data Collection', group: 'data', icon: 'download', text: 'Finding and gathering data worth learning from.' },
    { title: 'Data Preparation', group: 'data', icon: 'layers', text: 'Shaping raw tables into model-ready input.' },
    { title: 'Data Cleaning', group: 'data', icon: 'sparkle', text: 'Missing values, outliers and noise handled with care.' },
    { title: 'Feature Engineering', group: 'data', icon: 'wrench', text: 'Creating signals the model can actually use.' },
    { title: 'Feature Extraction', group: 'data', icon: 'filter', text: 'Distilling the essence of data into compact features.' },
    { title: 'Building & Delivery', group: 'delivery', icon: 'rocket', text: 'A model only matters when someone can use it, so I wrap it in FastAPI and ship it to a clean interface.' },
  ],

  /* ---------- 2. Technologies ----------
     icon: file inside assets/icons (leave empty for an automatic monogram)
     cat : 'Deep Learning' | 'Data & Viz' | 'Boosting' | 'Web & Delivery' | 'Math'      */
  tools: [
    { name: 'PyTorch', icon: 'pytorch.svg', cat: 'Deep Learning', color: 'var(--c-pink)' },
    { name: 'TensorFlow', icon: 'tensorflow.svg', cat: 'Deep Learning', color: 'var(--c-yellow)' },
    { name: 'Keras', icon: 'keras.svg', cat: 'Deep Learning', color: 'var(--c-pink)' },
    { name: 'Scikit-learn', icon: 'scikitlearn.svg', cat: 'Data & Viz', color: 'var(--c-yellow)' },
    { name: 'NumPy', icon: 'numpy.svg', cat: 'Data & Viz', color: 'var(--c-blue)' },
    { name: 'Pandas', icon: 'pandas.svg', cat: 'Data & Viz', color: 'var(--c-purple)' },
    { name: 'Matplotlib', icon: 'matplotlib.svg', cat: 'Data & Viz', color: 'var(--c-blue)' },
    { name: 'Seaborn', icon: 'seaborn.svg', cat: 'Data & Viz', color: 'var(--c-teal)' },
    { name: 'SciPy', icon: '', mono: 'Sp', cat: 'Math', color: 'var(--c-blue)' },
    { name: 'SVD', icon: '', mono: 'Σ', cat: 'Math', color: 'var(--c-purple)' },
    { name: 'XGBoost', icon: '', mono: 'XG', cat: 'Boosting', color: 'var(--c-teal)' },
    { name: 'LightGBM', icon: '', mono: 'LG', cat: 'Boosting', color: 'var(--c-purple)' },
    { name: 'CatBoost', icon: '', mono: 'CB', cat: 'Boosting', color: 'var(--c-yellow)' },
    { name: 'FastAPI', icon: 'fastapi.svg', cat: 'Web & Delivery', color: 'var(--c-teal)' },
    { name: 'HTML5', icon: 'html5.svg', cat: 'Web & Delivery', color: 'var(--c-pink)' },
    { name: 'CSS3', icon: 'css3.svg', cat: 'Web & Delivery', color: 'var(--c-blue)' },
    { name: 'JavaScript', icon: 'javascript.svg', cat: 'Web & Delivery', color: 'var(--c-yellow)' },
    { name: 'Git', icon: 'git.svg', cat: 'Web & Delivery', color: 'var(--c-pink)' },
    { name: 'GitHub', icon: 'github.svg', cat: 'Web & Delivery', color: 'var(--c-purple)' },
  ],

  /* ---------- Projects ----------
     image: file inside assets/images. link / code: optional URLs (buttons hide when empty) */
  projects: [
    {
      title: 'Planter AI',
      tag: 'Machine Learning',
      text: 'A crop recommendation app. It reads seven soil and environmental conditions and a trained model suggests the crop most likely to thrive on that land.',
      image: 'planter-ai.jpg',
      stack: ['Python', 'HTML/CSS/Js', 'Fastapi'],
      link: 'https://saadaliasghar1045-ops.github.io/PlanterAI/',
      code: 'https://github.com/saadaliasghar1045-ops/PlanterAI',
    },
    {
      title: 'Cinematix',
      tag: 'Web · Discovery',
      text: 'A cinematic movie discovery interface with trending picks, a Find Movies page and a light and dark mode, built to make browsing films feel like a premiere.',
      image: 'cinematix.jpg',
      stack: ['HTML/CSS/Js', 'Fastapi', 'Python'],
      link: 'https://saadaliasghar1045-ops.github.io/Cine-Matix/pages/index.html',
      code: 'https://github.com/saadaliasghar1045-ops/Cine-Matix',
    },
  ],

  /* ---------- Journey (newest chapter last) ---------- */
  timeline: [
    { when: 'The start', title: 'ICS at PGC', text: 'Started Intermediate in Computer Science at PGC, where programming stopped being a subject and became a habit.' },
    { when: 'Web foundations', title: 'HTML, CSS & JavaScript', text: 'Learned to build interfaces from YouTube and tutorials, mostly by breaking pages and fixing them.' },
    { when: 'Python era', title: 'Python & its libraries', text: 'Picked up Python, NumPy, Pandas and Matplotlib, and learned to look at data before trusting it.' },
    { when: 'The turning point', title: 'Andrew Ng & Machine Learning', text: 'Worked through Andrew Ng\'s Machine Learning . This is where everything clicked.' },
    { when: 'Physical AI', title: 'Reinforcement Learning', text: 'Exploring agents that learn by interaction, and sharpening the data craft behind every good model.' },
    { when: 'Going further', title: 'Frameworks & boosting', text: 'PyTorch, TensorFlow, Keras, XGBoost, LightGBM and CatBoost joined the toolbox, along with feature engineering and SVD.' },
    { when: 'Shipping', title: 'FastAPI & real projects', text: 'Started wrapping models behind APIs and building products like Planter AI and Cinematix.' },
    { when: 'Now', title: 'Deep Learning', text: 'Deep diving into neural networks and modern architectures (Transformers, RNNs, CNNs), with a core focus on mastering NLP and Generative AI.' },
  ],
};
