# knksknsy.github.io

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Github Pages Deployment

- [Deployment Guide](https://angular.io/guide/deployment#deploy-to-github-pages)
- `ng build --configuration "production" --output-path docs --base-href "https://knksknsy.github.io/"`
- When the build is complete, make a copy of `docs/index.html` and name it `docs/404.html`

## Include private data
Copy and rename the files in 
- `src/assets/data/company.template.json`
- `src/assets/data/private.template.json`
to
- `src/assets/data/company.json`
- `src/assets/data/private.json`
respectively, and populate with your private data.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
