/* ==========================================================================
   PROFILE DATA  -  the ONE file you edit to change the site's content.
   Add a tool, a skill, a project or a journey chapter by copying a line.
   See README.md for step-by-step instructions.
   ========================================================================== */

  
window.PORTFOLIO = {
  /* ---------- About you ---------- */
  profile: {
    name: 'Saad Ali Asghar', // <-- put your real name here
    email: '', // Add a public contact email only if you want it displayed on the site.
    contactEndpoint: 'https://form-handler-a3539441.fastapicloud.dev/contact', // Optional: deployed HTTPS FastAPI endpoint, e.g. 'https://your-api.example.com/contact'.
    github: 'https://github.com/saadaliasghar1045-ops',
    linkedin: 'https://www.linkedin.com/in/saad-ali-asghar/',
    social: [
      { label: 'GitHub', href: 'https://github.com/saadaliasghar1045-ops', icon: 'i-github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saad-ali-asghar/', icon: 'i-linkedin' },
    ],
    rotatingWords: ['Deep Learning', 'Machine Learning', 'Reinforcement Learning', 'Model Development', 'Data Analytics'],
  },

  /* ---------- 1. Academic skills ----------
     group: 'core' (foundation cards) | 'data' (data workflow) | 'delivery' (wide card)
     icon : name from the ICONS list in javascript/skills.js                     */
  academic: [
    { title: 'Machine Learning', group: 'core', icon: 'chart', text: 'Studying supervised and unsupervised learning, including regression, classification, tree-based models and model evaluation.' },
    { title: 'Deep Learning', group: 'core', icon: 'brain', text: 'Exploring neural networks, their building blocks and training process, with a focus on developing a stronger practical understanding.' },
    { title: 'Reinforcement Learning', group: 'core', icon: 'loop', text: 'Learning how agents use states, actions, rewards and policies to improve decisions through interaction with an environment.' },
    { title: 'Data Analytics', group: 'core', icon: 'analytics', text: 'Exploring datasets with statistical analysis and visualisation to identify patterns, trends and useful insights.' },
    { title: 'Data Understanding & Feature Engineering', group: 'core', icon: 'filter', text: 'Using exploratory data analysis, feature creation, transformation and extraction to make data more informative for machine learning.' },
    { title: 'Calculus', group: 'core', icon: 'calculus', text: 'Studying differentiation, integration and optimisation as mathematical foundations for gradient-based learning.' },
    { title: 'Linear Algebra', group: 'core', icon: 'linearAlgebra', text: 'Working with vectors, matrices and transformations to understand the mathematical operations used in machine learning and neural networks.' },
    { title: 'Statistics', group: 'core', icon: 'statistics', text: 'Applying probability, distributions and statistical reasoning to interpret data, evaluate evidence and understand uncertainty.' },
    { title: 'Model Development & Training', group: 'core', icon: 'modelPipeline', text: 'Building machine learning workflows through algorithm selection, model training, hyperparameter tuning and performance evaluation.' },
    { title: 'Data Collection', group: 'data', icon: 'download', text: 'Finding relevant datasets and gathering information that supports a clearly defined problem.' },
    { title: 'Data Preparation', group: 'data', icon: 'layers', text: 'Organising raw data, selecting useful columns and preparing consistent inputs for analysis and modelling.' },
    { title: 'Data Cleaning', group: 'data', icon: 'sparkle', text: 'Identifying missing values, inconsistent records and potential outliers before modelling.' },
    { title: 'Feature Engineering', group: 'data', icon: 'wrench', text: 'Creating and transforming variables to help models capture useful patterns in data.' },
    { title: 'Feature Extraction', group: 'data', icon: 'filter', text: 'Transforming raw information into compact numerical representations that models can process.' },
    { title: 'Building & Delivery', group: 'delivery', icon: 'rocket', text: 'Connecting model predictions to usable applications with FastAPI and frontend technologies.' },
  ],

  /* ---------- 2. Technologies ----------
     icon: file inside assets/icons (leave empty for an automatic monogram)
     cat : 'Deep Learning' | 'Machine Learning' | 'Data & Math' | 'Boosting' | 'Web & Delivery'      */
  tools: [
    { name: 'PyTorch', icon: 'pytorch.svg', cat: 'Deep Learning', color: 'var(--c-pink)' },
    { name: 'TensorFlow', icon: 'tensorflow.svg', cat: 'Deep Learning', color: 'var(--c-yellow)' },
    { name: 'Keras', icon: 'keras.svg', cat: 'Deep Learning', color: 'var(--c-pink)' },
    { name: 'Scikit-learn', icon: 'scikitlearn.svg', cat: 'Machine Learning', color: 'var(--c-yellow)' },
    { name: 'NumPy', icon: 'numpy.svg', cat: 'Data & Math', color: 'var(--c-blue)' },
    { name: 'Pandas', icon: 'pandas.svg', cat: 'Data & Math', color: 'var(--c-purple)' },
    { name: 'Matplotlib', icon: 'matplotlib.svg', cat: 'Data & Math', color: 'var(--c-blue)' },
    { name: 'Seaborn', icon: 'seaborn.svg', cat: 'Data & Math', color: 'var(--c-teal)' },
    { name: 'SciPy', icon: '', mono: 'Sp', cat: 'Data & Math', color: 'var(--c-blue)' },
    { name: 'XGBoost', icon: '', mono: 'XG', cat: 'Boosting', color: 'var(--c-teal)' },
    { name: 'LightGBM', icon: '', mono: 'LG', cat: 'Boosting', color: 'var(--c-purple)' },
    { name: 'CatBoost', icon: '', mono: 'CB', cat: 'Boosting', color: 'var(--c-yellow)' },
    { name: 'FastAPI', icon: 'fastapi.svg', cat: 'Web & Delivery', color: 'var(--c-teal)' },
    { name: 'Python', icon: 'python.svg', cat: 'Web & Delivery', color: 'var(--c-yellow)' },
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
      text: 'An ML-powered crop recommendation application that uses seven soil and environmental features to predict a suitable crop from the conditions provided by the user.',
      focus: 'Prepared the dataset, trained a neural-network model and connected predictions to a FastAPI-powered interface.',
      image: 'planter-ai.jpg',
      stack: ['Python', 'Scikit-learn', 'FastAPI', 'HTML · CSS · JavaScript'],
      link: 'https://saadaliasghar1045-ops.github.io/PlanterAI/',
      code: 'https://github.com/saadaliasghar1045-ops/PlanterAI',
    },
    {
      title: 'Cinematix',
      tag: 'Content-based recommendation',
      text: 'A content-based movie discovery application that recommends films through description-based search and title matching, with trending selections and a responsive browsing interface.',
      focus: 'Built TF-IDF-based similarity workflows and connected recommendation endpoints to a vanilla JavaScript frontend.',
      image: 'cinematix.jpg',
      stack: ['Python', 'FastAPI', 'TF-IDF', 'Cosine Similarity', 'HTML · CSS · JavaScript'],
      link: 'https://saadaliasghar1045-ops.github.io/Cine-Matix/pages/index.html',
      code: 'https://github.com/saadaliasghar1045-ops/Cine-Matix',
    },
  ],

  /* ---------- Journey (newest chapter last) ---------- */
  timeline: [
    { when: 'The beginning', title: 'ICS at PGC', text: 'Started Intermediate in Computer Science, building an academic foundation while discovering a growing interest in programming.' },
    { when: 'Web foundations', title: 'HTML, CSS & JavaScript', text: 'Learned the foundations of frontend development through tutorials, experimentation and building small interfaces.' },
    { when: 'Python & data', title: 'Python and its libraries', text: 'Started working with NumPy, Pandas and Matplotlib, learning to inspect, prepare and visualise data.' },
    { when: 'A new direction', title: 'Machine Learning', text: 'Studied machine learning through Andrew Ng’s courses and practised core ideas such as regression, classification and model evaluation.' },
    { when: 'Exploring further', title: 'Reinforcement Learning', text: 'Began exploring agents, rewards, policies and the idea of learning through interaction with an environment.' },
    { when: 'More tools, more practice', title: 'Frameworks & model building', text: 'Expanded my toolkit with Scikit-learn, PyTorch, TensorFlow, Keras and gradient-boosting libraries while practising feature engineering.' },
    { when: 'Putting ideas to work', title: 'FastAPI & portfolio projects', text: 'Started connecting models to applications and building projects such as PlanterAI and CineMatix.' },
    { when: 'Currently learning', title: 'Deep Learning', text: 'Developing a stronger understanding of neural networks and exploring architectures such as CNNs, RNNs and Transformers, alongside NLP and Generative AI.' },
  ],
};
