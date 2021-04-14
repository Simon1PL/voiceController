import time

from selenium import webdriver
from datetime import datetime

options = webdriver.ChromeOptions()
# options.add_argument('headless') To psuje działanie programu
options.add_experimental_option("prefs", {
    "profile.default_content_setting_values.media_stream_mic": 1,
  })
options.add_experimental_option("excludeSwitches", ["enable-logging"])

def openBrowser():
    try:
        browserRes = webdriver.Chrome(executable_path='E:/chromedriver.exe', chrome_options=options)
        browserRes.get('https://simon1pl.github.io/voiceController/')
        return browserRes
    except Exception as e:
        today = datetime.now()
        f = open("pythonAppLogs.txt", "a")
        f.write(str(today))
        f.write(str(e))
        f.close()
        try:
            browserRes.close()
        except():
            None
        if "net::ERR_NAME_NOT_RESOLVED" in e.msg:
            time.sleep(15)
            return openBrowser()

browser = openBrowser()
browser.set_window_position(-10000, 0)
browser.set_window_size(0, 0)
browser.find_element_by_css_selector('.seleniumClick1').click()
