// Context
import { useDataContext } from '../Context/DataContext';

// Icon
import { PiDownloadSimple } from 'react-icons/pi';

function Content({ item, pathArr }) {
  const { name, path, type, download_url } = item;
  const { getRepoDetails } = useDataContext();

  function downloadFile() {
    fetch(download_url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        const [filename] = download_url.split('/').slice(-1);
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  }

  return (
    <li className="grid items-center border-b-[1px] border-gray-300 p-4">
      <div>
        {type === 'dir' && (
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => {
              getRepoDetails(path).then(() => {
                if (path) pathArr.current.push(path);
              });
            }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              className="select-none, text-[rgb(132, 141, 151)] inline-block overflow-visible align-text-bottom"
            >
              <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
            </svg>
            <p className="text-lg font-medium">{name}</p>
          </div>
        )}
        {type === 'file' && (
          <a
            className="flex cursor-pointer items-center justify-between gap-2"
            onClick={downloadFile}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              className="select-none, text-[rgb(132, 141, 151)] inline-block overflow-visible align-text-bottom"
            >
              <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path>
            </svg>
            <p className="text-lg font-medium">{name}</p>
            <PiDownloadSimple size={20} className="ml-auto" />
          </a>
        )}
      </div>
    </li>
  );
}

export default Content;
