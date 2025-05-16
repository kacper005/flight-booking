# Run the project

* First time running this project, run `docker compose up` in the folder `flight-booking` (root folder).
* If the docker image is already built, run `docker compose start` to start the container and `docker compose stop` to stop the container.

# React + Vite

IMPORTANT: In this version the steps in below are deprecated due to the project is now being run in Docker.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Follow these steps to run frontend:

- cd frontend
- yarn install
- yarn run build
- yarn dev
