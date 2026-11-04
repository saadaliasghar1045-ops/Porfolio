# Saad Ali Asghar — Portfolio

A responsive personal portfolio built with plain HTML, CSS and JavaScript. It includes light/dark themes, project cards, skills filters, a learning timeline and an illustrative model-training visualisation. There is no build step or frontend framework.

## Run locally

1. Extract the project folder.
2. Open a terminal in the folder.
3. Start a local static server. For example:

   ```bash
   python -m http.server 5500
   ```

4. Visit `http://localhost:5500/home.html`.

Opening the HTML file directly may work, but a local server is recommended for consistent asset loading and browser behaviour.

## Update your content

Most portfolio content lives in `javascript/profile.js`:

- `profile`: name, social links, email, contact API endpoint and rotating hero words.
- `academic`: core knowledge cards, data workflow steps and model delivery card.
- `tools`: technology cards and their filter categories.
- `projects`: project title, description, image, technologies and links.
- `timeline`: learning milestones, oldest first and newest last.

### Add a project

Copy an object inside `projects` in `javascript/profile.js`:

```js
{
  title: 'Project name',
  tag: 'Machine Learning',
  text: 'A concise explanation of what the project does.',
  focus: 'What you implemented or learned.',
  image: 'project-image.jpg',
  stack: ['Python', 'FastAPI'],
  link: 'https://your-live-demo.example',
  code: 'https://github.com/your-account/your-repository'
}
```

Place the image in `assets/images/`. The Live view and Source code buttons are only displayed when their respective URLs are provided.

### Add a tool

Add an object to `tools`, and put its SVG logo in `assets/icons/`:

```js
{ name: 'Tool name', icon: 'tool.svg', cat: 'Machine Learning', color: 'var(--c-blue)' }
```

If you do not have a logo, use `icon: ''` and provide a short `mono` label, such as `mono: 'ML'`. A filter is generated automatically for each category.

### Add an academic skill

Add an object to `academic`:

```js
{ title: 'Computer Vision', group: 'core', icon: 'brain', text: 'A short, accurate description of the topic.' }
```

Use `core` for a main skill card, `data` for a data-workflow step, or `delivery` for the wide model-to-application card. Available SVG icon names are defined at the top of `javascript/skills.js`.

## Contact form setup

The form does **not** send messages until you connect it to a deployed backend. It must not point to `127.0.0.1` or `localhost` on a public website, because those addresses refer to each visitor's own device.

In `javascript/profile.js`, set:

```js
contactEndpoint: 'https://your-deployed-api.example.com/contact',
```

Your FastAPI endpoint should accept a JSON body with `name`, `email` and `message`, and allow your portfolio domain through CORS. Use HTTPS in production. If you leave `contactEndpoint` empty, the form will use the configured `profile.email` as a `mailto:` fallback when an email address is provided; if neither is configured, it displays a clear message directing visitors to GitHub or LinkedIn.

Only publish an email address you are comfortable making public.

## Theme and layout

| Change | File |
| --- | --- |
| Light/dark palette and accent colours | `stylesheets/theme-colors.css` |
| Fonts, radii, spacing and neumorphic shadows | `stylesheets/theme-base.css` |
| Reveal animation timing | `stylesheets/animations.css` |
| Navigation, hero, biography, skills, projects, showcase, timeline and contact styles | Matching files in `stylesheets/` |

The theme toggle saves the selected theme in local storage. The initial theme follows the visitor's system preference when no saved preference exists.

## Project structure

```text
Portfolio/
├── home.html
├── index.html
├── README.md
├── portfolio_explain.md
├── assets/
│   ├── icons/
│   └── images/
├── javascript/
│   ├── profile.js
│   ├── animations.js
│   ├── site-effects.js
│   ├── navbar.js
│   └── section scripts...
└── stylesheets/
    ├── theme-base.css
    ├── theme-colors.css
    └── section stylesheets...
```
