/**
 * WebPub iframe auto-resize script
 *
 * REQUIRED for external HTML pages to enable automatic height adjustment.
 * Include before closing </body> tag:
 *
 *   <script src="../js/iframe-resize.js"></script>
 *
 * This script communicates the content height to the parent WebPub frame,
 * allowing seamless integration of external content.
 *
 * How it works:
 * - Measures document.body.scrollHeight
 * - Sends height to parent via postMessage
 * - Listens for resize events and DOM changes
 * - Updates automatically when content changes
 */
(function () {
  function sendHeight() {
    var height = document.body.scrollHeight;
    window.parent.postMessage(
      { type: "webpub-iframe-height", height: height },
      "*",
    );
  }

  // Send height when document is ready
  if (document.readyState === "complete") {
    sendHeight();
  } else {
    window.addEventListener("load", sendHeight);
  }

  // Send height on window resize
  window.addEventListener("resize", sendHeight);

  // Observe DOM changes for dynamic content
  if (typeof MutationObserver !== "undefined") {
    new MutationObserver(sendHeight).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initial height send
  sendHeight();
})();
