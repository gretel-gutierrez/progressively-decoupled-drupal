**CRUD operations in a node using Webpack**

1. Enable the theme React -- Simple Hello World.
2. Add react libraries in react_simple.libraries.yml file.
3. Override the node template on templates folder to
   load React app.
4. Load React libraries in node.html.twig file
5. Create some Articles
6. In any folder run npx create-react-app app
7. Run cd app
8. Move each component to app/src/components
9. Add necessary imports and export to each component file
10. Run yarn build
11. Copy app/ folder to a theme
12. Add "build-rename": "npm run build && for i in ./build/static/*/*; do cp $i `echo $i | sed -E \"s/\\.[0-9a-z]{8}\\./\\.drupal\\./g\"`; done" to package.json in the scripts section
13. Run yarn build-rename
14. Add new builded css and js files from app/build/static in react_simple.libraries.yml file.
15. Set homepage attribute in package.json to load the application correctly
16. View any node on the browser and test add, edit and delete.

**How to tell React where to find static assets**
1. Create and add a script in the theme
2. Add the library in react_simple.info.yml file
3. Add the library and dependencies in react_simple.libraries.yml file
4. Add PHP code to generate a complete path to a static asset in react_simple.theme
5. In js file make use of the new variable in the JavaScript of the asset library

https://your-site.com/es/admin/config/services/jsonapi select all operations

**To see this example working**
1. Search for https://my-drupal8-site.ddev.site/ and replace it with your site
