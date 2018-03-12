sudo npm install -g cordova@6

cordova platform add android@6


change "platforms/android/phonegap-plugin-barcodescanner/starter-barcodescanner.gradle"

  compile 'com.android.support:support-v4:+'
  
  to
  
  compile 'com.android.support:support-v4:27.1.0'
