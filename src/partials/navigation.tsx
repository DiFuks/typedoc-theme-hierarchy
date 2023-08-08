import * as process from 'process';

import {
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
  ReflectionKind,
} from 'typedoc';
import { DeclarationReflection } from 'typedoc/dist/lib/models/reflections/declaration';
import path from 'path';

interface IDeclarationItem {
  title: string;
  children: DeclarationReflection[];
  url?: string;
}

interface IVirtualFileItem extends DeclarationReflection {
  title: string;
  children: DeclarationReflection[];
}

type IItem = IDeclarationItem | IVirtualFileItem;

interface ICategory {
  id: string;
  items: IItem[];
  categories: Record<string, ICategory>;
}

/**
 * Рендерит панель навигации.
 */
export const navigation =
  (context: DefaultThemeRenderContext) =>
  (props: PageEvent<Reflection>): JSX.Element => {
    const categories = formatFileHierarchy(props.model.project.children || []);

    return (
      <div class='tree'>
        <div class='tree-config'>
          <button
            class='tree-config__button tree-config__button--expand js-tree-expand'
            title='Expand All'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 490.72 490.72'
              fill='currentColor'
            >
              <path d='M480.027,288.027H10.693c-5.867,0-10.667,4.8-10.667,10.667c0,5.867,4.8,10.667,10.667,10.667h213.333v144.96l-45.76-45.76c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l64,64c4.16,4.16,10.88,4.16,15.04,0l64-64c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0l-45.867,45.76V309.36h234.667c5.867,0,10.667-4.8,10.667-10.667C490.693,292.827,485.893,288.027,480.027,288.027z' />
              <path d='M10.693,224.027h469.333c5.867,0,10.667-4.8,10.667-10.667c0-5.867-4.8-10.667-10.667-10.667H245.36V36.4l45.76,45.76c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827l-64-64c-4.16-4.16-10.88-4.16-15.04,0l-64,64c-4.053,4.267-3.947,10.987,0.213,15.04c4.16,3.947,10.667,3.947,14.827,0l45.867-45.76v166.293H10.693c-5.867,0-10.667,4.8-10.667,10.667C0.027,219.227,4.827,224.027,10.693,224.027z' />
            </svg>
          </button>
          <button
            class='tree-config__button tree-config__button--collapse js-tree-collapse'
            title='Collapse All'
          >
            <svg
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
            >
              <path
                fill-rule='evenodd'
                d='M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z'
              />
            </svg>
          </button>
          <button
            class='tree-config__button tree-config__button--target js-tree-target'
            title='Scroll to current file'
          >
            <svg
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <circle cx='12' cy='12' r='3' />
              <path d='M13 4.069V2h-2v2.069A8.008 8.008 0 0 0 4.069 11H2v2h2.069A8.007 8.007 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z' />
            </svg>
          </button>
        </div>
        <div class='tree-content'>
          <Navigation {...categories} context={context} />
        </div>
      </div>
    );
  };

const Navigation = ({
  id,
  categories,
  items,
  context,
}: ICategory & {
  context: DefaultThemeRenderContext;
}): JSX.Element => (
  <ul class='js-category-list category' data-id={id}>
    {Object.entries(categories).map(([key, item]) => (
      <li>
        <span class='js-category-title category__title' data-id={item.id}>
          <div class='category__folder' data-id={item.id} />
          {key}
        </span>
        <Navigation
          id={item.id}
          categories={item.categories}
          items={item.items}
          context={context}
        />
      </li>
    ))}
    {items.map((item) => (
      <li>
        <Item {...item} context={context} />
      </li>
    ))}
  </ul>
);

const Item = (
  item: IItem & {
    context: DefaultThemeRenderContext;
  },
): JSX.Element => {
  if ('id' in item) {
    return (
      <>
        <a
          class='category__link js-category-link category__link--ts'
          href={item.context.urlTo(item)}
          data-id={item.url && `/${item.url}`}
        >
          {item.title}
        </a>
        <ul>
          {item.children.map((subItem) => (
            <li>
              <a
                class='category__link js-category-link'
                href={item.context.urlTo(subItem)}
                data-id={subItem.url && `/${subItem.url}`}
              >
                {item.context.icons[subItem.kind]()}
                {subItem.name}
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <span class='category__link category__link--disable js-category-link category__link--ts'>
        {item.title}
      </span>
      <ul>
        {item.children.map((subItem) => (
          <li>
            <a
              class='category__link js-category-link'
              href={item.context.urlTo(subItem)}
              data-id={subItem.url && `/${subItem.url}`}
            >
              {item.context.icons[subItem.kind]()}
              {subItem.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

const getName = (item: DeclarationReflection): string => {
  const fullFileName = item.sources?.[0]?.fullFileName || '';
  const targetFileName = fullFileName.replaceAll(path.sep, '/');
  const currentDirName = process.cwd().replaceAll(path.sep, '/');

  return targetFileName.replace(currentDirName, '').slice(1);
};

const formatFileHierarchy = (values: DeclarationReflection[]): ICategory => {
  const result: ICategory = {
    items: [],
    categories: {},
    id: 'root',
  };

  for (const item of values) {
    const titleSplit = getName(item).split('/');

    addToCategory(result, item, titleSplit, 0);
  }

  return result;
};

const addToCategory = (
  category: ICategory,
  item: DeclarationReflection,
  titleSplit: string[],
  idx: number,
): void => {
  if (idx === titleSplit.length - 1) {
    // Если элементом является модуль (файл), то файлом считается он. Актуально для Expand мода
    if (item.kind === ReflectionKind.Module) {
      category.items.push({
        ...item,
        title: titleSplit[idx] || '',
        children: item.children || [],
      });

      return;
    }

    const existsFile = category.items.find(
      (existItem) => existItem.title === titleSplit[idx],
    );

    // Если элементом не является модуль, то файлом считается виртуальный файл. Страница для него будет недоступна. Актуально для одной точки входа
    if (!existsFile) {
      category.items.push({
        title: titleSplit[idx] ?? '',
        children: [item],
      });

      return;
    }

    existsFile.children.push(item);

    return;
  }

  const title = titleSplit[idx];

  if (!title) {
    return;
  }

  if (!category.categories[title]) {
    // eslint-disable-next-line no-param-reassign
    category.categories[title] = {
      items: [],
      categories: {},
      id: `${category.id}-${title}`,
    };
  }

  const categoryToAdd = category.categories[title];

  if (!categoryToAdd) {
    return;
  }

  addToCategory(categoryToAdd, item, titleSplit, idx + 1);
};
