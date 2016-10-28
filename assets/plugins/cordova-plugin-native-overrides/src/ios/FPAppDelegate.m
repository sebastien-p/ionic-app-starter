#import "FPAppDelegate.h"
#import "MainViewController.h"

@implementation FPAppDelegate

@synthesize window, viewController;

#define IDIOM UI_USER_INTERFACE_IDIOM()
#define IPAD UIUserInterfaceIdiomPad

// Totally override the didFinishLaunchingWithOptions method :(
// If you know Objective-C better than I do (shouldn't be difficult),
// please find a cleaner way to do this and restore peace in the world.

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
  CGRect screenBounds = [[UIScreen mainScreen] bounds];

  self.window = [[UIWindow alloc] initWithFrame:screenBounds];
  self.window.autoresizesSubviews = YES;

  self.viewController = [[MainViewController alloc] init];

  // Yep, we only wanted to add those following four lines...

  if (IDIOM == IPAD) {
    self.viewController.startPage = @"tablet.html";
  }
  else {
    self.viewController.startPage = @"smartphone.html";
  }

  self.window.rootViewController = self.viewController;
  [self.window makeKeyAndVisible];

  return YES;
}

@end
