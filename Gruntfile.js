var www = __dirname;

var appFiles = [
www + '/app/app.js',
www + '/app/services/*.js',
www + '/app/filters/*.js',
www + '/app/directives/*.js',
www + '/app/controllers/*.js'
];

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: appFiles
    },
    concat: {
      app: {
        src: appFiles,
      dest: www + '/ng-app.js'
      }
    },
    uglify: {
      app: {
        src: [ www + '/ng-app.js'],
        dest: www + '/ng-app.min.js'
      }
    },
    watch: {
      scripts: {
        files: www + '/app/**/*.js',
        tasks: ['jshint','concat'],
        options: {
          interrupt: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'concat']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);
}
