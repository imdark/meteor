Package.describe({
  version: '0.0.1',
  summary: '',
  documentation: null,
  debugOnly: true
});

Package.onUse(function(api) {
  api.export('TrackerProfiler');
  api.use('tracker');
  api.use('underscore');
  api.addFiles('tracker-profiler.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tracker-profiler');
  api.addFiles('tracker-profiler-tests.js');
});
