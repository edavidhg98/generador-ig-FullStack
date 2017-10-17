const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.appName = opts.appName;
    this.appDescription = opts.appDescription;
    this.entities = opts.entities;
    this.globalMessages = opts.globalMessages;
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'homeTitle',
        message: 'Escriba un titulo descriptivo para la ventana principal de su app: '
      },
      {
        type: 'input',
        name: 'homeDescription',
        message: 'Escriba una breve descripción para la la vista principal de su app: '
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.homeTitle = props.homeTitle;
      this.homeDescription = props.homeDescription;
    });
  }

  writing() {
    this._writeSourceFolder();
    this._writeCommonFiles();
    this._writeAngularEntitiesModule();
    this._writeAngularLayoutsComponents();
    this.fs.copy(this.templatePath('angular/e2e'), this.destinationPath('e2e'));
  }

  _writeSourceFolder() {
    this.fs.copyTpl(
      this.templatePath('angular/src'),
      this.destinationPath('src'),
    { homeDescription: this.homeDescription,
    homeTitle: this.homeTitle });
  }

  _writeAngularEntitiesModule() {
    const fileNames = ['.module', '.route', '-shared.module'];

    fileNames.forEach((fileName) => {
      this.fs.copyTpl(
        this.templatePath(`angular/_app/entities/entities${fileName}.ts`),
        this.destinationPath(`src/app/entities/entities${fileName}.ts`),
        { entities: this.entities, globalMessages: this.globalMessages, _: _ }
      );
    });

    this.fs.copy(
      this.templatePath('angular/_app/entities/orderby.pipe.ts'),
      this.destinationPath('src/app/entities/orderby.pipe.ts')
    );
  }

  _writeAngularLayoutsComponents() {
    this.fs.copyTpl(
      this.templatePath('angular/_app/layouts'),
      this.destinationPath('src/app/layouts'),
      { entities: this.entities, appName: this.appName, _: _ }
    );
  }

  _writeCommonFiles() {
    this.fs.copy(this.templatePath('angular/.angular-cli.json'), this.destinationPath('.angular-cli.json'));
    this.fs.copy(this.templatePath('angular/.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('angular/.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('angular/karma.conf.js'), this.destinationPath('karma.conf.js'));
    this.fs.copy(this.templatePath('angular/protractor.conf.js'), this.destinationPath('protractor.conf.js'));
    this.fs.copy(this.templatePath('angular/tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('angular/tslint.json'), this.destinationPath('tslint.json'));
  }
};
