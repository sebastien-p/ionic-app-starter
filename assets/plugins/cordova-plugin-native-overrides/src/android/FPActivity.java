package PACKAGE_ID;

import android.content.res.Configuration;

public class FPActivity extends MainActivity {

  private static final String URL = "file:///android_asset/www/%s.html";
  private static final String SMARTPHONE = "smartphone";
  private static final String TABLET = "tablet";

  private boolean isTablet() {
    return (
      getApplicationContext().getResources().getConfiguration().screenLayout
        & Configuration.SCREENLAYOUT_SIZE_MASK
    ) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
  }

  @Override
  protected void loadConfig() {
    super.loadConfig();
    launchUrl = String.format(URL, isTablet() ? TABLET : SMARTPHONE);
  }

}
