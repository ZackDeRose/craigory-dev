import { usePageContext } from '@new-personal-monorepo/vike-utils';
import { RepoData } from './types';
import { format, isThisYear } from 'date-fns';
import { renderMarkdownToHTML } from './render-markdown';

export function Page() {
  const { projects } = useData();

  return (
    <>
      {projects.map((p) => (
        <div key={p.repo}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}
          >
            <h2>{p.repo}</h2>
            <div style={{ flexGrow: 1 }}></div>
            {p.lastCommit ? (
              <span>
                (
                {format(
                  p.lastCommit,
                  `MMM do${isThisYear(p.lastCommit) ? '' : ', yyyy'}`
                )}
                )
              </span>
            ) : null}
            {p.stars ? <span>⭐️ {p.stars}</span> : null}
          </div>
          <p>{p.description}</p>
          {/* {p.readme ? (
            <div
              dangerouslySetInnerHTML={{
                __html: renderMarkdownToHTML(p.readme),
              }}
            ></div>
          ) : null} */}
          <p>
            Repo: <a href={p.url}>Github</a>
          </p>
          {p.deployment ? (
            <p>
              Website: <a href={p.deployment}>{p.repo}</a>
            </p>
          ) : null}
        </div>
      ))}
    </>
  );
}

function useData() {
  const ctx = usePageContext();
  console.log();
  return (ctx.data ?? {
    projects: [],
  }) as {
    projects: RepoData[];
  };
}