import withDoctype from "./withDoctype.js";
import { render } from "../../web_modules/preact-render-to-string.js";
import { html } from "../../web_modules/htm/preact.js";
import BasePage from "../../client/components/shared/BasePage.js";
import Index from "../../client/pages/Index.js";

/**
 * Preact-based view engine. There's only one page (Index) in this example, so
 * it's a pretty simple implementation.
 */
export default function viewEngine(filePath, options, callback) {
  const { pageProps } = options;
  const debug = process.env.NODE_ENV !== "production";

  const pageElement = html`
    <${BasePage}
      head=${Index.Head}
      page=${Index.pageName}
      pageProps=${pageProps}
      debug=${debug}
    >
      <${Index} ...${pageProps} />
    <//>
  `;

  const rendered = render(pageElement);

  return callback(null, withDoctype(rendered));
}
