import { createClient, RichTextContent } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Image from 'next/image';

const client = createClient({
  space: process.env.CONTENTFULL_SPACE_ID,
  accessToken: process.env.CONTENTFULL_ACCESS_KEY,
});
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  });

  const paths = res.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  return { props: { recipe: items[0] }, revalidate: 10 };
};

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  const { featuredImage, title, cookingTime, method, ingredients } =
    recipe.fields;
  return (
    <div>
      <div className='banner'>
        <Image
          src={'https:' + featuredImage.fields.file.url}
          width='900'
          height='400'
        />
        <h2>{title}</h2>
      </div>
      <div className='info'>
        <p>Takes about {cookingTime} too cook</p>
        <h3>Ingredients</h3>
        {ingredients.map((ing) => (
          <span key={ing}>{ing} </span>
        ))}
      </div>
      <div className='method'>
        <h3>Method</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
    </div>
  );
}
