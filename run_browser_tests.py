import asyncio
import http.server
import socketserver
import threading
from playwright.async_api import async_playwright
import os

PORT = 8000
URL = f"http://localhost:{PORT}/index.html?test=true"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

async def main():
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()
    print("Server started in background thread.")
    await asyncio.sleep(2)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))

        try:
            print(f"Navigating to {URL}")
            await page.goto(URL, wait_until="load")

            await page.wait_for_selector("#test-results[data-total]", state='attached', timeout=10000)

            passed = await page.locator("#test-results").get_attribute("data-passed")
            total = await page.locator("#test-results").get_attribute("data-total")

            print(f"Tests finished. Passed: {passed}, Total: {total}")

            if passed != total:
                raise Exception(f"Test failed: {passed}/{total} passed.")

        except Exception as e:
            print(f"An error occurred: {e}")
            raise
        finally:
            await browser.close()

if __name__ == "__main__":
    # In the CI environment, we need to manually stop the server
    # For simplicity here, we'll rely on the daemon thread exiting.
    try:
        asyncio.run(main())
        print("Tests passed successfully.")
        # The process will hang here if the server is not a daemon, which is fine for local runs.
        # For CI, a more robust shutdown is needed.
    except Exception as e:
        print(f"Test run failed: {e}")
        # Exit with a non-zero code to indicate failure
        exit(1)
