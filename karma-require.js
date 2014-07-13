var allTestFiles = [];
var TEST_REGEXP = /test.*\.js$/i;

var pathToModule = function (path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {

    console.log(file);

    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        var path = pathToModule(file);

        console.log('OK : ' + path);

        allTestFiles.push(path);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
