import http.client
import time
import urllib.parse
import sys
import os
import threading

downloaded_bytes = 0  ##сколько скачано байт
is_downloading = True  ##флаг завершенности загрузки
#######
##тестировано на: python lab1.py http://www.petryasheva.ru/media/songs/bumazhnij_korablik.mp3
##...много строк загрузки
##Загрузка завершена. Скачано всего байт: 9041597
##Загрузка завершена.
#######
def download_file(url):
    global downloaded_bytes, is_downloading
    parsed_url = urllib.parse.urlparse(url)
    conn = http.client.HTTPConnection(parsed_url.hostname)
    conn.request("GET", parsed_url.path)
    response = conn.getresponse()

    ##проверка статуса ответа, если ошибка - завершение программы
    if response.status != 200:
        print(f"Ошибка при загрузке файла: {response.status} {response.reason}")
        sys.exit(1)

    filename = os.path.basename(parsed_url.path) or "downloaded_file"
    with open(filename, "wb") as f:
        while True:
            data = response.read(1024)
            if not data:
                break
            f.write(data)
            downloaded_bytes += len(data)
            ##time.sleep(0.01) ##задержка

    conn.close()
    is_downloading = False

def show_progress():
    while is_downloading:
        print(f"Скачано байт: {downloaded_bytes}")
        time.sleep(1)  ##Вывод каждую секунду
    print(f"Загрузка завершена. Всего скачано: {downloaded_bytes} байт")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Использование: python downloader.py <URL>")
        sys.exit(1)

    url = sys.argv[1]
    
    progress_thread = threading.Thread(target=show_progress)
    progress_thread.start()
    
    download_file(url)

    progress_thread.join()

    print("Загрузка завершена.")
