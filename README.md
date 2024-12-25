
# Apple Watch Studio Clone : https://apple-watch-studio-clone-lac.vercel.app/

This project is a dynamic watch selector built using **Next.js** and **React**, enabling users to browse through various watch collections and customize their watch based on case, band, size, and more. The app allows real-time updates of the user's selection and reflects these changes both in the UI and in the URL. It also includes features like pre-rendering, SSR, and dynamic image rendering for a smooth user experience.

## Features

- **Landing Page** : Added a landing page with a page transition /animation
- **Dynamic Collection Selection**: Users can choose different watch collections from a dropdown menu.
- **Customizable Watch**: Users can customize the watch by selecting different cases, bands, and sizes.
- **Debounced URL Syncing**: Automatically updates the URL with user selections and preserves state between page loads. So if you refresh the page you will not loose your config.
- **Image Previews**: Displays images dynamically based on the user's customization choices.
- **Modal Popup**: A modal to save or share the current selection. You can download image of your configuration or copy a share link to share.
- **Responsive Layout**: Ensures a smooth user experience across devices.
- **Pre rendered and SSR** : Thanks to next.js this app supports SSR and prerendering and can be really performant.
- **Images from Apple's CDN and CSS**: Images are dynamically fetched via scraping and reverse-engineering Apple’s website for their CDN links of images and applicable CSS
-  **Proper Constants for labeling Total Calculation** : There was a lot of data on apple's website rather than studying their website and API , I made my own "constants" that provide me with the relevant information

## Getting Started

To set up this project locally, follow these steps:

### Prerequisites

- Node.js (version 18 or higher)
- NPM or Yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Rahul555-droid/apple-watch-studio-clone.git
```

2. Navigate to the project directory:

```bash
cd apple-watch-studio-clone
```

3. Install dependencies:

```bash
npm install
```

or if using Yarn:

```bash
yarn install
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

or if using Yarn:

```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/components
/constants
/hooks
/app
/utils
```

## Technologies Used

- **Next.js**: React framework for building the application.
- **React**: JavaScript library for building the UI components.
- **Tailwind CSS**: For styling the components and creating a responsive design.
- **Lodash**: For debouncing the URL updates.
- **React Icons**: For displaying icons in the UI.
- **Image scraping**: Scraping the Apple website to fetch images for watch cases, bands, and sizes.

---
