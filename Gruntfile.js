module.exports = function(grunt) {

	// Project configuration.
  grunt.initConfig({
    server: {
      port: grunt.option('port') || 76543
    },
		
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
      dist: {
        options: { mangle: true, compress: true, beautify: false },
        src: [
        	'src/js/components/core.js',
        ],
        dest: 'src/js/builds/uglified.js'
      },
      tooltip: {
        options: { mangle: true, compress: true, beautify: false },
        src: [
          'src/js/components/modules/module-peck-tooltip.js'
        ],
        dest: 'src/js/builds/peck-tooltip.js'
      }
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      dist: {
        src: [
          'src/js/builds/uglified.js'
        ],
        dest: 'dist/js/peck-core.min.js'
      },
      tooltip: {
        src: [
        	'src/js/builds/peck-tooltip.js'
        ],
        dest: 'dist/templates/peck-tooltip/peck-tooltip.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          sourcemap: "none",
          style: 'compressed'
        },
        files: {
          'src/scss/builds/styles.css': 'src/scss/styles.scss'
        }
      },
      tooltip: {
        options: {
          sourcemap: "none",
          style: 'compressed'
        },
        files: {
          'src/scss/builds/peck-tooltip.css': 'src/scss/styles-tooltip.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: ['last 5 versions', 'ie 9', 'Safari >= 6.0']})
        ]
      },
      dist: {
        files: {
          'dist/css/peck-core.min.css': 'src/scss/builds/styles.css'
        }
      },
      tooltip: {
        files: {
          'dist/templates/peck-tooltip/peck-tooltip.min.css': 'src/scss/builds/peck-tooltip.css'
        }
      }
    },

    watch: {
      css: {
        files: ['src/scss/styles.scss','src/scss/components/*.{css,scss}','src/scss/components/**/*.{css,scss}'],
        tasks: ['sass', 'postcss']
      },
      js: {
        files: ['src/js/components/*.js','src/js/components/modules/*.js'],
        tasks: ['uglify', 'concat']
      }
    }
	});
	
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['uglify', 'concat', 'sass', 'postcss', 'watch']);
	grunt.registerTask('tooltip', ['uglify:tooltip', 'concat:tooltip', 'sass:tooltip', 'postcss:tooltip', 'watch']);
};