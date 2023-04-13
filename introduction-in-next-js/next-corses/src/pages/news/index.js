import Link from "next/link";

import { Fragment } from "react";

function NewsPage() {
  return (
    <Fragment>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">
            Next JS is greate framework!
          </Link>
        </li>
        <li>
          <Link href="/news/somthing-else">Somthing else</Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
