from selenium import webdriver

options = webdriver.ChromeOptions()
# options.add_argument('headless') To psuje działanie programu
options.add_experimental_option("prefs", {
    "profile.default_content_setting_values.media_stream_mic": 1,
  })
options.add_experimental_option("excludeSwitches", ["enable-logging"])
browser = webdriver.Chrome(executable_path='E:/chromedriver.exe', chrome_options=options)
browser.get('https://simon1pl.github.io/voiceController/')
browser.set_window_position(-10000, 0)
browser.set_window_size(0, 0)
browser.find_element_by_css_selector('.seleniumClick1').click()
