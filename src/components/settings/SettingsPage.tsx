import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore, applyTheme } from "@/store/themeStore";
import {
  Bell,
  Globe,
  Moon,
  Sun,
  Trash2,
  UserCog,
  Shield,
  Palette,
  Smartphone,
  Accessibility,
  Sparkles,
  Zap,
  Volume2,
  Keyboard,
  Eye,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = (value: string) => {
    setTheme(value as "light" | "dark" | "system");
    applyTheme(value as "light" | "dark" | "system");
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                {t("settings.title")}
              </h1>
              <p className="text-slate-400 mt-1">
                Customize your learning experience
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-blue-900/20 text-blue-400 border-blue-800 px-3 py-1"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Pro Settings
            </Badge>
          </div>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50 p-1 rounded-xl">
              <TabsTrigger
                value="appearance"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-lg"
              >
                <Palette className="h-4 w-4 mr-2" />
                {t("settings.appearance")}
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-lg"
              >
                <Bell className="h-4 w-4 mr-2" />
                {t("settings.notifications")}
              </TabsTrigger>
              <TabsTrigger
                value="accessibility"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-lg"
              >
                <Accessibility className="h-4 w-4 mr-2" />
                Accessibility
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 rounded-lg"
              >
                <Shield className="h-4 w-4 mr-2" />
                {t("settings.privacy")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 pb-8">
                    <CardTitle className="flex items-center">
                      <Sun className="h-5 w-5 mr-2 text-amber-400" />
                      {t("settings.appearance")}
                    </CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="language"
                        className="text-sm font-medium flex items-center"
                      >
                        <Globe className="h-4 w-4 mr-2 text-blue-400" />
                        {t("settings.language")}
                      </Label>
                      <Select
                        value={i18n.language}
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger
                          id="language"
                          className="w-full bg-slate-900/50 border-slate-700"
                        >
                          <SelectValue>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-blue-400" />
                              {i18n.language === "en"
                                ? "English"
                                : i18n.language === "es"
                                  ? "Español"
                                  : i18n.language === "fr"
                                    ? "Français"
                                    : "Deutsch"}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="theme"
                        className="text-sm font-medium flex items-center"
                      >
                        <Palette className="h-4 w-4 mr-2 text-purple-400" />
                        {t("settings.theme")}
                      </Label>
                      <Select value={theme} onValueChange={handleThemeChange}>
                        <SelectTrigger
                          id="theme"
                          className="w-full bg-slate-900/50 border-slate-700"
                        >
                          <SelectValue>
                            <div className="flex items-center">
                              {theme === "light" ? (
                                <>
                                  <Sun className="h-4 w-4 mr-2 text-amber-400" />
                                  {t("settings.light")}
                                </>
                              ) : theme === "dark" ? (
                                <>
                                  <Moon className="h-4 w-4 mr-2 text-blue-400" />
                                  {t("settings.dark")}
                                </>
                              ) : (
                                <>
                                  <div className="h-4 w-4 mr-2 relative">
                                    <Sun className="absolute h-4 w-4 opacity-50 text-amber-400" />
                                    <Moon className="absolute h-4 w-4 opacity-50 text-blue-400" />
                                  </div>
                                  {t("settings.system")}
                                </>
                              )}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="light">
                            <div className="flex items-center">
                              <Sun className="h-4 w-4 mr-2 text-amber-400" />
                              {t("settings.light")}
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center">
                              <Moon className="h-4 w-4 mr-2 text-blue-400" />
                              {t("settings.dark")}
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center">
                              <div className="h-4 w-4 mr-2 relative">
                                <Sun className="absolute h-4 w-4 opacity-50 text-amber-400" />
                                <Moon className="absolute h-4 w-4 opacity-50 text-blue-400" />
                              </div>
                              {t("settings.system")}
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <Smartphone className="h-4 w-4 mr-2 text-green-400" />
                        Interface Density
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-slate-900/50 border-slate-700 hover:bg-slate-800 hover:text-white"
                        >
                          Compact
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-900/20 border-blue-700 text-blue-400"
                        >
                          Default
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-slate-900/50 border-slate-700 hover:bg-slate-800 hover:text-white"
                        >
                          Comfortable
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <CardHeader className="pb-0">
                    <CardTitle>Theme Preview</CardTitle>
                    <CardDescription>
                      See how your selected theme looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <motion.div
                      className="flex justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div
                        className={`w-full h-64 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden relative ${theme === "dark" ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-gradient-to-br from-white to-slate-100 border border-slate-200"}`}
                      >
                        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)]" />
                        <div className="relative z-10 p-4 w-full max-w-xs">
                          <div
                            className={`text-center mb-4 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                          >
                            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                              {theme === "dark" ? "Dark Theme" : "Light Theme"}
                            </h3>
                            <p
                              className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                            >
                              {theme === "dark"
                                ? "Optimized for night viewing"
                                : "Perfect for daytime use"}
                            </p>
                          </div>

                          <div
                            className={`rounded-lg p-3 mb-3 ${theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-300"}`}
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                              >
                                Progress
                              </div>
                              <div
                                className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
                              >
                                75%
                              </div>
                            </div>
                            <div
                              className={`h-2 rounded-full mt-2 ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}
                            >
                              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-3/4"></div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 w-full"
                            >
                              <Zap className="h-3.5 w-3.5 mr-1" /> Action
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className={`w-full ${theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-300 text-slate-800"}`}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-slate-700 bg-slate-800/30 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Apply Custom Theme
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-blue-400" />
                    {t("settings.notifications")}
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive notifications and alerts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="email-notifications"
                        className="flex items-center text-sm font-medium"
                      >
                        <Mail className="h-4 w-4 mr-2 text-blue-400" />
                        {t("settings.emailNotifications")}
                      </Label>
                      <p className="text-sm text-slate-400">
                        Receive notifications about your account via email.
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      defaultChecked
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="push-notifications"
                        className="flex items-center text-sm font-medium"
                      >
                        <Bell className="h-4 w-4 mr-2 text-purple-400" />
                        {t("settings.pushNotifications")}
                      </Label>
                      <p className="text-sm text-slate-400">
                        Receive push notifications in your browser.
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="learning-reminders"
                        className="flex items-center text-sm font-medium"
                      >
                        <Zap className="h-4 w-4 mr-2 text-amber-400" />
                        Learning Reminders
                      </Label>
                      <p className="text-sm text-slate-400">
                        Get daily reminders to continue your learning journey.
                      </p>
                    </div>
                    <Switch
                      id="learning-reminders"
                      defaultChecked
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="ai-suggestions"
                        className="flex items-center text-sm font-medium"
                      >
                        <Sparkles className="h-4 w-4 mr-2 text-green-400" />
                        AI Suggestions
                      </Label>
                      <p className="text-sm text-slate-400">
                        Receive personalized AI-powered learning suggestions.
                      </p>
                    </div>
                    <Switch
                      id="ai-suggestions"
                      defaultChecked
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessibility">
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                  <CardTitle className="flex items-center">
                    <Accessibility className="h-5 w-5 mr-2 text-green-400" />
                    Accessibility Settings
                  </CardTitle>
                  <CardDescription>
                    Customize your experience for better accessibility.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center text-sm font-medium mb-2">
                        <Eye className="h-4 w-4 mr-2 text-blue-400" />
                        Text Size
                      </Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">A</span>
                        <Slider
                          defaultValue={[50]}
                          max={100}
                          step={10}
                          className="flex-1"
                        />
                        <span className="text-lg font-bold text-slate-400">
                          A
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className="flex items-center text-sm font-medium mb-2">
                        <Palette className="h-4 w-4 mr-2 text-purple-400" />
                        Contrast
                      </Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 opacity-50">Low</span>
                        <Slider
                          defaultValue={[75]}
                          max={100}
                          step={25}
                          className="flex-1"
                        />
                        <span className="text-slate-400">High</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="reduce-motion"
                          className="flex items-center text-sm font-medium"
                        >
                          <Zap className="h-4 w-4 mr-2 text-amber-400" />
                          Reduce Motion
                        </Label>
                        <p className="text-sm text-slate-400">
                          Minimize animations throughout the interface.
                        </p>
                      </div>
                      <Switch
                        id="reduce-motion"
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="screen-reader"
                          className="flex items-center text-sm font-medium"
                        >
                          <Volume2 className="h-4 w-4 mr-2 text-green-400" />
                          Screen Reader Optimization
                        </Label>
                        <p className="text-sm text-slate-400">
                          Optimize content for screen readers.
                        </p>
                      </div>
                      <Switch
                        id="screen-reader"
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="keyboard-navigation"
                          className="flex items-center text-sm font-medium"
                        >
                          <Keyboard className="h-4 w-4 mr-2 text-blue-400" />
                          Enhanced Keyboard Navigation
                        </Label>
                        <p className="text-sm text-slate-400">
                          Enable advanced keyboard shortcuts and focus
                          indicators.
                        </p>
                      </div>
                      <Switch
                        id="keyboard-navigation"
                        defaultChecked
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 bg-slate-800/30 py-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Save Accessibility Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-400" />
                    {t("settings.privacy")}
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy settings and account data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="data-sharing"
                        className="flex items-center text-sm font-medium"
                      >
                        <UserCog className="h-4 w-4 mr-2 text-blue-400" />
                        {t("settings.dataSharing")}
                      </Label>
                      <p className="text-sm text-slate-400">
                        Allow us to use your data to improve our services.
                      </p>
                    </div>
                    <Switch
                      id="data-sharing"
                      defaultChecked
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="ai-learning"
                        className="flex items-center text-sm font-medium"
                      >
                        <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                        AI Learning Data
                      </Label>
                      <p className="text-sm text-slate-400">
                        Allow AI to learn from your interactions to provide
                        better recommendations.
                      </p>
                    </div>
                    <Switch
                      id="ai-learning"
                      defaultChecked
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="analytics"
                        className="flex items-center text-sm font-medium"
                      >
                        <BarChart className="h-4 w-4 mr-2 text-green-400" />
                        Analytics Cookies
                      </Label>
                      <p className="text-sm text-slate-400">
                        Allow us to collect anonymous usage data to improve the
                        platform.
                      </p>
                    </div>
                    <Switch
                      id="analytics"
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                    />
                  </div>

                  <Separator className="my-4 bg-slate-700" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-300">
                      Account Actions
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        className="bg-slate-800 border-slate-700 hover:bg-slate-700 flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download My Data
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="flex-1 bg-red-900/30 hover:bg-red-900/50 text-red-400 border-red-900/50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("settings.deleteAccount")}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-800 border-slate-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              {t("settings.deleteAccount")}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              {t("settings.deleteAccountWarning")}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white">
                              {t("settings.cancel")}
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-red-900/50 text-red-300 hover:bg-red-900 hover:text-red-200 border border-red-900/50">
                              {t("settings.confirm")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}
