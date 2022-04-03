chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
      id: 'Serial Port Console',
      bounds: {
        width: 800,
        height: 450,
        left: 100,
        top: 100
      },
      minWidth: 800,
      minHeight: 450
    });
  });