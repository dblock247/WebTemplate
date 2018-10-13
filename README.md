##### 1. Make sure that you've installed Node and npm before attempting to install gulp.
> node --version  
> npm --version


##### 2. If you've previously installed gulp globally remove it before following these instructions
> npm rm --global gulp

##### 3. Uninstall previous Gulp installation and related packages, if any
> npm rm --global gulp

##### 4 Install the latest Gulp CLI tools globally
> npm install --global gulp-cli

##### 5. Install Gulp 4 into your project from 4.0 GitHub branch as dev dependency
>npm install --save-dev gulp@next

##### 6. Check the versions installed. Make sure your versions are not lower than shown
> gulp -v  
> [09:28:50] CLI version 2.0.1  
> [09:28:50] Local version 4.0.0

##### 7. In your project directory, create a file named gulpfile.js in your project root with these contents:
```javascript
let gulp = require('gulp');

gulp.task('default', defaultTask);

function defaultTask(done) {
  // place code for your default task here
  done();
}
```

##### 8. Run the gulp command in your project directory
> gulp `<task>`  

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gulp.js_Logo.svg/64px-Gulp.js_Logo.svg.png)
#####  Documentation
[Getting Started](https://gulpjs.org/getting-started.html "Gulp Getting Started")  
[Gulp API](https://gulpjs.org/API.html#gulp-src-globs-options "Gulp API")  

