# Controle Financeiro

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Libraries

### Chart
https://valor-software.com/ng2-charts/
    https://valor-software.com/ng2-charts/pie

### Material
https://material.angular.dev/

### Signals

[signal] => is the state of the application
[computed] => is a function that returns a value based on the state of the application, if is a new update is made, the computed is updated
[effect] => was added when the signal is updated, it can be used to perform side effects
[input] => is a reactive brother of @Input()