# journal
 Memorize an experience by storing text, images, videos and data and time

Pour chaque experience : 
 1. Choisir ou créer un template
 2. Créer un titre
 3. Rajouter du text et/ou des images et/ou des videos.
 4. Rajouter des données (Par exemple, lors d'une cuisson, temperature (mesurée manuellement), poids de la bouteille de gaz, commentaires, et temps)
 5. Rajouter des commentaires.
 6. Enregistrer les données dans une basse de donnée
 7. Créer un post de blog avec tous les données enregistrées.

Synthese globale:
1. presentation des données sous forme  synthetique d'un ensemble d'experiences

# Start appli
voir https://supabase.com/docs/guides/getting-started/tutorials/with-react
> npm create vite@latest bg-journal -- --template react
cd bg-journal
> npm install @supabase/supabase-js
install github  gh
>npm install gh-pages --save-dev


> npm run dev

#
npm install uuid

npm install redux react-redux

# deploy

npm run deploy -- -m "Deploy React app to GitHub Pages"

https://bertrand82.github.io/journal

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# auth magic lien

Il faut eventellement modifier le pattern du lien pour le customiser.
Par exemple rajouter le path derriere l'url

#Configuration url
Authentification (à gauche dashboard du projet)/URL Configuration

# TODO

Prendre des photos et les rajouter
Prendre des videos
Prendre un enregistrement audio
Gerer les enregistrements audios
Exporter vers un blog google (Utilisation de l'api blogger)

