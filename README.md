# About

<div align="center">

### 🚀 Tech Stack

&nbsp;

![Astro](https://img.shields.io/badge/Astro-5.7.10-20232A?logo=astro)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.3-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178c6?logo=typescript)
![Zod](https://img.shields.io/badge/Zod-NotUsed-3A7AFE?logo=zod)

</div>

this solution was converted from a react.js + vite + react-router libarary SPA, to a Astro + React.js SSR app.

To create a new astro template 👇:
```sh
npm create astro@latest -- --template framework-react
```

This project uses Astro working with [React](https://react.dev).
Write your React components as `.jsx` or `.tsx` files in your project.

# Solution: MindfulList - Mindfulness Apps and Resources

MindfulList is a web application that provides a curated collection of mindfulness and personal growth apps, along with informative blog content. Built with Astro and React, the site offers a responsive, user-friendly interface for discovering mental wellness tools.

## Project Structure

The project is organized as follows:

```
proud-planet
├── src
│   ├── components       # React and Astro UI components
│   ├── fetchers         # Data fetching utilities
│   ├── gqlr             # GraphQL queries
│   ├── hooks            # Custom React hooks
│   ├── layouts          # Page layouts
│   ├── pages            # Astro page components
│   ├── styles           # CSS and Tailwind styles
│   ├── types            # TypeScript type definitions
│   ├── utils            # Utility functions
│   └── zod              # Zod validation schemas
├── astro.config.mjs     # Astro configuration
├── package.json         # Project dependencies
├── .env                 # Environment variables (API endpoint)
└── README.md            # Project documentation
```

## Key Features

- **App Discovery**: Search and browse through a curated list of mindfulness applications.
- **Multi-Select Search**: Filter apps by multiple tags and categories.
- **Blog Section**: Read articles related to mindfulness and mental health.
- **Responsive Design**: Works across desktop and mobile devices.
- **Server-Side Rendering**: Uses Astro's SSR for better performance and SEO.

## Technology Stack

- **Astro**: Main framework for the site, handling routing and server-rendering
- **React**: Used for interactive UI components
- **Tailwind CSS**: For styling components
- **GraphQL**: For data fetching (API endpoint is configurable via `.env`)
- **TypeScript**: For type safety across the application
- **Zod**: For form validation

## Environment Variables

The application uses environment variables to configure the backend API endpoint for GraphQL data fetching.

Create a `.env` file in the project root with the following content:

```env
PUBLIC_API_URL=http://localhost:4000/graphql
```

- `PUBLIC_API_URL`: The URL of your GraphQL API. For local development, this should point to your local backend (default: `http://localhost:4000/graphql`). For production, update this value to your deployed API endpoint.

**Note:** The `.env` file is included in `.gitignore` and should be created manually for each environment.

## Getting Started

Clone the repository and install dependencies:

```sh
git clone [repository-url]
cd proud-planet
npm install
```

Set up your `.env` file as described above.

Run the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```
# Deployment Instructions

Follow these instructions to deploy the MindfulList application using PM2 on your server.

## Prerequisites

- Node.js (v22.14.0 or higher)
- NPM (v10.9.2 or higher)
- PM2 (install globally with `npm install -g pm2`)

## Deployment Steps

1. **Build the application locally**:
   ```sh
   npm run build
   ```

2. **Transfer files to your server**:
   - Copy the entire `dist/` folder
   - Copy `package.json`
   - You can use SCP, SFTP, or any other file transfer method
   ```sh
   scp -r dist/ package.json user@your-server:/var/www/astro-app/
   ```

3. **Install dependencies on the server**:
   ```sh
   cd /var/www/astro-app
   npm install --production
   ```

4. **Set up environment variables on the server**:
   - Create a `.env` file in `/var/www/astro-app` with your production API endpoint:
     ```env
     PUBLIC_API_URL=https://your-production-api/graphql
     ```

5. **Start the application with PM2**:
   ```sh
   pm2 start /var/www/astro-app/server/entry.mjs --name "astro-mindfullist"
   ```

6. **Save the PM2 configuration to ensure restart on server reboot**:
   ```sh
   pm2 save
   pm2 startup
   ```

7. **Check status of the application**:
   ```sh
   pm2 status
   ```

8. **View logs if needed**:
   ```sh
   pm2 logs astro-mindfullist
   ```

## Common PM2 Commands

- Stop the application: `pm2 stop astro-mindfullist`
- Restart the application: `pm2 restart astro-mindfullist`
- Delete the application from PM2: `pm2 delete astro-mindfullist`
- Monitor resources: `pm2 monit`

## Nginx Configuration (Optional)

If you're using Nginx as a reverse proxy:

1. Create a configuration file:
   ```sh
   sudo nano /etc/nginx/sites-available/mindfullist
   ```

2. Add the following configuration (modify as needed):
   ```nginx
   server {
       listen 80;
       server_name mindfullist.com.au www.mindfullist.com.au;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Enable the site and restart Nginx:
   ```sh
   sudo ln -s /etc/nginx/sites-available/mindfullist /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```


- `posts.ts`: For fetching blog content
- `tags.ts`: For fetching tag categories

## Components

Some notable components include:

- `MainHomeSearch`: Main search component on the homepage
- `AppCard`: Displays app information
- `BlogPreview`: Displays blog post previews
- `MultiSelectSearch`: Advanced search with multiple tag selection

## Pages

- `/`: Homepage with app listings and search
- `/blogs`: Blog listing page
- `/blog/[slug]`: Individual blog post page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
