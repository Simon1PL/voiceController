import speech_recognition as sr

r = sr.Recognizer()


def getText():
    with sr.Microphone() as source:
        try:
            print("Słucham...")
            r.adjust_for_ambient_noise(source)
            audio = r.listen(source)
            text = r.recognize_google(audio, language='pl-PL')
            if text != "":
                return text
            return 0
        except:
            return 0


while True:
    txt = getText()
    if txt != 0:
        if "zagraj muzykę" in txt.lower():
            print("playing")
        print(txt)
        continue
    else:
        print("Nie udało się rozpoznać...")
        continue
