package io.ionic.starter;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    WebView.setWebContentsDebuggingEnabled(true);
    Log.d("MainActivity", "WebView com depuração habilitada (sem verificar BuildConfig)");
  }
}
