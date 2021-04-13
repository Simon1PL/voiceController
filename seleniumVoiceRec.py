from selenium import webdriver

options = webdriver.ChromeOptions()
options.add_experimental_option("prefs", {
    "profile.default_content_setting_values.media_stream_mic": 1,
  })
browser = webdriver.Chrome(executable_path='E:/chromedriver.exe', chrome_options=options)
browser.get('http://127.0.0.1:5501/index.html')
browser.set_window_position(-10000, 0)
browser.set_window_size(0, 0)
browser.find_element_by_css_selector('.seleniumClick1').click()
