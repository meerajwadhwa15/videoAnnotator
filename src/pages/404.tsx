import Head from 'next/head';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <Head>
        <title>Video Annotator - 404 not found page</title>
        <meta
          name="description"
          content="Video annotator - platform for discovering and sharing videos"
        />
      </Head>
      <div className="containers">
        <div className="d-flex justify-content-between align-items-center shadow-sm px-3 py-2">
          <img alt="logo" src="/logo.png" className="logo" />
          <div>
            <Link href="/">
              <a>Home Page</a>
            </Link>
          </div>
        </div>
        <div className="content mx-auto shadow bg-white rounded d-flex flex-column align-items-center">
          <h1 className="text-center">404</h1>
          <p className="text-center">Page not found</p>
          <Link href="/">
            <a className="py-2 px-4 rounded d-flex justify-content-center go-back">
              <i className="material-icons mr-1">arrow_back</i>
              <span>Go Back</span>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .containers {
            height: 100hvh;
          }
          img.logo {
            height: 32px;
          }
          .content {
            max-width: 540px;
            padding: 80px 0;
            margin-top: 20vh;
          }
          h1 {
            color: #4b86c7;
            font-size: 80px;
            margin-bottom: 24px;
          }
          p {
            font-size: 24px;
            margin-bottom: 12px;
          }

          a.go-back {
            background: #4b86c7;
            color: white;
          }

          a.go-back:hover {
            text-decoration: none;
          }

          i {
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
};

export default Index;
