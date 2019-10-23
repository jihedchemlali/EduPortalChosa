module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	//initConfig
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    //
	var app = {
	        srcPath: 'dist/front/',
	        testPath: 'src/test/webapp',
	        stubPort: 8081
	    };

    grunt.initConfig({
    	app: app,
        curl: {
            installWiremock: {
                src: 'http://central.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.1.10/wiremock-standalone-2.1.10.jar',
                dest: '/home/ammar/DATA/workspace/chosa-v2/projet/angular/Wiremock/wiremock-standalone-2.1.10.jar'
            }
        },
        exec: {
            liteserver: {
                command: 'npm start',
                stdout: false,
                stderr: false
            }
        },
        http: {
            stopWiremock: {
                options: {
                    url: 'http://localhost:<%= app.stubPort %>/__admin/shutdown',
                    method: 'POST',
                    ignoreErrors: true
                }
            }
        }
    }); 
    
    grunt.registerTask('mock', 'Start stubs', function(target) {
        var wiremockProcess = grunt.util.spawn({
            cmd: 'java',
            args: [
                '-jar', '/home/ammar/DATA/workspace/chosa-v2/projet/angular/Wiremock/wiremock-standalone-2.1.10.jar',
                '--port', app.stubPort,
                '--root-dir', 'src/test',
                '--verbose'
            ]
        });
        // console logger
        wiremockProcess.stdout.pipe(process.stdout);
        wiremockProcess.stderr.pipe(process.stderr);
    });
    
    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        grunt.task.run('http:stopWiremock');
        grunt.task.run('mock');
        grunt.task.run([
            'exec:liteserver'
        ]);
    });
}